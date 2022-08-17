const getDateString = () => {
  const date = new Date();
  return `${date.toLocaleTimeString()} ${date.toLocaleDateString()}`;
};

export default getDateString;
