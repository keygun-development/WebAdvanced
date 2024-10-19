import express from 'express';
import users from "../data/users.js";
import {hash} from "bcrypt";

const router = express.Router();

router.post("/", async (req, res) => {
    const {username, password, email} = req.body;
    if (!username || !password || !email) {
        return res.status(400).json({message: "Gebruikersnaam, email en wachtwoord zijn verplicht."});
    }

    if (users.some(user => user.email.toLowerCase() === email.toLowerCase())) {
        return res.status(409).json({message: "E-mailadres bestaat al."});
    }

    if (users.some(user => user.username.toLowerCase() === username.toLowerCase())) {
        return res.status(409).json({message: "Gebruikersnaam bestaat al."});
    }

    if (password.length < 8) {
        return res.status(409).json({message: "Wachtwoord moet minimaal 8 tekens bevatten."});
    }

    try {
        const hashedPassword = await hash(password, 10);

        const user = {id: users.length + 1, username, email, password: hashedPassword};
        users.push(user);
        res.status(201).json({message: "Gebruiker is succesvol aangemaakt."});
    } catch (error) {
        res.status(500).json({message: "Er is een fout opgetreden met het aanmaken van de gebruiker."});
        throw error;
    }
});

export default router;