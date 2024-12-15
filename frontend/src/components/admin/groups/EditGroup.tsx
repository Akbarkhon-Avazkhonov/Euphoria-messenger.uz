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
import { IconButton, Textarea } from "@mui/joy";
import EditRoundedIcon from '@mui/icons-material/EditRounded';



async function fetchPatchGroup(
  group_id:number,
  text: string,
  description: string,
) {
  const cookie = encodeURIComponent(window.document.cookie);

  return await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/groups/update/${group_id}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include", // This ensures cookies are sent with the request
    body: JSON.stringify({ title: text, description: description }),
  });
}


export default function EditGroup(
  props:{
    group_id: number,
    title: string,
    description: string,
  }
) {
  const [open, setOpen] = React.useState<boolean>(false);
  const [title, setTitle] = React.useState<string>(props.title);
  const [description, setDescription] = React.useState<string>(props.description);

  const handleSubmit = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    fetchPatchGroup(props.group_id,title, description).then(() => {
      setOpen(false);
    });
    window.location.reload();
  };

  return (
    <>
       <IconButton size="sm" color="primary"  onClick={() => setOpen(true)}>
                <EditRoundedIcon />
        </IconButton>
      
      <Modal open={open} onClose={() => setOpen(false)}>
        <ModalDialog
          sx={{
            maxWidth: { xs: "94%", sm: "400px" },
            width: "100%",
            overflowY: "auto",
          }}
        >
          <DialogTitle>
            Изменить группа
            <GroupAddRoundedIcon sx={{ fontSize: 24 }} color="primary" />
          </DialogTitle>
          <Stack spacing={2}>

            <FormLabel required>Название</FormLabel>
            <Textarea
              value={title}
              autoFocus
              required
              onChange={(event) => setTitle(event.target.value)}
            />

            <FormLabel required>Описание</FormLabel>
            <Textarea
              value={description}
              required
              onChange={(event) => setDescription(event.target.value)}
            />

            <Button type="submit" size="sm" onClick={handleSubmit}>
              Изменить
            </Button>

          </Stack>

        </ModalDialog>
      </Modal>
    </>
  );
}
