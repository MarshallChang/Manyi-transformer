import { MemoryRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import Transformer from './pages/Transformer';

export default function App() {
  return (
    <DndProvider backend={HTML5Backend}>
      <Router>
        <Routes>
          <Route path="/" element={<Transformer />} />
        </Routes>
      </Router>
    </DndProvider>
  );
}
