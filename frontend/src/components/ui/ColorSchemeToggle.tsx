"use client";

import * as React from 'react';
import { useColorScheme } from '@mui/joy/styles';
import IconButton, { IconButtonProps } from '@mui/joy/IconButton';

import DarkModeIcon from '@mui/icons-material/DarkMode';
import LightModeIcon from '@mui/icons-material/LightMode';

export default function ColorSchemeToggle(props: IconButtonProps) {
  const { onClick, sx, ...other } = props;
  const { mode, setMode } = useColorScheme();
  const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => {
    setMounted(true);
  }, []);

  // Avoid rendering on the server to prevent mismatch issues
  if (!mounted) {
    return (
      <IconButton
        id="toggle-mode"
        size="sm"
        variant="outlined"
        color="neutral"
        {...other}
        sx={[...(Array.isArray(sx) ? sx : [sx])]}
      >
        {/* Render the correct initial icon based on the current mode */}
        {mode === 'light' ? <DarkModeIcon /> : <LightModeIcon />}
      </IconButton>
    );
  }

  return (
    <IconButton
      id="toggle-mode"
      size="sm"
      variant="outlined"
      color="neutral"
      {...other}
      onClick={(event) => {
        setMode(mode === 'light' ? 'dark' : 'light');
        onClick?.(event);
      }}
      sx={[...(Array.isArray(sx) ? sx : [sx])]}
    >
      {mode === 'light' ? <DarkModeIcon /> : <LightModeIcon />}
    </IconButton>
  );
}
