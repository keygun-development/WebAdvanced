import express from 'express';
import games from "../data/games.js";
import {AuthService} from "../services/AuthService.js";

const channels = new Map();
const router = express.Router();

const distributeBid = (slug, username, price) => {
    const bid = {
        name: username,
        amount: price,
        slug: slug
    };

    const channel = channels.get(slug);
    if (channel) {
        for (const {stream} of channel.clients) {
            stream.write(`data: ${JSON.stringify(bid)}\n\n`);
        }
    }
};

router.get("/", (req, res) => {
    const {genre, producer, console, limit} = req.query;
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

    if (limit) {
        filteredGames = filteredGames.slice(0, parseInt(limit));
    }

    return res.status(200).json(filteredGames);
});

router.get("/:slug", (req, res) => {
    const {slug} = req.params;
    const foundGame = games.find(game => game.slug.toLowerCase() === slug.toLowerCase());

    if (!foundGame) {
        res.status(404).json({message: "Game niet gevonden."});
    }

    res.status(200).json(foundGame);
});

router.post("/", async (req, res) => {
    try {
        const token = AuthService.getToken(req);
        const authData = await AuthService.verifyToken(token);

        AuthService.checkRole(authData, 'admin');
        const {consoles, endDate, startingPrice, producer, genre, title, image, description} = req.body;

        if (!title || !producer || !endDate || !startingPrice || !consoles) {
            return res.status(400).json({message: "Niet alle verplichte velden zijn ingevuld."});
        }

        if (isNaN(startingPrice)) {
            return res.status(400).json({message: "De startprijs moet een getal zijn."});
        }

        if (games.find(g => g.name === title)) {
            return res.status(400).json({ message: "Er bestaat al een game met deze naam." });
        }


        const newGame = {
            id: games.length + 1,
            name: title,
            image,
            description,
            slug: title.toLowerCase().replace(/ /g, "-"),
            genre,
            producer,
            consoles: consoles.split(","),
            auction: {
                endDate,
                startingPrice,
                currentPrice: startingPrice,
                bidders: []
            }
        };

        games.push(newGame);
        return res.status(200).json({message: "Game toegevoegd."});
    } catch (e) {
        return res.status(401).json({message: e.message});
    }
});

router.put("/:id", async (req, res) => {
    try {
        const token = AuthService.getToken(req);
        const authData = await AuthService.verifyToken(token);

        AuthService.checkRole(authData, 'admin');

        const {title, image, description, auction} = req.body;
        const gameId = req.params.id;
        const game = games.find(game => game.id === parseInt(gameId));
        if (game) {
            game.name = title;
            game.image = image;
            game.description = description;
            game.auction.endDate = auction.endDate;

            return res.status(200).json({message: "Game geüpdatet"});
        } else {
            return res.status(404).json({message: "Game niet gevonden"});
        }
    } catch (error) {
        return res.status(401).json({message: error.message});
    }
});

router.delete("/:id", async (req, res) => {
    try {
        const token = AuthService.getToken(req);
        const authData = await AuthService.verifyToken(token);

        AuthService.checkRole(authData, 'admin');

        const gameId = req.params.id;
        const gameIndex = games.findIndex(game => game.id === parseInt(gameId));

        if (gameIndex !== -1) {
            games.splice(gameIndex, 1);
            return res.status(200).json({message: "Game verwijderd."});
        } else {
            return res.status(404).json({message: "Game niet gevonden"});
        }
    } catch (e) {
        return res.status(401).json({message: e.message});
    }
});

router.delete("/:id/bidders/:bidderId", async (req, res) => {
    try {
        const token = AuthService.getToken(req);
        const authData = await AuthService.verifyToken(token);

        AuthService.checkRole(authData, 'admin');

        const {id, bidderId} = req.params;
        const game = games.find(game => game.id === parseInt(id));
        if (game) {
            const bidderIndex = game.auction.bidders.findIndex(bidder => bidder.id === parseInt(bidderId));
            if (bidderIndex !== -1) {
                game.auction.bidders.splice(bidderIndex, 1);
                return res.status(200).json({message: "Bieder verwijderd"});
            } else {
                return res.status(404).json({message: "Bieder niet gevonden"});
            }
        } else {
            return res.status(404).json({message: "Game niet gevonden"});
        }
    } catch (e) {
        return res.status(401).json({message: e.message});
    }
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
    try {
        const token = AuthService.getToken(req);
        const authData = await AuthService.verifyToken(token);

        AuthService.checkRole(authData, 'bidder');

        const gameId = req.params.id;
        const {price} = req.body;

        if (!price || isNaN(price)) {
            return res.status(400).json({message: "Het bod moet een getal zijn en mag niet leeg zijn."});
        }

        const game = games.find(game => game.id === parseInt(gameId));
        if (game) {
            if (price <= game.auction.currentPrice) {
                return res.status(400).json({message: "Het bod moet hoger zijn dan de huidige prijs."});
            }
            game.auction.bidders.push({
                id: game.auction.bidders.length + 1,
                name: authData.sub.username,
                amount: price,
                userId: authData.sub.id
            });

            distributeBid(game.slug, authData.sub.username, price);
            game.auction.currentPrice = price;

            return res.status(200).json({message: "Bod geplaatst"});
        } else {
            return res.status(404).json({message: "Game niet gevonden"});
        }
    } catch (e) {
        return res.status(401).json({message: e.message});
    }
});

export default router;