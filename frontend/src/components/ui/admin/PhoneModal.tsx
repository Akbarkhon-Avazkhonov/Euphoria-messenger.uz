"use client";
import { Modal, ModalDialog, DialogTitle, Stack, FormControl, Button, Alert, Typography } from "@mui/joy";
import React from "react";
import PhoneInput from "./PhoneInput";
import OTPModal from "./OTPModal";
import toast from "react-hot-toast";
import InfoRoundedIcon from '@mui/icons-material/InfoRounded';

interface PhoneModalProps {
    name: string;
    login: string;
    password: string;
    role: string;
    submitting: boolean;
    setSubmitting: (submitting: boolean) => void;
    setClose: (close: boolean) => void;
    }


async function fetchCreateUser(name: string, login: string, password: string, role: string) {
    const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/users/create-user`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include',
      body: JSON.stringify({
        name,
        login,
        password,
        role,
      }),
    }).then((response) => response.json());
    return response;
  }

export default function PhoneModal(props: PhoneModalProps) {
  const [phoneNumber, setPhoneNumber] = React.useState<string>('');
  const [openOTPModal, setOpenOTPModal] = React.useState<boolean>(false);



    

  const handleCreateUser = async () => {
    if (!props.name || !props.login || !props.password || !props.role) {
      toast.error('Все поля обязательны');
      return;
    }
    try {
            const response = await fetchCreateUser(props.name, props.login, props.password, props.role);
            if (response.message) {
              toast.success(response.message);
              props.setSubmitting(true);
            } else {
              toast.error('Ошибка при создании пользователя');
            }
          } catch (error) {
            console.error('Failed to create user:', error);
            toast.error('Ошибка при создании пользователя');
          }
  };


  return (
    <>
        
    <Button
            aria-label="edit"
            color="primary"
            size="md"
            onClick={handleCreateUser}
        >
            Добавить пользователя
        </Button>

      <Modal open={props.submitting} >
        <ModalDialog
         sx={{
          maxWidth: { xs: '94%', sm: '400px' },
          width: '100%',
          overflowY: 'auto',
        }}>
          <DialogTitle color="primary" level="h4">
            Введите номер телефона
          </DialogTitle>
          <Alert color="success" variant="soft"  sx={
              {
                fontSize: 14,
                fontWeight: 600,
              }
            }
            startDecorator={
              <InfoRoundedIcon sx={{ fontSize: 24}} />
            }
            >
                <Typography>
                  На этот номер отправиться код ! 
                </Typography>
                
            </Alert>
          <Stack spacing={2}>
            <FormControl>
              <PhoneInput phone={phoneNumber} setPhone={setPhoneNumber} />
            </FormControl>
            <OTPModal open={openOTPModal} setOpen={setOpenOTPModal} login={props.login} phoneNumber={phoneNumber} setClose={props.setClose}/>
          </Stack>
        </ModalDialog>
      </Modal>

    </>
  );
}
