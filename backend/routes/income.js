
import express from 'express';
import { addIncome, getIncomes, updateIncome, deleteIncome } from '../controllers/incomeController.js';
import verifyUser from '../middlewares/auth.js';

const router = express.Router();

router.post('/', verifyUser, addIncome);
router.get('/', verifyUser, getIncomes);
router.put('/:id', verifyUser, updateIncome);
router.delete('/:id', verifyUser, deleteIncome);

export { router as incomeRouter };

