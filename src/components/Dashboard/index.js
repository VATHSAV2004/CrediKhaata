import { Link, useNavigate } from 'react-router-dom';
import './index.css';  
import { useCustomers } from '../../context/CustomerContext';

const Dashboard = () => {
  const { customers } = useCustomers();
  const navigate = useNavigate();

  const getBalance = (loans) =>
    loans.reduce((acc, loan) => acc + loan.amount - loan.repayments.reduce((a, r) => a + r.amount, 0), 0);

  const isOverdue = (dueDate) => new Date(dueDate) < new Date();

  const handleLogout = () => {
    
    alert("You have been logged out.");
    navigate('/');  
  };

  return (
    <div className="dashboard-container">
      <h2 className="dashboard-header">Customers</h2>
      
      <div className="dashboard-actions">
        <Link to="/add-customer" className="dashboard-action-link">
          <button className="dashboard-action-button">Add Customer</button>
        </Link>
        
        <button className="logout-button" onClick={handleLogout}>Logout</button>
      </div>

      <ul className="customer-list">
        {customers.map(c => {
          const balance = getBalance(c.loans);
          const nextDue = c.loans[0]?.dueDate || '-';
          const overdue = isOverdue(nextDue);

          return (
            <li key={c.id} className={`customer-item ${overdue ? 'overdue' : ''}`}>
              <Link to={`/customer/${c.id}`} className="customer-link">{c.name}</Link>
              <div className="customer-info">
                <div>Balance: ₹{balance}</div>
                <div>Due: {nextDue}</div>
                <div>Status: {overdue ? 'Overdue' : 'Up-to-date'}</div>
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default Dashboard;
