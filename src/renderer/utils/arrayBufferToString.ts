const arrayBufferToString = (
  buffer: ArrayBuffer,
  callback: (result: string) => void
) => {
  const blob = new Blob([buffer], { type: 'text/plain' });
  const reader = new FileReader();
  reader.onload = function (evt) {
    if (evt.target) {
      callback(evt.target.result as string);
    }
  };
  reader.readAsText(blob, 'utf-8');
};

export default arrayBufferToString;
