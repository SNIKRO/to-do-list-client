import { Checkbox, FormControlLabel } from '@mui/material';
import styles from './List-item.module.css';

export default function listItemShow(props) {
  return <FormControlLabel control={<Checkbox />} label={props.label} />;
}
