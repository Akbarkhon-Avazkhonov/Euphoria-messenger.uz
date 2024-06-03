"use client";
import * as React from 'react';
import Modal from '@mui/joy/Modal';
import { DialogTitle, IconButton, Input, ModalDialog, Select, Stack, Option, Textarea, Button } from '@mui/joy';
import { CreateRounded, LoginRounded, PersonAddRounded, VisibilityOffRounded, VisibilityRounded } from '@mui/icons-material';
import PhoneInput from '../admin/PhoneInput';


export default function NewDialogModal(props: any) {
  const [open, setOpen] = React.useState<boolean>(false);
  const [username, setUsername] = React.useState<string>('');
  const [message, setMessage] = React.useState<string>('');

    const handleSend = async () => {
      props.socket.emit('sendFirstMessage', 
      {
        phone: localStorage.getItem('phoneInputValue'),
        firstName: username,
        message: message
      });

        // const data = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/messages/sendFirstMessage`, {
        //     method: 'POST',
        //     headers: {
        //         'Content-Type': 'application/json',
        //         'session': `${localStorage.getItem('session')}`
        //     },
        //     body: JSON.stringify(
        //         {
        //             phone: localStorage.getItem('phoneInputValue'),
        //             firstName: username,
        //             message: message

        //         }
        //     ),
        // });
        // const response = await data.json();
        window.location.reload();
    
    }

  return (
    <>
      <IconButton
        aria-label="add"
        color="primary"
        variant='solid'
        size="lg"
        sx={{ position: 'fixed', bottom: 32, left: 348 }}
        onClick={() => setOpen(true)}
      >
        <CreateRounded />
      </IconButton>
      <Modal open={open} onClose={() => setOpen(false)}>
        <ModalDialog>
          <DialogTitle color='primary' level='h4'>Отправить новое сообщение </DialogTitle>
          <Stack spacing={2}>
            <Input
              autoFocus
              required
              placeholder='Имя пользователя'
              onChange={(event) => setUsername(event.target.value)}
              value={username}
              endDecorator={<LoginRounded />}
            />

            <PhoneInput />

            <Textarea 
            placeholder='Сообщение'
            value={message}
            onChange={(event) => setMessage(event.target.value)}

            />

            <Button
          aria-label="send"
          color="primary"
          size="md"
          sx={{ display: { xs: 'none', sm: 'unset' } }}
          onClick={handleSend}
        >
          Отправить сообщение
            </Button>
          </Stack>
        </ModalDialog>
      </Modal>
    </>
  );
}
