/* eslint-disable react/jsx-props-no-spreading */
import { memo } from 'react';
import { useDropzone } from 'react-dropzone';
import SceneResult from 'renderer/components/SceneResult';
import { useStore } from 'renderer/store/StoreProvider';
import arrayBufferToString from 'renderer/utils/arrayBufferToString';

function DropzoneLabel({ isDragActive }: { isDragActive: boolean }) {
  return (
    <div className="w-96 h-36">
      <label
        htmlFor="dropzone-file"
        className={`flex flex-col items-center justify-center w-full h-full border-2 transition-all duration-300 border-dashed rounded-lg cursor-pointer bg-gray-50 border-gray-300 ${
          isDragActive &&
          'bg-gray-300 dark:bg-gray-600 border-gray-300 dark:border-gray-500'
        } hover:bg-gray-300 dark:bg-gray-700 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600`}
      >
        <div className="flex flex-col items-center justify-center pt-5 pb-6">
          <p className="mb-2 text-sm text-gray-500 dark:text-gray-400 font-semibold">
            Click<span className="font-normal"> or </span>
            {`Drag 'n' Drop`}
          </p>
          <p className="text-xs text-gray-500 dark:text-gray-400">
            Accept single file of .glb/.gltf
          </p>
          <p className="text-xs text-gray-500 dark:text-gray-400">
            you can also drop file here while the scene is shown
          </p>
        </div>
      </label>
    </div>
  );
}

function Viewer() {
  const {
    fileArrayBuffer,
    setFileArrayBuffer,
    setFilename,
    setTextOriginalFile,
    gltfObj,
  } = useStore();

  const onDrop = (acceptedFiles: File[]) => {
    acceptedFiles.forEach((file) => {
      const reader = new FileReader();
      reader.onload = async () => {
        const data = reader.result as ArrayBuffer;
        setFileArrayBuffer(data);
        setFilename(file.name);
        arrayBufferToString(data, (a) => setTextOriginalFile(a));
      };
      reader.readAsArrayBuffer(file);
    });
  };

  const { getRootProps, isDragActive } = useDropzone({
    accept: {
      'model/gltf-binary': ['.glb'],
      'model/gltf+json': ['.gltf'],
    },
    maxFiles: 1,
    noClick: !!gltfObj?.scene,
    onDrop: (acceptedFiles) => {
      onDrop(acceptedFiles);
    },
  });

  return (
    <div
      className="w-full h-full flex items-center justify-center"
      {...getRootProps()}
    >
      {fileArrayBuffer ? (
        <SceneResult />
      ) : (
        <DropzoneLabel isDragActive={isDragActive} />
      )}
    </div>
  );
}

export default memo(Viewer);
