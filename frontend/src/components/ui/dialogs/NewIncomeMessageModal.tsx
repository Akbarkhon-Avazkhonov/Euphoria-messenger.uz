import { Snackbar, Typography } from "@mui/joy";

interface NewMessageModalProps {
    newMessage: any;
    setNewMessage: (newMessage: any) => void;
}
export default function NewIncomeMessageModal(props: NewMessageModalProps) {
    return (
        <>
        {props.newMessage && (
            <Snackbar
            anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
            open={props.newMessage}
            autoHideDuration={5000}
            onClose={() => props.setNewMessage(null)}
            variant="soft"
            color="primary"
          >
            <Typography level="body-sm" sx={{ color: 'text.secondary' }}>
              {props.newMessage.message}
            </Typography>
          </Snackbar>
        )}
        </>
        
    )
}