import express from 'express';
import users from "../data/users.js";
import {hash} from "bcrypt";

const router = express.Router();

async function createAdmin() {
    try {
        users[0].password = await hash("password", 10);
    } catch (error) {
        console.error("Error met het aanmaken van admin:", error);
    }
}

await createAdmin();

router.post("/", async (req, res) => {
    const {username, password} = req.body;
    if (!username || !password) {
        return res.status(400).send("Gebruikersnaam en wachtwoord zijn verplicht.");
    }

    if (users.some(user => user.username.toLowerCase() === username.toLowerCase())) {
        return res.status(400).json({message: "Gebruiker bestaat al."});
    }

    try {
        const hashedPassword = await hash(password, 10);

        const user = {id: users.length + 1, username, password: hashedPassword};
        users.push(user);
        res.status(201).json({message: "Gebruiker is succesvol aangemaakt."});
    } catch (error) {
        res.status(500).json({message: "Er is een fout opgetreden met het aanmaken van de gebruiker."});
    }
});

export default router;