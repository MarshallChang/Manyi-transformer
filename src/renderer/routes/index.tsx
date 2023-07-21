import { MemoryRouter as Router, Routes, Route } from 'react-router-dom';
import Transformer from '../pages/Transformer';

export default function MyRoutes() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Transformer />} />
      </Routes>
    </Router>
  );
}
