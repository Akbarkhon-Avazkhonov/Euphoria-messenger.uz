"use client";

import { CssVarsProvider, CssBaseline, Box, Grid } from "@mui/joy";


import React, { useEffect } from "react";
import RopsList from "@/components/ui/admin/RopsList";
import Chat from "@/components/operator/Chat";
import { socket } from "@/socket";
import { getCookie } from "cookies-next";


export default  function Admin() {
  const [selectedChat, setSelectedChat] = React.useState({});
  const [chats, setChats] = React.useState([]);
  const handleGetAll = async () => {

    const all = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/auth/getAll`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        admin_session: decodeURIComponent(getCookie('admin_session') || ''),
      }),
    });

    const response = await all.json();
    console.log(response);
    setChats(response);
  }
  useEffect(() => {
    handleGetAll();
  }
    , []);
    return (
        <CssVarsProvider disableTransitionOnChange>
          <CssBaseline />
          <Grid container   sx={{ flexGrow: 1 }}>
              <Grid xs={9}>
                  <Box sx={{ display: 'flex', minHeight: '100dvh' }}>
                        <Box component="main" className="MainContent" sx={{ flex: 1 }}>
                          <Chat socket={socket}/>
                          
                        </Box>
                  </Box>
              </Grid>
              <Grid xs={3}>
               <RopsList
                        chats={chats}
                        selectedChatId={selectedChat}
                        setSelectedChat={setSelectedChat}
                      /> 
              </Grid>
          </Grid>
        
        </CssVarsProvider>
      );
    }