import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import database from "./database/db.js";
import { authRouter } from './routes/auth.js';
import { incomeRouter } from './routes/income.js';
import { expenseRouter } from './routes/expense.js';
import voiceCommandRouter from './routes/voiceCommand.js';
import verifyUser from './middlewares/auth.js'
dotenv.config();

const app = express();
const PORT = process.env.PORT;

app.use(express.json());
app.use(cors({
  origin: ["http://localhost:5173","https://treasuretrack.onrender.com"],
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  credentials: true
}));
app.use(cookieParser());
database();
app.use('/auth', authRouter);
app.use('/incomes',verifyUser, incomeRouter);
app.use('/expenses',verifyUser, expenseRouter);
app.use(voiceCommandRouter);

app.listen(PORT, () => {
  console.log("Server is Running");
});
