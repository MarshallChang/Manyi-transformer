import React, { useState } from 'react';

export default function Theme({ children }: any) {
  const [shouldUseDarkColors, setShouldUseDarkColors] =
    useState<boolean>(false);

  window.electron.ipcRenderer.on('changeTheme', (e) => {
    setShouldUseDarkColors(e as boolean);
  });

  return (
    <div className={`${shouldUseDarkColors ? 'dark' : ''}`}>{children}</div>
  );
}
