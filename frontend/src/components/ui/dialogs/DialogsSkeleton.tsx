"use client";
import * as React from 'react';
import Box from '@mui/joy/Box';
import ListItem from '@mui/joy/ListItem';
import ListItemButton, { ListItemButtonProps } from '@mui/joy/ListItemButton';
import Stack from '@mui/joy/Stack';
import Typography from '@mui/joy/Typography';
import AvatarWithStatus from '../AvatarWithStatus';
import { Chip, ListDivider, Skeleton } from '@mui/joy';


export default function DialogsSkeleton() {
  return (
    <>
      <ListItem >
 
          <Stack direction="row" spacing={1.5}>
            <Skeleton variant="circular" width={32} height={32} />
            <Box sx={{ flex: 1 }}>
            <Skeleton variant="rectangular" width={200} height="1em" sx={{ mb: 1 }} />
            <Skeleton variant="rectangular" width={140} height="1em" />

            </Box>

          </Stack>


      </ListItem>
                    <ListDivider sx={{margin: 0 }} inset='gutter'/>
</>
      

  );
}
