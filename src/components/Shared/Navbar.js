import { Link } from 'react-router-dom';

const Navbar = () => (
  <nav className="navbar">
    <Link to="/dashboard">Dashboard</Link>
    <Link to="/">Login</Link>
  </nav>
);

export default Navbar;