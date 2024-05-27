import * as React from 'react';
import { Button, Modal, ModalDialog, DialogTitle, Stack, FormControl, Snackbar } from "@mui/joy";
import OTPInput from "./OTPInput";

export default function OTPModal() {
  const [open, setOpen] = React.useState<boolean>(false);
  const [phoneCodeHash, setPhoneCodeHash] = React.useState<string>('');
  const [session, setSession] = React.useState<string>('');
  const [openToast, setOpenToast] = React.useState<boolean>(false);
  const [toastMessage, setToastMessage] = React.useState<string>('');
  const [userData, setUserData] = React.useState({username: '', password: '', phoneNumber: ''});

  React.useEffect(() => {
    // Ensure this runs on client only
    if (typeof window !== 'undefined') {
      setUserData({
        username: localStorage.getItem('nameInputValue') || '',
        password: localStorage.getItem('passwordInputValue') || '',
        phoneNumber: localStorage.getItem('phoneInputValue') || ''
      });
    }
  }, []);

  const handleOpen = async () => {
    setOpen(true);
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/auth/sendCode`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(userData),
      });

      const data = await response.json();
      localStorage.setItem('phoneCodeHash', data.phoneCodeHash);
      localStorage.setItem('session', data.session);

      setToastMessage('Code sent successfully');
      setOpenToast(true);
    } catch (error) {
      setToastMessage('Error sending code');
      setOpenToast(true);
    }
  }

  const handleAdd = async () => {
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/auth/signInWithCode`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          phoneNumber: localStorage.getItem('phoneInputValue'),
          phoneCodeHash: localStorage.getItem('phoneCodeHash'),
          phoneCode: localStorage.getItem('phoneCode'),
          session: localStorage.getItem('session')
        }),
      });

      const data = await response.json();

      if (data.session) {
        localStorage.setItem('session', data.session);
        localStorage.removeItem('phoneCode');
        localStorage.removeItem('phoneCodeHash');
        localStorage.removeItem('phoneInputValue');
        localStorage.removeItem('nameInputValue');
      } else {
        setToastMessage('Error verifying code');
        setOpenToast(true);
      }
    } catch (error) {
      setToastMessage('Error verifying code');
      setOpenToast(true);
    }
  }

  return (
    <>

      <Button
        aria-label="edit"
        color="primary"
        size="md"
        sx={{ display: { xs: 'none', sm: 'unset' } }}
        onClick={handleOpen}
      >
        Получить код
      </Button>
      <Modal open={open} onClose={() => setOpen(false)}>
        <ModalDialog >
          <DialogTitle color='primary' level='h4' >Введите код </DialogTitle>
          <Stack spacing={2}>
            <FormControl>
              <OTPInput />
            </FormControl>
            <Button type="submit" color="primary" fullWidth onClick={handleAdd}>
              Добавить
            </Button>
          </Stack>
        </ModalDialog>
      </Modal>
    </>
  );
}
