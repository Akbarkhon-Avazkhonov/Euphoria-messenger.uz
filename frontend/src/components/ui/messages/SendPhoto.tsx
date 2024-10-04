import React, { useState } from 'react';
import { AttachFileRounded } from "@mui/icons-material";
import { IconButton } from "@mui/joy";
import { socket } from "@/socket";
import { fetchAccess } from '@/utils/access';
import AddPhotoAlternateRoundedIcon from '@mui/icons-material/AddPhotoAlternateRounded';
export default function SendPhoto(props: { userId: string; }) {
  const [access, setAccess] = useState<boolean | null>(null);
  const [photo, setPhoto] = useState<null | File>(null);

  // Обработчик изменения выбранного файла (фото)
  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedPhoto = event.target.files ? event.target.files[0] : null;

    if (selectedPhoto) {
      setPhoto(selectedPhoto);
      sendPhoto(selectedPhoto);
    }
  };

  // Эффект для проверки прав на отправку фото
  React.useEffect(() => {
    fetchAccess('can_send_photo', setAccess); // Изменено на 'can_send_photo'
  }, []);

  // Функция отправки фото через сокет
  const sendPhoto = (photo: File) => {
    const reader = new FileReader();
    reader.onload = () => {
        console.log('photo', photo);
      socket.emit('sendPhoto', {
        userId: props.userId,
        photo: reader.result, // Изменено на photo
        fileName: photo.name,
        fileType: photo.type,
        fileBuffer: reader.result

      });
    };
    reader.readAsArrayBuffer(photo);
  };

  return (
    <div>
      {
        access && (
          <>
            <input
              type="file"
              accept="image/*" // Ограничение только на изображения
              style={{ display: 'none' }}
              id="photoInput"
              onChange={handleFileChange}
            />
            <label htmlFor="photoInput">
              <IconButton size="sm" variant="plain" color="neutral" component="span">
                <AddPhotoAlternateRoundedIcon />
              </IconButton>
            </label>
          </>
        )
      }
    </div>
  );
}
