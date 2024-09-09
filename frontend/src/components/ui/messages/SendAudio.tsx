import { socket } from "@/socket";
import { IconButton } from "@mui/joy";
import { useReactMediaRecorder } from "react-media-recorder";
import MicOffRoundedIcon from '@mui/icons-material/MicOffRounded';
import MicRoundedIcon from '@mui/icons-material/MicRounded';
import MicNoneRoundedIcon from '@mui/icons-material/MicNoneRounded';
interface SendAudioProps {
    userId: string;
    setTextAreaValue: (value: string) => void;
    textAreaValue: string;
}


export default function SendAudio(
    props : SendAudioProps
) {
    const { status, startRecording, stopRecording,resumeRecording, mediaBlobUrl } =
    useReactMediaRecorder({ audio: true , onStop(blobUrl, blob) {
        addAudioElement(blob,props.userId,props.textAreaValue);

    },});
    const addAudioElement = (blob:any,userId:string,caption:string) => {



        // Prepare the payload to send
        const payload = {
          userId: userId,  // Your user ID or other necessary data
          blob: blob,  // The audio blob
          caption: caption
        };
        // Send the payload via WebSocket (or fetch, etc.)
        socket.emit('sendAudio', payload);
        props.setTextAreaValue('');
      }
    return (

        <div>w</div>
        // <div>
        //   {
        //     status === "recording" ? 
        //     <><IconButton onClick={stopRecording}>
        //                   <MicOffRoundedIcon />
        //               </IconButton><IconButton onClick={resumeRecording}>
        //                       <MicNoneRoundedIcon />
        //                   </IconButton></>: 
        //     <IconButton onClick={startRecording}>
        //             <MicRoundedIcon />
        //     </IconButton>
            
        //   }
        // </div>

    );
    }