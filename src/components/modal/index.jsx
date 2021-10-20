import { Modal, Box } from '@mui/material';
import styles from './Modal.module.css';
export default function ModalWindow(props) {
  return (
    <Modal open={props.open} onClose={props.onClose}>
      <Box className={styles.container} sx={{ p: 4 }}>
        {props.children}
      </Box>
    </Modal>
  );
}
