import { Route, Routes, Link } from 'react-router-dom';

import Home from './../views/Home';
import About from './../views/About';
import Houses from './../views/Houses';

export default function Navbar() {
  return (
    <div>
      <nav>
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/about">About</Link>
          </li>
          <li>
            <Link to="/houses">Houses</Link>
          </li>
        </ul>
      </nav>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/houses" element={<Houses />} />
      </Routes>
    </div>
  );
}
