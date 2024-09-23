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
        console.error("Error creating admin:", error);
    }
}

await createAdmin();

router.post("/login", async (req, res) => {
    const {username, password} = req.body;

    if (!username || !password) {
        return res.status(400).json({message: "Username and password are required."});
    }

    const user = users.find(u => u.username.toLowerCase() === username.toLowerCase());
    if (!user) {
        return res.status(401).json({message: "Invalid credentials."});
    }

    try {
        const match = await compare(password, user.password);
        if (!match) {
            return res.status(401).json({message: "Invalid credentials."});
        }

        const token = jwt.sign({userId: user.id, username: user.username}, process.env.JWT_SECRET, {expiresIn: '1h'});
        res.status(200).json({token});
    } catch (error) {
        res.status(500).json({message: "Error logging in."});
    }
});

router.post("/register", async (req, res) => {
    const {username, password} = req.body;
    if (!username || !password) {
        return res.status(400).send("Username and password are required");
    }

    if (users.some(user => user.username.toLowerCase() === username.toLowerCase())) {
        return res.status(400).json({message: "User already exists."});
    }

    try {
        const hashedPassword = await hash(password, 10);

        const user = {id: users.length + 1, username, password: hashedPassword};
        users.push(user);
        res.status(201).json({message: "User registered successfully."});
    } catch (error) {
        res.status(500).json({message: "Error registering user."});
    }
});

router.get("/me", async (req, res) => {
    if (!req.user) {
        return res.status(401).json({message: "Unauthorized"});
    }
    const user = users.find(u => u.id === req.user.userId);
    res.status(200).json(user);
})

export default router;