import axios from "axios";

const apiHook = async (URL) => {
	try {
        const response = await axios.get(URL);
        return response.data;
      } catch (error) {
        console.error(error);
      }
};

export default apiHook;