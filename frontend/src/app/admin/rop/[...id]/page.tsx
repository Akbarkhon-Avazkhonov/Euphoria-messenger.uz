import UsersTable from "@/components/admin/users/UsersTables";
import AddUser from "@/components/admin/users/AddUser";
import { Box, Typography } from "@mui/joy";
import { cookies } from "next/headers";
import RopsTable from "@/components/admin/rop/RopsTables";
import AddOperator from "@/components/admin/rop/AddOperator";
import OperatorsTable from "@/components/admin/rop/OperatorsTables";

async function fetchUsers(cookies: string, id: string) {
  const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/users/getRopOperators/${id}`, {
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

export default async function Rop({ params }: { params: { id: string[]} }) {
  const cookieStore = cookies()
  // get token from cookie
  const token = cookieStore.get('token')?.value;

  if (!token) {
    throw new Error("Token not found in cookies");
  }

  const users = await fetchUsers(token, params.id[0]);
  console.log(users);
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
            {decodeURIComponent(params.id[1])}
            </Typography>
            <AddOperator id={params.id[0]}/>
        </Box>
        <OperatorsTable 
        rop_id={params.id[0]}
        users={users.data}/>
    </Box>
    );
}