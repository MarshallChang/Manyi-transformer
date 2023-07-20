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

export type TextureTypes = 'png' | 'jpg' | 'webp';
