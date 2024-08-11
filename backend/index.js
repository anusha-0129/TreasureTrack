import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import path from 'path';
import cookieParser from 'cookie-parser';
import database from "./database/db.js";
import { authRouter } from './routes/auth.js';
import { incomeRouter } from './routes/income.js';
import { expenseRouter } from './routes/expense.js';
import voiceCommandRouter from './routes/voiceCommand.js';

const __filename = new URL(import.meta.url).pathname;
const __dirname = path.dirname(__filename);

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json());
app.use(cors({
  origin: ["http://localhost:5173", "https://treasuretrack.onrender.com"],
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  credentials: true
}));
app.use(cookieParser());
database();

app.use('/auth', authRouter);
app.use('/incomes', incomeRouter);
app.use('/expenses', expenseRouter);
app.use(voiceCommandRouter);


app.use(express.static(path.join(__dirname, 'frontend/dist')));


app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'frontend/dist', 'index.html'));
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
