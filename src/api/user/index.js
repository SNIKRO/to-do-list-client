import axios from '../axios';
import { SIGN_IN, SIGN_UP } from '../urls';
import ApiError from '../../errors/apierror';

export async function logIn(email, password) {
  try {
    const formData = new FormData();
    formData.append('email', email);
    formData.append('password', password);
    const response = await axios.post(SIGN_IN, formData, { headers: { 'Content-Type': 'multipart/form-data' } });
    localStorage.setItem('accessToken', response.data.accessToken);
    localStorage.setItem('refreshToken', response.data.refreshToken);
  } catch (error) {
    if (error.response.status === 403) {
      throw new ApiError('Pair login password is incorrect');
    }
    throw new ApiError('something went wrong');
  }
}

export async function registration(name, email, password) {
  try {
    const formData = new FormData();
    formData.append('name', name);
    formData.append('email', email);
    formData.append('password', password);
    const response = await axios.post(SIGN_UP, formData, { headers: { 'Content-Type': 'multipart/form-data' } });
  } catch (error) {
    if (error.response.status === 400) {
      throw new ApiError(error.response.data);
    }
    throw new ApiError('something went wrong');
  }
}
