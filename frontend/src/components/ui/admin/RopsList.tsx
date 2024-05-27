import * as React from 'react';
import Stack from '@mui/joy/Stack';
import Sheet from '@mui/joy/Sheet';
import Typography from '@mui/joy/Typography';
import { Box, IconButton, Input, ListItem, ListItemButton, ListItemContent } from '@mui/joy';
import List from '@mui/joy/List';
import SearchRoundedIcon from '@mui/icons-material/SearchRounded';
import { ChatProps } from '../../types';
import RopsListItem from './RopsListItem';
import { EventAvailableRounded, EventRepeatRounded, GroupRounded, KeyboardArrowDownRounded, PersonAddRounded, TuneRounded } from '@mui/icons-material';
import AddUser from './AddUser';
import AvatarWithStatus from '../AvatarWithStatus';
import Snackbar from '@mui/joy/Snackbar';


function Toggler(props: {
  defaultExpanded?: boolean;
  children: React.ReactNode;
  renderToggle: (params: {
    open: boolean;
    setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  }) => React.ReactNode;
}) {
  const { defaultExpanded = false, renderToggle, children } = props;
  const [open, setOpen] = React.useState(defaultExpanded);
  

  return (
    <React.Fragment>
      {renderToggle({ open, setOpen })}
      <Box
        sx={{
          display: 'grid',
          gridTemplateRows: open ? '1fr' : '0fr',
          transition: '0.2s ease',
          '& > *': {
            overflow: 'hidden',
          },
        }}
      >
        {children}
      </Box>
    </React.Fragment>
  );
}

type ChatsPaneProps = {
  chats: ChatProps[];
  setSelectedChat: (chat: ChatProps) => void;
  selectedChatId: string;
};

export default function RopsList(props: any) {
  const [open, setOpen] = React.useState(false);
  const { chats, setSelectedChat, selectedChatId } = props;
  const handleToast = () => {
    setOpen(true);
  }
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
     
     <AddUser />
        <Typography
          fontSize={{ xs: 'md', md: 'lg' }}
          component="h1"
          fontWeight="lg"
          sx={{ mr: 'auto' }}
        >
          РОПЫ
        </Typography>
   <IconButton 
   onClick={handleToast}>
    <TuneRounded />
   </IconButton>
        
   

      </Stack>
      <Box sx={{ px: 2, pb: 1.5 }}>
        <Input
          size="sm"
          startDecorator={<SearchRoundedIcon />}
          placeholder="Поиск..."
          aria-label="Search"
        />
      </Box>
      <List sx={{ '--List-nestedInsetStart': '1rem' }} > 
      <ListItem nested>
            <Toggler
              renderToggle={({ open, setOpen }) => (
                <ListItemButton onClick={() => setOpen(!open)}>
                  
                  <ListItemContent >
                  <Stack direction="row" spacing={1.5} >
            <AvatarWithStatus online={true}  />
            <Box sx={{ flex: 1 }}>
              <Typography level="title-sm">{"Akbarkhon"}</Typography>
              {/* <Typography level="body-sm">{sender.username}</Typography> */}
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
                5 mins ago
              </Typography>
            </Box>
          </Stack>
                  </ListItemContent>
                  <KeyboardArrowDownRounded
                    sx={{ transform: open ? 'rotate(180deg)' : 'none' }}
                  />
                </ListItemButton>
              )}
            >
            <List
        sx={{
          py: 0,
          '--ListItem-paddingY': '0.75rem',
          '--ListItem-paddingX': '1rem',
          
          
        }}
      >
        
        {chats.map((chat:any) => (
          <RopsListItem
            sender={{
              name: '',
              username: '',
              avatar: '',
              online: false
            }} messages={[]} key={chat.id}
            {...chat}
            setSelectedChat={setSelectedChat}
            selectedChatId={selectedChatId}          />
        ))}
      </List>
            </Toggler>
          </ListItem>
          </List>
          
          <Snackbar
        anchorOrigin={{ vertical: 'top', horizontal: 'center'}}
        open={open}
        onClose={() => setOpen(false)}
        color="warning"
        size="md"
        variant="outlined"
        invertedColors
        
      >
        <EventRepeatRounded  />
        В разработке 

      </Snackbar>
    </Sheet>
  );
}
