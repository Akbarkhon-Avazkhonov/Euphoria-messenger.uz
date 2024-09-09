"use client";
import * as React from 'react';
import { List, Box, Stack } from '@mui/joy';
import Sheet from '@mui/joy/Sheet';

import { socket } from '@/socket';
import DialogsSearch from '@/components/ui/dialogs/DialogsSearch';
import DialogsHeader from '@/components/ui/dialogs/DialogsHeader';
import DialogsItem from '@/components/ui/dialogs/DialogsItem';
import ConnectedModal from '@/components/ui/dialogs/ConnectedModal';
import NewIncomeMessageModal from '@/components/ui/dialogs/NewIncomeMessageModal';
import NewDialogModal from '@/components/ui/dialogs/NewDialogModal';
import MessageHeader from '@/components/ui/messages/MessageHeader';
import MessageInput from '@/components/ui/messages/MessageInput';
import { Socket } from 'socket.io-client';
import DialogsSkeleton from '@/components/ui/dialogs/DialogsSkeleton';
import ChatBubble from '@/components/ui/messages/ChatBubble';
import ChatBubbleSkeleton from '@/components/ui/messages/ChatBubbleSkeleton';


interface ChatProps {
  socket: Socket;
}
export default function Chat(props: ChatProps) {
  const [selectedChat, setSelectedChat] = React.useState<any>({
    userId: '',
  });
  const [dialogs, setDialogs] = React.useState<any[]>([]);
  const [newMessage, setNewMessage] = React.useState<any>();
  const [isConnected, setIsConnected] = React.useState(false);
  const [textAreaValue, setTextAreaValue] = React.useState('');
  
  const [chatMessages, setChatMessages] = React.useState<any[]>([]);
  const setSelectedUserId = (userId: string) => {
    // find the chat with the given userId
    const chat = dialogs.find((chat) => chat.userId === userId);
    setSelectedChat(chat);
   
 
  };

  const sendNewMessage = (message: string, userId: string) => {
    props.socket.emit('sendMessage', { message, userId });
    setTextAreaValue('');
    setChatMessages((prev) => [
      ...prev,
      {
        message,
        out: true,
        date: new Date().toISOString(),
        peerId: { userId: userId },
      },
    ]);
    setDialogs((prev) => {
      const newDialogs = [...prev];
      const dialog = newDialogs.find((chat) => chat.userId === userId);
      if (dialog) {
        dialog.message = message;
        dialog.date = new Date().toISOString();
        dialog.unreadCount = 0;
      } else {
        newDialogs.unshift({
          userId: userId,
          title: 'User',
          phone: 'Phone',
          message: message,
          date: new Date().toISOString(),
          unreadCount: 0,
        });
      }
      return newDialogs;
    });
  };
  const onNewMessage = (message: any) => {
    console.log(message);
    setNewMessage(message);
    setDialogs((prev) => {
      const newDialogs = [...prev];
      const dialog = newDialogs.find((chat) => chat.userId === message.peerId.userId);
      if (dialog) {
        dialog.message = message.message;
        dialog.date = message.date;
        dialog.unreadCount = dialog.unreadCount ? dialog.unreadCount + 1 : 1;
      } else {
        newDialogs.unshift({
          userId: message.peerId.userId,
          title: message.peerId.name,
          phone: message.peerId.phone,
          message: message.message,
          date: message.date,
          unreadCount: 1,
        });
      }
      return newDialogs;
    });
    setChatMessages((prev) => [...prev, message]);
  };
  React.useLayoutEffect(() => {
    props.socket.on('connection', () => {
      setIsConnected(true);
    });
  }, []);
  React.useLayoutEffect(() => {
    props.socket.on('dialogs', (dialogs) => {
      setDialogs(dialogs);
    });
  }, []);
  React.useLayoutEffect(() => {
      setChatMessages([]);
    props.socket.emitWithAck('getMessages', {userId:selectedChat.userId}, () => {
      setChatMessages([]);
      }
    );
  }, [selectedChat]);
  React.useLayoutEffect(() => {
    props.socket.on('getMessages', (messages) => {
      console.log(messages);
      setChatMessages(messages);});
  }, []);
  React.useEffect(() => {
    props.socket.on('newMessage', (message) => {
      onNewMessage(message);  
    });
  }, []);

  React.useEffect(() => {
    props.socket.on('getFile', (data:any) => {

      console.log(data);
    //@ts-ignore
    window.open(data, '_blank');
      
      })
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
      height: 'calc(100dvh)',
      overflowY: 'scroll',
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
         dialogs.length ? (dialogs.map((chat) => (
            chat &&
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

          ))) :
          <DialogsSkeleton/>

       
      }
       </List>
       </Sheet>
       
       <NewDialogModal socket = {socket}/>
       
    </Sheet>
      <Sheet
    sx={{
      height: { xs: 'calc(100dvh)', lg: '100dvh' },
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
        {
          chatMessages.length ? null : 
          <>
          <ChatBubbleSkeleton variant='sent'/>
          <ChatBubbleSkeleton variant='received'/></>
        }
        
        {chatMessages.map((message: any, index: number) => {
          const isYou = message.out;
          const show = message.peerId.userId == selectedChat.userId;
          console.log(selectedChat.userId);
          if(show){
          return (
            <Stack
              key={index}
              direction="row"
              spacing={2}
              flexDirection={isYou ? 'row-reverse' : 'row'}
            >
              <ChatBubble variant={isYou ? 'sent' : 'received'} {...message} userId = {selectedChat.userId} />
            </Stack>
          );
        }
        })}
      </Stack>
    </Box>
    <MessageInput
      textAreaValue={textAreaValue}
      setTextAreaValue={setTextAreaValue}
      userId={selectedChat.userId}
      onSubmit={sendNewMessage}
    />
    

    
  </Sheet>
    <ConnectedModal isConnected={isConnected} setIsConnected={setIsConnected}/>
    <NewIncomeMessageModal newMessage={newMessage} setNewMessage={setNewMessage} />

  </Sheet>
  );
}
