import jsPDF from 'jspdf';

export const exportStatement = (customer) => {
  const doc = new jsPDF();
  doc.text(`Customer: ${customer.name}`, 10, 10);
  customer.loans.forEach((loan, i) => {
    doc.text(`Loan #${i + 1}: Item - ${loan.item}, Amount - ₹${loan.amount}, Due - ${loan.dueDate}`, 10, 20 + i * 10);
  });
  doc.save(`${customer.name}_statement.pdf`);
};
