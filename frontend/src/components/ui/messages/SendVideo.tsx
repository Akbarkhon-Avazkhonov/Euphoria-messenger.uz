import React, { useState, useEffect } from 'react';
import { socket } from "@/socket";
import { IconButton } from "@mui/joy";
import VideocamRoundedIcon from '@mui/icons-material/VideocamRounded';
import StopCircleRoundedIcon from '@mui/icons-material/StopCircleRounded';
import { fetchAccess } from '@/utils/access';

const VideoRecorder = (props: { userId: string; caption?: string; setTextAreaValue: (value: string) => void; }) => {
  const [access, setAccess] = useState<boolean | null>(null);
  const [isRecording, setIsRecording] = useState<boolean>(false);
  const [stream, setStream] = useState<MediaStream | null>(null);
  const [videoRecorder, setVideoRecorder] = useState<MediaRecorder | null>(null);
  const [content, setContent] = useState<Blob | null>(null);

  // Запрос доступа на отправку видео
  useEffect(() => {
    fetchAccess('can_send_video', setAccess);
  }, []);

  // Начало записи видео
  const onVideoClick = async () => {
    try {
      const videoStream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true });
      const mediaRecorder = new MediaRecorder(videoStream);

      setStream(videoStream);
      setVideoRecorder(mediaRecorder);
      setIsRecording(true);
    } catch (error) {
      console.log("User didn't allow camera or microphone access.");
    }
  };

  // Остановка записи видео
  const onStopRecording = () => {
    if (!isRecording || !stream || !videoRecorder) return;
    console.log('stop recording');
    // Остановка всех треков видео и аудио
    const tracks = stream.getTracks();
    tracks.forEach(track => track.stop());

    videoRecorder.stop();
    setVideoRecorder(null);
    setIsRecording(false);
  };

  // Начало записи и установка контента
  useEffect(() => {
    if (!isRecording || !videoRecorder) return;

    videoRecorder.start();
    videoRecorder.ondataavailable = ({ data }) => setContent(data);
  }, [isRecording, videoRecorder]);

  // Отправка записанного видео после завершения записи
  useEffect(() => {
    if (isRecording || !content || !stream) return;

    // Преобразование видео Blob в строку Base64 для отправки
    const reader = new FileReader();
    reader.onloadend = () => {
      const base64VideoMessage = reader.result as string;
      const payload = {
        userId: props.userId,
        video: base64VideoMessage,  // Конвертированное видео в Base64
        fileName: `video_recording_${Date.now()}.mp4`,
        caption: props.caption || '',
        duration: content.size, // Примерная продолжительность
        fileBuffer: reader.result
      };
      console.log('send video', payload);
      socket.emit('sendVideo', payload);
      props.setTextAreaValue(''); // Сброс значения текстового поля, если это необходимо
    };
    reader.readAsDataURL(content); // Чтение Blob как Data URL (Base64)

    // Очистка состояний после отправки
    setStream(null);
    setContent(null);
  }, [isRecording, content]);

  return (
    access ? (
      <IconButton onClick={!isRecording ? onVideoClick : onStopRecording} >
        {!isRecording ? <VideocamRoundedIcon /> : <StopCircleRoundedIcon />}
      </IconButton>
    ) : null
  );
};

export default VideoRecorder;
