import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Home from './pages/Home';
import About from './pages/About';
import Platforms from './pages/Platforms';
import Commands from './pages/Commands';
import './App.css';

export default function App() {
  return (
    <Router>
      <div className="App">
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/platforms" element={<Platforms />} />
          <Route path="/platforms/:platformId/commands" element={<Commands />} />
        </Routes>
      </div>
    </Router>
  );
};