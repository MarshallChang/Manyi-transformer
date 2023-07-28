import { NavLink } from 'react-router-dom';
import ROUTES from 'renderer/routes/routes';

export default function Menu() {
  return (
    <div className="h-full w-16 bg-menu-bg dark:bg-menu-dark-bg dark:shadow-gray-500 bg-opacity-25 backdrop-blur-sm shadow-white shadow-xl flex flex-col items-center">
      {ROUTES.map((route) => {
        return (
          <NavLink key={route.name} to={route.path}>
            {({ isActive }) => (
              <div
                className={`w-16 h-16 transition-all flex flex-col items-center justify-center hover:shadow-inner hover:shadow-slate-400 dark:hover:shadow-slate-200 ${
                  isActive
                    ? 'text-white shadow-inner shadow-slate-400 dark:shadow-slate-200'
                    : ''
                }`}
              >
                {route.icon('w-6 h-6')}
              </div>
            )}
          </NavLink>
        );
      })}
    </div>
  );
}
