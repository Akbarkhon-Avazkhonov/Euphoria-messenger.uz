
import AdminChat from "@/components/admin/chat/AdminChat";
import RopsList from "@/components/ui/admin/RopsList";
import Chat from "@/components/ui/Chat";
import { socket } from "@/socket"
import {  Box, Grid } from "@mui/joy";
import { cookies } from "next/headers";

async function fetchAllUsers(cookies: string) {
  const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/admin/getAllUsers`, {
     method: 'GET',
     headers: {
         'Content-Type': 'application/json',
         'Cookie': 'token=' + cookies,
         
     },
     credentials: 'include',
     cache: 'no-cache',
 }).then((response) => response.json());
 return response;
} 

export default async  function Chats() {
  const cookieStore = cookies()
  // get token from cookie
  const token = cookieStore.get('token')?.value;
  if (!token) {
    throw new Error("Token not found in cookies");
  }
  const chats = await fetchAllUsers(token);
    return  (
      <Grid container   sx={{ flexGrow: 1 }}>
        <AdminChat chats={chats}/>
      </Grid>
    );
}