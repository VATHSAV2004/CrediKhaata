import { useParams, Link } from 'react-router-dom';
import { useCustomers } from '../../context/CustomerContext';
import jsPDF from 'jspdf';
import './index.css';

const CustomerDetail = () => {
  const { id } = useParams();
  const { customers } = useCustomers();
  const customer = customers.find(c => c.id === id);

  const getRemaining = (loan) => {
    const paid = loan.repayments.reduce((a, r) => a + r.amount, 0);
    return loan.amount - paid;
  };

  const exportStatement = () => {
    if (!customer) return;

    const doc = new jsPDF();
    doc.setFont('helvetica', 'normal');  
    doc.setFontSize(16);
    doc.text(`Customer Statement: ${customer.name}`, 14, 20);

    let yOffset = 30; 
    const lineHeight = 10;
    const marginLeft = 14;

    doc.setFontSize(12);
    doc.text('#', marginLeft, yOffset);
    doc.text('Item / Repayment', marginLeft + 14, yOffset);
    doc.text('Amount', marginLeft + 120, yOffset);
    doc.text('Date / Due', marginLeft + 160, yOffset);
    doc.text('Paid', marginLeft + 200, yOffset);
    doc.text('Remaining', marginLeft + 230, yOffset);

    yOffset += lineHeight; 

    doc.setDrawColor(0, 0, 0); 
    doc.line(marginLeft, yOffset, 270, yOffset);
    yOffset += lineHeight;

    customer.loans.forEach((loan, index) => {
      const paid = loan.repayments.reduce((a, r) => a + r.amount, 0);
      const remaining = loan.amount - paid;

      doc.text(`${index + 1}`, marginLeft, yOffset);
      doc.text(loan.item, marginLeft + 14, yOffset);
      doc.text(`₹${loan.amount}`, marginLeft + 120, yOffset);
      doc.text(loan.dueDate, marginLeft + 160, yOffset);
      doc.text(`₹${paid}`, marginLeft + 200, yOffset);
      doc.text(`₹${remaining}`, marginLeft + 230, yOffset);

      yOffset += lineHeight; 
      doc.line(marginLeft, yOffset, 270, yOffset);

      yOffset += lineHeight; 

      loan.repayments.forEach((repay, i) => {
        doc.text('', marginLeft, yOffset); 
        doc.text(`Repayment ${i + 1}`, marginLeft + 14, yOffset); 
        doc.text(`₹${repay.amount}`, marginLeft + 120, yOffset);
        doc.text(repay.date, marginLeft + 160, yOffset);
        doc.text('', marginLeft + 200, yOffset); 
        doc.text('', marginLeft + 230, yOffset); 

        yOffset += lineHeight; 
      });
    });

    // Save the PDF
    doc.save(`${customer.name}_statement.pdf`);
  };

  if (!customer) return <div>Customer not found</div>;

  return (
    <div className="customer-detail-container">
      
      <div className="back-button-container">
        <Link to="/dashboard" className="back-button">
          &larr; Back to Dashboard
        </Link>
      </div>

      <h2 className="customer-detail-header">{customer.name}</h2>

      <div className="customer-actions">
        <Link to={`/add-loan/${customer.id}`} className="customer-action-link">
          <button className="customer-action-button">Add Loan</button>
        </Link>
        <Link to={`/repay/${customer.id}`} className="customer-action-link">
          <button className="customer-action-button">Record Repayment</button>
        </Link>
        <button className="customer-action-button" onClick={exportStatement}>Download Statement</button>
      </div>

      {customer.loans.map((loan, i) => (
        <div key={i} className={new Date(loan.dueDate) < new Date() ? 'loan overdue' : 'loan'}>
          <p><strong>Item:</strong> {loan.item}</p>
          <p><strong>Amount:</strong> ₹{loan.amount}</p>
          <p><strong>Due:</strong> {loan.dueDate}</p>
          <p><strong>Remaining:</strong> ₹{getRemaining(loan)}</p>
          <div><strong>Repayments:</strong>
            {loan.repayments.length > 0 ? (
              <ul>
                {loan.repayments.map((r, j) => (
                  <li key={j}>₹{r.amount} on {r.date}</li>
                ))}
              </ul>
            ) : (
              <p>No repayments</p>
            )}
          </div>
        </div>
      ))}
    </div>
  );
};

export default CustomerDetail;
