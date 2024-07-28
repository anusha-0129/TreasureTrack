
import express from 'express';
import { addExpense, getExpenses, updateExpense, deleteExpense } from '../controllers/expenseController.js';
import verifyUser from '../middlewares/auth.js';

const router = express.Router();

router.post('/', verifyUser, addExpense);
router.get('/', verifyUser, getExpenses);
router.put('/:id', verifyUser, updateExpense);
router.delete('/:id', verifyUser, deleteExpense);

export { router as expenseRouter };
