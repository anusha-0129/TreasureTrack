import express from 'express';
import path from 'path';
import url from 'url';

import dotenv from 'dotenv';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import database from "./database/db.js";
import { authRouter } from './routes/auth.js';
import { incomeRouter } from './routes/income.js';
import { expenseRouter } from './routes/expense.js';
import voiceCommandRouter from './routes/voiceCommand.js';


dotenv.config();


const __filename = url.fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

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

// Serve static files from the Vite build output directory
app.use(express.static(path.join(__dirname, 'frontend/dist')));

// The catch-all handler for serving the Vite app
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'frontend/dist', 'index.html'));
});


app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
