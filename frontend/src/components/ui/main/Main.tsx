import * as React from 'react';
import Sheet from '@mui/joy/Sheet';

import { io } from 'socket.io-client';
import MessagesPane from '../MessagesPane';
import Chat from '../chat/Chat';
import { Snackbar, Typography } from '@mui/joy';

export default function MyProfile() {
  const [selectedChat, setSelectedChat] = React.useState<any>({});
  const [chats, setChats] = React.useState<any>([]);
  const [messages, setMessages] = React.useState([]);
  const [newMes, setNewMes] = React.useState<any>(null);

  React.useEffect(() => {
    const session = localStorage.getItem('session');
    if (session) {
      const newSocket = io('http://localhost:5001', {
        extraHeaders: {
          session: session,
        },
      });

      newSocket.on('message', (newMessage: any) => {
        setNewMes(newMessage);  
        console.log(newMessage);
        setChats((prevData: Array<any>) => {
          const updatedData = prevData.map((item) => {
            if (item.userId === newMessage.peerId.userId) {
              return { ...item, message: newMessage.message, unreadCount: item.unreadCount + 1 };
            }
            return item;
          });

          const isNewUser = !updatedData.some((item) => item.userId === newMessage.peerId.userId);
          if (isNewUser) {
            updatedData.push({
              userId: newMessage.peerId.userId,
              message: newMessage.message,
              unreadCount: 1,
              title: newMessage.peerId.title,
            });
          }

          return updatedData;
        });
      });

      return () => {
        newSocket.close();
      };
    }
  }, []);

  React.useEffect(() => {
    const session = localStorage.getItem('session');
    if (session) {
      const fetchData = async () => {
        const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/messages/getDialogs`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            session: session,
          },
        });
        const result = await response.json();
        setChats(result);
      };
      fetchData();
    }
  }, []);


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
        <Chat
          chats={chats}
          selectedChatId={selectedChat.id}
          setSelectedChat={setSelectedChat}
        />
      </Sheet>
      <MessagesPane chat={selectedChat} />
      <Snackbar 
      anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      open={!!newMes}
      autoHideDuration={5000}
      onClose={() => setNewMes(null)}
      variant='soft'
      color='primary'>
        {newMes && (
          <Typography level="body-sm" sx={{ color: 'text.secondary' }}>
            {newMes.message}
          </Typography>
        )}
      </Snackbar>
    </Sheet>
  );
}
