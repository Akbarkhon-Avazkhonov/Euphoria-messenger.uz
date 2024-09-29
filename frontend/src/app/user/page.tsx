
import Chat from "@/components/ui/Chat";
import { socket } from "@/socket"
import { Box } from "@mui/joy";

export default function User() {
    return  (
        <Box sx={{ display: 'flex', minHeight: '100dvh' }}>
        <Box component={"main"} className="MainContent" sx={{ flex: 1 }}>
          <Chat socket = {socket}/>
        </Box>
      </Box>
    );
}