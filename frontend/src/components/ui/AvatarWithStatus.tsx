"use client";
import * as React from 'react';
import Badge from '@mui/joy/Badge';
import Avatar, { AvatarProps } from '@mui/joy/Avatar';

// Combine Latin and Russian alphabet
const alphabet = 'abcdefghijklmnopqrstuvwxyzабвгдеёжзийклмнопрстуфхцчшщьыэюя'.split('');

// Function to generate lighter, unique hex colors
const letterToHexColor = (letter: string): string => {
  const charCode = letter.charCodeAt(0);

  // Generate RGB values from charCode and ensure they stay light
  const r = (charCode * 13) % 200 + 55; // Red: value between 55-255
  const g = (charCode * 37) % 200 + 55; // Green: value between 55-255
  const b = (charCode * 61) % 200 + 55; // Blue: value between 55-255

  // Convert RGB to hex
  return `#${((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1)}`;
};

// Function to check if the background color is dark based on luminance
const isDarkColor = (hex: string): boolean => {
  const r = parseInt(hex.slice(1, 3), 16);
  const g = parseInt(hex.slice(3, 5), 16);
  const b = parseInt(hex.slice(5, 7), 16);

  // Calculate relative luminance (simple method)
  const luminance = 0.2126 * r + 0.7152 * g + 0.0722 * b;

  // If luminance is less than 128, consider it a dark color
  return luminance < 128;
};

type AvatarWithStatusProps = AvatarProps & {
  online?: boolean;
  fullname?: string;
};

export default function AvatarWithStatus(props: AvatarWithStatusProps) {
  const { online = false, fullname = '', ...other } = props;

  // Get a unique color for the first letter of the fullname
  const getColorByFullname = (name: string) => {
    if (!name) return '#CCCCCC'; // Default light gray color if no name
    const firstLetter = name[0].toLowerCase();
    if (alphabet.includes(firstLetter)) {
      return letterToHexColor(firstLetter);
    }
    return '#CCCCCC'; // Default light color if letter is not in the alphabet
  };

  const avatarColor = getColorByFullname(fullname);

  // Determine if text should be white based on the avatar background color
  const textColor = isDarkColor(avatarColor) ? '#FFFFFF' : '#000000';

  return (
    <div>
      <Badge
        color={online ? 'success' : 'neutral'}
        variant={online ? 'solid' : 'soft'}
        size="sm"
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
        badgeInset="4px 4px"
      >
        <Avatar {...other} sx={{ bgcolor: avatarColor, color: textColor }}>
          {fullname[0] || ''}
        </Avatar>
      </Badge>
    </div>
  );
}
