import { ipcMain, shell } from 'electron';
import path from 'path';
import Store from 'electron-store';
import transform from '../gltf_transform/transform';

ipcMain.handle('transform', async (event, arg) => {
  const {
    filePath,
    config: { targetFormat, resolution, showItemInFolder, keepName },
  } = arg;
  const { name, ext } = path.parse(filePath);
  const dir = new Store().get('defaultDownloadPath') as string;

  let transformOut = `${name}${ext}`;

  if (!keepName) {
    transformOut = `${name}-${(
      targetFormat as string
    ).toUpperCase()}-${resolution}${ext}`;
  }

  const transformOutFile = path.join(dir, transformOut);
  const afterFileSize = await transform(filePath, transformOutFile, {
    resolution,
    targetFormat,
  });

  if (showItemInFolder) {
    shell.showItemInFolder(transformOutFile);
  }

  return afterFileSize;
});
