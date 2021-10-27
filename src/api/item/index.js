import axios from '../axios';
import { ITEMS } from '../urls';
import ApiError from '../../errors/apierror';
import populateURL from '../../utils';

export async function createItems(listId, items) {
  try {
    items.forEach((element) => {
      axios.post(populateURL(ITEMS, listId), element.title);
    });
  } catch (error) {
    throw new ApiError(error);
  }
}
