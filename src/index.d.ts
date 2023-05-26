type Option = {
  id: number;
  name: string;
  value: string | number;
};

type SelectProps = {
  label: string;
  options: Option[];
  value: Option;
  onChange: (option: Option) => void;
};

type TextureTypes = 'png' | 'jpg' | 'webp';
