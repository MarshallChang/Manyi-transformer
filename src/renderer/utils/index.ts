export const formatBytesFileSizeToMB = (size: number) =>
  `${(size / 1024 / 1024).toFixed(2)}MB`;

export const getCompressionRadio = (before: number, after: number) =>
  `${(((before - after) / before) * 100).toFixed(2)}%`;
