import { useEffect, useState } from 'react';
import { MemoryRouter as Router, Routes, Route } from 'react-router-dom';
import 'tailwindcss/tailwind.css';
import './App.css';
import SelectComponent from './components/Select';
import Loader from './components/Loader';

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

function Transformer() {
  const [textureSelected, setTextureSelected] = useState<Option>(
    textureOptions[0]
  );
  const [resolutionSelected, setResolutionSelected] = useState<Option>(
    resolutionOptions[0]
  );
  const [choosedFile, setChoosedFile] = useState('');
  const [loading, setLoading] = useState(false);
  const [disableTransform, setDisableTransform] = useState(true);

  useEffect(() => {
    if (choosedFile && choosedFile.length > 0) {
      setDisableTransform(false);
    } else {
      setDisableTransform(true);
    }
  }, [choosedFile]);

  const chooseFile = async () => {
    const result = await window.electron.ipcRenderer.invoke('chooseFile');
    setChoosedFile(result);
  };

  const reset = () => {
    setChoosedFile('');
    setResolutionSelected(resolutionOptions[0]);
    setTextureSelected(textureOptions[0]);
  };

  const transform = async () => {
    setLoading(true);
    await window.electron.ipcRenderer.invoke('transform', {
      config: {
        targetFormat: textureSelected.value,
        resolution: resolutionSelected.value,
      },
      file: choosedFile,
    });
    reset();
    setLoading(false);
  };

  if (loading) {
    return <Loader />;
  }

  return (
    <div className="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8 w-96">
      <div className="sm:mx-auto sm:w-full sm:max-w-sm">
        <h2 className="text-center text-2xl font-bold leading-9 tracking-tight text-white">
          Choose Your glTF File
        </h2>
      </div>
      <div className="mt-10">
        <button
          type="button"
          className="inline-flex w-full justify-center rounded-md bg-red-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-red-500 sm:w-auto"
          onClick={chooseFile}
        >
          Choose
        </button>
        <div className="w-full overflow-hidden">{choosedFile}</div>
      </div>
      <div className="mt-10">
        <SelectComponent
          label="Texture Type"
          options={textureOptions}
          value={textureSelected || textureOptions[0]}
          onChange={setTextureSelected}
        />
      </div>
      <div className="mt-10">
        <SelectComponent
          label="Resolution"
          options={resolutionOptions}
          value={resolutionSelected || resolutionOptions[0]}
          onChange={setResolutionSelected}
        />
      </div>
      <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
        <div>
          <button
            type="button"
            className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 disabled:bg-slate-500"
            disabled={disableTransform}
            onClick={transform}
          >
            Do it!
          </button>
        </div>
      </div>
    </div>
  );
}

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Transformer />} />
      </Routes>
    </Router>
  );
}
