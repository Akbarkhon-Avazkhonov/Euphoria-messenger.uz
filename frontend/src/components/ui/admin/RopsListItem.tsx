"use client";
import * as React from 'react';
import Box from '@mui/joy/Box';
import ListDivider from '@mui/joy/ListDivider';
import ListItem from '@mui/joy/ListItem';
import ListItemButton, { ListItemButtonProps } from '@mui/joy/ListItemButton';
import Stack from '@mui/joy/Stack';
import Typography from '@mui/joy/Typography';
import AvatarWithStatus from '../AvatarWithStatus';
// import { setCookie } from 'cookies-next';
// import { getCookie } from 'cookies-next';
type RopListItemProps = ListItemButtonProps & {
  operator:any
  selectedChatId?: string;
  setSelectedChat: (chat: ChatProps) => void;
};


export default function RopsListItem(props: RopListItemProps) {
  const { operator, selectedChatId, setSelectedChat } = props;
  // const session = decodeURIComponent(getCookie('session') || '');

  // const selected = operator.session == session;
  // const handleSelectOperator = async () => {
  //   setCookie('session', encodeURIComponent(operator.session), {
  //     maxAge: 60 * 60 * 24 * 7,
  //     path: '/',
  //   });
  //   window.location.reload();
  
  // };
  
  return (
    <React.Fragment>
      <ListItem>
        <ListItemButton
          // onClick={() => {
          //   toggleMessagesPane();
          //   handleSelectOperator();
          // }}
          // selected={selected}
          color="neutral"
          
          sx={{
            flexDirection: 'column',
            alignItems: 'initial',
            gap: 1,
          }}
        >
          <Stack direction="row" spacing={1.5}>
            <AvatarWithStatus  />
            <Box sx={{ flex: 1 }}>
              <Typography level="title-sm">{operator.username}</Typography>
              <Typography level="body-sm">{operator.phoneNumber}</Typography>
            </Box>
            <Box
              sx={{
                lineHeight: 1.5,
                textAlign: 'right',
              }}
            >
              
              <Typography
                level="body-xs"
                display={{ xs: 'none', md: 'block' }}
                noWrap
              >
                {operator.password}
              </Typography>
            </Box>
          </Stack>

        </ListItemButton>
      </ListItem>
      <ListDivider sx={{ margin: 0 }} />
    </React.Fragment>
  );
}
