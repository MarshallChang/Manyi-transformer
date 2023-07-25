import { useState, Fragment } from 'react';
import { Dialog, Transition, RadioGroup } from '@headlessui/react';
import { XMarkIcon, CheckCircleIcon } from '@heroicons/react/24/solid';
import { useStore } from 'renderer/store/StoreProvider';

export type SettingsModalPropsType = {};

export default function SettingsModal() {
  const [isOpen, setIsOpen] = useState(false);
  const { appearanceOptions, appearanceSelected, updateAppearanceSelected } =
    useStore();

  window.electron.ipcRenderer.on('openSettings', () => {
    setIsOpen(!isOpen);
  });

  return (
    <Transition.Root show={isOpen} as={Fragment}>
      <Dialog
        as="div"
        className="relative z-50"
        onClose={() => setIsOpen(false)}
      >
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-stone-700 bg-opacity-30 transition-opacity" />
        </Transition.Child>

        <div className="fixed inset-0 z-10 overflow-y-auto">
          <div className="flex min-h-full justify-center text-center items-center p-0">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 translate-y-4"
              enterTo="opacity-100 translate-y-0"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 translate-y-0"
              leaveTo="opacity-0 translate-y-4"
            >
              <Dialog.Panel className="relative overflow-hidden transform rounded-lg bg-white dark:bg-black text-left shadow-xl transition-all w-[32rem] h-[32rem] ">
                <div className="p-6 w-full h-full flex flex-col">
                  <div className="text-gray-900 dark:text-gray-200 flex flex-row items-center justify-between">
                    <Dialog.Title className="text-xl font-bold leading-8  ">
                      Settings
                    </Dialog.Title>
                    <button
                      type="button"
                      className=" focus-visible:outline-none"
                      onClick={() => setIsOpen(false)}
                    >
                      <XMarkIcon
                        className="h-6 w-6"
                        onClick={() => setIsOpen(false)}
                      />
                    </button>
                  </div>
                  <div className="mt-4 flex-1 space-y-2">
                    <div>
                      <div className="text-base font-medium text-gray-800 dark:text-gray-200">
                        Appearance:
                      </div>
                      <div className="mt-2">
                        <RadioGroup
                          value={appearanceSelected}
                          onChange={updateAppearanceSelected}
                        >
                          <div className="space-x-4 flex">
                            {appearanceOptions.map((appearance) => (
                              <RadioGroup.Option
                                key={appearance}
                                value={appearance}
                                className={({ checked }) =>
                                  `${
                                    checked
                                      ? 'bg-violet-600 bg-opacity-75 text-white'
                                      : 'bg-white dark:bg-gray-200'
                                  } relative flex cursor-pointer rounded-lg p-2 shadow-md focus:outline-none w-[100px] transition-colors duration-200`
                                }
                              >
                                {({ checked }) => (
                                  <div className="flex w-full items-center justify-between">
                                    <div className="flex items-center">
                                      <div className="text-sm">
                                        <RadioGroup.Label
                                          as="p"
                                          className={`font-medium  ${
                                            checked
                                              ? 'text-white'
                                              : 'text-gray-900'
                                          }`}
                                        >
                                          {appearance}
                                        </RadioGroup.Label>
                                      </div>
                                    </div>
                                    {checked && (
                                      <div className="shrink-0 text-white">
                                        <CheckCircleIcon className="h-4 w-4" />
                                      </div>
                                    )}
                                  </div>
                                )}
                              </RadioGroup.Option>
                            ))}
                          </div>
                        </RadioGroup>
                      </div>
                    </div>
                  </div>
                  {/* <div className="flex justify-end">
                    <button
                      type="button"
                      className="inline-flex justify-center rounded-md bg-gray-200 dark:bg-gray-900 px-3 py-2 text-sm font-semibold text-gray-800 dark:text-gray-200 shadow-sm hover:bg-gray-300 dark:hover:bg-gray-800  w-auto"
                      onClick={() => setIsOpen(false)}
                    >
                      Cancel
                    </button>
                    <button
                      type="button"
                      className="ml-3 inline-flex justify-center rounded-md bg-blue-500 px-3 py-2 text-sm font-semibold text-gray-50 shadow-sm hover:bg-blue-400 w-auto"
                      onClick={() => setIsOpen(false)}
                    >
                      Save
                    </button>
                  </div> */}
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  );
}
