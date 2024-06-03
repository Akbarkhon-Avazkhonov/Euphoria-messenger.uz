"use client";
import { Box, Button, Checkbox, FormControl, FormLabel, IconButton, Input, Snackbar, Stack, Typography } from "@mui/joy";
import ForgetPassword from "@/components/login/ForgetPassword";
import { useState } from "react";
import ModalNewUser from "@/components/login/ModalNewUser";
import ColorSchemeToggle from "../ui/ColorSchemeToggle";
import ChatRoundedIcon from '@mui/icons-material/ChatRounded';
import { redirect } from "next/navigation";
import { LoginRounded, VisibilityOffRounded, VisibilityRounded } from "@mui/icons-material";
import React from "react";
import { cookies } from "next/headers";
import { setCookie } from "cookies-next";


export default function LoginForm(){
    const [username, setUsername] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [snackbarOpen, setSnackbarOpen] = useState<boolean>(false);
    const [passwordVisible, setPasswordVisible] = React.useState(false);


    const handleSubmit = async () => {
        const data = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/auth/signInWithName`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            username: username,
            password: password,
          }),
        });
    
        const response = await data.json();
    
        if (response.session) {
          setCookie('session', response.session, {
            maxAge: 60 * 60 * 24 * 7,
            path: '/',
          });
          // cookies().set('session',response.session)
          redirect('/operator')
        //   props.setSession(response.session);
        } else {
          setSnackbarOpen(true);
        }
      };
      const togglePasswordVisibility = () => {
        setPasswordVisible(!passwordVisible);
      };
    return (
        <>
              <Box
        sx={(theme) => ({
          width: { xs: '100%', md: '50vw' },
          transition: 'width var(--Transition-duration)',
          transitionDelay: 'calc(var(--Transition-duration) + 0.1s)',
          position: 'relative',
          zIndex: 1,
          display: 'flex',
          justifyContent: 'flex-end',
          backdropFilter: 'blur(12px)',
          backgroundColor: 'rgba(255 255 255 / 0.2)',
          [theme.getColorSchemeSelector('dark')]: {
            backgroundColor: 'rgba(19 19 24 / 0.4)',
          },
        })}
      >
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            minHeight: '100dvh',
            width: '100%',
           
            px: {
              xs:2,
              md:4
            },
          }}
        >
          <Box
            component="header"
            sx={{
              py: 3,
              display: 'flex',
              justifyContent: 'space-between',
            }}
          >
            <Box sx={{ gap: 2, display: 'flex', alignItems: 'center' }}>
              <IconButton variant="soft" color="primary" size="sm">
                <ChatRoundedIcon />
              </IconButton>
              <Typography level="title-lg">{process.env.NEXT_PUBLIC_LOGO_TEXT}</Typography>
            </Box>
            <ColorSchemeToggle />
          </Box>
          <Box
            component="main"
            sx={{
              my: 'auto',
              py: 2,
              pb: 5,
              display: 'flex',
              flexDirection: 'column',
              gap: 2,
              width: 400,
              maxWidth: '100%',
              mx: 'auto',
              borderRadius: 'sm',
              '& form': {
                display: 'flex',
                flexDirection: 'column',
                gap: 2,
              },
              [`& .MuiFormLabel-asterisk`]: {
                visibility: 'hidden',
              },
            }}
          >
            <Stack gap={4} sx={{ mb: 2 }}>
              <Stack gap={1}>
                <Typography component="h1" level="h3">
                  Войти в аккаунт
                </Typography>
                <Typography level="body-sm">
                  Новенький в компании?
                  <ModalNewUser />
                </Typography>
              </Stack>
            </Stack>
            <Stack gap={4} sx={{ mt: 2 }}>
              <FormControl required>
                <FormLabel>Логин</FormLabel>
                <Input
                  type="text"
                  name="login"
                  onChange={(event) => setUsername(event.target.value)}
                  endDecorator={
                    <LoginRounded/>
                  }
                />
              </FormControl>
              <FormControl required>
                <FormLabel>Пароль</FormLabel>
                <Input
                  name="password"
                  onChange={(event) => setPassword(event.target.value)}
                  type={passwordVisible ? 'text' : 'password'}
                  required
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
              </FormControl>
              <Stack gap={4} sx={{ mt: 2 }}>
                <Box
                  sx={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                  }}
                >
                  <Checkbox size="sm" label="Запомнить меня" name="persistent" />
                  <ForgetPassword />
                </Box>
                <Button fullWidth onClick={handleSubmit}>
                  Войти
                </Button>
              </Stack>
              <Snackbar
                    open={snackbarOpen}
                    anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
                    color="danger"
                    variant="soft"
                    autoHideDuration={5000}
                    onClose={() => setSnackbarOpen(false)}
                    size="md"
                >
                    {username === '' || password === '' ? 'Заполните все поля !' : 'Неверный логин или пароль'}
                </Snackbar>
            </Stack>
            
          </Box>
          <Box component="footer" sx={{ py: 3 }}>
            <Typography level="body-xs" textAlign="center">
              © {process.env.NEXT_PUBLIC_PHOENIX_TEXT} {new Date().getFullYear()}
            </Typography>
          </Box>
        </Box>
      </Box>
      <Box
        sx={(theme) => ({
          height: '100%',
          position: 'fixed',
          right: 0,
          top: 0,
          bottom: 0,
          left: { xs: 0, md: '50vw' },
          transition:
            'background-image var(--Transition-duration), left var(--Transition-duration) !important',
          transitionDelay: 'calc(var(--Transition-duration) + 0.1s)',
          backgroundColor: 'background.level1',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
          backgroundImage:
            'url(https://w0.peakpx.com/wallpaper/156/402/HD-wallpaper-climb-success-hustle-motivation-mountain.jpg)',
          [theme.getColorSchemeSelector('dark')]: {
            backgroundImage:
              'url(https://images.pexels.com/photos/2681319/pexels-photo-2681319.jpeg?auto=compress&cs=tinysrgb&w=600)',
          },
        })}
      /></>
    
    )
}

