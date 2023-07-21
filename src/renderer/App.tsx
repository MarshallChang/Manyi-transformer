import './App.css';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import Routes from './routes';
import Theme from './theme/ThemeProvider';

export default function App() {
  return (
    <DndProvider backend={HTML5Backend}>
      <Theme>
        <Routes />
      </Theme>
    </DndProvider>
  );
}
