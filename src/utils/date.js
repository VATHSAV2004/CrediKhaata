export const getNextDueDate = (loans) => {
    if (!loans.length) return '-';
    const dates = loans.map(l => new Date(l.dueDate)).sort((a, b) => a - b);
    return dates[0].toISOString().slice(0, 10);
  };
  
  export const getCustomerStatus = (loans) => {
    return loans.some(l => new Date(l.dueDate) < new Date() && (l.amount - l.repayments.reduce((a, r) => a + r.amount, 0) > 0)) ? 'Overdue' : 'Up-to-date';
  };
  