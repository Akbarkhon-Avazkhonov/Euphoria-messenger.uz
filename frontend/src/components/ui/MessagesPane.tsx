import * as React from 'react';
import Box from '@mui/joy/Box';
import Sheet from '@mui/joy/Sheet';
import Stack from '@mui/joy/Stack';
import AvatarWithStatus from './AvatarWithStatus';
import ChatBubble from './ChatBubble';
import MessageInput from './MessageInput';
import MessagesPaneHeader from './MessagesPaneHeader';
import { ChatProps, MessageProps } from '../types';

type MessagesPaneProps = {
  chat: ChatProps;
};

export default function MessagesPane(props: MessagesPaneProps) {
  const { chat } = props;
  const [textAreaValue, setTextAreaValue] = React.useState('');
  const [chatMessages, setChatMessages] = React.useState([]);

  React.useEffect(() => {
    const fetchData = async () => {
      const data = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/messages/getMessages`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'session': `${localStorage.getItem('session')}`,
        },
        body: JSON.stringify({
          id: chat.userId,
        }),
      });
      const response = await data.json();
      setChatMessages(response);
    };

    fetchData();
  }, [chat.userId]);

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
          {chatMessages.length && chatMessages.map((message: MessageProps, index: number) => {
            const isYou = message.out ;
            return (
              <Stack
                key={index}
                direction="row"
                spacing={2}
                flexDirection={isYou ? 'row-reverse' : 'row'}
              >
                {/* {!message.out && (
                  <AvatarWithStatus
              
                  />
                )} */}
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
        onSubmit={() => {
          const newId = chatMessages.length + 1;
          const newIdString = newId.toString();
          setChatMessages([
            ...chatMessages,
            {
              id: chat.userId,
              title: 'You',
              out: true,
              message: textAreaValue,
              timestamp: 'Just now',
            },
          ]);
        }}
      />
    </Sheet>
  );
}
