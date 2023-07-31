/* eslint-disable react-hooks/exhaustive-deps */
import { AppearanceType, Option } from 'common';
import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react';
import { WebGLRenderer, REVISION } from 'three';
import { DRACOLoader } from 'three/examples/jsm/loaders/DRACOLoader';
import { GLTF, GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import { KTX2Loader } from 'three/examples/jsm/loaders/KTX2Loader';
import { MeshoptDecoder } from 'three/examples/jsm/libs/meshopt_decoder.module.js';

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

const appearanceOptions: AppearanceType[] = ['System', 'Light', 'Dark'];

let gltfLoader: GLTFLoader;
if (window !== undefined) {
  const THREE_PATH = `https://unpkg.com/three@0.${REVISION}.x`;
  const dracoloader = new DRACOLoader().setDecoderPath(
    `${THREE_PATH}/examples/jsm/libs/draco/gltf/`
  );
  const ktx2Loader = new KTX2Loader().setTranscoderPath(
    `${THREE_PATH}/examples/jsm/libs/basis/`
  );
  gltfLoader = new GLTFLoader()
    .setCrossOrigin('anonymous')
    .setDRACOLoader(dracoloader)
    .setKTX2Loader(ktx2Loader.detectSupport(new WebGLRenderer()))
    .setMeshoptDecoder(MeshoptDecoder);
}

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
  appearanceOptions: AppearanceType[];
  appearanceSelected: AppearanceType;
  updateAppearanceSelected: (appearance: AppearanceType) => void;
  fileArrayBuffer: ArrayBuffer | undefined;
  setFileArrayBuffer: (fileArrayBuffer: ArrayBuffer) => void;
  filename: string | undefined;
  setFilename: (filename: string) => void;
  textOriginalFile: string | undefined;
  setTextOriginalFile: (textOriginalFile: string) => void;
  gltfObj?: GLTF;
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
  appearanceOptions,
  appearanceSelected: 'System',
  updateAppearanceSelected: (appearance) => {
    window.electron.store.set('appearance', appearance);
  },
  fileArrayBuffer: undefined,
  setFileArrayBuffer: () => {},
  filename: undefined,
  setFilename: () => {},
  textOriginalFile: undefined,
  setTextOriginalFile: () => {},
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

  const [appearanceSelected, setAppearanceSelected] = useState<AppearanceType>(
    window.electron.store.get('appearance')
  );

  const [fileArrayBuffer, setFileArrayBuffer] = useState<ArrayBuffer>();
  const [filename, setFilename] = useState<string>();
  const [textOriginalFile, setTextOriginalFile] = useState<string>();
  const [gltfObj, setGLTFObj] = useState<GLTF>();

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

  const updateAppearanceSelected = useCallback(
    (appearance: AppearanceType) => {
      setAppearanceSelected(appearance);
      window.electron.store.set('appearance', appearance);
    },
    [setAppearanceSelected]
  );

  const generatorScene = useCallback(async () => {
    if (fileArrayBuffer && gltfLoader) {
      const result: GLTF = await new Promise((resolve, reject) =>
        gltfLoader.parse(fileArrayBuffer as ArrayBuffer, '', resolve, reject)
      );
      setGLTFObj(result);
    }
  }, [fileArrayBuffer, gltfLoader]);

  useEffect(() => {
    generatorScene();
  }, [fileArrayBuffer, gltfLoader]);

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
      appearanceOptions,
      appearanceSelected,
      updateAppearanceSelected,
      fileArrayBuffer,
      setFileArrayBuffer,
      filename,
      setFilename,
      textOriginalFile,
      setTextOriginalFile,
      gltfObj,
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
      appearanceOptions,
      appearanceSelected,
      updateAppearanceSelected,
      fileArrayBuffer,
      setFileArrayBuffer,
      filename,
      setFilename,
      textOriginalFile,
      setTextOriginalFile,
      gltfObj,
    ]
  );

  return (
    <StoreContext.Provider value={value}>{children}</StoreContext.Provider>
  );
}

export function useStore() {
  return useContext(StoreContext);
}
