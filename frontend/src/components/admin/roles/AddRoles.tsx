"use client";
import * as React from 'react';
import Button from '@mui/joy/Button';
import FormControl from '@mui/joy/FormControl';
import FormLabel from '@mui/joy/FormLabel';
import Modal from '@mui/joy/Modal';
import ModalDialog from '@mui/joy/ModalDialog';
import DialogTitle from '@mui/joy/DialogTitle';
import Stack from '@mui/joy/Stack';
import Add from '@mui/icons-material/Add';
import WavingHandRoundedIcon from '@mui/icons-material/WavingHandRounded';
import GroupAddRoundedIcon from '@mui/icons-material/GroupAddRounded';
import { Checkbox, FormHelperText, Sheet, Switch, Table, Textarea } from '@mui/joy';
function fetchPostGreeting(text:string) {
    return fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/greeting`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ text: text}),
    });
}


export default function AddRoles() {
  const [open, setOpen] = React.useState<boolean>(false);
  const [text, setText] = React.useState<string>('');
  const [description, setDescription] = React.useState<string>('');
  const [checked, setChecked] = React.useState(false);


  return (
    <React.Fragment >
      <Button
        startDecorator={<Add />}
        onClick={() => setOpen(true)}
        size="sm"
    
      >
        Добавить
      </Button>
      <Modal open={open} onClose={() => setOpen(false)}  
        >
      <ModalDialog
          sx={{
            maxWidth: { xs: "94%", sm: "600px" },
            width: "100%",
            overflowY: "auto",
          }}
        >

          <DialogTitle>Новый Роль

            <GroupAddRoundedIcon sx={{ fontSize: 24 }} />
          </DialogTitle>
          <form
            onSubmit={(event: React.FormEvent<HTMLFormElement>) => {
              event.preventDefault();
              setOpen(false);
              fetchPostGreeting(text);
                window.location.reload()
            }}
            
          >
            <Stack spacing={2}>
              <FormControl>
                <FormLabel required>Имя роля</FormLabel>
                <Textarea autoFocus required 
                onChange={(event) => setText(event.target.value)}
                />
                <FormLabel required>Описание</FormLabel>
                <Textarea autoFocus required 
                onChange={(event) => setDescription(event.target.value)}
                />

        
              </FormControl>

              <FormControl
      orientation="horizontal"
      sx={{ maxWidth: { xs: "94%", sm: "600px" },
      width: "100%",
      overflowY: "auto", justifyContent: 'space-between' }}
    >
      <div>
        <FormLabel>Show captions</FormLabel>
        <FormHelperText sx={{ mt: 0 }}>All languages available.</FormHelperText>
      </div>
      <Switch
        checked={checked}
        onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
          setChecked(event.target.checked)
        }
        color={checked ? 'primary' : 'neutral'}
        variant={checked ? 'solid' : 'outlined'}
        slotProps={{
          endDecorator: {
            sx: {
              minWidth: 24,
            },
          },
        }}
      />
    </FormControl>
    <FormControl
      orientation="horizontal"
      sx={{ maxWidth: { xs: "94%", sm: "600px" },
      width: "100%",
      overflowY: "auto", justifyContent: 'space-between' }}
    >
      <div>
        <FormLabel>Show captions</FormLabel>
        <FormHelperText sx={{ mt: 0 }}>All languages available.</FormHelperText>
      </div>
      <Switch
        checked={checked}
        onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
          setChecked(event.target.checked)
        }
        color={checked ? 'primary' : 'neutral'}
        variant={checked ? 'solid' : 'outlined'}
        slotProps={{
          endDecorator: {
            sx: {
              minWidth: 24,
            },
          },
        }}
      />
    </FormControl>
    <FormControl
      orientation="horizontal"
      sx={{ maxWidth: { xs: "94%", sm: "600px" },
      width: "100%",
      overflowY: "auto", justifyContent: 'space-between' }}
    >
      <div>
        <FormLabel>Show captions</FormLabel>
        <FormHelperText sx={{ mt: 0 }}>All languages available.</FormHelperText>
      </div>
      <Switch
        checked={checked}
        onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
          setChecked(event.target.checked)
        }
        color={checked ? 'primary' : 'neutral'}
        variant={checked ? 'solid' : 'outlined'}
        slotProps={{
          endDecorator: {
            sx: {
              minWidth: 24,
            },
          },
        }}
      />
    </FormControl>
    <FormControl
      orientation="horizontal"
      sx={{ maxWidth: { xs: "94%", sm: "600px" },
      width: "100%",
      overflowY: "auto", justifyContent: 'space-between' }}
    >
      <div>
        <FormLabel>Show captions</FormLabel>
        <FormHelperText sx={{ mt: 0 }}>All languages available.</FormHelperText>
      </div>
      <Switch
        checked={checked}
        onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
          setChecked(event.target.checked)
        }
        color={checked ? 'primary' : 'neutral'}
        variant={checked ? 'solid' : 'outlined'}
        slotProps={{
          endDecorator: {
            sx: {
              minWidth: 24,
            },
          },
        }}
      />
    </FormControl>
    <FormControl
      orientation="horizontal"
      sx={{ maxWidth: { xs: "94%", sm: "600px" },
      width: "100%",
      overflowY: "auto", justifyContent: 'space-between' }}
    >
      <div>
        <FormLabel>Show captions</FormLabel>
        <FormHelperText sx={{ mt: 0 }}>All languages available.</FormHelperText>
      </div>
      <Switch
        checked={checked}
        onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
          setChecked(event.target.checked)
        }
        color={checked ? 'primary' : 'neutral'}
        variant={checked ? 'solid' : 'outlined'}
        slotProps={{
          endDecorator: {
            sx: {
              minWidth: 24,
            },
          },
        }}
      />
    </FormControl>
    <FormControl
      orientation="horizontal"
      sx={{ maxWidth: { xs: "94%", sm: "600px" },
      width: "100%",
      overflowY: "auto", justifyContent: 'space-between' }}
    >
      <div>
        <FormLabel>Show captions</FormLabel>
        <FormHelperText sx={{ mt: 0 }}>All languages available.</FormHelperText>
      </div>
      <Switch
        checked={checked}
        onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
          setChecked(event.target.checked)
        }
        color={checked ? 'primary' : 'neutral'}
        variant={checked ? 'solid' : 'outlined'}
        slotProps={{
          endDecorator: {
            sx: {
              minWidth: 24,
            },
          },
        }}
      />
    </FormControl>
    <FormControl
      orientation="horizontal"
      sx={{ maxWidth: { xs: "94%", sm: "600px" },
      width: "100%",
      overflowY: "auto", justifyContent: 'space-between' }}
    >
      <div>
        <FormLabel>Show captions</FormLabel>
        <FormHelperText sx={{ mt: 0 }}>All languages available.</FormHelperText>
      </div>
      <Switch
        checked={checked}
        onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
          setChecked(event.target.checked)
        }
        color={checked ? 'primary' : 'neutral'}
        variant={checked ? 'solid' : 'outlined'}
        slotProps={{
          endDecorator: {
            sx: {
              minWidth: 24,
            },
          },
        }}
      />
    </FormControl>
    <FormControl
      orientation="horizontal"
      sx={{ maxWidth: { xs: "94%", sm: "600px" },
      width: "100%",
      overflowY: "auto", justifyContent: 'space-between' }}
    >
      <div>
        <FormLabel>Show captions</FormLabel>
        <FormHelperText sx={{ mt: 0 }}>All languages available.</FormHelperText>
      </div>
      <Switch
        checked={checked}
        onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
          setChecked(event.target.checked)
        }
        color={checked ? 'primary' : 'neutral'}
        variant={checked ? 'solid' : 'outlined'}
        slotProps={{
          endDecorator: {
            sx: {
              minWidth: 24,
            },
          },
        }}
      />
    </FormControl>
    <FormControl
      orientation="horizontal"
      sx={{ maxWidth: { xs: "94%", sm: "600px" },
      width: "100%",
      overflowY: "auto", justifyContent: 'space-between' }}
    >
      <div>
        <FormLabel>Show captions</FormLabel>
        <FormHelperText sx={{ mt: 0 }}>All languages available.</FormHelperText>
      </div>
      <Switch
        checked={checked}
        onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
          setChecked(event.target.checked)
        }
        color={checked ? 'primary' : 'neutral'}
        variant={checked ? 'solid' : 'outlined'}
        slotProps={{
          endDecorator: {
            sx: {
              minWidth: 24,
            },
          },
        }}
      />
    </FormControl>
    <FormControl
      orientation="horizontal"
      sx={{ maxWidth: { xs: "94%", sm: "600px" },
      width: "100%",
      overflowY: "auto", justifyContent: 'space-between' }}
    >
      <div>
        <FormLabel>Show captions</FormLabel>
        <FormHelperText sx={{ mt: 0 }}>All languages available.</FormHelperText>
      </div>
      <Switch
        checked={checked}
        onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
          setChecked(event.target.checked)
        }
        color={checked ? 'primary' : 'neutral'}
        variant={checked ? 'solid' : 'outlined'}
        slotProps={{
          endDecorator: {
            sx: {
              minWidth: 24,
            },
          },
        }}
      />
    </FormControl>
    <FormControl
      orientation="horizontal"
      sx={{ maxWidth: { xs: "94%", sm: "600px" },
      width: "100%",
      overflowY: "auto", justifyContent: 'space-between' }}
    >
      <div>
        <FormLabel>Show captions</FormLabel>
        <FormHelperText sx={{ mt: 0 }}>All languages available.</FormHelperText>
      </div>
      <Switch
        checked={checked}
        onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
          setChecked(event.target.checked)
        }
        color={checked ? 'primary' : 'neutral'}
        variant={checked ? 'solid' : 'outlined'}
        slotProps={{
          endDecorator: {
            sx: {
              minWidth: 24,
            },
          },
        }}
      />
    </FormControl>
    <FormControl
      orientation="horizontal"
      sx={{ maxWidth: { xs: "94%", sm: "600px" },
      width: "100%",
      overflowY: "auto", justifyContent: 'space-between' }}
    >
      <div>
        <FormLabel>Show captions</FormLabel>
        <FormHelperText sx={{ mt: 0 }}>All languages available.</FormHelperText>
      </div>
      <Switch
        checked={checked}
        onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
          setChecked(event.target.checked)
        }
        color={checked ? 'primary' : 'neutral'}
        variant={checked ? 'solid' : 'outlined'}
        slotProps={{
          endDecorator: {
            sx: {
              minWidth: 24,
            },
          },
        }}
      />
    </FormControl>
    <FormControl
      orientation="horizontal"
      sx={{ maxWidth: { xs: "94%", sm: "600px" },
      width: "100%",
      overflowY: "auto", justifyContent: 'space-between' }}
    >
      <div>
        <FormLabel>Show captions</FormLabel>
        <FormHelperText sx={{ mt: 0 }}>All languages available.</FormHelperText>
      </div>
      <Switch
        checked={checked}
        onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
          setChecked(event.target.checked)
        }
        color={checked ? 'primary' : 'neutral'}
        variant={checked ? 'solid' : 'outlined'}
        slotProps={{
          endDecorator: {
            sx: {
              minWidth: 24,
            },
          },
        }}
      />
    </FormControl>
    <FormControl
      orientation="horizontal"
      sx={{ maxWidth: { xs: "94%", sm: "600px" },
      width: "100%",
      overflowY: "auto", justifyContent: 'space-between' }}
    >
      <div>
        <FormLabel>Show captions</FormLabel>
        <FormHelperText sx={{ mt: 0 }}>All languages available.</FormHelperText>
      </div>
      <Switch
        checked={checked}
        onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
          setChecked(event.target.checked)
        }
        color={checked ? 'primary' : 'neutral'}
        variant={checked ? 'solid' : 'outlined'}
        slotProps={{
          endDecorator: {
            sx: {
              minWidth: 24,
            },
          },
        }}
      />
    </FormControl>
    <FormControl
      orientation="horizontal"
      sx={{ maxWidth: { xs: "94%", sm: "600px" },
      width: "100%",
      overflowY: "auto", justifyContent: 'space-between' }}
    >
      <div>
        <FormLabel>Show captions</FormLabel>
        <FormHelperText sx={{ mt: 0 }}>All languages available.</FormHelperText>
      </div>
      <Switch
        checked={checked}
        onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
          setChecked(event.target.checked)
        }
        color={checked ? 'primary' : 'neutral'}
        variant={checked ? 'solid' : 'outlined'}
        slotProps={{
          endDecorator: {
            sx: {
              minWidth: 24,
            },
          },
        }}
      />
    </FormControl>
    <FormControl
      orientation="horizontal"
      sx={{ maxWidth: { xs: "94%", sm: "600px" },
      width: "100%",
      overflowY: "auto", justifyContent: 'space-between' }}
    >
      <div>
        <FormLabel>Show captions</FormLabel>
        <FormHelperText sx={{ mt: 0 }}>All languages available.</FormHelperText>
      </div>
      <Switch
        checked={checked}
        onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
          setChecked(event.target.checked)
        }
        color={checked ? 'primary' : 'neutral'}
        variant={checked ? 'solid' : 'outlined'}
        slotProps={{
          endDecorator: {
            sx: {
              minWidth: 24,
            },
          },
        }}
      />
    </FormControl>
    

              <Button type="submit"
              
              size="sm"
              >Добавить</Button>
            </Stack>
          </form>
        </ModalDialog>
      </Modal>
    </React.Fragment>
  );
}
