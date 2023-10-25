// Api.js
export const fetchApiData = async (url) => {
	try {
	  const response = await fetch(url);
	  return await response.json();
	} catch (error) {
	  throw error;
	}
  };
  