import express from 'express';
import cors from "cors";
import auth from './routes/auth.js';
import games from './routes/games.js';
import tokens from './routes/tokens.js';
import genres from './routes/genres.js';

const app = express();
const port = 3000;

app.use(express.json());
app.use(cors());
app.use("/auth", auth);
app.use("/games", games);
app.use("/tokens", tokens);
app.use("/genres", genres);

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
});