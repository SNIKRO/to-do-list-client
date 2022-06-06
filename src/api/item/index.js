import axios from '../axios';
import { ITEMS } from '../urls';
import ApiError from '../../errors/apierror';
import populateURL from '../../utils';

export async function createItems(listId, items) {
  try {
    const promises = items.map((element) => {
      const description = element.title;
      return axios.post(populateURL(ITEMS, { listId }), { description });
    });
    await Promise.all(promises);
  } catch (error) {
    throw new ApiError(error);
  }
}
