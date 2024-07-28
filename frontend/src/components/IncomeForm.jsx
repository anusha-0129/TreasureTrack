import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addIncome, fetchIncomes, deleteIncome, editIncome } from './actions/incomeAction';
import { FaEdit, FaTrashAlt } from 'react-icons/fa';
import { motion } from 'framer-motion';
import '../components/Form.css';

const IncomeForm = () => {
  const [title, setTitle] = useState('');
  const [amount, setAmount] = useState('');
  const [date, setDate] = useState('');
  const [description, setDescription] = useState('');
  const [editing, setEditing] = useState(false);
  const [currentIncomeId, setCurrentIncomeId] = useState(null);
  const [colorMap, setColorMap] = useState({});
  const dispatch = useDispatch();
  const incomes = useSelector(state => state.income.incomes);

  useEffect(() => {
    dispatch(fetchIncomes());
  }, [dispatch]);

  useEffect(() => {
    const generateColorMap = (incomes) => {
      const newColorMap = {};
      incomes.forEach(income => {
        if (!colorMap[income._id]) {
          newColorMap[income._id] = getRandomColor();
        } else {
          newColorMap[income._id] = colorMap[income._id];
        }
      });
      return newColorMap;
    };

    setColorMap(generateColorMap(incomes));
  }, [incomes]);

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
      dispatch(editIncome(currentIncomeId, { title, amount: parseFloat(amount), date, description }));
      setEditing(false);
      setCurrentIncomeId(null);
    } else {
      dispatch(addIncome({ title, amount: parseFloat(amount), date, description }));
    }
    setTitle('');
    setAmount('');
    setDate('');
    setDescription('');
  };

  const handleEdit = (income) => {
    setTitle(income.title);
    setAmount(income.amount);
    setDate(income.date.split('T')[0]);
    setDescription(income.description);
    setEditing(true);
    setCurrentIncomeId(income._id);
  };

  const handleDelete = (id) => {
    dispatch(deleteIncome(id));
  };

  return (
    <div className="container-fluid">
      <div className="form-container">
        <form className="income-form mx-auto" onSubmit={handleSubmit}>
          <h4 className="text-center">Income Form</h4>
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
            <textarea className="form-control" id="description" rows="1" value={description} onChange={(e) => setDescription(e.target.value)}></textarea>
          </div>
          <button type="submit" className="btn btn-primary mt-5">{editing ? 'Edit Income' : 'Add Income'}</button>
        </form>
      </div>
      <h3 >Income History</h3>
      <div className="expenses-container">
        {incomes.map(income => (
          <motion.div
            key={income._id}
            className="expense-box"
            style={{ backgroundColor: colorMap[income._id], color: "white" }}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            whileHover={{ scale: 1.05 }}
          >
            <h5>{income.title}</h5>
            <p><strong>Amount:</strong> {income.amount}</p>
            <p><strong>Date:</strong> {new Date(income.date).toLocaleDateString()}</p>
            {income.description && <p><strong>Description:</strong> {income.description}</p>}
            <div className="icon-container">
              <FaEdit className="edit-icon" onClick={() => handleEdit(income)} />
              <div className="icon-space"></div>
              <FaTrashAlt className="delete-icon" onClick={() => handleDelete(income._id)} />
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default IncomeForm;