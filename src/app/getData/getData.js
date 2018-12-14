const getData = async url => {
  const response = await fetch(url);
  const responseData = await response.json();
  return responseData;
};
export default getData;
