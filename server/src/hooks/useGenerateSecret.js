import crypto from "node:crypto";

const generateSecret = () => {
    return crypto.randomBytes(64).toString('hex');
};

export default generateSecret();