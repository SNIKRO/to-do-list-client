import { Container, TextField, Box, Checkbox, FormControlLabel } from '@mui/material';
import { useState } from 'react';
import Modal from '../../components/modal';

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
  const [createItem, setCreateItem] = useState(false);

  function handleTitleSubmit(event) {
    if (event.key === 'Enter') {
      setShowModal(true);
    }
  }
  function handleItemCreate(event) {
    if (event.key === 'Enter' && showModal) {
      setCreateItem(true);
      // const formData = new Map();
      // let numbers = 0;
      // formData.set(numbers, <FormControlLabel control={<Checkbox />} label={newItem} />);
      // numbers += 1;
      // console.log(numbers);
      // for (let amount of formData.values()) {
      //   return setCreateItem(amount);
      // }
      //  console.log(createItem);
      //  return createItem;
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
        {createItem ? <FormControlLabel control={<Checkbox />} label={newItem} /> : null}
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
