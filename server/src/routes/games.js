import express from 'express';
import games from "../data/games.js";
import {jwtSecret} from "../hooks/jwtSecret.js";
import jwt from "jsonwebtoken";

const channels = new Map();
const router = express.Router();

function distributeBid(slug, username, price) {
    const bid = {
        name: username,
        amount: price
    };

    const channel = channels.get(slug);
    if (channel) {
        for (const { stream } of channel.clients) {
            stream.write(`data: ${JSON.stringify(bid)}\n\n`);
        }
    }
}

router.get("/", (req, res) => {
    const {genreId} = req.query;

    if (genreId) {
        const filteredGames = games.filter(game => game.genre === genreId);
        return res.status(200).json(filteredGames);
    }

    return res.status(200).json(games);
});

router.get("/:slug", (req, res) => {
    const {slug} = req.params;
    const foundGame = games.find(game => game.slug.toLowerCase() === slug.toLowerCase());

    if (!foundGame) {
        res.status(404).json({message: "Game not found."});
    }

    res.status(200).json(foundGame);
});

router.post("/", async (req, res) => {
    //TODO: add a new game
});

router.put("/:id", async (req, res) => {
    //TODO: update the game with the given id
});

router.delete("/:id", async (req, res) => {
    //TODO: delete the game with the given id
});

router.get("/events/:slug", (req, res) => {
    const { slug } = req.params;

    if (!channels.has(slug)) {
        channels.set(slug, { clients: [] });
    }

    const channel = channels.get(slug);

    res.setHeader("Cache-Control", "no-cache");
    res.setHeader("Content-Type", "text/event-stream");
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Connection", "keep-alive");
    res.flushHeaders();

    channel.clients.push({ stream: res });

    req.on("close", () => {
        channel.clients = channel.clients.filter((client) => client.stream !== res);
    });
});

router.post("/:id/bid", async (req, res) => {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return res.status(403).json({ message: "Forbidden: No token provided" });
    }

    const token = authHeader.split(' ')[1];

    jwt.verify(token, jwtSecret, async (err, authData) => {
        if (err) {
            return res.status(403).json({ message: "Forbidden: Invalid token" });
        } else {
            if (!authData.sub.role.includes('bidder')) {
                return res.status(403).json({ message: "Forbidden: You are not authorized to place a bid" });
            }

            const gameId = req.params.id;
            const { price } = req.body;

            if (!price) {
                return res.status(400).json({ message: "Price is required" });
            }

            const game = games.find(game => game.id === parseInt(gameId));
            if (game) {
                game.auction.bidders.push({
                    name: authData.sub.username,
                    amount: price,
                });

                distributeBid(game.slug, authData.sub.username, price);

                return res.status(200).json({ message: "Bid placed successfully" });
            } else {
                return res.status(404).json({ message: "Game not found" });
            }
        }
    });
});

export default router;