import axios from '../axios';
import { ITEMS } from '../urls';
import ApiError from '../../errors/apierror';

export async function createItems(listId, items) {
  try {
    items.forEach((element) => {
      const title = element.title;
      axios.post(ITEMS, { listId, title });
    });
  } catch (error) {
    throw new ApiError(error);
  }
}
