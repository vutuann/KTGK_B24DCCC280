import { NavLink, Link } from 'react-router-dom';

const Navbar: React.FC = () => {
  return (
    <nav className="navbar">
      <div className="container">
        <Link to="/" className="logo">BlogHub</Link>
        <div className="nav-links">
          <NavLink
            to="/"
            className={({ isActive }) => isActive ? 'active' : ''}
          >
            Trang chủ
          </NavLink>
          <Link to="/create" className="btn-primary">
            Viết bài mới
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;