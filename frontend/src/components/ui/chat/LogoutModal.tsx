import * as React from 'react';
import Button from '@mui/joy/Button';
import Modal from '@mui/joy/Modal';
import { DialogActions, DialogContent, DialogTitle, Divider, IconButton, LinearProgress, ModalDialog } from '@mui/joy';
import { LogoutRounded , WarningRounded } from '@mui/icons-material';

export default function LogoutModal() {
  const [open, setOpen] = React.useState<boolean>(false);
  const [loading, setLoading] = React.useState<boolean>(false);
  const handleLogout = () => {
    setLoading(true);
    localStorage.removeItem('session');
    localStorage.removeItem('rop_session');
    window.location.reload();
  }


  return (
    <>
        <IconButton
          variant="plain"
          aria-label="edit"
          color="neutral"
          size="sm"
          sx={{ display: { xs: 'none', sm: 'unset' } }}
          onClick={() => setOpen(true)}
        >
          <LogoutRounded />
        </IconButton>
      <Modal
        aria-labelledby="modal-title"
        aria-describedby="modal-desc"
        open={open}
        onClose={() => setOpen(false)}
        sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}
      >
        {!loading ?
        <ModalDialog variant="outlined" role="alertdialog" color='danger'>
        <DialogTitle>
          <WarningRounded />
          Вы уверены, что хотите выйти?
        </DialogTitle>
        <Divider />
        <DialogContent>
          Все отправленные и полученные сообщения будут сохранены в вашем аккаунте.
        </DialogContent>
        <DialogActions>
          <Button variant="solid" color="danger" onClick={handleLogout}>
              Да
          </Button>
          <Button variant="plain" color="neutral" onClick={() => setOpen(false)}>
            Нет
          </Button>
        </DialogActions>
      </ModalDialog>:
        <ModalDialog variant="outlined" role="alertdialog" color='danger' >
            <LinearProgress color="danger" variant="soft" />
        </ModalDialog>}
      </Modal>
    </>
  );
}
