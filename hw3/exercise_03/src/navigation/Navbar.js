import { Route, Routes, Link } from 'react-router-dom';

import Home from './../views/Home';
import Search from './../views/Search';
import Houses from './../views/Houses';

export default function Navbar() {
  return (
    <div className="Navbar">
      <nav className="navbar bg-light">
        <ul className="navbar">
          <li className="nav-link">
            <Link to="/">Home</Link>
          </li>
          <li className="nav-link">
            <Link to="/search">Search</Link>
          </li>
          <li className="nav-link">
            <Link to="/houses">Houses</Link>
          </li>
        </ul>
      </nav>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/search" element={<Search />} />
        <Route path="/houses" element={<Houses />} />
      </Routes>
    </div>
  );
}
