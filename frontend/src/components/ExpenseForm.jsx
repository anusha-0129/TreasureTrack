import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addExpense, fetchExpenses, deleteExpense, editExpense } from './actions/expenseAction';
import { FaEdit, FaTrashAlt } from 'react-icons/fa';
import { motion } from 'framer-motion';
import '../components/Form.css';

const ExpenseForm = () => {
  const [title, setTitle] = useState('');
  const [amount, setAmount] = useState('');
  const [date, setDate] = useState('');
  const [description, setDescription] = useState('');
  const [editing, setEditing] = useState(false);
  const [currentExpenseId, setCurrentExpenseId] = useState(null);
  const [colorMap, setColorMap] = useState({});
  const dispatch = useDispatch();
  const expenses = useSelector(state => state.expense.expenses);

  useEffect(() => {
    dispatch(fetchExpenses());
  }, [dispatch]);

  useEffect(() => {
    const generateColorMap = (expenses) => {
      const newColorMap = {};
      expenses.forEach(expense => {
        if (!colorMap[expense._id]) {
          newColorMap[expense._id] = getRandomColor();
        } else {
          newColorMap[expense._id] = colorMap[expense._id];
        }
      });
      return newColorMap;
    };

    setColorMap(generateColorMap(expenses));
  }, [expenses]);

  const getRandomColor = () => {
    const letters = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (editing) {
      dispatch(editExpense(currentExpenseId, { title, amount: parseFloat(amount), date, description }));
      setEditing(false);
      setCurrentExpenseId(null);
    } else {
      dispatch(addExpense({ title, amount: parseFloat(amount), date, description }));
    }
    setTitle('');
    setAmount('');
    setDate('');
    setDescription('');
  };

  const handleEdit = (expense) => {
    setTitle(expense.title);
    setAmount(expense.amount);
    setDate(expense.date.split('T')[0]);
    setDescription(expense.description);
    setEditing(true);
    setCurrentExpenseId(expense._id);
  };

  const handleDelete = (id) => {
    dispatch(deleteExpense(id));
  };

  return (
    <div className="container-fluid">
      <div className="form-container">
        <form className="expense-form mx-auto" onSubmit={handleSubmit}>
          <h4 className="text-center">Expense Form</h4>
          <div className="mb-3 mt-5">
            <label htmlFor="title" className="form-label">Title</label>
            <input type="text" className="form-control" id="title" value={title} onChange={(e) => setTitle(e.target.value)} required />
          </div>
          <div className="mb-3">
            <label htmlFor="amount" className="form-label">Amount</label>
            <input type="number" className="form-control" id="amount" value={amount} onChange={(e) => setAmount(e.target.value)} required />
          </div>
          <div className="mb-3">
            <label htmlFor="date" className="form-label">Date</label>
            <input type="date" className="form-control" id="date" value={date} onChange={(e) => setDate(e.target.value)} required />
          </div>
          <div className="mb-3">
            <label htmlFor="description" className="form-label">Description</label>
            <textarea className="form-control" id="description" rows="2" value={description} onChange={(e) => setDescription(e.target.value)}></textarea>
          </div>
          <button type="submit" className="btn btn-primary mt-5">{editing ? 'Edit Expense' : 'Add Expense'}</button>
        </form>
      </div>
      <h3>Expense History</h3>
      <div className="expenses-container">
        
        {expenses.map(expense => (
          <motion.div
            key={expense._id}
            className="expense-box"
            style={{ backgroundColor: colorMap[expense._id], color: "white" }}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            whileHover={{ scale: 1.05 }}
          >
            <h5>{expense.title}</h5>
            <p><strong>Amount:</strong> {expense.amount}</p>
            <p><strong>Date:</strong> {new Date(expense.date).toLocaleDateString()}</p>
            {expense.description && <p><strong>Description:</strong> {expense.description}</p>}
            <div className="icon-container">
              <FaEdit className="edit-icon" onClick={() => handleEdit(expense)} />
              <FaTrashAlt className="delete-icon" onClick={() => handleDelete(expense._id)} />
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default ExpenseForm;
