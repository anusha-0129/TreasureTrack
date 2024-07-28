import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchExpenses } from './actions/expenseAction';
import { fetchIncomes } from './actions/incomeAction';
import { Pie } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend
} from 'chart.js';
import Chart from 'react-apexcharts';
import './Dashboard.css';

ChartJS.register(ArcElement, Tooltip, Legend);

const Dashboard = () => {
  const dispatch = useDispatch();
  const expenses = useSelector(state => state.expense.expenses);
  const incomes = useSelector(state => state.income.incomes);

  useEffect(() => {
    dispatch(fetchExpenses());
    dispatch(fetchIncomes());
  }, [dispatch]);

  const totalExpenses = expenses.reduce((acc, expense) => acc + expense.amount, 0);
  const totalIncomes = incomes.reduce((acc, income) => acc + income.amount, 0);

  const expenseData = {
    series: [{
      name: 'Expenses',
      data: expenses.map(e => e.amount)
    }],
    options: {
      chart: {
        type: 'area',
        height: '300', 
        toolbar: {
          show: false
        }
      },
      xaxis: {
        categories: expenses.map(e => new Date(e.date).toLocaleDateString())
      }
    }
  };

  const incomeData = {
    series: [{
      name: 'Incomes',
      data: incomes.map(i => i.amount)
    }],
    options: {
      chart: {
        type: 'area',
        height: '300', 
        toolbar: {
          show: false
        }
      },
      xaxis: {
        categories: incomes.map(i => new Date(i.date).toLocaleDateString())
      }
    }
  };

  const pieChartData = {
    labels: ['Expenses', 'Incomes'],
    datasets: [{
      data: [totalExpenses, totalIncomes],
      backgroundColor: ['#FF6384', '#36A2EB'],
      hoverBackgroundColor: ['#FF6384', '#36A2EB']
    }]
  };

  return (
    <div className="dashboard-container">
      <div className="top-boxes">
        <div className="box1">
          <h3>Expenses</h3>
          <p>Total: {totalExpenses}</p>
        </div>
        <div className="box2">
          <h3>Incomes</h3>
          <p>Total: {totalIncomes}</p>
        </div>
      </div>

      <div className="chart-section">
        <div className="chart-container">
          <Chart options={expenseData.options} series={expenseData.series} type="area" height={300} />
          <h3>Expenses Trends</h3>
        </div>

        <div className="chart-container">
          <Chart options={incomeData.options} series={incomeData.series} type="area" height={300} />
          <h3>Incomes Trends</h3>
        </div>
      </div>

      <h3 style={{ textAlign: "center", marginBottom: '20px' }}>Expenses vs Incomes</h3>
      <div className="pie-chart">
        <Pie data={pieChartData} options={{ responsive: true }} />
      </div>

      <div className="table-container">
        <h3>Recent Transactions</h3>
        <table className="table table-hover">
          <thead>
            <tr>
              <th>Type</th>
              <th>Title</th>
              <th>Amount</th>
              <th>Date</th>
            </tr>
          </thead>
          <tbody>
          {[...expenses.map(expense => ({ ...expense, type: 'Expense' })), ...incomes.map(income => ({ ...income, type: 'Income' }))].sort((a, b) => new Date(b.date) - new Date(a.date)).slice(0, 10).map(transaction => (
              <tr key={transaction._id}>
                <td>{transaction.type}</td>
                <td>{transaction.title}</td>
                <td>{transaction.amount}</td>
                <td>{new Date(transaction.date).toLocaleDateString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Dashboard;
