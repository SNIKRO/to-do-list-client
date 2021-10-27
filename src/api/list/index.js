import axios from '../axios';
import { LISTS } from '../urls';
import ApiError from '../../errors/apierror';

export async function createList(name) {
  try {
    const response = await axios.post(LISTS, { name });
    return response.data;
  } catch (error) {
    throw new ApiError('something went wrong');
  }
}
