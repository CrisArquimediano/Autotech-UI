import {Typography, Box, useTheme} from '@mui/material';

const Header =({titulo, subtitulo }) => {
    return (
        <Box mb='30px'>
            <Typography variant='h3' color={'black'} fontWeight='bold' sx={{mb: '5'}}>{titulo}</Typography>
            <Typography variant='h6' color={'gray'}>{subtitulo}</Typography>
        </Box>
    )
}

export default Header;