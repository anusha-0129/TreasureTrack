
import express from 'express';
import { parse, format } from 'date-fns';
import Expense from '../models/expenseModel.js';
import Income from '../models/incomeModel.js';
import wordsToNumbers from '../utils/wordstoNumbers.js'
import verifyUser from '../middlewares/auth.js';

const router = express.Router();


router.use(verifyUser);

router.post('/api/voice-command', async (req, res) => {
  const { command } = req.body;
  console.log('Received command:', command);

  const expenseRegex = /add expense of (\d+|\w+) by ([a-zA-Z\s]+) on ([a-zA-Z\s\d]+)/i;
  const incomeRegex = /add income of (\d+|\w+) by ([a-zA-Z\s]+) on ([a-zA-Z\s\d]+)/i;

  const expenseMatch = command.match(expenseRegex);
  const incomeMatch = command.match(incomeRegex);

  console.log(expenseMatch);
  console.log(incomeMatch);

  try {
    if (expenseMatch) {
      let amount = expenseMatch[1];
      if (isNaN(amount)) {
        amount = wordsToNumbers(amount);
      } else {
        amount = parseFloat(amount);
      }
      const description = expenseMatch[2].trim();
      const title = description;
      const date = format(parse(expenseMatch[3], 'MMMM d yyyy', new Date()), 'yyyy-MM-dd');

      const expense = new Expense({ user: req.user.id, title, amount, date, description });
      await expense.save();

      console.log(`Expense - Amount: ${amount}, Description: ${description}, Date: ${date}`);
      res.json({ message: 'Expense added successfully.', expense });
    } else if (incomeMatch) {
      let amount = incomeMatch[1];
      if (isNaN(amount)) {
        amount = wordsToNumbers(amount);
      } else {
        amount = parseFloat(amount);
      }
      const description = incomeMatch[2].trim();
      const title = description;
      const date = format(parse(incomeMatch[3], 'MMMM d yyyy', new Date()), 'yyyy-MM-dd');

      const income = new Income({ user: req.user.id, title, amount, date, description });
      await income.save();

      console.log(`Income - Amount: ${amount}, Description: ${description}, Date: ${date}`);
      res.json({ message: 'Income added successfully.', income });
    } else {
      res.status(400).json({ message: 'Command not recognized.' });
    }
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

export default router;
