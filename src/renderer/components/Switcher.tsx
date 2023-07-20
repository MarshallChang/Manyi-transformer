import { Switch } from '@headlessui/react';

export type SwitcherPropsType = {
  label: string;
  value: boolean;
  onChange: (value: boolean) => void;
};

export default function Switcher({
  label,
  value,
  onChange,
}: SwitcherPropsType) {
  return (
    <Switch.Group>
      <div className="flex items-center justify-between">
        <Switch.Label className="block text-sm font-medium leading-6 text-gray-900">
          {label}
        </Switch.Label>
        <Switch
          checked={value}
          onChange={onChange}
          className={`${value ? ' bg-emerald-500' : ' bg-stone-500'}
          relative inline-flex h-6 w-11 items-center shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus-visible:ring-2  focus-visible:ring-white focus-visible:ring-opacity-75`}
        >
          <span className="sr-only">{label}</span>
          <span
            aria-hidden="true"
            className={`${value ? 'translate-x-6' : 'translate-x-1'}
            pointer-events-none inline-block h-4 w-4 transform rounded-full bg-white shadow-lg ring-0 transition duration-200 ease-in-out`}
          />
        </Switch>
      </div>
    </Switch.Group>
  );
}
