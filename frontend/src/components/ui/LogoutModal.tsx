"use client";

import * as React from 'react';
import Button from '@mui/joy/Button';
import Modal from '@mui/joy/Modal';
import { DialogActions, DialogContent, DialogTitle, Divider, IconButton, LinearProgress, ModalDialog } from '@mui/joy';
import { LogoutRounded , WarningRounded } from '@mui/icons-material';
import { useRouter } from 'next/navigation';

export default function LogoutModal(
  props: {admin?: boolean}
) {
  const [open, setOpen] = React.useState<boolean>(false);
  const [loading, setLoading] = React.useState<boolean>(false);
  const router = useRouter();
  const handleLogout = () => {
    setLoading(true);
    if (props.admin) {
      document.cookie = `token=; path=/; max-age=0`;
    }
    router.replace('/');
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
        {
            props.admin ?
            'Выход из админ панели приведет к выходу из аккаунта. Все настройки и данные будут сохранены.':
            'Все отправленные и полученные сообщения будут сохранены в вашем аккаунте.'
          }
        </DialogContent>
        <DialogActions>
          <Button variant="solid" color="danger"  onClick={handleLogout}>
              Да
          </Button>
          <Button variant="plain" color="neutral" onClick={() => setOpen(false)}>
            Нет
          </Button>
        </DialogActions>
      </ModalDialog>:
      <ModalDialog variant="outlined" role="alertdialog" >
          <LinearProgress color="danger" variant="soft" />
      </ModalDialog>}
      </Modal>
    </>
  );
}
