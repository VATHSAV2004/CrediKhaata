import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useCustomers } from '../../context/CustomerContext'; 
import './RecordRepayment.css'; 

const RecordRepayment = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { customers, addRepayment } = useCustomers(); 
  const [amount, setAmount] = useState('');
  const [date, setDate] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!amount || !date) return alert('All fields are required.');

    const repayment = {
      amount: parseFloat(amount),
      date,
    };

    const customer = customers.find((c) => c.id === id);
    if (!customer) return alert('Customer not found');

    const loanIndex = 0; 

    addRepayment(id, loanIndex, repayment);

    alert(`Repayment of ₹${amount} recorded for customer ID ${id}.`);
    navigate(`/customer/${id}`);
  };

  return (
    <div className="record-repayment-container">
      <button className="back-button" onClick={() => navigate(`/customer/${id}`)}>Back to Customer</button>
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
    </div>
  );
};

export default RecordRepayment;
