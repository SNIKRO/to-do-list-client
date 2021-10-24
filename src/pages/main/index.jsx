import { Container, TextField, Box } from '@mui/material';
import { useState } from 'react';
import Modal from '../../components/modal';
import FormControlLabel from '../../components/list-item';
import { v4 as uuidv4 } from 'uuid';

/**
 *
 * текст филд в котором пользователю сообщаяется что он может создать тут новый лист
 * когда написал в текст филде название нового листа и нажал интер высвечивалась модальное окно с заполненым текст филдом сверху текст будет именем нашего листа
 * после нажатия интер добавляем строку существующего пункта листа
 * новый пункт листа - чекбокс, текст пунтка, кнопка удалить
 * после создания нового пунтка показываем текст филд для нового пункта в низу списка
 * внизу модального окна должна быть кнопка создать
 * при нажатии на кнопку создать посылаем запрос на бек закрыаем модалку
 *
 */

export default function Main() {
  const [newTitle, setNewTitle] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [newItem, setNewItem] = useState('');
  const [createItem, setCreateItem] = useState([]);
  const [deleteItem, setDeleteItem] = useState([]);

  function handleTitleSubmit(event) {
    if (event.key === 'Enter') {
      setShowModal(true);
    }
  }
  function handleItemCreate(event) {
    if (event.key === 'Enter' && showModal) {
      let itemArray = [
        ...createItem,
        {
          id: uuidv4(),
          done: false,
          title: newItem,
        },
      ];
      setCreateItem(itemArray);
      setNewItem('');
    }
  }

  function handleItemChange(event) {
    setNewItem(event.target.value);
  }

  function handleTitleChange(event) {
    setNewTitle(event.target.value);
  }
  function handleCloseModal() {
    setShowModal(false);
    setNewTitle('');
  }

  function handleDeleteItem(event) {
    const itemDelete = event.currentTarget.id;
    createItem.map((item) => {
      if (item.id === itemDelete) {
        setDeleteItem(createItem.slice(item, 1));
      }
    });
    setCreateItem(...createItem, deleteItem);
  }
  return (
    <Container maxWidth="sx" sx={{ display: 'flex', height: '100%', p: 2 }}>
      <Box sx={{ width: 600, mx: 'auto' }}>
        <TextField
          fullWidth
          onKeyPress={handleTitleSubmit}
          value={newTitle}
          onChange={handleTitleChange}
          placeholder="List name"
        />
      </Box>
      <Modal open={showModal} onClose={handleCloseModal}>
        <ul>
          {createItem.map((item) => (
            <FormControlLabel key={item.id} label={item.title} onClick={handleDeleteItem} id={item.id} />
          ))}
        </ul>
        <TextField
          fullWidth
          helperText="add new item"
          label={newTitle}
          value={newItem}
          onChange={handleItemChange}
          onKeyPress={handleItemCreate}
        />
      </Modal>
    </Container>
  );
}
