import express from "express";
import users from "../data/users.js";
import {compare} from "bcrypt";
import jwt from "jsonwebtoken";
import jwtSecret from "../hooks/useGenerateSecret.js";

const router = express.Router();

router.post("/", async (req, res) => {
    const {username, password} = req.body;

    if (!username || !password) {
        return res.status(400).json({message: "Gebruikersnaam en wachtwoord zijn verplicht."});
    }

    const user = users.find(u => u.username.toLowerCase() === username.toLowerCase());
    if (!user) {
        return res.status(401).json({message: "Ongeldige inloggegevens."});
    }

    try {
        const match = await compare(password, user.password);
        if (!match) {
            return res.status(401).json({message: "Ongeldige inloggegevens."});
        }

        const token = jwt.sign({sub: {userId: user.id, username: user.username, role: user.role}}, jwtSecret, {expiresIn: '1h'});
        res.status(200).json({token});
    } catch (error) {
        res.status(500).json({message: "Er is een fout opgetreden met het inloggen."});
        throw error;
    }
});

export default router;