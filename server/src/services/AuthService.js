import jwt from "jsonwebtoken";
import {jwtSecret} from "../jwtSecret.js";

export class AuthService {

    static getToken(req) {
        const authHeader = req.headers.authorization;

        if (!authHeader || !authHeader.startsWith('Bearer ')) {
            throw new Error('Verboden: Geen token meegegeven');
        }

        return authHeader.split(' ')[1];
    }

    static async verifyToken(token) {
        return await new Promise((resolve, reject) => {
            jwt.verify(token, jwtSecret, (err, authData) => {
                if (err) {
                    return reject(new Error('Verboden: Ongeldige token meegegeven'));
                }
                resolve(authData);
            });
        });
    }

    static checkRole(authData, role) {
        if (!authData.sub.role.includes(role)) {
            throw new Error('Verboden: Je hebt geen toegang tot deze resource');
        }
    }
}