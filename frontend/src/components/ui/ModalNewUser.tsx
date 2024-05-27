import * as React from 'react';
import Button from '@mui/joy/Button';
import Modal from '@mui/joy/Modal';
import ModalClose from '@mui/joy/ModalClose';
import Typography from '@mui/joy/Typography';
import { ModalDialog } from '@mui/joy';

export default function ModalNewUser() {
  const [open, setOpen] = React.useState<boolean>(false);
  return (
    <>
      <Button variant="plain" color="primary" onClick={() => setOpen(true)}>
        Нажми сюда !
      </Button>
      <Modal
        aria-labelledby="modal-title"
        aria-describedby="modal-desc"
        open={open}
        onClose={() => setOpen(false)}
        sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}
      >
        <ModalDialog
            color="primary"
            size="lg"
            variant='plain' 
        >
          <ModalClose variant="plain" sx={{ m: 1 }} />
          <Typography
            component="h2"
            id="modal-title"
            level="h4"
            textColor="inherit"
            fontWeight="lg"
            mb={1}
          >
            Уважаемый новый пользователь!
          </Typography>
          <Typography id="modal-desc" textColor="text.tertiary">
            Добро пожаловать в нашу компанию! Сначало надо зарегистрировать вас , чтобы начать работу.
            Пожалуйста обратитесь к вашему <Typography color='primary' variant='plain'>РОПу (менеджеру) </Typography> для получения доступа ! 
          </Typography>
        </ModalDialog>
      </Modal>
    </>
  );
}
