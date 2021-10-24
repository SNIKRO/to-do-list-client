import { Checkbox, FormControlLabel, IconButton } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';

import styles from './List-item.module.css';

export default function ListItem(props) {
  return (
    <li>
      <FormControlLabel control={<Checkbox />} label={props.label} />
      <IconButton aria-label="delete" onClick={props.onClick} id={props.id}>
        <DeleteIcon />
      </IconButton>
    </li>
  );
}
