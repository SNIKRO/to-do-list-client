import { Container, TextField, Typography, Box } from '@mui/material';
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

  function handleTitleSubmit(event) {
    if (event.key === 'Enter') {
      setShowModal(true);
    }
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
        <TextField fullWidth onKeyPress={handleTitleSubmit} value={newTitle} onChange={handleTitleChange} />
      </Box>
      <Modal open={showModal} onClose={handleCloseModal}>
        test
        <TextField fullWidth></TextField>
      </Modal>
    </Container>
  );
}
