import React from 'react';
import { formatBytesFileSizeToMB } from 'renderer/utils';
import { ChoosedFile, LoadingStatus } from 'common';
import { XMarkIcon } from '@heroicons/react/24/solid';

export type FileListItemPropsType = {
  index: number;
  choosedFile: ChoosedFile;
  showDelete: boolean;
  deleteFile: (index: number) => void;
};

function TransformLoader() {
  return (
    <svg
      className="animate-spin w-[10px] h-[10px] "
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
    >
      <circle
        className="opacity-25"
        cx="12"
        cy="12"
        r="10"
        stroke="currentColor"
        strokeWidth="4"
      />
      <path
        className="opacity-75"
        fill="currentColor"
        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
      />
    </svg>
  );
}

export default function FileListItem({
  index,
  choosedFile,
  showDelete,
  deleteFile,
}: FileListItemPropsType) {
  return (
    <div className="rounded-md mb-5 bg-slate-50 dark:bg-slate-900 py-2 px-4">
      <div className="flex items-center justify-between">
        <span className="truncate pr-3 text-sm font-medium text-slate-900 dark:text-slate-50 max-w-[80%]">
          {choosedFile.file.name}
        </span>

        <button
          type="button"
          className="text-slate-900 dark:text-slate-50"
          onClick={() => (showDelete ? deleteFile(index) : '')}
        >
          {/* eslint-disable-next-line no-nested-ternary */}
          {showDelete ? (
            <XMarkIcon className="h-4 w-4" />
          ) : choosedFile.loading === LoadingStatus.LOADING ? (
            <TransformLoader />
          ) : (
            ''
          )}
        </button>
      </div>
      <div className="flex items-center justify-between mt-4">
        <span className="text-xs text-gray-500 dark:text-gray-400">
          Original Size: {formatBytesFileSizeToMB(choosedFile.file.size)}
        </span>
        <span className="text-xs text-gray-500 dark:text-gray-400">
          {choosedFile.afterSize > 0 &&
            `After Size: ${formatBytesFileSizeToMB(choosedFile.afterSize)}`}
        </span>
      </div>
    </div>
  );
}
