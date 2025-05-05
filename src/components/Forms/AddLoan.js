import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useCustomers } from '../../context/CustomerContext'; 
import './AddLoan.css'; 

const AddLoan = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { customers, addLoan } = useCustomers(); 
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

    addLoan(id, newLoan);
    alert(`Loan for "${item}" added for customer ID ${id}.`);
    navigate(`/customer/${id}`);
  };

  return (
    <div className="add-loan-container">
      <button className="back-button" onClick={() => navigate(`/customer/${id}`)}>Back to Customer</button>
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
    </div>
  );
};

export default AddLoan;
