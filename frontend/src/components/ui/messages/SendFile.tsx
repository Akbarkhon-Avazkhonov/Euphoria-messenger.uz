import React, { useState } from 'react';
import { AttachFileRounded } from "@mui/icons-material";
import { IconButton } from "@mui/joy";
import { socket } from "@/socket";
import { fetchAccess } from '@/utils/access';


export default function SendFile(props: { userId: string; }) {
    const [access, setAccess] = useState<boolean | null>(null);
    const [file, setFile] = useState(null);
    const handleFileChange = (event: any) => {
        const selectedFile = event.target.files[0];

        if (selectedFile) {
            setFile(selectedFile);
            sendFile(selectedFile);
        }
    };

    React.useEffect(() => {
        fetchAccess('can_send_file', setAccess);
    }, []);

    const sendFile = (file: File) => {
        const reader = new FileReader();
        reader.onload = () => {
            socket.emit('sendFile', {
                userId: props.userId,
                file: file,
                fileName: file.name,
                fileType: file.type,
                fileBuffer: reader.result

            });

        };
        reader.readAsArrayBuffer(file);
        window.location.reload();
    };

    return (

        <div>
            {
                access && (
                    <>
                        <input
                            type="file"
                            style={{ display: 'none' }}
                            id="fileInput"
                            onChange={handleFileChange}
                        />
                        <label htmlFor="fileInput">
                            <IconButton size="sm" variant="plain" color="neutral" component="span">
                                <AttachFileRounded />
                            </IconButton>
                        </label>
                    </>
                )
            }

        </div>
    );
}
