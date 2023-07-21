import '@testing-library/jest-dom';
import { render } from '@testing-library/react';
import App from '../renderer/App';

const electron = {
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

window.electron = electron;

describe('App', () => {
  it('should render', () => {
    expect(render(<App />)).toBeTruthy();
  });
});
