import InitColorSchemeScript from '@mui/joy/InitColorSchemeScript';
import { ThemeProvider, } from '@mui/material/styles'; // If using MUI theme
import CssBaseline from '@mui/material/CssBaseline'; // Optional: To reset CSS
import theme from '@/components/ThemeRegistry/theme'; // Your custom theme
import { CssVarsProvider } from '@mui/joy/styles';
import React from 'react';
import NextAppDirEmotionCacheProvider from '@/components/ThemeRegistry/EmotionCache';
import { GlobalStyles } from '@mui/joy';
import ThemeRegistry from "@/components/ThemeRegistry/ThemeRegistry";
import { Toaster } from "react-hot-toast";



export const metadata = {
  title: 'Euphoria-messenger.uz',
  description: 'Euphoria-messenger.uz',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
      <InitColorSchemeScript />
        {/* TODO turn on this before push*/}
        {/*         <InitColorSchemeScript /> {/* Injects Joy UI's color scheme script */}
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <title>{metadata.title}</title>
        <meta name="description" content={metadata.description} />
      </head>
      <body>
      <NextAppDirEmotionCacheProvider options={{ key: 'joy' }}>

        <ThemeRegistry>
        <ThemeProvider theme={theme}>
          <CssBaseline /> {/* Provides global styles and resets */}
          <GlobalStyles
            styles={{
            }}
          />
          <CssVarsProvider>
          <Toaster position="top-center" 
      //border color for the toast
      toastOptions={{
        
        duration: 2000,
        success: {
          style: {
            border: "1px solid #00A4A6",
          },
          iconTheme: {
            primary: '#00A4A6',
            secondary: '#fff',
          },
        },
        error: {
          style: {
            border: "1px solid #FF0000",
          },
          iconTheme: {
            primary: '#FF0000',
            secondary: '#fff',
          },
        },
      }}
      />
              {children} 
          </CssVarsProvider>
          
        </ThemeProvider>
        </ThemeRegistry>
        </NextAppDirEmotionCacheProvider>

      </body>
    </html>
  );
}
