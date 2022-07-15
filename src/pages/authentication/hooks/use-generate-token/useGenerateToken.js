import axios from '/src/api/axios'

const GENERATE_TOKEN_URL = '/auth/login'

const useGenerateToken = () => {
  const generateToken = async (email, password) => {
    try {
      let formData = new FormData();
      formData.append("username", email);
      formData.append("password", password);

      // Request login from the API
      const fetchTokenResult = await axios.post(GENERATE_TOKEN_URL, formData)

      console.log(await fetchTokenResult)

      return fetchTokenResult.data.access_token;
    } catch (error) {
      console.log(error.response.data.detail)
      throw new Error(error.response.data.detail)
    }
  };

  return generateToken;
};

export default useGenerateToken;
