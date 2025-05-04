import { Link } from 'react-router-dom';

const Navbar = () => (
  <nav className="navbar">
    <Link to="/">Dashboard</Link>
    <Link to="/login">Login</Link>
  </nav>
);

export default Navbar;