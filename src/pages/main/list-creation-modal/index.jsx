import Modal from '../../../components/modal';
import ListItem from '../../../components/list-item';
import PropTypes from 'prop-types';
import { v4 as uuid } from 'uuid';
import { useState } from 'react';
import { TextField } from '@mui/material';
import { createList } from '../../../api/list';
import styles from './ListCreationModal.module.css';

export default function ListCreationModal({ open, onClose, titleValue, titleValueChange }) {
  const [itemList, setItemList] = useState([]);
  const [newItem, setNewItem] = useState('');

  function handleItemChange(event) {
    setNewItem(event.target.value);
  }

  function handleItemCreate(event) {
    if (event.key === 'Enter') {
      const newItemList = [
        ...itemList,
        {
          id: uuid(),
          done: false,
          title: newItem,
        },
      ];
      setItemList(newItemList);
      setNewItem('');
    }
  }

  function handleDeleteItem(itemID) {
    const newItemList = itemList.filter((item) => {
      return item.id != itemID;
    });
    setItemList(newItemList);
  }

  async function handleCreationList() {
    try {
      const listId = await createList(titleValue);
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <Modal open={open} onClose={onClose} okTitle="Create" onOk={handleCreationList}>
      <TextField
        fullWidth
        sx={{ mb: 2 }}
        placeholder="List Title"
        value={titleValue}
        onChange={titleValueChange}
        size="small"
      />
      <ul className={styles.list}>
        {itemList.map((item) => (
          <li key={item.id}>
            <ListItem item={item} onDelete={handleDeleteItem} />
          </li>
        ))}
      </ul>
      <TextField
        fullWidth
        value={newItem}
        onChange={handleItemChange}
        placeholder="New item"
        onKeyPress={handleItemCreate}
        size="small"
      />
    </Modal>
  );
}
ListCreationModal.propTypes = {
  open: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  titleValue: PropTypes.string.isRequired,
  titleValueChange: PropTypes.func.isRequired,
};
