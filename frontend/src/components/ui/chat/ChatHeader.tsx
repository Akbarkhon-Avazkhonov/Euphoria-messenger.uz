"use client";
import { Stack, Typography, Chip } from "@mui/joy";
import ColorSchemeToggle from "../ColorSchemeToggle";
import NewMessageIcon from "../NewMessageIcon";

export default function ChatHeader() {
  return (
    <Stack
      direction="row"
      spacing={1}
      alignItems="center"
      justifyContent="space-between"
      p={2}
      pb={1.5}
    >
      <ColorSchemeToggle />
      <Typography
        fontSize={{ xs: 'md', md: 'lg' }}
        component="h1"
        fontWeight="lg"
        endDecorator={
          <Chip
            variant="soft"
            color="primary"
            onClick={() => {
              localStorage.removeItem('session');
              window.location.reload();
            }}
          />
        }
      >
        Messages
      </Typography>
      <NewMessageIcon />
    </Stack>
  );
}