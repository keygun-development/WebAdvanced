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
        for (const {stream} of channel.clients) {
            stream.write(`data: ${JSON.stringify(bid)}\n\n`);
        }
    }
}

router.get("/", (req, res) => {
    const {genre, producer, console} = req.query;
    let filteredGames = games;

    if (genre) {
        filteredGames = filteredGames.filter(game => game.genre === genre);
    }

    if (producer) {
        filteredGames = filteredGames.filter(game => game.producer.toLowerCase() === producer.toLowerCase());
    }

    if (console) {
        filteredGames = filteredGames.filter(game => game.consoles.includes(console));
    }

    return res.status(200).json(filteredGames);
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
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return res.status(403).json({message: "Forbidden: No token provided"});
    }

    const token = authHeader.split(' ')[1];

    jwt.verify(token, jwtSecret, async (err, authData) => {
        if (err) {
            return res.status(403).json({message: "Forbidden: Invalid token"});
        } else {
            if (!authData.sub.role.includes('admin')) {
                return res.status(403).json({message: "Forbidden: You are not authorized to delete a game"});
            }

            const gameId = req.params.id;
            const gameIndex = games.findIndex(game => game.id === parseInt(gameId));

            if (gameIndex !== -1) {
                games.splice(gameIndex, 1);
                return res.status(200).json({message: "Game deleted successfully"});
            } else {
                return res.status(404).json({message: "Game not found"});
            }
        }
    });
});

router.get("/events/:slug", (req, res) => {
    const {slug} = req.params;

    if (!channels.has(slug)) {
        channels.set(slug, {clients: []});
    }

    const channel = channels.get(slug);

    res.setHeader("Cache-Control", "no-cache");
    res.setHeader("Content-Type", "text/event-stream");
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Connection", "keep-alive");
    res.flushHeaders();

    channel.clients.push({stream: res});

    req.on("close", () => {
        channel.clients = channel.clients.filter((client) => client.stream !== res);
    });
});

router.post("/:id/bid", async (req, res) => {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return res.status(403).json({message: "Forbidden: No token provided"});
    }

    const token = authHeader.split(' ')[1];

    jwt.verify(token, jwtSecret, async (err, authData) => {
        if (err) {
            return res.status(403).json({message: "Forbidden: Invalid token"});
        } else {
            if (!authData.sub.role.includes('bidder')) {
                return res.status(403).json({message: "Forbidden: You are not authorized to place a bid"});
            }

            const gameId = req.params.id;
            const {price} = req.body;

            if (!price || isNaN(price)) {
                return res.status(400).json({message: "Price is required and must be a number"});
            }

            const game = games.find(game => game.id === parseInt(gameId));
            if (game) {
                if (price <= game.auction.currentPrice) {
                    return res.status(400).json({message: "Price must be greater than the current price"});
                }
                game.auction.bidders.push({
                    name: authData.sub.username,
                    amount: price,
                });

                distributeBid(game.slug, authData.sub.username, price);
                game.auction.currentPrice = price;

                return res.status(200).json({message: "Bid placed successfully"});
            } else {
                return res.status(404).json({message: "Game not found"});
            }
        }
    });
});

export default router;