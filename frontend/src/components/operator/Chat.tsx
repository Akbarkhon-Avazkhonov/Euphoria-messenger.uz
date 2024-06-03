"use client";
import * as React from 'react';
import { Snackbar, Typography, Button, ListDivider, List, Box, Stack } from '@mui/joy';
import Sheet from '@mui/joy/Sheet';

import { socket } from '@/socket';
import MessagesPane from '../ui/MessagesPane';
import DialogsSearch from '@/components/ui/dialogs/DialogsSearch';
import DialogsHeader from '@/components/ui/dialogs/DialogsHeader';
import DialogsItem from '../ui/dialogs/DialogsItem';
import ConnectedModal from '../ui/dialogs/ConnectedModal';
import NewIncomeMessageModal from '../ui/dialogs/NewIncomeMessageModal';
import NewChatModal from '../ui/dialogs/NewDialogModal';
import NewDialogIcon from '../ui/dialogs/NewDialogModal';
import NewDialogModal from '../ui/dialogs/NewDialogModal';
import MessageHeader from '../ui/messages/MessageHeader';
import MessageInput from '../ui/messages/MessageInput';
import { ChatBubble } from '@mui/icons-material';
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

  
];
export default function MyProfile() {
  const [selectedChat, setSelectedChat] = React.useState<any>({
    userId: '',
  });
  const [chats, setChats] = React.useState<any[]>(test_chats);
  const [newMessage, setNewMessage] = React.useState<any>();
  const [isConnected, setIsConnected] = React.useState(socket.connected);
  const [textAreaValue, setTextAreaValue] = React.useState('');

  const [chatMessages, setChatMessages] = React.useState<any[]>([]);
  const setSelectedUserId = (userId: string) => {
    // find the chat with the given userId
    const chat = chats.find((chat) => chat.userId.toString() === userId);
    setSelectedChat(chat);
   
 
  };
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
      <NewIncomeMessageModal newMessage={newMessage} setNewMessage={setNewMessage} />

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
                selected={selectedChat.userId == chat.userId.toString()}
                setSelectedUserId={(userId) => setSelectedUserId(userId)}
                userId={chat.userId.toString()}
              />

            ))

         
        }
         </List>
         </Sheet>
         
         <NewDialogModal socket = {socket}/>
         
      </Sheet>
  
        <Sheet
      sx={{
        height: { xs: 'calc(100dvh - var(--Header-height))', lg: '100dvh' },
        display: 'flex',
        flexDirection: 'column',
        backgroundColor: 'background.level3',
      }}
    >
      
      <MessageHeader title={selectedChat.title} />
      <Box
        sx={{
          display: 'flex',
          flex: 1,
          minHeight: 0,
          px: 2,
          py: 3,
          overflowY: 'scroll',
          flexDirection: 'column-reverse',
        }}
      >
        <Stack spacing={2} justifyContent="flex-end">
          {chatMessages.map((message: MessageProps, index: number) => {
            const isYou = message.out;
            return (
              <Stack
                key={index}
                direction="row"
                spacing={2}
                flexDirection={isYou ? 'row-reverse' : 'row'}
              >
                {/* <ChatBubble variant={isYou ? 'sent' : 'received'} {...message} /> */}
              </Stack>
            );
          })}
        </Stack>
      </Box>
      <MessageInput
        textAreaValue={textAreaValue}
        setTextAreaValue={setTextAreaValue}
        userId={selectedChat.userId}
        onSubmit={console.log}
      />
      
    </Sheet>
      {/* <MessagesPane chat={selectedChat} socket={socket} /> */}
    </Sheet>
  );
}
