import React from 'react';
import { Box } from '@mui/material';
import NavLinkTemplate from '/src/components/NavLinkTemplate';
import ROUTES from '../../router/routesDictionary';

function Footer() {
  return (
    <Box
      component="footer"
      sx={{
        backgroundColor: '#1976d2',
        color: 'white',
        textAlign: 'center',
        py: 2,
        mt: 'auto',
      }}
    >
      <Box sx={{ display: 'flex', justifyContent: 'center', gap: 3 }}>
        <NavLinkTemplate to={ROUTES.root} label="Home" />
        <NavLinkTemplate to={ROUTES.about} label="About" />
      </Box>
    </Box>
  );
}

export default Footer;
