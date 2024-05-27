import * as React from 'react';
import Stack from '@mui/joy/Stack';
import Sheet from '@mui/joy/Sheet';
import Typography from '@mui/joy/Typography';
import { Box, Chip, IconButton, Input } from '@mui/joy';
import List from '@mui/joy/List';
import EditNoteRoundedIcon from '@mui/icons-material/EditNoteRounded';
import SearchRoundedIcon from '@mui/icons-material/SearchRounded';
import CloseRoundedIcon from '@mui/icons-material/CloseRounded';
import ChatListItem from './ChatListItem';
import { ChatProps } from '../types';
import { toggleMessagesPane } from '../utils';
import { LogoutRounded, MenuRounded } from '@mui/icons-material';
import ColorSchemeToggle from './ColorSchemeToggle';
import LogoutModal from './LogoutModal';

type ChatsPaneProps = {
  chats: ChatProps[];
  setSelectedChat: (chat: ChatProps) => void;
  selectedChatId: string;
};

export default function ChatsPane(props: ChatsPaneProps) {
  const { chats, setSelectedChat, selectedChatId } = props;
  const [data, setData] = React.useState<any>([]);
  React.useEffect(() => {
    const fetchData = async () => {
      if (localStorage.getItem('session')) {
        const data = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/messages/getDialogs`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'session': `${localStorage.getItem('session')}`
          }
        });
        const response = await data.json();
        setData(response);
        console.log(response);
      }
    };

    fetchData();

  }, []);


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
       {
        data && Array.isArray(data) && data.map((item: any) => (
          item &&
          <ChatListItem
            key={item.userId}
            id={item.userId}
            unread={item.unreadCount}
            sender={item.title}
            messages={item.message}
            setSelectedChat={setSelectedChat}
            selectedChatId={selectedChatId}
          />
        ))
       }
      </List>
    </Sheet>
  );
}
