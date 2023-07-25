import React, { useState } from 'react';

export default function ThemeProvider({ children }: any) {
  const [shouldUseDarkColors, setShouldUseDarkColors] =
    useState<boolean>(false);

  window.electron.ipcRenderer.on('changeTheme', (e) => {
    setShouldUseDarkColors(e as boolean);
  });

  return (
    <div className={`w-full h-full ${shouldUseDarkColors ? 'dark' : ''}`}>
      {children}
    </div>
  );
}
