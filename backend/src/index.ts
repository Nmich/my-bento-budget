import cors from 'cors'
import dotenv from 'dotenv';
import { fileURLToPath } from 'url';
import { dirname, resolve } from 'path';
import express from 'express';
import authRoutes from "./routes/authentication.routes.js"
import { verifToken } from './middleware/authMiddleware.js';
import budgetsRoutes from "./routes/budget.routes.js"
import expensesRoutes from "./routes/expense.routes.js"

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
dotenv.config({ path: resolve(__dirname, '../../.env') });

const app = express();
const PORT = process.env.PORT ?? 3000;

app.use(cors())
app.use(express.json());

app.get('/health', (_req, res) => {
    res.json({ status: 'ok' });
});

app.use('/auth', authRoutes);
app.use(verifToken);
app.use('/api/v1', budgetsRoutes);
app.use('/api/v1', expensesRoutes);


app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});