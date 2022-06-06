import { Container, TextField, Box } from '@mui/material';
import { useState } from 'react';
import ListCreationModal from './list-creation-modal';

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
        <TextField
          fullWidth
          onKeyPress={handleTitleSubmit}
          value={newTitle}
          onChange={handleTitleChange}
          placeholder="List name"
        />
      </Box>
      <ListCreationModal
        open={showModal}
        onClose={handleCloseModal}
        titleValue={newTitle}
        titleValueChange={handleTitleChange}
      />
    </Container>
  );
}
