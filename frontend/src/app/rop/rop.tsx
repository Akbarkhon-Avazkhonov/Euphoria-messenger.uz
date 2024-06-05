"use client";

// import MyMessages from "@/components/ui/MyMessages";
import { CssVarsProvider, CssBaseline, Box, Grid } from "@mui/joy";

import React from "react";
import OperatorsList from "@/components/ui/rop/OperatorsList";
import Chat from "@/components/operator/Chat";
import { socket } from "@/socket";
import { getCookie } from "cookies-next";

export default  function Rop() {
  const [chats, setChats] = React.useState([]);
  const [selectedChat, setSelectedChat] = React.useState({});
  const handleGetOperators = async () => {

  const data = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/auth/getOperators`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      rop_session: decodeURIComponent(getCookie('rop_session') || ''),
    }),
  });

  const response = await data.json();
  console.log(response);
  setChats(response);
};

React.useEffect(() => {
  handleGetOperators();
}
  , []);
    return (
        <CssVarsProvider disableTransitionOnChange>
          <CssBaseline />
          <Grid container  sx={{ flexGrow: 1 }}>
  <Grid xs={9}>
  <Box sx={{ display: 'flex', minHeight: '100dvh' }}>
            <Box component="main" className="MainContent" sx={{ flex: 1 }}>
              {/* <MyMessages /> */}
              <Chat socket={socket} />
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