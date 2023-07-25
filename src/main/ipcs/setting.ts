import { dialog, ipcMain, nativeTheme } from 'electron';

ipcMain.handle('chooseFolder', async (event, arg) => {
  const { defaultPath } = arg;
  const savePath = dialog.showOpenDialogSync({
    defaultPath,
    properties: ['openDirectory', 'createDirectory'],
  });

  if (savePath && savePath.length > 0) {
    return savePath[0];
  }
  return defaultPath;
});

ipcMain.handle('dark-mode:light', () => {
  nativeTheme.themeSource = 'light';
});

ipcMain.handle('dark-mode:dark', () => {
  nativeTheme.themeSource = 'dark';
});

ipcMain.handle('dark-mode:system', () => {
  nativeTheme.themeSource = 'system';
  return nativeTheme.shouldUseDarkColors;
});
