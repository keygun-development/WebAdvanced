import express from 'express';
import users from "../data/users.js";
import {hash} from "bcrypt";

const router = express.Router();

const createUsers = async function () {
    try {
        users[0].password = await hash("password", 10);
        users[1].password = await hash("password", 10);
    } catch (error) {
        console.error("Error met het aanmaken van gebruikers:", error);
    }
};

await createUsers();

router.post("/", async (req, res) => {
    const {username, password, email} = req.body;
    if (!username || !password) {
        return res.status(400).send("Gebruikersnaam en wachtwoord zijn verplicht.");
    }

    if (users.some(user => user.email.toLowerCase() === email.toLowerCase())) {
        return res.status(400).json({message: "Email bestaat al."});
    }

    if (users.some(user => user.username.toLowerCase() === username.toLowerCase())) {
        return res.status(400).json({message: "Gebruiker bestaat al."});
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