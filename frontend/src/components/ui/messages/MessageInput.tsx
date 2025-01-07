"use client";

import * as React from 'react';
import Box from '@mui/joy/Box';
import Button from '@mui/joy/Button';
import FormControl from '@mui/joy/FormControl';
import Textarea from '@mui/joy/Textarea';
import { IconButton, Stack } from '@mui/joy';
import SendRoundedIcon from '@mui/icons-material/SendRounded';
import { AttachFileRounded, ImageRounded } from '@mui/icons-material';
import SendFile from './SendFile';
import SendAudio from './SendAudio';
import { fetchAccess, getDecryptedCookie } from '@/utils/access';
import SendPhoto from './SendPhoto';
import SendVideo from './SendVideo';

export type MessageInputProps = {
  textAreaValue: string;
  userId: string;
  setTextAreaValue: (value: string) => void;
  onSubmit: (message: string, userId: string) => void;
};

export default function MessageInput(props: MessageInputProps) {
  const { textAreaValue, setTextAreaValue, onSubmit, userId } = props;
  const textAreaRef = React.useRef<HTMLDivElement>(null);

  // Локальное состояние для хранения информации о правах доступа
  const [access, setAccess] = React.useState<boolean | null>(null);



  // Эффект для получения доступа при монтировании компонента
  React.useEffect(() => {
    fetchAccess('can_write', setAccess);
  }, []);

  // Обработчик отправки сообщения
  const handleClick = () => {
    if (textAreaValue.trim() !== '' && access) {
      onSubmit(textAreaValue, userId);
      setTextAreaValue(''); // Очищаем текстовое поле после отправки
    }
  };

  // Возврат `null`, если доступ не проверен или отсутствует
  if (access === null) {
    return <></>;
  }

  return (
    <Box sx={{ px: 2, pb: 2 }}>
      <FormControl>
        <Textarea
          placeholder="Введите сообщение..."
          aria-label="Message"
          ref={textAreaRef}
          onChange={(e) => setTextAreaValue(e.target.value)}
          value={textAreaValue}
          maxRows={15}
          disabled={!access} // Отключаем поле ввода, если доступ запрещен
          endDecorator={
            <Stack
              direction="row"
              justifyContent="space-between"
              alignItems="center"
              flexGrow={1}
              sx={{
                py: 1,
                pr: 1,
                borderTop: '1px solid',
                borderColor: 'divider',
              }}
            >
              <Stack direction="row">
              {
                (+userId > 10000) &&
                <>
                {/* Компонент для отправки аудио */}
                <SendAudio userId={userId} setTextAreaValue={setTextAreaValue}  />
                {/* Компонент для отправки видео */}
                <SendVideo userId={userId}  setTextAreaValue={setTextAreaValue} />
                {/* Компонент для отправки файла */}
                <SendFile userId={userId} />
                {/* Компонент для отправки фото */}
                <SendPhoto userId={userId} />
                </>
              }
              </Stack>

              {/* Кнопка отправки сообщения */}
              <Button
                size="sm"
                color="primary"
                sx={{ alignSelf: 'center', borderRadius: 'sm' }}
                endDecorator={<SendRoundedIcon />}
                onClick={handleClick}
                disabled={!access} // Отключаем кнопку, если доступ запрещен
              >
                Отправить
              </Button>
            </Stack>
          }
          onKeyDown={(event) => {
            // Отправка сообщения при нажатии "Ctrl + Enter" или "Cmd + Enter"
            if (event.key === 'Enter' && (event.metaKey || event.ctrlKey)) {
              handleClick();
            }
          }}
          sx={{
            '& textarea:first-of-type': {
              minHeight: 48,
            },
          }}
        />
      </FormControl>
    </Box>
  );
}
