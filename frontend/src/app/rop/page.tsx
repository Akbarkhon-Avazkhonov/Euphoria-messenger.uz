"use client";

import Header from "@/components/ui/Header";
import MyMessages from "@/components/ui/MyMessages";
import { CssVarsProvider, CssBaseline, Box, Grid } from "@mui/joy";

import React from "react";
import OperatorsList from "@/components/ui/rop/OperatorsList";

export default  function OperatorPage() {
  const [chats, setChats] = React.useState([]);
  const [selectedChat, setSelectedChat] = React.useState({});
  React.useEffect(() => {
    const fetchData = async () => {
      const data = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/auth/operators`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'rop_session': `${localStorage.getItem('session')}`,
        },
      });
      const response = await data.json();
      setChats(response);
      localStorage.setItem('operators', JSON.stringify(response));
      setSelectedChat(response[0]);
    };

    fetchData();
  
   
    
  }, [setSelectedChat]);
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
  <OperatorsList
          chats={chats}
          selectedChatId={(selectedChat as { userId: string }).userId}
          setSelectedChat={setSelectedChat}
        />
  </Grid>

</Grid>
        
          
        </CssVarsProvider>
      );
    }