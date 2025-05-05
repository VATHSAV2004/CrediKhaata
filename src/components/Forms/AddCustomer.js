import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCustomers } from '../../context/CustomerContext';
import './AddCustomer.css'; 

const AddCustomer = () => {
  const [name, setName] = useState('');
  const { addCustomer } = useCustomers(); 
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name.trim()) return alert('Customer name is required.');

    const newCustomer = {
      id: Date.now().toString(), 
      name,
      loans: [], 
    };

    addCustomer(newCustomer); 
    alert(`Customer "${name}" added.`);

    navigate('/dashboard'); 
  };

  return (
    <div className="add-customer-container">
      <button className="back-button" onClick={() => navigate('/dashboard')}>Back to Dashboard</button>
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
    </div>
  );
};

export default AddCustomer;
