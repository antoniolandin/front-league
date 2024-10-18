import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import Home from '../pages/Home';      // Importamos cada página
import Ranking from '../pages/Ranking';
import Team from '../pages/Team';

function Navbar() {
  return (
    <Router>
      <div styles={styles.menu}>
        {/* Menú de navegación */}
        <nav>
          <ul>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/about">About</Link>
            </li>
            <li>
              <Link to="/contact">Contact</Link>
            </li>
          </ul>
        </nav>

        {/* Definición de rutas */}
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<Ranking />} />
          <Route path="/contact" element={<Team />} />
        </Routes>
      </div>
    </Router>
  );
}

const styles = StyleSheet.create({
    menu:{
        display:flex,
        


    },
})

export default Navbar;