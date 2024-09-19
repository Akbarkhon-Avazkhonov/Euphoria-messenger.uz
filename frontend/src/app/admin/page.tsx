import UsersTable from "@/components/admin/UsersTables";
import { Box, Button, Typography } from "@mui/joy";

const TestUsers = [
    {
        id: 1,
        name: 'Иван Иванов',
        login: 'ivanov',
        phoneNumber: '+79999999999',
        role: 'admin',
    },
    {
        id: 2,
        name: 'Петр Петров',
        login: 'petrov',
        phoneNumber: '+79999999999',
        role: 'user',
    } ,
    {
        id: 3,
        name: 'Сидор Сидоров',
        login: 'sidorov',
        phoneNumber: '+79999999999',
        role: 'user',
    },
]

export default function Admin() {
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
        </Box>
        <UsersTable users={TestUsers} />
    </Box>
    );
}