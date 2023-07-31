window.electron = {
  ipcRenderer: {
    sendMessage: jest.fn(),
    invoke: jest.fn(),
    on: jest.fn(),
    once: jest.fn(),
  },
  store: {
    get: jest.fn(),
    set: jest.fn(),
  },
};
