'use client';
import Chat from "@/components/ui/Chat";
import { socket } from "@/socket"
import { Box, Grid, Typography } from "@mui/joy";
import RopsList from "@/components/ui/admin/RopsList";
import React from "react";
import OperatorsList from "../ui/rop/OperatorsList";

interface RopChatProps {
    chats: any
} 

async function fetchUserSession(id: number) {
    const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/admin/getUserSession/${id}`, {
       method: 'GET',
       headers: {
           'Content-Type': 'application/json',
       },
       credentials: 'include',
       cache: 'force-cache',
   }).then((response) => response.json());
   return response;
} 

export default function RopChat(
    props: RopChatProps
) {
    const [selectedChat, setSelectedChat] = React.useState<any>(null);

    // Функция для выбора чата
    const handleSetSelectedChat = async (chat: any) => {
        const session = await fetchUserSession(chat.id);
        document.cookie = `session=${session.session}; path=/; max-age=86400`;
        socket.disconnect();
        
        socket.connect();
        setSelectedChat(chat);
    };


    return (
        <>
        <Grid xs={9}>
            <Box sx={{ display: 'flex', minHeight: '100dvh' }}>
                <Box component="main" className="MainContent" sx={{ flex: 1, display: "flex", alignItems: "center" }}>
                    {selectedChat ? (
                        // Use `key` to force re-render on chat change
                        <Chat key={selectedChat.id} socket={socket} />
                    ) : (
                        <Box sx={{ width: "100%", flex: 1, display: "flex", justifyContent: "center", alignItems: "center" }}>
                            <Box sx={{ padding: "10px 20px", borderRadius: "50px", backgroundColor: "background.level2" }}>
                                <Typography sx={{ textAlign: "center" }}>
                                    Выберите чат, чтобы начать общение
                                </Typography>
                            </Box>
                        </Box>
                    )}
                </Box>
            </Box>
        </Grid>
        <Grid xs={3} sx={{height: "100vh"}}>
            <OperatorsList 
            
                chats={props.chats}
                selectedChatId={selectedChat?.id}  
                setSelectedChat={handleSetSelectedChat}
            /> 
        </Grid>
        </>
    );
}
