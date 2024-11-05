"use client";

import * as React from 'react';
import Avatar from '@mui/joy/Avatar';
import Box from '@mui/joy/Box';
import Stack from '@mui/joy/Stack';
import Sheet from '@mui/joy/Sheet';
import Typography from '@mui/joy/Typography';
import InsertDriveFileRoundedIcon from '@mui/icons-material/InsertDriveFileRounded';
import relativeDate from '@/utils/date';
import { socket } from "@/socket";
import { MessageProps } from '@/types/message';
import { Card, CardCover } from '@mui/joy';
import { AudioPlayer } from 'react-audio-play';
import ModalImage from "react-modal-image";

type ChatBubbleProps = MessageProps & {
  userId: string;
  variant: 'sent' | 'received';
  photoUrl?: any;
  canReadPhoto?: boolean;
  voiceUrl?: any;
};

export default function ChatBubble(props: ChatBubbleProps) {
  const { message, out,media = undefined ,date, photoUrl=undefined ,canReadPhoto , voiceUrl = undefined} = props;
  const isSent = out;
  const [isHovered, setIsHovered] = React.useState<boolean>(false);
  const [isLiked, setIsLiked] = React.useState<boolean>(false);
  const [isCelebrated, setIsCelebrated] = React.useState<boolean>(false);
  let fileName = 'Отправленный файл'

  if (media != 'null' && media) {
    try{
    const mediaObj = JSON.parse(media)
    const mediaAttributes = mediaObj.document.attributes
    for (let i in mediaAttributes) {
      Object.keys(mediaAttributes[i]).forEach((keyName) => {
        if (keyName=='fileName') {
          fileName = mediaAttributes[i][keyName]
          
        }
      }
      );
    }}
    catch(e){
    }
  }

  if (photoUrl && !canReadPhoto) {
    return  <Sheet
    variant="outlined"
    sx={{
      px: 1.75,
      py: 1.25,
      borderRadius: 'lg',
      borderTopRightRadius: isSent ? 0 : 'lg',
      borderTopLeftRadius: isSent ? 'lg' : 0,
    }}
  >
    <Stack direction="row" spacing={1.5} alignItems="center"  sx={
      {
        cursor: 'pointer'
      }
    }>
      <Avatar color="primary" size="lg">
        <InsertDriveFileRoundedIcon />
      </Avatar>
      <div>
        <Typography fontSize="sm">{'Вам не разрешено просматривать фото'}</Typography>
        {/* <Typography level="body-sm">{media.size}</Typography> */}
      </div>
    </Stack>
  </Sheet>
  } else if (voiceUrl) {
    return  <Sheet
    variant="outlined"
    sx={{
     
      borderRadius: 'lg',
      borderTopRightRadius: isSent ? 0 : 'lg',
      borderTopLeftRadius: isSent ? 'lg' : 0,
      minWidth: '400px'
      
    }}
  >
     <AudioPlayer src={`${process.env.NEXT_PUBLIC_BACKEND_URL}/${voiceUrl}`}  style={{width:'100%'}} backgroundColor ={'var(--joy-palette-background-level1)'} sliderColor={'var(--joy-palette-primary-500)'} preload='metadata' color={'var(--joy-palette-primary-500)'} />
  </Sheet>
  }
  const handleGetFile = () => {
    socket.emit('getFile', {userId: props.userId, messageId: props.id})
  }
  return (
    <Box sx={{ maxWidth: '60%', minWidth: 'auto' }}>
      <Stack
        direction="row"
        justifyContent="end"
        spacing={2}
        sx={{ mb: 0.25 }}
      >
        <Typography level="body-xs">
          {/* {out &&  sender : sender.name} */}
        </Typography>
        <Typography level="body-xs">{relativeDate(date)}</Typography>

        <Typography level="body-xs">{}</Typography>
      </Stack>
      {media != 'null' && media && canReadPhoto ? (
         <>
        {
          photoUrl ? (
            <Card sx={{ maxWidth: 600, flexGrow: 1, minHeight: '200px' }}>
              <CardCover>
              <ModalImage
                  small={`${process.env.NEXT_PUBLIC_BACKEND_URL}/${photoUrl}`}
                  large={`${process.env.NEXT_PUBLIC_BACKEND_URL}/${photoUrl}`}
                  alt="Hello World!"
                />
                {/* <img
                  loading='lazy'
                  alt={photoUrl}
                  src={`${process.env.NEXT_PUBLIC_BACKEND_URL}/${photoUrl}`}
                  style={{ objectFit: 'contain', height: '100%', width: '100%' }}
                /> */}
              </CardCover>
            </Card>

          ): (<Sheet
            variant="outlined"
            sx={{
              px: 1.75,
              py: 1.25,
              borderRadius: 'lg',
              borderTopRightRadius: isSent ? 0 : 'lg',
              borderTopLeftRadius: isSent ? 'lg' : 0,
            }}
          >
            <Stack direction="row" spacing={1.5} alignItems="center" onClick={handleGetFile} sx={
              {
                cursor: 'pointer'
              }
            }>
              <Avatar color="primary" size="lg">
                <InsertDriveFileRoundedIcon />
              </Avatar>
              <div>
                <Typography fontSize="sm">{fileName}</Typography>
                {/* <Typography level="body-sm">{media.size}</Typography> */}
              </div>
            </Stack>
          </Sheet>)
        }
        </>
      ) : (
        <Box
          sx={{ position: 'relative' }}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          {
            message ?
            <Sheet
            color={isSent  ? 'primary' : 'neutral' }
            variant={isSent ? 'solid' : 'soft'}
            sx={{
              p: 1.25,
              borderRadius: 'lg',
              borderTopRightRadius: isSent ? 0 : 'lg',
              borderTopLeftRadius: isSent ? 'lg' : 0,
              backgroundColor: isSent
                ? 'var(--joy-palette-primary-solidBg)'
                : 'background.body',
            }}
          >
            <Typography
              level="body-sm"
              sx={{
                color: isSent
                  ? 'var(--joy-palette-common-white)'
                  : 'var(--joy-palette-text-primary)',
              }}
            >
              {message}
            </Typography>
          </Sheet>

          :
          <Sheet
            color={isSent  ? 'primary' : 'neutral' }
            variant={isSent ? 'solid' : 'soft'}
            sx={{
              p: 1.25,
              borderRadius: 'lg',
              borderTopRightRadius: isSent ? 0 : 'lg',
              borderTopLeftRadius: isSent ? 'lg' : 0,
              backgroundColor: isSent
                ? 'var(--joy-palette-primary-solidBg)'
                : 'background.body',
            }}
          >
            <Typography
              level="body-sm"
              sx={{
                color: 'var(--joy-palette-danger-solidBg)'
              }}
            >
              {media ? media : 'Сообщение не поддерживается в данной версии приложения'}
            </Typography>
          </Sheet>
          }
          {(isHovered || isLiked || isCelebrated) && (
            <Stack
              direction="row"
              justifyContent={isSent ? 'flex-end' : 'flex-start'}
              spacing={0.5}
              sx={{
                position: 'absolute',
                top: '50%',
                p: 1.5,
                ...(isSent
                  ? {
                      left: 0,
                      transform: 'translate(-100%, -50%)',
                    }
                  : {
                      right: 0,
                      transform: 'translate(100%, -50%)',
                    }),
              }}
            >
              {/* <IconButton
                variant={isLiked ? 'soft' : 'plain'}
                color={isLiked ? 'danger' : 'neutral'}
                size="sm"
                onClick={() => setIsLiked((prevState) => !prevState)}
              >
                {isLiked ? '❤️' : <FavoriteBorderIcon />}
              </IconButton> */}

            </Stack>
          )}
        </Box>
      )}
    </Box>
  );
} 