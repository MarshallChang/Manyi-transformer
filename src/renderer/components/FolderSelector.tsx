export type FolderSelectorPropsType = {
  label: string;
  value: string;
  onChange: (path: string) => void;
};

export default function FolderSelector({
  label,
  value,
  onChange,
}: FolderSelectorPropsType) {
  const selectPath = async () => {
    const folder = await window.electron.ipcRenderer.invoke('chooseFolder', {
      defaultPath: value,
    });
    onChange(folder);
  };

  return (
    <div className="relative">
      <span className="block text-sm font-medium leading-6 text-gray-900">
        {label}
      </span>
      <div className="relative mt-2">
        <button
          type="button"
          className="relative w-full cursor-default rounded-md bg-white py-1.5 pl-3 pr-10 text-left text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 sm:text-sm sm:leading-6"
          onClick={selectPath}
        >
          <span className="flex items-center">
            <span className="ml-3 block truncate">{value}</span>
          </span>
        </button>
      </div>
    </div>
  );
}