
import Chat from "@/components/ui/Chat";
import { socket } from "@/socket"
import { decryptData } from "@/utils/access";
import { Box, Grid } from "@mui/joy";
import { cookies } from "next/headers";
import AdminChat from "@/components/admin/chat/AdminChat";
import RopChat from "@/components/rop/RopChat";

async function fetchAllUsers(cookies: string,id:string) {
  const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/users/getRopOperators/${id}`, {
     method: 'GET',
     headers: {
         'Content-Type': 'application/json',
         'Cookie': 'token=' + cookies,
         
     },
     credentials: 'include',
     cache: 'no-cache',
 }).then((response) => response.json());
 console.log(response)
 return response;
} 

export default async function User() {
  const cookieStore = cookies()
  // get token from cookie
  const access = cookieStore.get('access')?.value;
 
  if (access) {
    const decryptAccess = await decryptData(access)
    console.log(decryptAccess)
    if (decryptAccess && JSON.parse(decryptAccess).can_manage_users){
      // redirect to rop
      const token = cookieStore.get('token')?.value;
      const id = cookieStore.get('id')?.value || '';
      if (!token) {
        throw new Error("Token not found in cookies");
      }
      const chats = await fetchAllUsers(token,id);

        return (
          <Grid container   sx={{ flexGrow: 1 }}>
            <RopChat chats={chats.data}/>
          </Grid>
        )
    }
  }
    return  (
        <Box sx={{ display: 'flex', minHeight: '100dvh' }}>
        <Box component={"main"} className="MainContent" sx={{ flex: 1 }}>
          <Chat socket = {socket}/>
        </Box>
      </Box>
    );
}