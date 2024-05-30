"use client";
import * as React from 'react';
import Box from '@mui/joy/Box';
import Sheet from '@mui/joy/Sheet';
import Stack from '@mui/joy/Stack';
import ChatBubble from './ChatBubble';
import MessageInput from './MessageInput';
import MessagesPaneHeader from './MessagesPaneHeader';
import { ChatProps, MessageProps } from '../types';

type MessagesPaneProps = {
  socket: any;
  chat: ChatProps;
};

export default function MessagesPane(props: MessagesPaneProps) {
  const { socket, chat  } = props;
  const [textAreaValue, setTextAreaValue] = React.useState('');
  const [chatMessages, setChatMessages] = React.useState<MessageProps[]>([]);

  // Fetch messages when chat.userId changes
  React.useEffect(() => {
    if (chat.userId) {
      socket.emit('getMessages', { id: chat.userId, maxId: 0 });
    }
  }, [chat.userId, socket]);

  // Listen for incoming messages
  React.useEffect(() => {
    const onMessages = (value: MessageProps[]) => {
      setChatMessages(value);
    };

    socket.on('getMessages', onMessages);

    return () => {
      socket.off('getMessages', onMessages);
    };
  }, [socket]);

  const onNewMessage = (value: any) => {
 
    //if previus message same as new message then return
    
    setChatMessages((prevMessages: MessageProps[]) => {
      console.log(prevMessages);
      console.log(value);
      console.log(localStorage.getItem('selectedChat'));
      console.log(value.peerId.userId);
      
      if(localStorage.getItem('selectedChat') == `"${value.peerId.userId}"`)
      {
        return [...prevMessages, value];
      }
      else{
        return prevMessages;
      }
     
    });

    

    

};
  React.useEffect(() => {
    
   
    socket.on('newMessages', onNewMessage);

    
  }, [socket]);

  const handleSendMessage = () => {
    if (textAreaValue.trim()) {
      const newMessage: MessageProps = {
        id: chat.userId  ,
        out: true,
        message: textAreaValue,
        date: Date.now().toString(),};
      
      setChatMessages([...chatMessages, newMessage]);
      setTextAreaValue('');
      
      // Optionally, you can emit the new message to the server
      socket.emit('sendMessage', newMessage);
    }
  };

  return (
    <Sheet
      sx={{
        height: { xs: 'calc(100dvh - var(--Header-height))', lg: '100dvh' },
        display: 'flex',
        flexDirection: 'column',
        backgroundColor: 'background.level3',
      }}
    >
      <MessagesPaneHeader sender={chat.title} />
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
                <ChatBubble variant={isYou ? 'sent' : 'received'} {...message} />
              </Stack>
            );
          })}
        </Stack>
      </Box>
      <MessageInput
        textAreaValue={textAreaValue}
        setTextAreaValue={setTextAreaValue}
        userId={chat.userId}
        onSubmit={handleSendMessage}
      />
    </Sheet>
  );
}
