import * as React from 'react';
import {
  Avatar, Button, TextField,
  FormControlLabel, Checkbox, Link, Grid, Box, Typography,
  Container
} from '@mui/material';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Copyright from "./Copyright";

export default function SignIn() {
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    console.log({
      email: data.get('email'),
      password: data.get('password'),
    });
  };

  return (
    <Box sx={{
          borderRadius: '20px', 
          backgroundColor: 'rgba(150, 150, 150, 0.8)',
          padding: "5px",
          maxWidth: "500px",
          color: 'black',
          }}>
        <Container component="main" maxWidth="xs">
          <Box
            sx={{
              marginTop: 8,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}
          >
            <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
              <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
              Iniciar sesión
            </Typography>
            <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1}}>
              <TextField
                margin="normal"
                required
                fullWidth
                id="email"
                label="Correo electrónico"
                name="email"
                autoComplete="email"
                autoFocus
              />
              <TextField
                margin="normal"
                required
                fullWidth
                name="password"
                label="Contraseña"
                type="password"
                id="password"
                autoComplete="current-password"
              />
              <FormControlLabel
                control={<Checkbox value="remember" color="primary" />}
                label="Recuérdame"
              />
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >
                Iniciar sesión
              </Button>
              <Grid container>
                <Grid item xs>
                  <Link href="#" variant="body1">
                    ¿Olvidaste tu contraseña?
                  </Link>
                </Grid>
                <Grid item>
                  <Link href="/signup" variant="body1">
                    No tienes una cuenta? Regístrate
                  </Link>
                </Grid>
              </Grid>
            </Box>
          </Box>
          <Copyright sx={{ mt: 5}} />
        </Container>
    </Box>
  );
}