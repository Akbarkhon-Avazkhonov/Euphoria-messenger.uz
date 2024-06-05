"use client";

import { CssVarsProvider, CssBaseline, Box, Grid } from "@mui/joy";


import React from "react";
import { chats } from "./data";
import RopsList from "@/components/ui/admin/RopsList";
import Chat from "@/components/operator/Chat";
import { socket } from "@/socket";


export default  function Admin() {
  const [selectedChat, setSelectedChat] = React.useState({});
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