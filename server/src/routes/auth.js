import express from 'express';
import users from "../data/users.js";
import {compare, hash} from "bcrypt";
import jwt from "jsonwebtoken";
import dotenv from 'dotenv';

dotenv.config();

const router = express.Router();

async function createAdmin() {
    try {
        users[0].password = await hash("password", 10);
    } catch (error) {
        console.error("Error met het aanmaken van admin:", error);
    }
}

await createAdmin();

router.post("/login", async (req, res) => {
    const {username, password} = req.body;

    if (!username || !password) {
        return res.status(400).json({message: "Gebruikersnaam en wachtwoord zijn verplicht."});
    }

    const user = users.find(u => u.username.toLowerCase() === username.toLowerCase());
    if (!user) {
        return res.status(401).json({message: "OIngeldige inloggegevens."});
    }

    try {
        const match = await compare(password, user.password);
        if (!match) {
            return res.status(401).json({message: "Ongeldige inloggegevens."});
        }

        const token = jwt.sign({userId: user.id, username: user.username}, process.env.JWT_SECRET, {expiresIn: '1h'});
        res.status(200).json({token});
    } catch (error) {
        res.status(500).json({message: "Er is een fout opgetreden met he inloggen."});
    }
});

router.post("/register", async (req, res) => {
    const {username, password} = req.body;
    if (!username || !password) {
        return res.status(400).send("Gebruikersnaam en wachtwoord zijn verplicht.");
    }

    if (users.some(user => user.username.toLowerCase() === username.toLowerCase())) {
        return res.status(400).json({message: "Gebruiker bestaat al/.."});
    }

    try {
        const hashedPassword = await hash(password, 10);

        const user = {id: users.length + 1, username, password: hashedPassword};
        users.push(user);
        res.status(201).json({message: "Gebruiker is succesvol aangemaakt."});
    } catch (error) {
        res.status(500).json({message: "Er is een fout opgetreden met het aanmaken van de gebruiker.."});
    }
});

router.get("/me", async (req, res) => {
    if (!req.user) {
        return res.status(401).json({message: "Niet geauthoriseerd."});
    }
    const user = users.find(u => u.id === req.user.userId);
    res.status(200).json(user);
})

export default router;