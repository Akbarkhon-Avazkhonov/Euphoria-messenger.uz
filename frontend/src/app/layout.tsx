import InitColorSchemeScript from '@mui/joy/InitColorSchemeScript';
import React from 'react';
import { GlobalStyles } from '@mui/joy';
import ThemeRegistry from "@/components/ThemeRegistry/ThemeRegistry";
import { Toaster } from "react-hot-toast";

import './globals.css'


export const metadata = {
  title: 'Euphoria-messenger.uz',
  description: 'Euphoria-messenger.uz',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {


  return (
    <html lang="en" suppressHydrationWarning>
      <head >
      <InitColorSchemeScript />
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <title>{metadata.title}</title>
        <meta name="description" content={metadata.description} />
      </head>
      <body>


        <ThemeRegistry>
          <GlobalStyles
            styles={{
            }}
          />
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
          
        </ThemeRegistry>
  
      </body>
    </html>
  );
}
