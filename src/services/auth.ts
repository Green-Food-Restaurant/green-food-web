import axios from 'axios';

interface GoogleUserInfo {
  email: string;
  name: string;
  picture: string;

}

export const getUserInfo = async (tokenResponse: any): Promise<GoogleUserInfo> => {
  try {
    const response = await axios.get('https://www.googleapis.com/oauth2/v3/userinfo', {
      headers: {
        Authorization: `Bearer ${tokenResponse.access_token}`
      }
    });
    return response.data;
  } catch (error) {
    console.error('Erro ao obter informações do usuário:', error);
    throw error;
  }
};