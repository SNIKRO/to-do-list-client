import { Modal, Box, Button } from '@mui/material';
import PropTypes from 'prop-types';
import styles from './Modal.module.css';
export default function ModalWindow({ open, onClose, okTitle, onOk, children }) {
  return (
    <Modal open={open} onClose={onClose}>
      <Box className={styles.container} sx={{ p: 4 }}>
        {children}
        <Button sx={{ mt: 2 }} variant="contained" onClick={onOk}>
          {okTitle}
        </Button>
      </Box>
    </Modal>
  );
}
ModalWindow.propTypes = {
  open: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  okTitle: PropTypes.string,
  onOk: PropTypes.func,
};
ModalWindow.defaultProps = {
  okTitle: 'ok',
  onOk: undefined,
};
