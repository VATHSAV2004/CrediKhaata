import { createContext, useContext, useState } from 'react';
import { customers as initialCustomers } from '../data/customers';

const CustomerContext = createContext();

export const CustomerProvider = ({ children }) => {
  const [customers, setCustomers] = useState(initialCustomers);

  const addCustomer = (newCustomer) => {
    setCustomers((prev) => [...prev, newCustomer]);
  };

  const addLoan = (customerId, newLoan) => {
    setCustomers((prev) =>
      prev.map((c) =>
        c.id === customerId ? { ...c, loans: [...c.loans, newLoan] } : c
      )
    );
  };

  const addRepayment = (customerId, loanIndex, repayment) => {
    setCustomers((prev) =>
      prev.map((c) => {
        if (c.id === customerId) {
          const updatedLoans = [...c.loans];
          updatedLoans[loanIndex].repayments.push(repayment);
          return { ...c, loans: updatedLoans };
        }
        return c;
      })
    );
  };

  return (
    <CustomerContext.Provider value={{ customers, addCustomer, addLoan, addRepayment }}>
      {children}
    </CustomerContext.Provider>
  );
};

export const useCustomers = () => useContext(CustomerContext);
