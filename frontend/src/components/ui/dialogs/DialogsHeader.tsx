import { Stack, Typography } from "@mui/joy";
import Chip from "@mui/joy/Chip/Chip";
import ColorSchemeToggle from "@/components/ui/ColorSchemeToggle";
import LogoutModal from "@/components/ui/dialogs/LogoutModal";
interface DialogHeaderProps{
    unreadDialogs?: number
}
export default  function DialogHeader(props:DialogHeaderProps){
    return (
    <Stack
        direction="row"
        spacing={1}
        alignItems="center"
        justifyContent="space-between"
        p={2}
        pb={1.5}      >
        <ColorSchemeToggle />
        <Typography
          fontSize={{ xs: 'md', md: 'lg' }}
          component="h1"
          fontWeight="lg"
          sx={{ mr: 'auto' }}
          endDecorator={
            props.unreadDialogs && (
                <Chip
                    variant="soft"
                    color="primary"
                    size="md"
                    slotProps={{ root: { component: 'span' } }}
                    >
                    {props.unreadDialogs}
                    </Chip>
            )
          }
        >
          Сообщения
        </Typography>
        <LogoutModal />
      </Stack>
    )
} 