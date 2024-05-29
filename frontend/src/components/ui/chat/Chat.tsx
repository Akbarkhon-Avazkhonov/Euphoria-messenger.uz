import * as React from 'react';
import Stack from '@mui/joy/Stack';
import Sheet from '@mui/joy/Sheet';
import Typography from '@mui/joy/Typography';
import { Box, Chip, Input, Snackbar } from '@mui/joy';
import List from '@mui/joy/List';
import SearchRoundedIcon from '@mui/icons-material/SearchRounded';

import ColorSchemeToggle from '../ColorSchemeToggle';
import LogoutModal from './LogoutModal';
import NewChatModal from './NewChatModal';
import ChatItem from './ChatItem';
import io from 'socket.io-client';

export default function ChatsPane(props: any) {
  const { chats ,setSelectedChat, selectedChatId } = props;
  // const [socket, setSocket] = React.useState<any>(null);
  // const [data, setData] = React.useState<any[]>([]);
  // const [newMessage, setNewMessage] = React.useState<any>(null);
  // React.useEffect(() => {
  //   const session = localStorage.getItem('session');
  //   if (session) {
  //     const newSocket = io('http://localhost:5000', {
  //       extraHeaders: {
  //         session: session,
  //       },
  //     });
  //     setSocket(newSocket);

  //     newSocket.on('message', (newMessage: any) => {
  //       setNewMessage(newMessage);
  //       setData((prevData) => {
  //         const updatedData = prevData.map((item) => {
  //           if (item.userId === newMessage.peerId.userId) {
  //             return { ...item, message: newMessage.message, unreadCount: item.unreadCount + 1 };
  //           }
  //           return item;
  //         });

  //         const isNewUser = !updatedData.some((item) => item.userId === newMessage.peerId.userId);
  //         if (isNewUser) {
  //           updatedData.push({
  //             userId: newMessage.peerId.userId,
  //             message: newMessage.message,
  //             unreadCount: 1,
  //             title: newMessage.peerId.title,
  //           });
  //         }

  //         return updatedData;
  //       });
  //     });

  //     return () => {
  //       newSocket.close();
  //     };
  //   }
  // }, []);

  // React.useEffect(() => {
  //   const session = localStorage.getItem('session');
  //   if (session) {
  //     const fetchData = async () => {
  //       const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/messages/getDialogs`, {
  //         method: 'POST',
  //         headers: {
  //           'Content-Type': 'application/json',
  //           session: session,
  //         },
  //       });
  //       const result = await response.json();
  //       setData(result);
  //     };
  //     fetchData();
  //   }
  // }, []);

  return (
    <Sheet
      sx={{
        borderRight: '1px solid',
        borderColor: 'divider',
        height: 'calc(100dvh - var(--Header-height))',
        overflowY: 'auto',
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
        <ColorSchemeToggle />
        <Typography
          fontSize={{ xs: 'md', md: 'lg' }}
          component="h1"
          fontWeight="lg"
          endDecorator={
            <Chip
              variant="soft"
              color="primary"
              size="md"
              slotProps={{ root: { component: 'span' } }}
            >
              4
            </Chip>
          }
          sx={{ mr: 'auto' }}
        >
          Сообщения
        </Typography>
        <LogoutModal />
      </Stack>
      <Box sx={{ px: 2, pb: 1.5 }}>
        <Input
          size="sm"
          startDecorator={<SearchRoundedIcon />}
          placeholder="Поиск..."
          aria-label="Search"
        />
      </Box>
      <List
        sx={{
          py: 0,
          '--ListItem-paddingY': '0.75rem',
          '--ListItem-paddingX': '1rem',
        }}
      >
        {chats && Array.isArray(chats) && chats.map((item: any) => (
          item && (
            <ChatItem
              key={item.userId}
              id={item.userId}
              unread={item.unreadCount}
              sender={item.title}
              messages={item.message}
              setSelectedChat={setSelectedChat}
              selectedChatId={selectedChatId}
            />
          )
        ))}
      </List>
      <NewChatModal />



    </Sheet>
  );
}
