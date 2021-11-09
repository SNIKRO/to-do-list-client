import axios from '../axios';
import { LISTS, LIST_WITH_ITEMS } from '../urls';
import ApiError from '../../errors/apierror';

export async function createList(name) {
  try {
    const response = await axios.post(LISTS, { name });
    return response.data;
  } catch (error) {
    throw new ApiError('something went wrong');
  }
}

export async function createListWithItems(listName, items) {
  try {
    const data = {
      list: {
        name: listName,
      },
      items: items,
    };
    const response = await axios.post(LIST_WITH_ITEMS, data);
    return response.data;
  } catch (error) {
    throw new ApiError('something went wrong');
  }
}
