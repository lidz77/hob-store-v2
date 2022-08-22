import React from 'react';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';

const BasicToolbar = ({title, onCloseButton}) => {
  return (
    <Container>
      <Toolbar position="fixed" >
        <Box sx={{flexGrow : 1}} />
        <Typography
          sx={{textAlign: 'center'}}
          >
        </Typography>
        {title}
        <Box sx={{display: {xs: 'none', md: 'flex'}}}>
          <IconButton
            size="large"
            aria-label="Add new category"
            color="inherit"
            onClick={onCloseButton}
            >
            <CloseIcon
              />
          </IconButton>
        </Box>
      </Toolbar>
    </Container>
  )
}

export default BasicToolbar
