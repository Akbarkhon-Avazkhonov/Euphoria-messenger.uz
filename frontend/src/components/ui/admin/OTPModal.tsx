"use client";
import { Modal, ModalDialog, DialogTitle, Stack, FormControl, Button } from "@mui/joy";
import React from "react";
import OTPInput from "./OTPInput";

interface OTPModalProps {
    login: string;
    open: boolean;
    setOpen: (open: boolean) => void;
    }

export default function OTPModal(
  props: OTPModalProps
) {
  const [open, setOpen] = React.useState<boolean>(false);
  const [phoneCodeHash, setPhoneCodeHash] = React.useState<string>('');
  const [session, setSession] = React.useState<string>('');
  const [openToast, setOpenToast] = React.useState<boolean>(false);
  
  const handleOpen = async () => {
    setOpen(true);
    props.setOpen(true);
  }

  const handleAdd = async () => {
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
        <Modal open={props.open} onClose={() => setOpen(false)}>
        <ModalDialog  sx={{
            maxWidth: { xs: '94%', sm: '400px' },
            width: '100%',
            overflowY: 'auto',
          }}>
          <DialogTitle color='primary' level='h4' >Введите код </DialogTitle>
            <Stack spacing={2}>
              <FormControl sx={{textAlign:'center'}}>
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