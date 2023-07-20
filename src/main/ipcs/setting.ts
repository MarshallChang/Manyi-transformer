import { dialog, ipcMain } from 'electron';

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
