import express from 'express';
const router = express.Router();

router.get("/", async (req, res) => {
    //TODO: return the list of games
})

router.get("/:id", async (req, res) => {
  //TODO: return the game with the given id
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