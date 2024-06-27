import React from 'react';
import { Typography, Link } from '@mui/material';

type CopyrightProps = React.ComponentProps<typeof Typography>;

const Copyright: React.FC<CopyrightProps> = (props) => {
  return (
    <Typography variant="body2" color="text.secondary" align="center" {...props}>
      {'Copyright © '}
      <Link color="inherit" href="#">
        Obra Social
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
};

export default Copyright;
