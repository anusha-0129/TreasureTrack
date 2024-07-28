import React, { useState } from 'react';
import './Currency.css';
const Cur_URL = import.meta.env.VITE_CURRENCY_URL;
const CurrencyConverter = () => {
  const [amount, setAmount] = useState('');
  const [fromCurrency, setFromCurrency] = useState('USD');
  const [toCurrency, setToCurrency] = useState('EUR');
  const [result, setResult] = useState(null);
 
  const handleConvert = async () => {
    const response = await fetch(`${Cur_URL}/${fromCurrency}`);
    const data = await response.json();
    const rate = data.rates[toCurrency];
    setResult(amount * rate);
  };

  const currencyOptions = [
    { value: 'USD', label: 'USD - United States Dollar' },
    { value: 'EUR', label: 'EUR - Euro' },
    { value: 'GBP', label: 'GBP - British Pound' },
    { value: 'JPY', label: 'JPY - Japanese Yen' },
    { value: 'AUD', label: 'AUD - Australian Dollar' },
    { value: 'CAD', label: 'CAD - Canadian Dollar' },
    { value: 'CHF', label: 'CHF - Swiss Franc' },
    { value: 'CNY', label: 'CNY - Chinese Yuan' },
    { value: 'INR', label: 'INR - Indian Rupee' },
    { value: 'NZD', label: 'NZD - New Zealand Dollar' },
    { value: 'ZAR', label: 'ZAR - South African Rand' },
    { value: 'RUB', label: 'RUB - Russian Ruble' },
    { value: 'SGD', label: 'SGD - Singapore Dollar' },
    { value: 'HKD', label: 'HKD - Hong Kong Dollar' },
    { value: 'KRW', label: 'KRW - South Korean Won' },
  
    
  ];

  return (
    <div className="currency-converter">
      <h2>Currency Converter</h2>
      <input
        type="number"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
        placeholder="Amount"
      />
      <select
        value={fromCurrency}
        onChange={(e) => setFromCurrency(e.target.value)}
      >
        {currencyOptions.map(option => (
          <option key={option.value} value={option.value}>{option.label}</option>
        ))}
      </select>
      <select
        value={toCurrency}
        onChange={(e) => setToCurrency(e.target.value)}
      >
        {currencyOptions.map(option => (
          <option key={option.value} value={option.value}>{option.label}</option>
        ))}
      </select>
      <button onClick={handleConvert}>Convert</button>
      {result && <p>Converted Amount: {result}</p>}
    </div>
  );
};

export default CurrencyConverter;
