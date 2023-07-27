import React from 'react';
import { Outlet } from 'react-router-dom';
import Menu from 'renderer/components/Menu';

export default function Layout() {
  return (
    <div className="w-full h-full flex">
      <Menu />
      <Outlet />
    </div>
  );
}
