import express from 'express';
import genres from "../data/genres.js";

const router = express.Router();

router.get("/", async (req, res) => {
    return res.status(200).json(genres);
})

export default router;