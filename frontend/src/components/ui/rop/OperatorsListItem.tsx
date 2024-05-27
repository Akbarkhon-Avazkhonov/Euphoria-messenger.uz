import * as React from 'react';
import Box from '@mui/joy/Box';
import ListDivider from '@mui/joy/ListDivider';
import ListItem from '@mui/joy/ListItem';
import ListItemButton, { ListItemButtonProps } from '@mui/joy/ListItemButton';
import Stack from '@mui/joy/Stack';
import Typography from '@mui/joy/Typography';
import AvatarWithStatus from '../AvatarWithStatus';
import { ChatProps } from '../../types';
import { toggleMessagesPane } from '../../utils';

type ChatListItemProps = ListItemButtonProps & {
  id: string;
  unread?: boolean;
  username: string;
  messages: string;
  selectedChatId?: string;
  setSelectedChat: (chat: any) => void;
};

export default function OperatorListItem(props: ChatListItemProps) {
  const { id, username, selectedChatId, setSelectedChat } = props;
  const selected = selectedChatId === id;
  return (
    <React.Fragment>
      <ListItem >
        <ListItemButton
          onClick={() => {
            toggleMessagesPane();
            setSelectedChat({username});
            //save session to local storage from local storage operators
            const operators = JSON.parse(localStorage.getItem('operators') || '');
            const operator = operators.find((operator: any) => operator.username === username);
            localStorage.setItem('session', operator.session);            
            window.location.reload();
          }}
          selected={selected}
          color="neutral"
          sx={{
            flexDirection: 'column',
            alignItems: 'initial',
            gap: 1,
          }}
        >
          <Stack direction="row" spacing={1.5}>
            <AvatarWithStatus   />
            <Box sx={{ flex: 1 }}>
              <Typography level="title-sm">{username}</Typography>
              {/* <Typography level="body-sm">{sender.username}</Typography> */}
            </Box>
            <Box
              sx={{
                lineHeight: 1.5,
                textAlign: 'right',
              }}
            >
              {/* { && (
                <CircleIcon sx={{ fontSize: 12 }} color="primary" />
              )} */}
              <Typography
                level="body-xs"
                display={{ xs: 'none', md: 'block' }}
                noWrap
              >
                {/* 5 mins ago */}
              </Typography>
            </Box>
          </Stack>
          {/* <Typography
            level="body-sm"
            sx={{
              display: '-webkit-box',
              WebkitLineClamp: '2',
              WebkitBoxOrient: 'vertical',
              overflow: 'hidden',
              textOverflow: 'ellipsis',
              
            }}
          >
            {messages}
          </Typography> */}
        </ListItemButton>
      </ListItem>
      <ListDivider sx={{ margin: 0 }} />
    </React.Fragment>
  );
}
