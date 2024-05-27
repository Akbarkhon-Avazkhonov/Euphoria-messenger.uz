"use client";

import Header from "@/components/ui/Header";
import MyMessages from "@/components/ui/MyMessages";
import { CssVarsProvider, CssBaseline, Box } from "@mui/joy";

export default  function OperatorPage() {
    return (
        <CssVarsProvider disableTransitionOnChange>
          <CssBaseline />
          <Box sx={{ display: 'flex', minHeight: '100dvh' }}>
            <Header />
            <Box component="main" className="MainContent" sx={{ flex: 1 }}>
              <MyMessages />
            </Box>
          </Box>
        </CssVarsProvider>
      );
    }