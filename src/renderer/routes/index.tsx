import { MemoryRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from 'renderer/layout';
import ROUTES from './routes';

export default function MyRoutes() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Layout />}>
          {ROUTES.map((route) => (
            <Route key={route.path} path={route.path} element={route.element} />
          ))}
        </Route>
      </Routes>
    </Router>
  );
}
