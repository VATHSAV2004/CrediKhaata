import { Link } from 'react-router-dom';
import './index.css';
import { useCustomers } from '../../context/CustomerContext';


const Dashboard = () => {
  const { customers } = useCustomers();
  const getBalance = (loans) =>
    loans.reduce((acc, loan) => acc + loan.amount - loan.repayments.reduce((a, r) => a + r.amount, 0), 0);

  const isOverdue = (dueDate) => new Date(dueDate) < new Date();

  return (
    <div className="dashboard">
      <h2>Customers</h2><Link to="/add-customer">
      <button>Add Customer</button>
            </Link>
      
      <ul>
        {customers.map(c => {
          const balance = getBalance(c.loans);
          const nextDue = c.loans[0]?.dueDate || '-';
          const overdue = isOverdue(nextDue);

          return (
            <>
            <li key={c.id} className={overdue ? 'overdue' : ''}>
              <Link to={`/customer/${c.id}`}>{c.name}</Link>
              <div>Balance: ₹{balance}</div>
              <div>Due: {nextDue}</div>
              <div>Status: {overdue ? 'Overdue' : 'Up-to-date'}</div>
            </li>
            </>
          );
        })}
      </ul>
    </div>
  );
};

export default Dashboard;
