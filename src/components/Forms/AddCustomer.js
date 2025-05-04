import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCustomers } from '../../context/CustomerContext';
import './index.css';

const AddCustomer = () => {
  const [name, setName] = useState('');
  const { addCustomer } = useCustomers(); // Get the addCustomer function from context
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name.trim()) return alert('Customer name is required.');

    const newCustomer = {
      id: Date.now().toString(), // Unique ID for the customer
      name,
      loans: [], // Start with an empty array of loans
    };

    addCustomer(newCustomer); // Call addCustomer from the context to update the state
    alert(`Customer "${name}" added.`);

    navigate('/dashboard'); // Navigate back to dashboard after adding the customer
  };

  return (
    <form className="form" onSubmit={handleSubmit}>
      <h2>Add New Customer</h2>
      <input
        type="text"
        placeholder="Customer Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <button type="submit">Add Customer</button>
    </form>
  );
};

export default AddCustomer;
