import React, { useEffect, useState } from 'react';
import SettingsModal from 'renderer/components/SettingsModal/SettingsModal';
import { useStore } from 'renderer/store/StoreProvider';

export default function ThemeProvider({ children }: any) {
  const [shouldUseDarkColors, setShouldUseDarkColors] =
    useState<boolean>(false);
  const { appearanceSelected } = useStore();

  const updateAppearance = (dark: boolean) => {
    setShouldUseDarkColors(dark);
    if (dark as boolean) {
      document.body.classList.add('dark');
    } else {
      document.body.classList.remove('dark');
    }
  };

  window.electron.ipcRenderer.on('changeTheme', (e) => {
    if (appearanceSelected === 'System') {
      updateAppearance(e as boolean);
    }
  });

  useEffect(() => {
    if (appearanceSelected !== 'System') {
      window.electron.ipcRenderer.invoke(
        appearanceSelected === 'Dark' ? 'dark-mode:dark' : 'dark-mode:light'
      );
      updateAppearance(appearanceSelected === 'Dark');
    } else {
      const getShouldUseDarkMode = async () => {
        const should = (await window.electron.ipcRenderer.invoke(
          'dark-mode:system'
        )) as boolean;
        updateAppearance(should);
      };

      getShouldUseDarkMode();
    }
  }, [appearanceSelected]);

  return (
    <div className={`w-full h-full ${shouldUseDarkColors ? 'dark' : ''}`}>
      {children}
      <SettingsModal />
    </div>
  );
}
