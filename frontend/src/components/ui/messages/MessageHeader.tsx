import { Stack, Avatar, Typography, Chip } from "@mui/joy";
import CircleIcon from '@mui/icons-material/Circle';

type MessagesPaneHeaderProps = {
    title: string | undefined;
  };
  
  export default function MessageHeader(props: MessagesPaneHeaderProps) {
    return (
      <Stack
        direction="row"
        justifyContent="space-between"
        sx={{
          borderBottom: '1px solid',
          borderColor: 'divider',
          backgroundColor: 'background.body',
        }}
        py={{ xs: 2, md: 2 }}
        px={{ xs: 1, md: 2 }}
      >
        <Stack direction="row" spacing={{ xs: 1, md: 2 }} alignItems="center">
          {/* <IconButton
            variant="plain"
            color="neutral"
            size="sm"
            sx={{
              display: { xs: 'inline-flex', sm: 'none' },
            }}
            onClick={() => toggleMessagesPane()}
          >
            <ArrowBackIosNewRoundedIcon />
          </IconButton> */}
          <Avatar size="lg" />
          <div>
            <Typography
              fontWeight="lg"
              fontSize="lg"
              component="h2"
              noWrap
              endDecorator={
                false ? (
                  <Chip
                    variant="outlined"
                    size="sm"
                    color="neutral"
                    sx={{
                      borderRadius: 'sm',
                    }}
                    startDecorator={
                      <CircleIcon sx={{ fontSize: 8 }} color="success" />
                    }
                    slotProps={{ root: { component: 'span' } }}
                  >
                    Онлайн
                  </Chip>
                ) : undefined
              }
            >
              {props.title || 'Выберите чат'}
            </Typography>
            {/* <Typography level="body-sm">{sender.username}</Typography> */}
          </div>
        </Stack>
      </Stack>
    );
  }