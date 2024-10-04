"use client";
import * as React from 'react';
import Box from '@mui/joy/Box';
import ListItem from '@mui/joy/ListItem';
import ListItemButton, { ListItemButtonProps } from '@mui/joy/ListItemButton';
import Stack from '@mui/joy/Stack';
import Typography from '@mui/joy/Typography';
import AvatarWithStatus from '../AvatarWithStatus';
import { Chip, ListDivider } from '@mui/joy';
import { convertDate } from '@/utils/date';
interface DialogsItemProps {
  avatar?: string | undefined;
  userId: string;
  title: string;
  unreadCount: string | number | undefined;
  phone: string | undefined;
  message: string | undefined;
  selected: boolean;
  date: Date;
  status: any;
  setSelectedUserId: (userId: string) => void;
}

export default function DialogsItem(props: DialogsItemProps) {
  if (props.userId === '777000') {
    return null;
  }
  return (
    <>
      <ListItem >
        <ListItemButton
          onClick={() => {
            props.setSelectedUserId(props.userId.toString());
          }}
          selected={props.selected}
          color="neutral"
          sx={{
            flexDirection: 'column',
            alignItems: 'initial',
            gap: 1,
          }}
        >
          <Stack direction="row" spacing={1.5}>
            <AvatarWithStatus status={props.status} fullname={props.title} online={true} />
            <Box sx={{ flex: 1 }}>
              <Typography level="title-sm">{props.title}</Typography>
              <Typography level="body-sm">{props.phone}</Typography>
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
                {convertDate(props.date)}
              </Typography>
              {props.unreadCount ? (
                <Chip
                  variant="solid"
                  color="primary"
                  size="sm"

                >
                  {props.unreadCount}
                </Chip>
              ) : null
              }
            </Box>
          </Stack>
          <Typography
            level="body-sm"
            sx={{
              display: '-webkit-box',
              WebkitLineClamp: '2',
              WebkitBoxOrient: 'vertical',
              overflow: 'hidden',
              textOverflow: 'ellipsis',

            }}
          >
            {props.message}
          </Typography>
        </ListItemButton>
      </ListItem>
      <ListDivider sx={{ margin: 0 }} inset='gutter' />
    </>


  );
}
