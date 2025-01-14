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
import AccessSwitch from "@/components/ui/admin/AccessSwitch";
import { AccessKeys } from "@/types/access";



const accessValues: Record<AccessKeys, boolean> = {
  can_manage_users: false,
  can_write: true,
  can_read: true,
  can_delete: false,
  can_send_audio: false,
  can_read_audio: false,
  can_send_video: false,
  can_read_video: false,
  can_send_photo: false,
  can_read_photo: false,
  can_send_file: false,
  can_read_file: false,
};

const accessDescription: Record<AccessKeys, string> = {
  can_manage_users: "Управление пользователями",
  can_write: "Запись",
  can_read: "Чтение",
  can_delete: "Удаление",
  can_send_audio: "Отправка аудио",
  can_read_audio: "Чтение аудио",
  can_send_video: "Отправка видео",
  can_read_video: "Чтение видео",
  can_send_photo: "Отправка фото",
  can_read_photo: "Чтение фото",
  can_send_file: "Отправка файла",
  can_read_file: "Чтение файла",
};

async function fetchPostRole(
  text: string,
  description: string,
  access: object
) {
  const cookie = encodeURIComponent(window.document.cookie);

  return await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/roles/create`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include", // This ensures cookies are sent with the request
    body: JSON.stringify({ name: text, description, access }),
  });
}


export default function AddRole() {
  const [open, setOpen] = React.useState<boolean>(false);
  const [text, setText] = React.useState<string>("");
  const [description, setDescription] = React.useState<string>("");
  const [access, setAccess] = React.useState(accessValues);

  const handleSubmit = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    fetchPostRole(text, description, access).then(() => {
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
            Новый Роль
            <GroupAddRoundedIcon sx={{ fontSize: 24 }} color="primary" />
          </DialogTitle>
          <Stack spacing={2}>

            <FormLabel required>Имя роля</FormLabel>
            <Textarea
              autoFocus
              required
              onChange={(event) => setText(event.target.value)}
            />

            <FormLabel required>Описание</FormLabel>
            <Textarea
              required
              onChange={(event) => setDescription(event.target.value)}
            />

            {Object.keys(access).map((key) => {
              const accessKey = key as AccessKeys;
              return (
                <AccessSwitch
                  key={accessKey}
                  label={accessDescription[accessKey]}
                  checked={access[accessKey]}
                  setChecked={(value: boolean) => {
                    setAccess((prevState) => ({
                      ...prevState,
                      [accessKey]: value,
                    }));
                  }}
                />
              );
            })}

            <Button type="submit" size="sm" onClick={handleSubmit}>
              Добавить
            </Button>

          </Stack>

        </ModalDialog>
      </Modal>
    </>
  );
}
