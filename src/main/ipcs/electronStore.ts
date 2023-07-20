import { app, ipcMain } from 'electron';
import Store from 'electron-store';

const store = new Store();

const defaultDownloadPath = store.get('defaultDownloadPath');

if (!defaultDownloadPath) {
  store.set('defaultDownloadPath', app.getPath('downloads'));
}

const keepName = store.get('keepName');
if (keepName === undefined) {
  store.set('keepName', false);
}

ipcMain.on('electron-store-get', async (event, val) => {
  event.returnValue = store.get(val);
});
ipcMain.on('electron-store-set', async (event, key, val) => {
  store.set(key, val);
});
