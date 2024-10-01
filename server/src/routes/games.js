import express from 'express';
import games from "../data/games.js";

const router = express.Router();

router.get("/", async (req, res) => {
    return res.status(200).json(games);
})

router.get("/:slug", async (req, res) => {
    const foundGame = games.find(game => game.slug.toLowerCase() === req.params.slug.toLowerCase())

    if (!foundGame) {
        res.status(404).json({message: "Game not found."})
    }

    res.status(200).json(foundGame);
})

router.post("/", async (req, res) => {
    //TODO: add a new game
})

router.put("/:id", async (req, res) => {
    //TODO: update the game with the given id
})

router.delete("/:id", async (req, res) => {
    //TODO: delete the game with the given id
})

router.post("/:id/bid", async (req, res) => {
    //TODO: place a bid for the game with the given id
})

router.get("/:id/bids", async (req, res) => {
    //TODO: return the list of bids for the game with the given id
})

export default router;