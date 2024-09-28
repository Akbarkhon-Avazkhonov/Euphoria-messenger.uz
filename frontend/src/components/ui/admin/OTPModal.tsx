"use client";
import { Modal, ModalDialog, DialogTitle, Stack, FormControl, Button } from "@mui/joy";
import React from "react";
import OTPInput from "./OTPInput";


export default function OTPModal(
  props:{login: string} 
) {
  const [open, setOpen] = React.useState<boolean>(false);
  const [phoneCodeHash, setPhoneCodeHash] = React.useState<string>('');
  const [session, setSession] = React.useState<string>('');
  const [openToast, setOpenToast] = React.useState<boolean>(false);
  
  const handleOpen = async () => {
    setOpen(true);
    const data = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/auth/sendCode`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(
        {
          username: localStorage.getItem('usernameInputValue'),
          password: localStorage.getItem('passwordInputValue'),
          phoneNumber: localStorage.getItem('phoneInputValue')
        }
      ),
    });
    const response = await data.json();
    localStorage.setItem('phoneCodeHash', response.phoneCodeHash);
    localStorage.setItem('session', response.session);
  }

  const handleAdd = async () => {
    const data = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/auth/signInWithCode`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(
        {
          phoneNumber: localStorage.getItem('phoneInputValue'),
          phoneCodeHash: localStorage.getItem('phoneCodeHash'),
          phoneCode: localStorage.getItem('phoneCode'),
          session: localStorage.getItem('session')
        }
      ),
    });
    const response = await data.json();
    if (response.session){
      localStorage.setItem('session', response.session);
      localStorage.removeItem('phoneCode');
      localStorage.removeItem('phoneCodeHash');
      localStorage.removeItem('phoneInputValue');
      localStorage.removeItem('nameInputValue');
    }
    else {
      
      setOpenToast(true);}
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
        <Modal open={true} onClose={() => setOpen(false)}>
        <ModalDialog >
          <DialogTitle color='primary' level='h4' >Введите код </DialogTitle>
            <Stack spacing={2}>
              <FormControl>
              <OTPInput  />
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