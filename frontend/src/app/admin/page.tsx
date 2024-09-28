import UsersTable from "@/components/admin/users/UsersTables";
import AddUser from "@/components/admin/users/AddUser";
import { Box, Button, Typography } from "@mui/joy";
import { cookies } from "next/headers";
async function fetchUsers(cookies: string) {
  const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/users/all`, {
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
export default async function Admin() {
  const cookieStore = cookies()
  // get token from cookie
  const token = cookieStore.get('token')?.value;

  if (!token) {
    throw new Error("Token not found in cookies");
  }

  const users = await fetchUsers(token);
    return (
    <Box
        component="main"
        className="MainContent"
        sx={{
          px: { xs: 2, md: 6 },
          pt: {
            xs: 'calc(12px + var(--Header-height))',
            sm: 'calc(12px + var(--Header-height))',
            md: 3,
          },
          pb: { xs: 2, sm: 2, md: 3 },
          flex: 1,
          display: 'flex',
          flexDirection: 'column',
          minWidth: 0,
          height: '100dvh',
          gap: 1,
        }}
        
      >
        <Box
          sx={{
            display: 'flex',
            mb: 1,
            gap: 1,
            flexDirection: { xs: 'column', sm: 'row' },
            alignItems: { xs: 'start', sm: 'center' },
            flexWrap: 'wrap',
            justifyContent: 'space-between',
          }}
        >
  
            <Typography level="h2" component="h1">
              Все пользователи
            </Typography>
            <AddUser />
        </Box>
        <UsersTable users={users.data}/>
    </Box>
    );
}