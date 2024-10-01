"use client";
import {
  Box,
  Button,
  FormControl,
  FormLabel,
  IconButton,
  Input,
  Snackbar,
  Stack,
  Typography,
} from "@mui/joy";
import ForgetPassword from "@/components/login/ForgetPassword";
import { useState } from "react";
import ModalNewUser from "@/components/login/ModalNewUser";
import ColorSchemeToggle from "@/components/ui/ColorSchemeToggle";
import ChatRoundedIcon from "@mui/icons-material/ChatRounded";
import { useRouter } from "next/navigation";
import { setEncryptedCookie } from "@/utils/access";
import {
  LoginRounded,
  VisibilityOffRounded,
  VisibilityRounded,
} from "@mui/icons-material";
import React from "react";

export default function LoginForm() {
  const [login, setLogin] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [snackbarOpen, setSnackbarOpen] = useState<boolean>(false);
  const [passwordVisible, setPasswordVisible] = React.useState(false);

  const router = useRouter();

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault(); // Prevent the default form submission

    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/auth/login`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          login: login,
          password: password,
        }),
      }
    );
    if (response.status === 201) {
      const data = await response.json();
      document.cookie = `token=${data.token}; path=/; max-age=86400`;
      document.cookie = `role=${data.role}; path=/; max-age=86400`;
      console.log(data.access);
      await setEncryptedCookie("access", data.access);
      // document.cookie = `access=${JSON.stringify(data.access)}; path=/; max-age=86400`;
      if (data.role === "Админ") {
        router.replace("/admin");
      } else {
        router.replace("/user");
      }
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
          width: { xs: "100%", md: "50vw" },
          transition:
            "background-image var(--Transition-duration), left var(--Transition-duration) !important",
          transitionDelay: "calc(var(--Transition-duration) + 0.1s)",
          position: "relative",
          zIndex: 1,
          display: "flex",
          justifyContent: "flex-end",
          backdropFilter: "blur(12px)",
          backgroundColor: "rgba(255 255 255 / 0.2)",
          [theme.getColorSchemeSelector("dark")]: {
            backgroundColor: "rgba(25 25 25 / 0.1)",
          },
        })}
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            minHeight: "100dvh",
            width: "100%",
            px: {
              xs: 2,
              md: 4,
            },
          }}
        >
          <Box
            component="header"
            sx={{
              py: 3,
              display: "flex",
              justifyContent: "space-between",
            }}
          >
            <Box sx={{ gap: 2, display: "flex", alignItems: "center" }}>
              <IconButton variant="soft" color="primary" size="sm">
                <ChatRoundedIcon />
              </IconButton>
              <Typography level="title-lg">
                {process.env.NEXT_PUBLIC_LOGO_TEXT}
              </Typography>
            </Box>
            <ColorSchemeToggle />
          </Box>
          <Box
            component="main"
            sx={{
              my: "auto",
              py: 2,
              pb: 5,
              display: "flex",
              flexDirection: "column",
              gap: 2,
              width: 400,
              maxWidth: "100%",
              mx: "auto",
              borderRadius: "sm",
              "& form": {
                display: "flex",
                flexDirection: "column",
                gap: 2,
              },
              [`& .MuiFormLabel-asterisk`]: {
                visibility: "hidden",
              },
            }}
          >
            <form onSubmit={handleSubmit}>
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
                    value={login}
                    onChange={(event) => setLogin(event.target.value)}
                    endDecorator={<LoginRounded />}
                  />
                </FormControl>
                <FormControl required>
                  <FormLabel>Пароль</FormLabel>
                  <Input
                    name="password"
                    value={password}
                    onChange={(event) => setPassword(event.target.value)}
                    type={passwordVisible ? "text" : "password"}
                    required
                    endDecorator={
                      <IconButton
                        variant="plain"
                        aria-label={
                          passwordVisible ? "hide password" : "show password"
                        }
                        color="neutral"
                        size="sm"
                        onClick={togglePasswordVisibility}
                      >
                        {passwordVisible ? (
                          <VisibilityRounded />
                        ) : (
                          <VisibilityOffRounded />
                        )}
                      </IconButton>
                    }
                  />
                </FormControl>
                <Stack gap={4} sx={{ mt: 2 }}>
                  <Button fullWidth type="submit">
                    Войти
                  </Button>
                  <Box
                    sx={{
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  >
                    <ForgetPassword />
                  </Box>
                </Stack>
                <Snackbar
                  open={snackbarOpen}
                  anchorOrigin={{ vertical: "top", horizontal: "center" }}
                  color="danger"
                  variant="soft"
                  autoHideDuration={5000}
                  onClose={() => setSnackbarOpen(false)}
                  size="md"
                >
                  {login === "" || password === ""
                    ? "Заполните все поля !"
                    : "Неверный логин или пароль"}
                </Snackbar>
              </Stack>
            </form>
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
          height: "100%",
          position: "fixed",
          right: 0,
          top: 0,
          bottom: 0,
          left: { xs: 0, md: "50vw" },
          transition:
            "background-image var(--Transition-duration), left var(--Transition-duration) !important",
          transitionDelay: "calc(var(--Transition-duration) + 0.1s)",
          backgroundColor: "background.level1",
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          backgroundImage: "url(images/euphoria-logo.webp)",
          [theme.getColorSchemeSelector("dark")]: {
            backgroundImage: "url(images/euphoria-logo-dark.webp)",
          },
        })}
      />
    </>
  );
}
