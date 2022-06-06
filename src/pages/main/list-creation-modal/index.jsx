import Modal from '../../../components/modal';
import ListItem from '../../../components/list-item';
import PropTypes, { element } from 'prop-types';
import { v4 as uuid } from 'uuid';
import { useState } from 'react';
import { TextField } from '@mui/material';
import { createList, createListWithItems } from '../../../api/list';
import { createItems } from '../../../api/item';
import styles from './ListCreationModal.module.css';

export default function ListCreationModal({ open, onClose, titleValue, titleValueChange }) {
  const [itemList, setItemList] = useState([]);
  const [newItem, setNewItem] = useState('');
  const [error, setError] = useState('');

  function handleItemChange(event) {
    setNewItem(event.target.value);
  }

  function handleTitleValueChange(event) {
    setError('');
    titleValueChange(event);
  }

  function handleItemCreate(event) {
    if (event.key === 'Enter') {
      const newItemList = [
        ...itemList,
        {
          id: uuid(),
          done: false,
          description: newItem,
        },
      ];
      setItemList(newItemList);
      setNewItem('');
    }
  }

  function handleModalClose() {
    onClose();
    setError('');
    setItemList([]);
    setNewItem('');
  }

  function handleDeleteItem(itemID) {
    const newItemList = itemList.filter((item) => {
      return item.id != itemID;
    });
    setItemList(newItemList);
  }

  async function handleCreationList() {
    try {
      if (!titleValue.trim()) {
        setError('can`t be empty');
        return;
      }
      setError('');
      await createListWithItems(
        titleValue,
        itemList.map((element) => {
          return { description: element.description };
        }),
      );
      handleModalClose();
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <Modal open={open} onClose={handleModalClose} okTitle="Create" onOk={handleCreationList}>
      <TextField
        fullWidth
        error={!!error}
        helperText={error}
        sx={{ mb: 2 }}
        placeholder="List Title"
        value={titleValue}
        onChange={handleTitleValueChange}
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
