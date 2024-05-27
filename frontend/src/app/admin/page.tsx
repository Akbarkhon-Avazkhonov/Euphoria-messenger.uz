"use client";

import Header from "@/components/ui/Header";
import MyMessages from "@/components/ui/MyMessages";
import { CssVarsProvider, CssBaseline, Box, Grid } from "@mui/joy";
import { chats } from './data';

import React from "react";
import RopsList from "@/components/ui/admin/RopsList";

export default  function OperatorPage() {
  const [selectedChat, setSelectedChat] = React.useState(chats[0]);
    return (
        <CssVarsProvider disableTransitionOnChange>
          <CssBaseline />
          <Grid container spacing={2} sx={{ flexGrow: 1 }}>
              <Grid xs={9}>
                  <Box sx={{ display: 'flex', minHeight: '100dvh' }}>
                      <Header />
                        <Box component="main" className="MainContent" sx={{ flex: 1 }}>
                          <MyMessages />
                          
                        </Box>
                  </Box>
              </Grid>
              <Grid xs={3}>
                {/* <RopsList
                        chats={chats}
                        selectedChatId={selectedChat.id}
                        setSelectedChat={setSelectedChat}
                      /> */}
              </Grid>
          </Grid>
        
        </CssVarsProvider>
      );
    }