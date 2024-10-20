'use client';
import Chat from "@/components/ui/Chat";
import { socket } from "@/socket"
import { Box, Grid, Typography } from "@mui/joy";
import RopsList from "@/components/ui/admin/RopsList";
import React from "react";

interface AdminChatProps {
    chats: any
} 

async function fetchUserSession(id: number) {
    const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/admin/getUserSession/${id}`, {
       method: 'GET',
       headers: {
           'Content-Type': 'application/json',
        //    'Cookie': 'token=' + document.cookie.toString(),
           
       },
       credentials: 'include',
       cache: 'no-cache',
   }).then((response) => response.json());
   return response;
  } 

export default function AdminChat(
    props: AdminChatProps
) {
    const [selectedChat, setSelectedChat] = React.useState<any>(null);

    // Функция для выбора чата с выводом в консоль
    const handleSetSelectedChat = async (chat: any) => {
        console.log("Выбранный чат:", chat);  // Выводим информацию о выбранном чате
        const session = await fetchUserSession(chat.id);
        console.log("Сессия пользователя:", session);  // Выводим информацию о сессии пользователя
        document.cookie = `session=${session.session}; path=/; max-age=86400`;

        console.log("Сессия пользователя:", session);  // Выводим информацию о сессии пользователя
        setSelectedChat(chat);
        window.location.reload();

    };

    return (
        <>
        <Grid xs={9}>
            <Box sx={{ display: 'flex', minHeight: '100dvh' }}>
                <Box component="main" className="MainContent" sx={{ flex: 1, display: "flex", alignItems: "center" }}>
                <Chat socket={socket} />
                    {/* {selectedChat ? (
                        <Chat socket={socket} />
                    ) : (
             
                        <Box sx={{ width: "100%", flex: 1, display: "flex", justifyContent: "center", alignItems: "center" }}>
                        <Box sx={{ padding: "10px 20px", borderRadius: "50px", backgroundColor: "background.level2" }}>
                          <Typography sx={{textAlign: "center"}}>
                          Выберите чат, чтобы начать общение
                          </Typography>
                        </Box>
                      </Box>
                    )} */}
                </Box>
            </Box>
        </Grid>
        <Grid xs={3} sx={{height: "100vh"}}>
            <RopsList
                chats={props.chats}
                selectedChatId={selectedChat?.id}  
                setSelectedChat={handleSetSelectedChat}
            /> 
        </Grid>
        </>
    );
}
