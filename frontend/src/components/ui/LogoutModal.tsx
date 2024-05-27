import * as React from 'react';
import Button from '@mui/joy/Button';
import Modal from '@mui/joy/Modal';
import { DialogActions, DialogContent, DialogTitle, Divider, IconButton, ModalDialog } from '@mui/joy';
import { LogoutRounded , WarningRounded } from '@mui/icons-material';

export default function LogoutModal() {
  const [open, setOpen] = React.useState<boolean>(false);
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
        <ModalDialog variant="outlined" role="alertdialog">
          <DialogTitle>
            <WarningRounded />
            Вы уверены, что хотите выйти?
          </DialogTitle>
          <Divider />
          <DialogContent>
            Все отправленные и полученные сообщения будут сохранены в вашем аккаунте.
          </DialogContent>
          <DialogActions>
            <Button variant="solid" color="danger" onClick={() => setOpen(false)}>
                Да
            </Button>
            <Button variant="plain" color="neutral" onClick={() => setOpen(false)}>
              Нет
            </Button>
          </DialogActions>
        </ModalDialog>
      </Modal>
    </>
  );
}
