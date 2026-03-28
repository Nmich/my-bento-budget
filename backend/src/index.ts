import dotenv from 'dotenv';
import { fileURLToPath } from 'url';
import { dirname, resolve } from 'path'; 
import express from 'express';
import register from "./routes/authentication.routes.js"

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
dotenv.config({ path: resolve(__dirname, '../../.env') });

const app = express();
const PORT = process.env.PORT ?? 3000;
app.use(express.json());

app.get('/health', (_req, res) => {
    res.json({ status: 'ok' });
});

app.use('/auth', register);

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});