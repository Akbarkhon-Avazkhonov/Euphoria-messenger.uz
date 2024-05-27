import React, { useEffect } from 'react';
import { IMaskInput } from 'react-imask';
import FormControl from '@mui/joy/FormControl';
import FormLabel from '@mui/joy/FormLabel';
import Input from '@mui/joy/Input';
import { CallRounded } from '@mui/icons-material';

interface CustomProps {
  onChange: (event: { target: { name: string; value: string } }) => void;
  name: string;
}

const TextMaskAdapter = React.forwardRef<HTMLElement, CustomProps>(
  function TextMaskAdapter(props, ref) {
    const { onChange, ...other } = props;
    return (
      <IMaskInput
        {...other}
        mask="+998 (##) ###-##-##"
        definitions={{
          '#': /[0-9]/,
        }}
        onAccept={(value: any) => onChange({ target: { name: props.name, value } })}
        overwrite
      />
    );
  },
);

export default function PhoneInput() {
  const [value, setValue] = React.useState<string>(() => {
    // Get the value from local storage if available
    const storedValue = localStorage.getItem('phoneInputValue');
    return storedValue || '';
  });

  useEffect(() => {
    // Save the value to local storage on every change
    localStorage.setItem('phoneInputValue', value);
  }, [value]);

  return (
    <Input
      placeholder="Номер телефона"
      value={value}
      onChange={(event) => setValue(event.target.value)}
      slotProps={{ input: { component: TextMaskAdapter } }}
      endDecorator={<CallRounded />}
    />
  );
}
