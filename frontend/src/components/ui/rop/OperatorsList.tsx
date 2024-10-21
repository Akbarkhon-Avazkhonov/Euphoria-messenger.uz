"use client";
import * as React from 'react';
import Stack from '@mui/joy/Stack';
import Sheet from '@mui/joy/Sheet';
import Typography from '@mui/joy/Typography';
import { Box, IconButton, Input, ListDivider, ListItem, ListItemButton, ListItemContent } from '@mui/joy';
import List from '@mui/joy/List';
import SearchRoundedIcon from '@mui/icons-material/SearchRounded';
import { ChatProps } from '@/types/message';
import AvatarWithStatus from '../AvatarWithStatus';
import Snackbar from '@mui/joy/Snackbar';
import { EventRepeatRounded, TuneRounded } from '@mui/icons-material';

type ChatsPaneProps = {
  chats: any;
  setSelectedChat: (chat: ChatProps) => void;
  selectedChatId: string;
};

export default function OperatorsList(props: any) {
  const [open, setOpen] = React.useState(false);
  const { chats, setSelectedChat, selectedChatId } = props;

  
  const handleToast = () => {
    setOpen(true);
  };

  return (
    <Sheet
      sx={{
        borderLeft: '1px solid',
        borderColor: 'divider',
        height: '100vh',
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      <Stack
        direction="row"
        spacing={1}
        alignItems="center"
        justifyContent="space-between"
        p={2}
        pb={1.5}
      >
        <Typography
          fontSize={{ xs: 'md', md: 'lg' }}
          component="h1"
          fontWeight="lg"
          sx={{ mr: 'auto' }}
        >
          РОПЫ
        </Typography>
        <IconButton onClick={handleToast}>
          <TuneRounded />
        </IconButton>
      </Stack>

      <Box sx={{ px: 2, pb: 1.5 }}>
        <Input
          size="sm"
          startDecorator={<SearchRoundedIcon />}
          placeholder="Поиск..."
          aria-label="Search"
        />
      </Box>

      <List sx={{ overflowY: "scroll", flex: 1 }}>
        {chats.map((chat: any) => (
          <>
          <ListItem key={chat.id} >
            <ListItemButton onClick={() => setSelectedChat(chat)}>
              <ListItemContent>
                <Stack direction="row" spacing={1.5}>
                  <AvatarWithStatus fullname={chat.name} />
                  <Box sx={{ flex: 1 }}>
                    <Typography level="title-sm">{chat.name}</Typography>
                  </Box>
                  <Box
                    sx={{
                      lineHeight: 1.5,
                      textAlign: 'right',
                    }}
                  >
                    <Typography
                      level="body-xs"
                      display={{ xs: 'none', md: 'block' }}
                      noWrap
                    >
                      {chat.role}
                    </Typography>
                  </Box>
                </Stack>
              </ListItemContent>
            </ListItemButton>
            
          </ListItem>
          <ListDivider sx={{ margin: 1 }} inset='gutter' />
          </>
          
        ))}
        

      </List>

      <Snackbar
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
        open={open}
        onClose={() => setOpen(false)}
        color="warning"
        size="md"
        variant="outlined"
        invertedColors
      >
        <EventRepeatRounded />
        В разработке
      </Snackbar>
    </Sheet>
  );
}
