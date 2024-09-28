"use client";
import { Modal, ModalDialog, DialogTitle, Stack, FormControl, Button } from "@mui/joy";
import React from "react";
import OTPInput from "./OTPInput";
import toast from "react-hot-toast";

interface OTPModalProps {
    login: string;
    phoneNumber: string;
    open: boolean;
    setOpen: (open: boolean) => void;
    setClose: (close: boolean) => void;
    }

async function fetchRegister(login: string, phoneNumber: string) {
    const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/tg-auth/register/${login}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include',
      body: JSON.stringify({
        phoneNumber,
      }),
    }).then((response) => response.json());
    return response;
  }
export default function OTPModal(
  props: OTPModalProps
) {  
  const [otp, setOtp] = React.useState<string>('');
  const handleSendCode = async () => {
    if (!props.phoneNumber) {
      toast.error('Все поля обязательны');
      return;
    }
    props.setOpen(true);

    try {
      const response = await fetchRegister(props.login, props.phoneNumber);
      if (response.message) {
        toast.success(response.message);
      } else {
        toast.error('Ошибка при создании пользователя');
      }
    } catch (error) {
      console.error('Failed to create user:', error);
      toast.error('Ошибка при создании пользователя');
    }
  }

  const handleAdd = async () => {
    if (!otp) {
      toast.error('Все поля обязательны');
      return;
    }
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/tg-auth/verify/${props.login}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify({
          phoneCode: otp,
        }),
      }).then((response) => response.json());
      if (response.message) {
        props.setOpen(false);
        props.setClose(true);
        toast.success(response.message);
      } else {
        toast.error('Ошибка при создании пользователя');
      }
    } catch (error) {
      console.error('Failed to create user:', error);
      toast.error('Ошибка при создании пользователя');
  }
}
  
  return (
    <>

      <Button
          aria-label="edit"
          color="primary"
          size="md"
          sx={{ display: { xs: 'none', sm: 'unset' } }}
          onClick={handleSendCode}
        >
          Получить код
        </Button>
        <Modal open={props.open}>
        <ModalDialog  sx={{
            maxWidth: { xs: '94%', sm: '400px' },
            width: '100%',
            overflowY: 'auto',
          }}>
          <DialogTitle color='primary' level='h4' >Введите код </DialogTitle>
            <Stack spacing={2}>
              <FormControl sx={{textAlign:'center'}}>
              <OTPInput  otp={otp} setOtp={setOtp}/>
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