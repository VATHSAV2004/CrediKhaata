import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useCustomers } from '../../context/CustomerContext'; // Import the context
import './index.css';

const AddLoan = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { customers, addLoan } = useCustomers(); // Get the customers data and addLoan function
  const [item, setItem] = useState('');
  const [amount, setAmount] = useState('');
  const [dueDate, setDueDate] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!item || !amount || !dueDate) return alert('All fields are required.');

    const newLoan = {
      item,
      amount: parseFloat(amount),
      dueDate,
      repayments: [],
    };

    // Call addLoan from context to add the loan to the customer's loans array
    addLoan(id, newLoan);
    alert(`Loan for "${item}" added for customer ID ${id}.`);
    navigate(`/customer/${id}`);
  };

  return (
    <form className="form" onSubmit={handleSubmit}>
      <h2>Add Loan</h2>
      <input
        type="text"
        placeholder="Item"
        value={item}
        onChange={(e) => setItem(e.target.value)}
      />
      <input
        type="number"
        placeholder="Amount"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
      />
      <input
        type="date"
        value={dueDate}
        onChange={(e) => setDueDate(e.target.value)}
      />
      <button type="submit">Add Loan</button>
    </form>
  );
};

export default AddLoan;
