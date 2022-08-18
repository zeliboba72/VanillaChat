const formatTimestamp = timestamp => {
  const date = new Date(timestamp);
  return `${date.toLocaleTimeString()} ${date.toLocaleDateString()}`;
};

export default formatTimestamp;
