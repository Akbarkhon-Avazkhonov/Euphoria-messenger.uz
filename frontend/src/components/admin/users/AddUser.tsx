"use client";
import * as React from 'react';
import Modal from '@mui/joy/Modal';
import { DialogTitle, IconButton, Input, ModalDialog, Select, Stack, Option } from '@mui/joy';
import { LoginRounded, PersonAddRounded, VisibilityOffRounded, VisibilityRounded } from '@mui/icons-material';
import PhoneInput from '@/components/ui/admin/PhoneInput';
import OTPModal from '@/components/ui/admin/OTPModal';

export default function AddUser() {
  const [open, setOpen] = React.useState<boolean>(false);
  const [passwordVisible, setPasswordVisible] = React.useState(false);
  const [role, setRole] = React.useState<string>('');
  const [username, setUsername] = React.useState<string>('');
  const [password, setPassword] = React.useState<string>('');
  const [phone, setPhone] = React.useState<string>('');
  React.useEffect(() => {
    // Get values from local storage if available when component mounts
    const storedRole = localStorage.getItem('roleInputValue');
    const storedUsername = localStorage.getItem('usernameInputValue');
    const storedPassword = localStorage.getItem('passwordInputValue');
    if (storedRole) setRole(storedRole);
    if (storedUsername) setUsername(storedUsername);
    if (storedPassword) setPassword(storedPassword);
  }, []);

  React.useEffect(() => {
    // Save the value to local storage on every change
    localStorage.setItem('roleInputValue', role);
    localStorage.setItem('usernameInputValue', username);
    localStorage.setItem('passwordInputValue', password);
    localStorage.setItem('phoneInputValue', phone);
  }, [role, username, password, phone]);

  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };

  const handleChange = (
    event: React.SyntheticEvent | null,
    newValue: string | null,
  ) => {
    if (newValue) {
      setRole(newValue);
    }
  };

  return (
    <>
      <IconButton
        variant="plain"
        aria-label="edit"
        color="neutral"
        size="md"
        sx={{ display: { xs: 'none', sm: 'unset' } }}
        onClick={() => setOpen(true)}
      >
        <PersonAddRounded />
      </IconButton>
      <Modal open={open} onClose={() => setOpen(false)}>
        <ModalDialog>
          <DialogTitle color='primary' level='h4'>Добавить нового пользователя</DialogTitle>
          <Stack spacing={2}>
            <Input
              autoFocus
              required
              placeholder='Имя пользователя'
              onChange={(event) => setUsername(event.target.value)}
              value={username}
              endDecorator={<LoginRounded />}
            />
            <Input
              placeholder="Пароль"
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
            <PhoneInput phone={phone} setPhone={setPhone}/>
            <Select
              placeholder="Выберите роль"
              name="role"
              required
              sx={{ minWidth: 200 }}
              value={role}
              onChange={handleChange}
            >
              <Option value="OPERATOR">Оператор</Option>
              <Option value="ROP">Роп</Option>
              <Option value="MANAGER">Менеджер</Option>
            </Select>
            <OTPModal />
          </Stack>
        </ModalDialog>
      </Modal>
    </>
  );
}
