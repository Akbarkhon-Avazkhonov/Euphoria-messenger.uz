import Chat from "@/components/operator/Chat";
import { socket } from "@/socket";
import { CssVarsProvider, CssBaseline, Box } from "@mui/joy";

export default  function Operator() {
    return (
        <CssVarsProvider disableTransitionOnChange>
          <CssBaseline />
          <Box sx={{ display: 'flex', minHeight: '100dvh' }}>
            <Box component={"main"} className="MainContent" sx={{ flex: 1 }}>
              <Chat socket = {socket}/>
            </Box>
          </Box>
        </CssVarsProvider>
      );
    }