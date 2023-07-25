import './App.css';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import Routes from './routes';
import ThemeProvider from './theme/ThemeProvider';
import StoreProvider from './store/StoreProvider';

export default function App() {
  return (
    <StoreProvider>
      <ThemeProvider>
        <DndProvider backend={HTML5Backend}>
          <Routes />
        </DndProvider>
      </ThemeProvider>
    </StoreProvider>
  );
}
