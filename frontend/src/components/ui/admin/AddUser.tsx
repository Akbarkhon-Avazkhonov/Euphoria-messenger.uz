import * as React from 'react';
import Modal from '@mui/joy/Modal';
import { DialogTitle, IconButton, Input, ModalDialog, Select, Stack , Option } from '@mui/joy';
import { LoginRounded, PersonAddRounded, VisibilityOffRounded, VisibilityRounded } from '@mui/icons-material';
import PhoneInput from './PhoneInput';
import OTPModal from './OTPModal';
export default function AddUser() {
  const [open, setOpen] = React.useState<boolean>(false);
  const [passwordVisible, setPasswordVisible] = React.useState(false);
  const [role, setRole] = React.useState<string>(
    () => {
      // Get the value from local storage if available
      const storedValue = localStorage.getItem('roleInputValue');
      return storedValue || '';
});
  const [username, setUsername] = React.useState<string>(
    () => {
      // Get the value from local storage if available
      const storedValue = localStorage.getItem('usernameInputValue');
      return storedValue || '';
});
const [password, setPassword] = React.useState<string>(
  () => {
    // Get the value from local storage if available
    const storedValue = localStorage.getItem('passwordInputValue');
    return storedValue || '';
});
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

  React.useEffect(() => {
    // Save the value to local storage on every change
    localStorage.setItem('roleInputValue', role);
    localStorage.setItem('usernameInputValue', username);
    localStorage.setItem('passwordInputValue', password);

  }, [role,username,password]);
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
        <ModalDialog >
          <DialogTitle color='primary' level='h4' >Добавить нового пользователя </DialogTitle>
          
   
            <Stack spacing={2}>

                <Input autoFocus required 
                placeholder='Имя пользователя'
                onChange={(event) => setUsername(event.target.value)} 
                value={username}
                endDecorator={
                  <LoginRounded />
                }/>
  
              <Input
                placeholder="Пароль"
                autoFocus
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
                }/>

              
              <PhoneInput />
             
          
              <Select
                placeholder="Выберите роль"
                name="role"
                required
                sx={{ minWidth: 200 }}
                defaultValue={role}
                value={role}
                onChange={handleChange}
                
              >
                <Option value="OPERATOR">Оператор</Option>
                <Option value="ROP">Роп</Option>
                <Option value="MANAGER">Менеджер</Option>
              </Select>
              <OTPModal/>
    
        
       </Stack>
 
        </ModalDialog>
      </Modal>
    </>
  );
}
