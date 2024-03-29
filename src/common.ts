export type Option = {
  id: number;
  name: string;
  value: string | number;
};

export type SelectProps = {
  label: string;
  options: Option[];
  value: Option;
  onChange: (option: Option) => void;
};

export enum LoadingStatus {
  WAITING = 'WAITING',
  LOADING = 'LOADING',
  FINISH = 'FINISH',
}

export type ChoosedFile = {
  file: File;
  afterSize: number;
  compressionRadio: string;
  loading: LoadingStatus;
};

export type TextureType = 'png' | 'jpg' | 'webp';

export type AppearanceType = 'System' | 'Light' | 'Dark';

export type StoreType = {
  keepName: boolean;
  textureSelectedIndex: number;
  resolutionSelectedIndex: number;
  defaultDownloadPath: string;
  appearance: AppearanceType;
};
