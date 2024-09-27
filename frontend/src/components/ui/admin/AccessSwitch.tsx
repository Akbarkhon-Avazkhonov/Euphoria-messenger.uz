"use client";
import { FormControl, FormLabel, Switch } from "@mui/joy";
import React from "react";

interface AccessSwitchProps {
    label : string;
    checked: boolean;
    setChecked: (value: boolean) => void;
}
export default function AccessSwitch(
    props: AccessSwitchProps
) {
    return (
    <FormControl
    orientation="horizontal"
    sx={{ maxWidth: { xs: "94%", sm: "600px" },
    width: "100%",
    overflowY: "auto", justifyContent: 'space-between' }}
  >
          <FormLabel color={
        props.checked ? 'primary' : 'text.primary'
          }>{props.label}</FormLabel>

    <Switch
      checked={props.checked}
      onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
        props.setChecked(event.target.checked)
      }
      color='primary'
      variant={props.checked ? 'solid' : 'outlined'}
      slotProps={{
        endDecorator: {
          sx: {
            minWidth: 24,
          },
        },
      }}
    />
  </FormControl>

    );
}