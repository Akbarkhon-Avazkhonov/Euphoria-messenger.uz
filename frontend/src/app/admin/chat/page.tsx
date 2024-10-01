
import RopsList from "@/components/ui/admin/RopsList";
import Chat from "@/components/ui/Chat";
import { socket } from "@/socket"
import {  Box, Grid } from "@mui/joy";

const chats = [
  { id: 1, name: "John Doe", role: "Admin", phoneNumber: "+1234567890", created_at: "2024-01-01" },
  { id: 2, name: "Jane Smith", role: "User", phoneNumber: "+0987654321", created_at: "2024-01-02" },
  { id: 3, name: "Bob Johnson", role: "Moderator", phoneNumber: "+1112223333", created_at: "2024-01-03" },
  { id: 4, name: "Alice Davis", role: "Admin", phoneNumber: "+2223334444", created_at: "2024-01-04" },
  { id: 5, name: "Michael Brown", role: "User", phoneNumber: "+3334445555", created_at: "2024-01-05" },
  { id: 6, name: "Emily Wilson", role: "User", phoneNumber: "+4445556666", created_at: "2024-01-06" },
  { id: 7, name: "David Martinez", role: "Moderator", phoneNumber: "+5556667777", created_at: "2024-01-07" },
  { id: 8, name: "Emma Taylor", role: "Admin", phoneNumber: "+6667778888", created_at: "2024-01-08" },
  { id: 9, name: "Chris Moore", role: "User", phoneNumber: "+7778889999", created_at: "2024-01-09" },
  { id: 10, name: "Olivia Anderson", role: "Moderator", phoneNumber: "+8889990000", created_at: "2024-01-10" },
  { id: 11, name: "Matthew Thomas", role: "User", phoneNumber: "+9990001111", created_at: "2024-01-11" },
  { id: 12, name: "Isabella Harris", role: "User", phoneNumber: "+0001112222", created_at: "2024-01-12" },
  { id: 13, name: "Sophia Clark", role: "Moderator", phoneNumber: "+1112223333", created_at: "2024-01-13" },
  { id: 14, name: "Lucas Lewis", role: "User", phoneNumber: "+2223334444", created_at: "2024-01-14" },
  { id: 15, name: "Amelia Robinson", role: "Admin", phoneNumber: "+3334445555", created_at: "2024-01-15" },
  { id: 16, name: "Jack Walker", role: "User", phoneNumber: "+4445556666", created_at: "2024-01-16" },
  { id: 17, name: "Mia Young", role: "Moderator", phoneNumber: "+5556667777", created_at: "2024-01-17" },
  { id: 18, name: "Liam King", role: "User", phoneNumber: "+6667778888", created_at: "2024-01-18" },
  { id: 19, name: "Ella Wright", role: "Admin", phoneNumber: "+7778889999", created_at: "2024-01-19" },
  { id: 20, name: "James Scott", role: "User", phoneNumber: "+8889990000", created_at: "2024-01-20" }
];

export default function Chats() {
  
    return  (
      <Grid container   sx={{ flexGrow: 1 }}>
      <Grid xs={9}>
          <Box sx={{ display: 'flex', minHeight: '100dvh' }}>
                <Box component="main" className="MainContent" sx={{ flex: 1 }}>
                  <Chat socket={socket}/>
                  
                </Box>
          </Box>
      </Grid>
      <Grid xs={3} sx={{height: "100vh"}}>
       <RopsList
                chats={chats}
                // selectedChatId={selectedChat}
                // setSelectedChat={setSelectedChat}
              /> 
      </Grid>
  </Grid>
    );
}