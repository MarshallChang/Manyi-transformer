import { StoreType } from 'common';
import { app, ipcMain } from 'electron';
import Store from 'electron-store';

const store = new Store<StoreType>({
  defaults: {
    keepName: true,
    defaultDownloadPath: app.getPath('downloads'),
    textureSelectedIndex: 0,
    resolutionSelectedIndex: 0,
  },
});

ipcMain.on('electron-store-get', async (event, val) => {
  event.returnValue = store.get(val);
});
ipcMain.on('electron-store-set', async (event, key, val) => {
  store.set(key, val);
});
