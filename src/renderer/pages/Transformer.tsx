import { useEffect, useState } from 'react';
import Dropzone from 'renderer/components/Dropzone';
import SelectComponent from 'renderer/components/Select';
import FileList from 'renderer/components/FileList/FileList';
import { getCompressionRadio } from 'renderer/utils';
import { ChoosedFile, LoadingStatus, Option } from 'common';
import FolderSelector from 'renderer/components/FolderSelector';
import Switcher from 'renderer/components/Switcher';

const textureOptions: Option[] = [
  { id: 1, name: 'webp', value: 'webp' },
  { id: 2, name: 'png', value: 'png' },
  { id: 3, name: 'jpeg', value: 'jpeg' },
];

const resolutionOptions: Option[] = [
  { id: 1, name: '1024', value: 1024 },
  { id: 2, name: '2048', value: 2048 },
  { id: 3, name: '4096', value: 4096 },
];

export default function Transformer() {
  const [textureSelected, setTextureSelected] = useState<Option>(
    textureOptions[window.electron.store.get('textureSelectedIndex') || 0]
  );
  const [resolutionSelected, setResolutionSelected] = useState<Option>(
    resolutionOptions[window.electron.store.get('resolutionSelectedIndex') || 0]
  );
  const [choosedFiles, setChoosedFiles] = useState<ChoosedFile[]>([]);
  const [disableTransform, setDisableTransform] = useState(true);
  const [startTransformAll, setStartTransformAll] = useState(false);
  const [savePath, setSavePath] = useState<string>(
    window.electron.store.get('defaultDownloadPath') as string
  );
  const [keepName, setKeepName] = useState<boolean>(
    window.electron.store.get('keepName') as boolean
  );

  useEffect(() => {
    if (choosedFiles && choosedFiles.length > 0) {
      setDisableTransform(false);
    } else {
      setDisableTransform(true);
    }
  }, [choosedFiles]);

  const onDrop = (acceptedFiles: File[]) => {
    const acceptedFilesFormat: ChoosedFile[] = acceptedFiles.map((file) => {
      return {
        file,
        afterSize: 0,
        compressionRadio: '',
        loading: LoadingStatus.WAITING,
      };
    });
    setChoosedFiles(acceptedFilesFormat);
  };

  const reset = () => {
    setChoosedFiles([]);
  };

  const removeFile = (index: number) => {
    const files = Array.from(choosedFiles);
    files.splice(index, 1);

    setChoosedFiles(files);
  };

  const transform = async () => {
    setStartTransformAll(true);
    window.electron.store.set(
      'textureSelectedIndex',
      textureOptions.findIndex((t) => t.id === textureSelected.id)
    );
    window.electron.store.set(
      'resolutionSelectedIndex',
      resolutionOptions.findIndex((r) => r.id === resolutionSelected.id)
    );
    const files = Array.from(choosedFiles);
    // eslint-disable-next-line no-plusplus
    for (let i = 0; i < files.length; i++) {
      const choosedFile = files[i];
      choosedFile.loading = LoadingStatus.LOADING;
      setChoosedFiles((choosedFiles) => {
        const prev = Array.from(choosedFiles);
        prev.splice(i, 1, choosedFile);

        return prev;
      });
      // eslint-disable-next-line no-await-in-loop
      const afterFileSize = await window.electron.ipcRenderer.invoke(
        'transform',
        {
          config: {
            targetFormat: textureSelected.value,
            resolution: resolutionSelected.value,
            showItemInFolder: i === files.length - 1,
            keepName,
          },
          filePath: choosedFile.file.path,
        }
      );
      choosedFile.afterSize = afterFileSize;
      choosedFile.compressionRadio = getCompressionRadio(
        choosedFile.file.size,
        afterFileSize
      );
      choosedFile.loading = LoadingStatus.FINISH;
      setChoosedFiles((choosedFiles) => {
        const prev = Array.from(choosedFiles);
        prev.splice(i, 1, choosedFile);
        return prev;
      });
    }
    setStartTransformAll(false);
  };

  const selectPath = (value: string) => {
    window.electron.store.set('defaultDownloadPath', value);
    setSavePath(value);
  };

  const hanleKeepName = (value: boolean) => {
    window.electron.store.set('keepName', value);
    setKeepName(value);
  };

  return (
    <div className="w-full h-full flex items-center ">
      <div className="flex h-full flex-col px-6 py-12 lg:px-8 w-96 flex-shrink-0">
        <div className="w-full h-36">
          <Dropzone
            accept={{
              'model/gltf-binary': ['.glb'],
              'model/gltf+json': ['.gltf'],
            }}
            acceptDesc="Accept .glb/.gltf files/folder"
            onDrop={onDrop}
          />
        </div>
        <div className="mt-4">
          <SelectComponent
            label="Texture Type"
            options={textureOptions}
            value={textureSelected}
            onChange={setTextureSelected}
          />
        </div>
        <div className="mt-4">
          <SelectComponent
            label="Resolution"
            options={resolutionOptions}
            value={resolutionSelected}
            onChange={setResolutionSelected}
          />
        </div>
        <div className="mt-4">
          <FolderSelector
            label="Output Path"
            value={savePath}
            onChange={selectPath}
          />
        </div>
        <div className="my-4">
          <Switcher
            label="Keep File Name"
            value={keepName}
            onChange={hanleKeepName}
          />
        </div>
        <div className="mt-6 sm:mx-auto sm:w-full sm:max-w-sm">
          <div>
            <button
              type="button"
              className="flex w-full justify-center rounded-md transition-all duration-500 bg-gradient-to-r from-emerald-400 via-purple-500 to-cyan-400 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm bg-size-200 bg-pos-0 hover:bg-pos-100 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-stone-300 disabled:from-slate-500 disabled:via-slate-500 disabled:to-slate-500 uppercase"
              disabled={disableTransform}
              onClick={transform}
            >
              Transform
            </button>
          </div>
        </div>
        {choosedFiles && choosedFiles.length > 0 && (
          <div className="mt-5 sm:mx-auto sm:w-full sm:max-w-sm">
            <div>
              <button
                type="button"
                className="flex w-full justify-center rounded-md transition-all duration-500 bg-gradient-to-r from-stone-500 via-slate-400 to-stone-700 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm bg-size-200 bg-pos-0 hover:bg-pos-100 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-stone-300 disabled:bg-slate-500 uppercase"
                disabled={disableTransform}
                onClick={reset}
              >
                Clear All
              </button>
            </div>
          </div>
        )}
      </div>
      <div className="h-full flex-1 py-12 px-6">
        {choosedFiles && choosedFiles.length > 0 && (
          <div className="w-full h-full">
            <FileList
              list={choosedFiles}
              showDelete={!startTransformAll}
              deleteFile={removeFile}
            />
          </div>
        )}
      </div>
    </div>
  );
}
