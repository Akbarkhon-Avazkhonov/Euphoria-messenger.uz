"use client";
import * as React from 'react';
import Modal from '@mui/joy/Modal';
import { DialogTitle, IconButton, Input, ModalDialog, Select, Stack, Option, Button, FormLabel } from '@mui/joy';
import { LoginRounded, PersonAddRounded, VisibilityOffRounded, VisibilityRounded } from '@mui/icons-material';
import BadgeIcon from '@mui/icons-material/Badge';
import toast from 'react-hot-toast';
import PhoneModal from '@/components/ui/admin/PhoneModal';
import CircularProgress from '@mui/joy/CircularProgress';

export async function fetchOperators(rop_id:string) {
  const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/users/getOperatorsNotRop/${rop_id}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
    credentials: 'include',
  }).then((response) => response.json());
  return response;
}

async function fetchAddRopOperator(rop_id:string, operator_id: string) {
  const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/users/addRopOperator/${rop_id}/${operator_id}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    credentials: 'include',

  }).then((response) => response.json());
  return response;
}

interface AddOperatorProps{
  id : string
}

export default function AddOperator(
  props: AddOperatorProps
) {
  const [open, setOpen] = React.useState<boolean>(false);
  const [passwordVisible, setPasswordVisible] = React.useState(false);
  const [operator, setOperator] = React.useState<string>('');
  const [name, setName] = React.useState<string>('');
  const [loadingRoles, setLoadingRoles] = React.useState<boolean>(true);
  const [operators, setOperators] = React.useState<any[]>([]);

  const [close, setClose] = React.useState<boolean>(false);
  React.useEffect(() => {
    const loadOperators = async () => {
      try {
        const result = await fetchOperators(
        props.id
        );
        setOperators(result.data);
        setLoadingRoles(false);
      } catch (error) {
        console.error("Failed to fetch roles:", error);
        setLoadingRoles(false);
      }
    };
    loadOperators();
  }, []);


  
  const handleSubmit = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();

    fetchAddRopOperator(props.id, operator).then(() => {
      setOpen(false);
    });
    window.location.reload();
  };

 

  React.useEffect(() => {
    if (close) {
      setOpen(false);
      setName('');
      setClose(false);
      setOperator('')
      window.location.reload();
    }
  }, [close]);


  return (
    <>
      <Button startDecorator={<PersonAddRounded />} onClick={() => setOpen(true)} size="sm">
        Добавить
      </Button>

      <Modal open={open} onClose={() => setOpen(false)}>
        <ModalDialog
          sx={{
            maxWidth: { xs: '94%', sm: '400px' },
            width: '100%',
            overflowY: 'auto',
          }}
        >
          
          <DialogTitle color="primary" level="h4">
            Добавить оператора Ропу
            <PersonAddRounded sx={{ fontSize: 24 }} color="primary" />
          </DialogTitle>

          <Stack spacing={2}>

            <FormLabel required>Выберите оператора</FormLabel>
            <Select
              name="operator"
              required
              sx={{ minWidth: 200 }}
              value={operator}
              onChange={(event, newValue) => setOperator(newValue as string)}
              disabled={loadingRoles}
            >
              {loadingRoles ? (
                <Option value="" disabled>
                  Загрузка...
                </Option>
              ) : (
                operators.map((role: any) => (
                  <Option key={role.id} value={role.id}>
                    {role.name}
                  </Option>
                ))
              )}
            </Select>

            <Button type="submit" size="sm" onClick={handleSubmit}>
              Добавить
            </Button>


          </Stack>
        </ModalDialog>
      </Modal>

    </>
  );
}
