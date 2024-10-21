"use client";
import * as React from "react";
import Button from "@mui/joy/Button";
import FormLabel from "@mui/joy/FormLabel";
import Modal from "@mui/joy/Modal";
import ModalDialog from "@mui/joy/ModalDialog";
import DialogTitle from "@mui/joy/DialogTitle";
import Stack from "@mui/joy/Stack";
import Add from "@mui/icons-material/Add";
import GroupAddRoundedIcon from "@mui/icons-material/GroupAddRounded";
import { IconButton, Textarea } from "@mui/joy";
import AccessSwitch from "@/components/ui/admin/AccessSwitch";
import EditRoundedIcon from '@mui/icons-material/EditRounded';
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
  can_create_group: false,
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
  can_create_group: "Создание группы",
};

async function fetchPatchRole(
  id: string,
  text: string,
  description: string,
  access: object
) {
  const cookie = encodeURIComponent(window.document.cookie);
  console.log("Cookies", cookie);

  return await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/roles/one/${id}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include", // This ensures cookies are sent with the request
    body: JSON.stringify({ name: text, description, access }),
  });
}



interface EditRoleProps {
  id: string;
  name: string;
  description: string;
  access: Record<AccessKeys, boolean>;
  disabled?: boolean;

}

export default function EditRole(
  props: EditRoleProps
) {
  const [open, setOpen] = React.useState<boolean>(false);
  const [text, setText] = React.useState<string>(props.name);
  const [description, setDescription] = React.useState<string>(props.description);
  const [access, setAccess] = React.useState(props.access);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    fetchPatchRole(props.id,text, description, access).then(() => {
      setOpen(false);
    });
    window.location.reload();
  };

  return (
    <React.Fragment>
      {
        !props.disabled ? (
          <IconButton size="sm" color="primary"  onClick={() => setOpen(true)} >
                    <EditRoundedIcon />
            </IconButton>
        ) : (
          <IconButton size="sm" color="danger"  disabled >
                    <EditRoundedIcon />
            </IconButton>
        )
      }
         
  
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
          <form onSubmit={handleSubmit}>
            <Stack spacing={2}>
              
                <FormLabel required>Имя роля</FormLabel>
                <Textarea
                  value={text}
                  autoFocus
                  required
                  onChange={(event) => setText(event.target.value)}
                />
                <FormLabel required>Описание</FormLabel>
                <Textarea
                  value={description}
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

              <Button type="submit" size="sm">
                Добавить
              </Button>
            </Stack>
          </form>
        </ModalDialog>
      </Modal>
    </React.Fragment>
  );
}
