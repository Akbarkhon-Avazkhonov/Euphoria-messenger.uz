import Sidebar from '@/components/admin/Sidebar';
import {  Box } from "@mui/joy";
import { ReactNode } from 'react';

export default function Layout({ children }: { children: ReactNode }) {
    return (
      <Box sx={{ display: 'flex', minHeight: '100dvh' }}>
          <Sidebar />
          {children}
      </Box>

    )
}