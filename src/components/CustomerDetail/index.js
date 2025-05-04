import { useParams, Link } from 'react-router-dom';
import { useCustomers } from '../../context/CustomerContext';
import './index.css';

const CustomerDetail = () => {
  const { id } = useParams(); // ✅ Only declare once
  const { customers } = useCustomers(); // ✅ Inside component
  const customer = customers.find(c => c.id === id); // ✅ Inside component

  const getRemaining = (loan) => {
    const paid = loan.repayments.reduce((a, r) => a + r.amount, 0);
    return loan.amount - paid;
  };

  if (!customer) {
    return <div>Customer not found</div>;
  }

  return (
    <div className="customer-detail">
      <h2>{customer.name}</h2>
      
      <div className="actions">
        <Link to={`/add-loan/${customer.id}`}>
          <button>Add Loan</button>
        </Link>
        <Link to={`/repay/${customer.id}`}>
          <button>Record Repayment</button>
        </Link>
      </div>

      {customer.loans.map((loan, i) => (
        <div key={i} className={new Date(loan.dueDate) < new Date() ? 'loan overdue' : 'loan'}>
          <p><strong>Item:</strong> {loan.item}</p>
          <p><strong>Amount:</strong> ₹{loan.amount}</p>
          <p><strong>Due:</strong> {loan.dueDate}</p>
          <p><strong>Remaining:</strong> ₹{getRemaining(loan)}</p>
          <div><strong>Repayments:</strong>
            <ul>
              {loan.repayments.map((r, j) => <li key={j}>{r.amount} on {r.date}</li>)}
            </ul>
          </div>
        </div>
      ))}
    </div>
  );
};

export default CustomerDetail;
