/* eslint-disable react/jsx-props-no-spreading */
import { Accept, useDropzone } from 'react-dropzone';

export type DropzonePropsType = {
  accept: Accept | undefined;
  acceptDesc: string;
  multiple?: boolean;
  noClick?: boolean;
  onDrop: (acceptedFiles: any[]) => void;
};

export default function Dropzone({
  accept,
  acceptDesc,
  multiple,
  noClick,
  onDrop,
}: DropzonePropsType) {
  const { getRootProps } = useDropzone({
    accept,
    multiple,
    noClick,
    onDrop: (acceptedFiles) => {
      onDrop(acceptedFiles);
    },
  });

  return (
    <div
      className="flex items-center justify-center w-full h-full"
      {...getRootProps()}
    >
      <label
        htmlFor="dropzone-file"
        className="flex flex-col items-center justify-center w-full h-full border-2 transition-all duration-300 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-gray-300 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600"
      >
        <div className="flex flex-col items-center justify-center pt-5 pb-6">
          <p className="mb-2 text-sm text-gray-500 dark:text-gray-400 font-semibold">
            Click<span className="font-normal"> or </span>
            {`Drag 'n' Drop`}
          </p>
          <p className="text-xs text-gray-500 dark:text-gray-400">
            {acceptDesc}
          </p>
        </div>
      </label>
    </div>
  );
}

Dropzone.defaultProps = {
  multiple: true,
  noClick: false,
};
