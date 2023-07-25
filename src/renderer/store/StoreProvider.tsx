/* eslint-disable react-hooks/exhaustive-deps */
import { Option } from 'common';
import React, {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
} from 'react';

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

export type StoreContextType = {
  textureOptions: Option[];
  textureSelected: Option;
  updateTextureSelected: (option: Option) => void;
  resolutionOptions: Option[];
  resolutionSelected: Option;
  updateResolutionSelected: (option: Option) => void;
  keepName: boolean;
  updateKeepName: (keepName: boolean) => void;
  defaultDownloadPath: string;
  updateDefaultDownloadPath: (defaultDownloadPath: string) => void;
};

const StoreContext = createContext<StoreContextType>({
  textureOptions,
  textureSelected: textureOptions[0],
  updateTextureSelected: (option) => {
    return option;
  },
  resolutionOptions,
  resolutionSelected: resolutionOptions[0],
  updateResolutionSelected: (option) => {
    return option;
  },
  keepName: window.electron.store.get('keepName'),
  updateKeepName: (keepName: boolean) =>
    window.electron.store.set('keepName', keepName),
  defaultDownloadPath: window.electron.store.get('defaultDownloadPath'),
  updateDefaultDownloadPath: (defaultDownloadPath) =>
    window.electron.store.set('defaultDownloadPath', defaultDownloadPath),
});

export default function StoreProvider({ children }: any) {
  const [textureSelected, setTextureSelected] = useState<Option>(
    textureOptions[window.electron.store.get('textureSelectedIndex') as number]
  );
  const [resolutionSelected, setResolutionSelected] = useState<Option>(
    resolutionOptions[
      window.electron.store.get('resolutionSelectedIndex') as number
    ]
  );
  const [keepName, setKeepName] = useState<boolean>(
    window.electron.store.get('keepName') as boolean
  );
  const [defaultDownloadPath, setDefaultDownloadPath] = useState<string>(
    window.electron.store.get('defaultDownloadPath')
  );

  const updateTextureSelected = useCallback(
    (option: Option) => {
      const index = textureOptions.findIndex((o) => o.id === option.id);
      setTextureSelected(option);
      window.electron.store.set('textureSelectedIndex', index);
    },
    [textureOptions, setTextureSelected]
  );

  const updateResolutionSelected = useCallback(
    (option: Option) => {
      const index = resolutionOptions.findIndex((o) => o.id === option.id);
      setResolutionSelected(option);
      window.electron.store.set('resolutionSelectedIndex', index);
    },
    [resolutionOptions, setResolutionSelected]
  );

  const updateKeepName = useCallback(
    (value: boolean) => {
      setKeepName(value);
      window.electron.store.set('keepName', value);
    },
    [setKeepName]
  );

  const updateDefaultDownloadPath = useCallback(
    (defaultDownloadPath: string) => {
      setDefaultDownloadPath(defaultDownloadPath);
      window.electron.store.set('defaultDownloadPath', defaultDownloadPath);
    },
    [setDefaultDownloadPath]
  );

  const value = useMemo(
    () => ({
      textureOptions,
      textureSelected,
      updateTextureSelected,
      resolutionOptions,
      resolutionSelected,
      updateResolutionSelected,
      keepName,
      updateKeepName,
      defaultDownloadPath,
      updateDefaultDownloadPath,
    }),
    [
      textureOptions,
      textureSelected,
      updateTextureSelected,
      resolutionOptions,
      resolutionSelected,
      updateResolutionSelected,
      keepName,
      updateKeepName,
      defaultDownloadPath,
      updateDefaultDownloadPath,
    ]
  );

  return (
    <StoreContext.Provider value={value}>{children}</StoreContext.Provider>
  );
}

export function useStore() {
  return useContext(StoreContext);
}
