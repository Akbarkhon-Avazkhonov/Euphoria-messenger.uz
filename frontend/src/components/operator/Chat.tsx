"use client";
import * as React from 'react';
import { Snackbar, Typography, Button, ListDivider, List } from '@mui/joy';
import Sheet from '@mui/joy/Sheet';

import { socket } from '@/socket';
import MessagesPane from '../ui/MessagesPane';
import Chat from '../ui/chat/Chat';
import DialogsSearch from '@/components/ui/dialogs/DialogsSearch';
import DialogsHeader from '@/components/ui/dialogs/DialogsHeader';
import DialogsItem from '../ui/dialogs/DialogsItem';
import ConnectedModal from '../ui/dialogs/ConnectedModal';
import NewMessageModal from '../ui/dialogs/NewMessageModal';
import { message } from 'telegram/client';
const test_chats = [
  {
    userId: 1,
    title: 'John Doe',
    message: 'Hello',
    unreadCount: 2,
  },
  {
    userId: 2,
    title: 'Jane Doe',
    message: 'Hi',
    unreadCount: 1,
    phone: '+1234567890',
    date: '2021-09-01T12:00:00Z',
  },
  {
    userId: 3,
    title: 'Alice',
    message: 'Hey',
    unreadCount:200
  },
  {
    userId: 4,
    title: 'Bob',
    message: 'Hola',
    unreadCount: 10
  },
  {
    userId: 5,
    title: 'Charlie',
    message: 'Bonjour',
    unreadCount: 0
  },
  {
    userId: 6,
    title: 'David',
    message: 'Ciao',
  },
  {
    userId: 7,
    title: 'Eve',
    message: 'Namaste',
  },
  {
    userId: 8,
    title: 'Frank',
    message: 'Konnichiwa',
  },
  {
    userId: 9,
    title: 'Grace',
    message: 'Guten Tag',
  },
  {
    userId: 10,
    title: 'Heidi',
    message: 'Shalom',
  },
];
export default function MyProfile() {
  const [selectedUserId, setSelectedUserId] = React.useState<string>('');
  const [chats, setChats] = React.useState<any[]>([]);
  const [newMessage, setNewMessage] = React.useState<any>();
  const [isConnected, setIsConnected] = React.useState(socket.connected);


  // React.useEffect(() => {
  //   function onConnect() {
  //     setIsConnected(true);
  //   }

  //   function onDisconnect() {
  //     setIsConnected(false);
  //   }

  //   function onDialogs(value: any[]) {
  //     setChats(value);
  //     localStorage.setItem('chats', JSON.stringify(value));
  //   }

  //   function onNewMessage(value: { peerId: { userId: any; name: any; }; message: any; }) {
  //       setChats((prevChats) => {
  //       const updatedChats = prevChats.map((chat) => {
  //         if (chat.userId === value.peerId.userId) {
  //           return { ...chat, message: value.message };
  //         }
  //         return chat;
  //       });
  //       if (!updatedChats.find((chat) => chat.userId === value.peerId.userId)) {
  //         updatedChats.push({
  //           userId: value.peerId.userId,
  //           name: value.peerId.name,
  //           message: value.message,
  //         });
  //       }
  //       localStorage.setItem('chats', JSON.stringify(updatedChats));
  //       return updatedChats;
  //     });
  //     setNewMessage(value);
  //   }

  //   socket.on('connect', onConnect);
  //   socket.on('disconnect', onDisconnect);
  //   socket.on('getDialogs', onDialogs);
  //   socket.on('newMessages', onNewMessage);

  //   return () => {
  //     socket.off('connect', onConnect);
  //     socket.off('disconnect', onDisconnect);
  //     socket.off('getDialogs', onDialogs);
  //     socket.off('newMessages', onNewMessage);
  //   };
  // }, []);



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
      <ConnectedModal isConnected={isConnected} setIsConnected={setIsConnected}/>
      <NewMessageModal newMessage={newMessage} setNewMessage={setNewMessage} />

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
          <Sheet
      sx={{
        borderRight: '1px solid',
        borderColor: 'divider',
        height: 'calc(100dvh - var(--Header-height))',
        overflowY: 'auto',
      }}
    >
        <DialogsHeader/>
        <DialogsSearch/>
        <List
        sx={{
          py: 0,
          '--ListItem-paddingY': '0.75rem',
          '--ListItem-paddingX': '1rem',
        }}
      >
        {
            test_chats.map((chat) => (
              <DialogsItem 
                key={chat.userId.toString()}
                title={chat.title}
                phone={chat.phone}
                message={chat.message}
                date={chat.date}
                unreadCount={chat.unreadCount}
                selected={selectedUserId === chat.userId.toString()}
                setSelectedUserId={setSelectedUserId}
                userId={chat.userId.toString()}
              />

            ))

         
        }
         </List>
         </Sheet>
        {/* <Chat socket={socket} chats={test_chats} selectedChatId={selectedChat.id} setSelectedChat={handleSetSelectedChat} /> */}
      </Sheet>
      {/* <MessagesPane chat={selectedChat} socket={socket} /> */}
    </Sheet>
  );
}
