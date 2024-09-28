"use client";
import { Modal, ModalDialog, DialogTitle, Stack, FormControl, Button } from "@mui/joy";
import React from "react";
import PhoneInput from "./PhoneInput";
import OTPModal from "./OTPModal";

interface PhoneModalProps {
    name: string;
    login: string;
    password: string;
    role: string;
    submitting: boolean;
    setSubmitting: (submitting: boolean) => void;
    }
export default function PhoneModal(props: PhoneModalProps) {
  const [phoneNumber, setPhoneNumber] = React.useState<string>('');
  const [openOTPModal, setOpenOTPModal] = React.useState<boolean>(false);
  const [openPhoneModal, setOpenPhoneModal] = React.useState<boolean>(true);

  const handleAdd = async () => {
    const data = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/tg-auth/register/${props.login}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include',
      body: JSON.stringify({
        phoneNumber: phoneNumber,
      }),
    });

    const response = await data.json();
    if (response.success) {
      console.log('success');
      setOpenPhoneModal(false); // Закрываем PhoneModal
      setOpenOTPModal(true); // Открываем OTPModal
    }
  };

//   const handleCreateUser = async () => {
//     if (!name || !login || !password || !role) {
//       toast.error('Все поля обязательны');
//       return;
//     }

//     setSubmitting(true);
//     try {
//       const response = await fetchCreateUser(name, login, password, role);
//       if (response.message) {
//         setShowPhoneModal(true); // Trigger modal opening
//         setOpen(false);
//       } else {
//         toast.error('Ошибка при создании пользователя');
//       }
//     } catch (error) {
//       console.error('Failed to create user:', error);
//       toast.error('Ошибка при создании пользователя');
//     } finally {
//       setSubmitting(false);
//     }
//   };
  return (
    <>
        
    <Button
            aria-label="edit"
            color="primary"
            size="md"
            // onClick={handleCreateUser}
        >
            Добавить пользователя
        </Button>

      <Modal open={props.submitting} onClose={() => setOpenPhoneModal(false)}>
        <ModalDialog>
          <DialogTitle color="primary" level="h4">
            Введите номер телефона
          </DialogTitle>
          <Stack spacing={2}>
            <FormControl>
              <PhoneInput phone={phoneNumber} setPhone={setPhoneNumber} />
            </FormControl>
            <Button type="submit" color="primary" fullWidth onClick={handleAdd}>
              Отправить код
            </Button>
          </Stack>
        </ModalDialog>
      </Modal>

      {openOTPModal && <OTPModal login={props.login} />}
    </>
  );
}
