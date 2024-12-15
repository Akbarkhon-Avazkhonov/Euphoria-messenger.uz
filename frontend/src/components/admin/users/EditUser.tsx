"use client";
import * as React from 'react';
import Modal from '@mui/joy/Modal';
import { DialogTitle, IconButton, Input, ModalDialog, Select, Stack, Option, Button, FormLabel } from '@mui/joy';
import { LoginRounded, PersonAddRounded, VisibilityOffRounded, VisibilityRounded } from '@mui/icons-material';
import BadgeIcon from '@mui/icons-material/Badge';
import toast from 'react-hot-toast';
import PhoneModal from '@/components/ui/admin/PhoneModal';
import CircularProgress from '@mui/joy/CircularProgress';
import EditRoundedIcon from '@mui/icons-material/EditRounded';
export async function fetchRoles() {
  const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/roles/allNames`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
    credentials: 'include',
  }).then((response) => response.json());
  return response;
}

async function fetchUpdateUser(id:string, name: string, login: string, password: string, role: string) {
  const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/users/update-user/${id}`, {
    method: 'PATCH',
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

interface EditUserProps {
    id: string;
    name: string;
    login: string;
    role: string;
}

export default function EditUser(
    props : EditUserProps
) {
  const [open, setOpen] = React.useState<boolean>(false);
  const [passwordVisible, setPasswordVisible] = React.useState(false);
  const [role, setRole] = React.useState<string>(props.role);
  const [name, setName] = React.useState<string>(props.name);
  const [login, setLogin] = React.useState<string>(props.login);
  const [password, setPassword] = React.useState<string>('');
  const [loadingRoles, setLoadingRoles] = React.useState<boolean>(true);
  const [roles, setRoles] = React.useState<any[]>([]);
  const [submitting, setSubmitting] = React.useState<boolean>(false);

  const [close, setClose] = React.useState<boolean>(false);
  React.useEffect(() => {
    const loadRoles = async () => {
      try {
        const result = await fetchRoles();
        setRoles(result.data);
        setLoadingRoles(false);
      } catch (error) {
        console.error("Failed to fetch roles:", error);
        setLoadingRoles(false);
      }
    };
    loadRoles();
  }, []);

  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };

  React.useEffect(() => {
    if (close) {
      setOpen(false);
      setSubmitting(false);
      setName('');
      setLogin('');
      setPassword('');
      setRole('');
      setClose(false);
      window.location.reload();
    }
  }, [close]);


  return (
    <>
    
        <IconButton size="sm" color="primary"  onClick={() => setOpen(true)}>
                <EditRoundedIcon />
        </IconButton>
      
      <Modal open={open} onClose={() => setOpen(false)}>
        <ModalDialog
          sx={{
            maxWidth: { xs: '94%', sm: '400px' },
            width: '100%',
            overflowY: 'auto',
          }}
        >
          
          <DialogTitle color="primary" level="h4">
            Изменить пользователя
            <PersonAddRounded sx={{ fontSize: 24 }} color="primary" />
          </DialogTitle>

          <Stack spacing={2}>

            <FormLabel required>Имя пользователя</FormLabel>
            <Input
              autoFocus
              required
              onChange={(event) => setName(event.target.value)}
              value={name}
              endDecorator={<BadgeIcon />}
            />

            <FormLabel required>Логин</FormLabel>
            <Input
              required
              onChange={(event) => setLogin(event.target.value)}
              value={login}
              endDecorator={<LoginRounded />}
            />

            <FormLabel required>Пароль</FormLabel>
            <Input
              required
              onChange={(event) => setPassword(event.target.value)}
              value={password}
              type={passwordVisible ? 'text' : 'password'}
              endDecorator={
                <IconButton
                  variant="plain"
                  aria-label={passwordVisible ? 'hide password' : 'show password'}
                  color="neutral"
                  size="sm"
                  onClick={togglePasswordVisibility}
                >
                  {passwordVisible ? <VisibilityRounded /> : <VisibilityOffRounded />}
                </IconButton>
              }
            />

            <FormLabel required>Выберите роль</FormLabel>
            <Select
              name="role"
              required
              sx={{ minWidth: 200 }}
              value={role}
              onChange={(event, newValue) => setRole(newValue as string)}
              disabled={loadingRoles}
            >
              {loadingRoles ? (
                <Option value="" disabled>
                  Загрузка...
                </Option>
              ) : (
                roles.map((role: any) => (
                  <Option key={role.id} value={role.name}>
                    {role.name}
                  </Option>
                ))
              )}
            </Select>

            <Button
              onClick={async () => {
                setSubmitting(true);
                try {
                  await fetchUpdateUser(props.id, name, login, password, role);
                  toast.success('Пользователь успешно изменен');
                  setClose(true);
                } catch (error) {
                  console.error('Failed to update user:', error);
                  toast.error('Не удалось изменить пользователя');
                  setSubmitting(false);
                }
              }}
              disabled={submitting}
              endDecorator={submitting ? <CircularProgress /> : null}
            > 
                Изменить
            </Button>

            {/* <PhoneModal  name={name} login={login}  password={password} role={role} submitting={submitting} setSubmitting={setSubmitting}  setClose={setClose}/> */}

          </Stack>
        </ModalDialog>
      </Modal>

    </>
  );
}
