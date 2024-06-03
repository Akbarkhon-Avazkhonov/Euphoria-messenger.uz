"use client";
import * as React from 'react';
import { Snackbar, Typography, Button } from '@mui/joy';
import Sheet from '@mui/joy/Sheet';
import MessagesPane from '../MessagesPane';
import Chat from '../chat/Chat';
import { socket } from '@/socket';

export default function MyProfile() {
  const [selectedChat, setSelectedChat] = React.useState<any>({});
  const [chats, setChats] = React.useState<any[]>([]);
  const [newMessage, setNewMessage] = React.useState<any>(null);
  const [isConnected, setIsConnected] = React.useState(socket.connected);

  const handleSetSelectedChat = (chat: any) => {
    setSelectedChat(chat);
    localStorage.setItem('selectedChat', JSON.stringify(chat.id));
  };
  React.useEffect(() => {
    function onConnect() {
      setIsConnected(true);
    }

    function onDisconnect() {
      setIsConnected(false);
    }

    function onDialogs(value: any[]) {
      setChats(value);
      localStorage.setItem('chats', JSON.stringify(value));
    }

    function onNewMessage(value: { peerId: { userId: any; name: any; }; message: any; }) {
        setChats((prevChats) => {
        const updatedChats = prevChats.map((chat) => {
          if (chat.userId === value.peerId.userId) {
            return { ...chat, message: value.message };
          }
          return chat;
        });
        if (!updatedChats.find((chat) => chat.userId === value.peerId.userId)) {
          updatedChats.push({
            userId: value.peerId.userId,
            name: value.peerId.name,
            message: value.message,
          });
        }
        localStorage.setItem('chats', JSON.stringify(updatedChats));
        return updatedChats;
      });
      setNewMessage(value);
    }

    socket.on('connect', onConnect);
    socket.on('disconnect', onDisconnect);
    socket.on('getDialogs', onDialogs);
    socket.on('newMessages', onNewMessage);

    return () => {
      socket.off('connect', onConnect);
      socket.off('disconnect', onDisconnect);
      socket.off('getDialogs', onDialogs);
      socket.off('newMessages', onNewMessage);
    };
  }, []);

  // React.useEffect(() => {
  //   const storedChats = JSON.parse(localStorage.getItem('chats') || '[]');
  //   if (storedChats.length) {
  //     setChats(storedChats);
  //   }


  // React.useEffect(() => {
  //   selectedChat.id && socket.emit('getMessages', selectedChat.id);
  
  // }, [selectedChat]);


  return (
    <Sheet
      sx={{
        flex: 1,
        width: '100%',
        mx: 'auto',
        pt: { xs: 'var(--Header-height)', sm: 0 },
        display: 'grid',
        gridTemplateColumns: {
          xs: '1fr',
          sm: 'minmax(min-content, min(30%, 400px)) 1fr',
        },
      }}
    >
      {newMessage && (
        <Snackbar
          anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
          open={!!newMessage}
          autoHideDuration={5000}
          onClose={() => setNewMessage(null)}
          variant="soft"
          color="primary"
        >
          <Typography level="body-sm" sx={{ color: 'text.secondary' }}>
            {newMessage.message}
          </Typography>
        </Snackbar>
      )}
      {isConnected && (
        <Snackbar
          anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
          open={isConnected}
          autoHideDuration={5000}
          onClose={() => setIsConnected(false)}
          variant="soft"
        >
          <Typography level="body-sm" sx={{ color: 'text.secondary' }}>
            Connected
          </Typography>
        </Snackbar>
      )}
      <Sheet
        sx={{
          position: { xs: 'fixed', sm: 'sticky' },
          transform: {
            xs: 'translateX(calc(100% * (var(--MessagesPane-slideIn, 0) - 1)))',
            sm: 'none',
          },
          transition: 'transform 0.4s, width 0.4s',
          zIndex: 100,
          width: '400px',
          top: 52,
        }}
      >
        <Chat socket={socket} chats={chats} selectedChatId={selectedChat.id} setSelectedChat={handleSetSelectedChat} />
      </Sheet>
      <MessagesPane chat={selectedChat} socket={socket} />
    </Sheet>
  );
}
