import * as React from 'react';
import {
    Avatar, Button,TextField,
    Link, Grid, Box, Typography,
    Container,
    Select,
    MenuItem
} from '@mui/material';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Copyright from "./Copyright";
import { loginService, registerService } from '../../services/services';
import { useNavigate } from 'react-router-dom';
import { useAppContext } from '../../Context/Context';
import { PAGE_HOME, PAGE_LOGIN } from '../../constants/constants';

export default function SignUp() {
    const navigate = useNavigate()
    const {login} = useAppContext()

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const formData = new FormData(event.currentTarget);
        const data = {
            username: formData.get('usuario'),
            password: formData.get('password'),
            rol: [formData.get('rol')]
        }
        // se envia al servicio los datos del formulario
        registerService(data)
            .then(response => {
                const {rol, ...rest} = data
                loginService({...rest})
                    .then((resp: any) => {
                        login(resp.data.token)
                        navigate(PAGE_HOME)
                    })
                navigate(PAGE_LOGIN)
            })
            .catch(err => {
                console.log('err', err)
            })
    };

    return (
        <Box sx={{
            borderRadius: '20px', 
            backgroundColor: 'rgba(150, 150, 150, 0.8)',
            padding: "5px",
            maxWidth: "500px",
            color: 'black',
            }}>
            <ThemeProvider theme={createTheme()}>
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
                            Registrarse
                        </Typography>
                        <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
                            <Grid container spacing={2}>
                                <Grid item xs={12}>
                                    <TextField
                                        required
                                        fullWidth
                                        id="email"
                                        label="Usuario"
                                        name="usuario"
                                        autoComplete="Usuario"
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <TextField
                                        required
                                        fullWidth
                                        name="password"
                                        label="Contraseña"
                                        type="password"
                                        id="password"
                                        autoComplete="new-password"
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <Select
                                        required
                                        fullWidth
                                        label="Rol"
                                        name="rol"
                                        autoComplete="Rol"
                                        value={'ADMIN'}
                                        defaultValue={'ADMIN'}
                                    >
                                        <MenuItem value={'ADMIN'}>ADMIN</MenuItem>
                                    </Select>
                                </Grid>
                            </Grid>
                            <Button
                                type="submit"
                                fullWidth
                                variant="contained"
                                sx={{ mt: 3, mb: 2 }}
                            >
                                Registrarse
                            </Button>
                            <Grid container justifyContent="flex-end">
                                <Grid item>
                                    <Link href="/signin" variant="body1">
                                        ¿Ya tienes una cuenta? Inicia sesión
                                    </Link>
                                </Grid>
                            </Grid>
                        </Box>
                    </Box>
                    <Copyright sx={{ mt: 5 }} />
                </Container>
            </ThemeProvider>
        </Box>
    );
}