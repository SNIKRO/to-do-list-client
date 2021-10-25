import axios from '../axios';
import { LISTS } from '../urls';
import ApiError from '../../errors/apierror';

export async function createList(name) {
  try {
    const response = await axios.post(LISTS, { name });
    console.log(response.data);
  } catch (error) {
    if (error.response.status === 403) {
      throw new ApiError('Pair login password is incorrect');
    }
    throw new ApiError('something went wrong');
  }
}
