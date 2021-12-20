const request = async (url: string, method = "GET") => {
  const response = await fetch(url, {
    method,
  });

  return await response.json();
};

export default request;
