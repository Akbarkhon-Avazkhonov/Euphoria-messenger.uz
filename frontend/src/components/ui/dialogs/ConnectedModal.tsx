import { Snackbar, Typography } from "@mui/joy";

interface ConnectedModalProps {
    isConnected: boolean;
    setIsConnected: (isConnected: boolean) => void;
  }
export default function ConnectedModal(props: ConnectedModalProps) {
    if (props.isConnected) {
        return (
            <Snackbar
            anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
            open={props.isConnected}
            autoHideDuration={5000}
            onClose={() => props.setIsConnected(false)}
            variant="soft"
            color="success"
          >
            <Typography level="body-sm" sx={{ color: 'text.secondary' }}>
              Подключено
            </Typography>
          </Snackbar>
        );
    }
    return null;
    }