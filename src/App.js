import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Auth from './components/Auth';
import Dashboard from './components/Dashboard';
import CustomerDetail from './components/CustomerDetail';
import { AuthProvider } from './context/AuthContext';
import AddCustomer from './components/Forms/AddCustomer';
import AddLoan from './components/Forms/AddLoan';
import RecordRepayment from './components/Forms/RecordRepayment';
import { CustomerProvider } from './context/CustomerContext'; 


import './App.css';

function App() {
  return (
    <AuthProvider>
      <CustomerProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Auth />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/customer/:id" element={<CustomerDetail />} />

          <Route path="/add-customer" element={<AddCustomer />} />
  <Route path="/add-loan/:id" element={<AddLoan />} />
  <Route path="/repay/:id" element={<RecordRepayment />} />
        </Routes>
      </Router>
      </CustomerProvider>
    </AuthProvider>
  );
}

export default App;
