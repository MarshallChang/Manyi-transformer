import React from 'react';
import { ChoosedFile } from 'common';
import FileListItem from './FileListItem';

export type FileListPropsType = {
  list: ChoosedFile[];
  showDelete: boolean;
  deleteFile: (index: number) => void;
};

export default function FileList({
  list,
  showDelete,
  deleteFile,
}: FileListPropsType) {
  return (
    <div className="w-full h-full no-scrollbar overflow-y-scroll flex flex-col justify-start">
      {list.map((choosedFile, index) => (
        <FileListItem
          index={index}
          key={choosedFile.file.name}
          choosedFile={choosedFile}
          showDelete={showDelete}
          deleteFile={deleteFile}
        />
      ))}
    </div>
  );
}
