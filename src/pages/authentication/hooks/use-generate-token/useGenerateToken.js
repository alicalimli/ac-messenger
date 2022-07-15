import axios from '/src/api/axios'

const GENERATE_TOKEN_URL = '/auth/login'

const useGenerateToken = () => {
  const generateToken = async (email, password) => {
    try {
      let formData = new FormData();
      formData.append("username", email);
      formData.append("password", password);

      // Request login from the API
      const response = await axios.post(GENERATE_TOKEN_URL, formData)

      return await response.data.access_token;
    } catch (error) {
      throw new Error(error.response.data.detail)
    }
  };

  return generateToken;
};

export default useGenerateToken;
