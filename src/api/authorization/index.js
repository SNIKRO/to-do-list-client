import axios from '../axios';
import { SIGN_IN } from '../urls';

export async function logIn(email, password) {
  try {
    const formData = new FormData();
    formData.append('email', email);
    formData.append('password', password);
    const response = await axios.post(SIGN_IN, formData, { headers: { 'Content-Type': 'multipart/form-data' } });
    localStorage.setItem('accessToken', response.data.accessToken);
    localStorage.setItem('refreshToken', response.data.refreshToken);
  } catch (error) {
    console.log(error);
  }
}
