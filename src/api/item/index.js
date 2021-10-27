import axios from '../axios';
import { ITEMS } from '../urls';
import ApiError from '../../errors/apierror';
import populateURL from '../../utils';

export async function createItems(listId, items) {
  try {
    items.forEach((element) => {
      const description = element.title;
      axios.post(populateURL(ITEMS, listId), { description });
    });
  } catch (error) {
    throw new ApiError(error);
  }
}
