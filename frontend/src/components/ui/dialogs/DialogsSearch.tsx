import { Box, Input } from "@mui/joy";
import SearchRoundedIcon from '@mui/icons-material/SearchRounded';

export default function DialogsSearch(){
    return (
        <Box sx={{ px: 2, pb: 1.5 }}>
        <Input
          size="sm"
          startDecorator={<SearchRoundedIcon />}
          placeholder="Поиск..."
          aria-label="Search"
        />
      </Box>
    )
}