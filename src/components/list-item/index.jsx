import { Checkbox, IconButton, Box, Typography } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';

export default function ListItem(props) {
  function handleDeleteClick() {
    props.onDelete(props.item.id);
  }
  return (
    <Box sx={{ display: 'flex', alignItems: 'center' }}>
      <Checkbox />
      <Typography variant="body1">{props.item.title}</Typography>
      <IconButton aria-label="delete" onClick={handleDeleteClick}>
        <DeleteIcon />
      </IconButton>
    </Box>
  );
}
