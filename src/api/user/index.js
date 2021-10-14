import axios from '../axios';
import { SIGN_IN, SIGN_UP } from '../urls';

export async function logIn(email, password) {
  try {
    const formData = new FormData();
    formData.append('email', email);
    formData.append('password', password);
    const response = await axios.post(SIGN_IN, formData, { headers: { 'Content-Type': 'multipart/form-data' } });
    localStorage.setItem('accessToken', response.data.accessToken);
    localStorage.setItem('refreshToken', response.data.refreshToken);
    console.log(response.status);
  } catch (error) {
    throw error;
  }
}

export async function registration(name, email, password) {
  try {
    const formData = new FormData();
    formData.append('name', name);
    formData.append('email', email);
    formData.append('password', password);
    const response = await axios.post(SIGN_UP, formData, { headers: { 'Content-Type': 'multipart/form-data' } });
    console.log(response.status);
  } catch (error) {
    console.log(error);
  }
}
