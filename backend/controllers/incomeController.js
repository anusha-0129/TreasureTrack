
import Income from '../models/incomeModel.js'

export const addIncome = async (req, res) => {
  const { title, amount, date, description } = req.body;
  try {
    const income = new Income({ user: req.user.id, title, amount, date, description });
    await income.save();
    res.json(income);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};

export const getIncomes = async (req, res) => {
  try {
    const incomes = await Income.find({ user: req.user.id }).sort({createdAt: -1});
    res.json(incomes);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};

export const updateIncome = async (req, res) => {
  const { title, amount, date, description } = req.body;
  const incomeFields = { title, amount, date, description };

  try {
    let income = await Income.findById(req.params.id);
    if (!income) return res.status(404).json({ msg: 'Income not found' });

    // Make sure user owns income
    if (income.user!== req.user.id) {
      return res.status(401).json({ msg: 'User not authorized' });
    }

    income = await Income.findByIdAndUpdate(
      req.params.id,
      { $set: incomeFields },
      { new: true }
    );

    res.json(income);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};

export const deleteIncome = async (req, res) => {
  try {
    const income = await Income.findById(req.params.id);
    if (!income) return res.status(404).json({ msg: 'Income not found' });

    // Make sure user owns income
    if (income.user!== req.user.id) {
      return res.status(401).json({ msg: 'User not authorized' });
    }

    await Income.findByIdAndDelete(req.params.id);

    res.json({ msg: 'Income removed' });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};
