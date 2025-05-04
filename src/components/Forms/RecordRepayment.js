import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useCustomers } from '../../context/CustomerContext'; // Import the context
import './index.css';

const RecordRepayment = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { customers, addRepayment } = useCustomers(); // Get the customers data and addRepayment function
  const [amount, setAmount] = useState('');
  const [date, setDate] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!amount || !date) return alert('All fields are required.');

    const repayment = {
      amount: parseFloat(amount),
      date,
    };

    // Find the customer and their loans
    const customer = customers.find((c) => c.id === id);
    if (!customer) return alert('Customer not found');

    // Assume we're adding repayment to the first loan (can be extended for multiple loans)
    const loanIndex = 0; // You can modify this if you're dealing with multiple loans

    // Call addRepayment to update the repayment array for the loan
    addRepayment(id, loanIndex, repayment);

    alert(`Repayment of ₹${amount} recorded for customer ID ${id}.`);
    navigate(`/customer/${id}`);
  };

  return (
    <form className="form" onSubmit={handleSubmit}>
      <h2>Record Repayment</h2>
      <input
        type="number"
        placeholder="Amount"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
      />
      <input
        type="date"
        value={date}
        onChange={(e) => setDate(e.target.value)}
      />
      <button type="submit">Record Repayment</button>
    </form>
  );
};

export default RecordRepayment;
