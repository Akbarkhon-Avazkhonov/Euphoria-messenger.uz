"use client";
import * as React from "react";
import { Input as BaseInput } from "@mui/base/Input";
import { Box, styled } from "@mui/system";

function OTP({
  separator,
  length,
  value,
  onChange,
}: {
  separator: React.ReactNode;
  length: number;
  value: string;
  onChange: (value: string) => void;
}) {
  const inputRefs = React.useRef<(HTMLInputElement | null)[]>(new Array(length).fill(null));

  const focusInput = (targetIndex: number) => {
    const targetInput = inputRefs.current[targetIndex];
    targetInput?.focus();
  };

  const selectInput = (targetIndex: number) => {
    const targetInput = inputRefs.current[targetIndex];
    targetInput?.select();
  };

  const handleKeyDown = (
    event: React.KeyboardEvent<HTMLInputElement>,
    currentIndex: number
  ) => {
    if (
      !/[0-9]/.test(event.key) &&
      !["ArrowUp", "ArrowDown", "ArrowLeft", "ArrowRight", "Backspace", "Delete", "Tab"].includes(event.key)
    ) {
      event.preventDefault();
    }

    switch (event.key) {
      case "ArrowUp":
      case "ArrowDown":
      case " ":
        event.preventDefault();
        break;
      case "ArrowLeft":
        event.preventDefault();
        if (currentIndex > 0) {
          focusInput(currentIndex - 1);
          selectInput(currentIndex - 1);
        }
        break;
      case "ArrowRight":
        event.preventDefault();
        if (currentIndex < length - 1) {
          focusInput(currentIndex + 1);
          selectInput(currentIndex + 1);
        }
        break;
      case "Delete":
      case "Backspace":
        event.preventDefault();
        const newValue = value.split("");
        newValue[currentIndex] = "";
        onChange(newValue.join(""));
        if (currentIndex > 0) {
          focusInput(currentIndex - 1);
          selectInput(currentIndex - 1);
        }
        break;
      default:
        break;
    }
  };

  const handleChange = (
    event: React.ChangeEvent<HTMLInputElement>,
    currentIndex: number
  ) => {
    const currentValue = event.target.value;

    if (!/^\d*$/.test(currentValue)) {
      return;
    }

    const newValue = value.split("");
    const lastValue = currentValue[currentValue.length - 1];
    newValue[currentIndex] = lastValue;
    onChange(newValue.join(""));

    if (currentValue !== "" && currentIndex < length - 1) {
      focusInput(currentIndex + 1);
    }
  };

  const handleClick = (
    event: React.MouseEvent<HTMLInputElement>,
    currentIndex: number
  ) => {
    selectInput(currentIndex);
  };

  const handlePaste = (
    event: React.ClipboardEvent<HTMLInputElement>,
    currentIndex: number
  ) => {
    event.preventDefault();
    const clipboardData = event.clipboardData;

    if (clipboardData.types.includes("text/plain")) {
      let pastedText = clipboardData.getData("text/plain").replace(/\D/g, "");
      pastedText = pastedText.substring(0, length).trim();
      const otpArray = value.split("");

      for (let i = currentIndex; i < length; i++) {
        const pastedValue = pastedText[i - currentIndex] ?? "";
        otpArray[i] = pastedValue;
      }

      onChange(otpArray.join(""));
    }
  };

  return (
    <Box sx={{ display: "flex", gap: 1, alignItems: "center" }}>
      {new Array(length).fill(null).map((_, index) => (
        <React.Fragment key={index}>
          <BaseInput
            slots={{
              input: InputElement,
            }}
            aria-label={`Digit ${index + 1} of OTP`}
            slotProps={{
              input: {
                ref: (ele) => {
                  inputRefs.current[index] = ele!;
                },
                onKeyDown: (event) => handleKeyDown(event, index),
                onChange: (event) => handleChange(event, index),
                onClick: (event) => handleClick(event, index),
                onPaste: (event) => handlePaste(event, index),
                value: value[index] ?? "",
                type: "tel",
                maxLength: 1,
              },
            }}
          />
          {index === length - 1 ? null : separator}
        </React.Fragment>
      ))}
    </Box>
  );
}

interface OTPInputProps {
  otp: string;
  setOtp: (OTP: string) => void;
}

export default function OTPInput(props: OTPInputProps) {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        gap: 2,
        margin: "auto",
        my: 2,
      }}
    >
      <OTP separator={<span>-</span>} value={props.otp} onChange={props.setOtp} length={5} />
    </Box>
  );
}

const InputElement = styled("input")(
  ({ theme }) => `
  width: 40px;
  font-family: 'IBM Plex Sans', sans-serif;
  font-size: 0.875rem;
  font-weight: 400;
  line-height: 1.5;
  padding: 8px 0px;
  border-radius: 8px;
  text-align: center;
  color: ${theme.palette.mode === "dark" ? "#C7D0DD" : "#303740"};
  background: ${theme.palette.mode === "dark" ? "#303740" : "#fff"};
  border: 1px solid ${theme.palette.mode === "dark" ? "#434D5B" : "#DAE2ED"};
  box-shadow: 0px 2px 4px ${theme.palette.mode === "dark" ? "rgba(0,0,0, 0.5)" : "rgba(0,0,0, 0.05)"};

  &:hover {
    border-color: #3399FF;
  }

  &:focus {
    border-color: #3399FF;
    box-shadow: 0 0 0 3px ${theme.palette.mode === "dark" ? "#0072E5" : "#80BFFF"};
  }

  &:focus-visible {
    outline: 0;
  }
`
);
