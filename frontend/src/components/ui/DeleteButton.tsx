
"use client";

import * as React from 'react';
import Button from '@mui/joy/Button';
import Modal from '@mui/joy/Modal';
import { DialogActions, DialogContent, DialogTitle, Divider, IconButton, LinearProgress, ModalDialog } from '@mui/joy';
import { WarningRounded } from '@mui/icons-material';
import DeleteForeverRoundedIcon from '@mui/icons-material/DeleteForeverRounded';
import BlockIcon from '@mui/icons-material/Block';
import toast from 'react-hot-toast';
import { IconButton as MaterialIconButton } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';


export default function DeleteButton(
    props: {
        id: number | string;
        url: string;
        canDelete?: boolean;
        isMaterial?: boolean;
        dangerText?: string;
        deleteCallback?: (id:number) => void;
    }
) {
  const [open, setOpen] = React.useState<boolean>(false);
  const [loading, setLoading] = React.useState<boolean>(false);

  const handleOpen = () => {
    if(!props.canDelete){
        toast.error('Нельзя удалить этот элемент');
        return;
      }
    setOpen(true);
  }

  const handleDelete = () => {
    setLoading(true);
    fetchDelete();
    
  }

  const fetchDelete = () => {
    fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/${props.url}/${props.id}`,{
      method: 'DELETE',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
      },
  
    })
    .then((response) => {
      if (response.ok) {
        if (props.deleteCallback){
            props.deleteCallback(props.id);
            toast.success('Успешно удалено');
            setOpen(false);
        } else {
            toast.success('Успешно удалено');
            window.location.reload();
        }
        return response.json();
      } else {
        toast.error('Ошибка при удалении');
        window.location.reload();
      }
    })
    
  
  }



  return (
    <>
    {
      props.isMaterial ? <MaterialIconButton
        size="small"
        onClick={() => handleOpen()}
          
        >
        {
            props.canDelete ? <DeleteIcon /> :  <BlockIcon />
        }
    </MaterialIconButton> : 
    <IconButton
        size="sm"
        color={'danger'}
        onClick={() => handleOpen()}
        >
        {
            props.canDelete ? <DeleteForeverRoundedIcon /> :  <BlockIcon />
        }
    </IconButton>

    }

      <Modal
        aria-labelledby="modal-title"
        aria-describedby="modal-desc"
        open={open}
        onClose={() => setOpen(false)}
        sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}
      >
        {!loading ?
        <ModalDialog variant="outlined" role="alertdialog" color='danger'>
        <DialogTitle>
          <WarningRounded />
          Вы уверены, что хотите удалить?
        </DialogTitle>
        <Divider />
        {
            props.dangerText && <DialogContent>
                {props.dangerText}
            </DialogContent>
        }

        <DialogActions buttonFlex={2}>
          <Button variant="solid" color="danger" onClick={handleDelete}>
              Да
          </Button>
          <Button variant="solid" color="primary" onClick={() => setOpen(false)}>
            Нет
          </Button>
        </DialogActions>
      </ModalDialog>:
      <ModalDialog variant="outlined" role="alertdialog" >
          <LinearProgress color="danger" variant="soft" />
      </ModalDialog>}
      </Modal>
    </>
  );
}
