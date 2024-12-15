"use client";
import * as React from "react";
import Button from "@mui/joy/Button";
import FormControl from "@mui/joy/FormControl";
import FormLabel from "@mui/joy/FormLabel";
import Modal from "@mui/joy/Modal";
import ModalDialog from "@mui/joy/ModalDialog";
import DialogTitle from "@mui/joy/DialogTitle";
import Stack from "@mui/joy/Stack";
import Add from "@mui/icons-material/Add";
import GroupAddRoundedIcon from "@mui/icons-material/GroupAddRounded";
import { Textarea } from "@mui/joy";


async function fetchPostGroup(
  text: string,
  description: string,
) {
  const cookie = encodeURIComponent(window.document.cookie);

  return await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/groups/create`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include", // This ensures cookies are sent with the request
    body: JSON.stringify({ title: text, description: description }),
  });
}


export default function AddGroup() {
  const [open, setOpen] = React.useState<boolean>(false);
  const [title, setTitle] = React.useState<string>("");
  const [description, setDescription] = React.useState<string>("");

  const handleSubmit = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    fetchPostGroup(title, description).then(() => {
      setOpen(false);
    });
    window.location.reload();
  };

  return (
    <>
      <Button startDecorator={<Add />} onClick={() => setOpen(true)} size="sm">
        Добавить
      </Button>

      <Modal open={open} onClose={() => setOpen(false)}>
        <ModalDialog
          sx={{
            maxWidth: { xs: "94%", sm: "400px" },
            width: "100%",
            overflowY: "auto",
          }}
        >
          <DialogTitle>
            Новая группа
            <GroupAddRoundedIcon sx={{ fontSize: 24 }} color="primary" />
          </DialogTitle>
          <Stack spacing={2}>

            <FormLabel required>Название</FormLabel>
            <Textarea
              autoFocus
              required
              onChange={(event) => setTitle(event.target.value)}
            />

            <FormLabel required>Описание</FormLabel>
            <Textarea
              required
              onChange={(event) => setDescription(event.target.value)}
            />

            <Button type="submit" size="sm" onClick={handleSubmit}>
              Добавить
            </Button>

          </Stack>

        </ModalDialog>
      </Modal>
    </>
  );
}
