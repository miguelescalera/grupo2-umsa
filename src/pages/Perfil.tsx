import Layout from '../components/Layout/Layout'
import { Avatar, Box, Container, TextField, Typography } from '@mui/material'

const Perfil = () => {
    return (
        <Layout>
            <Box sx={ {
                mt: '50px',
                borderRadius: '20px',
                backgroundColor: 'rgba(150, 150, 150, 0.8)',
                padding: "5px",
                maxWidth: "500px",
                color: 'black',
            } }>
                <Container component="main" maxWidth="xs">
                    <Box
                        sx={ {
                            marginTop: 8,
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                            mb: 3
                        } }
                    >
                        <Avatar sx={ { m: 1, bgcolor: 'secondary.main' } }>
                        </Avatar>
                        <Typography component="h1" variant="h5">
                            Datos Personales
                        </Typography>
                        <Box sx={ { mt: 1 } } display='flex' flexDirection={ 'row' } gap={ 2 }>
                            <TextField
                                margin='normal'
                                id="outlined-read-only-input"
                                label="Nombre"
                                defaultValue="Miguel"
                                InputProps={ {
                                    readOnly: true,
                                } }
                                focused
                            />
                            <TextField
                                margin='normal'
                                id="outlined-read-only-input"
                                label="Apellido"
                                defaultValue="Escalera"
                                InputProps={ {
                                    readOnly: true,
                                } }
                                focused
                            />
                        </Box>
                        <Box sx={ { mt: 1 } } display='flex' flexDirection={ 'row' } gap={ 2 }>
                            <TextField
                                margin='normal'
                                id="outlined-read-only-input"
                                label="DNI"
                                defaultValue="38984178"
                                InputProps={ {
                                    readOnly: true,
                                } }
                                focused
                            />
                            <TextField
                                margin='normal'
                                id="outlined-read-only-input"
                                label="Telefono"
                                defaultValue="1130867175"
                                InputProps={ {
                                    readOnly: true,
                                } }
                                focused
                            />
                        </Box>
                        <Box sx={ { mt: 1 } } width={ '100%' }>
                            <TextField
                                margin='normal'
                                fullWidth
                                id="outlined-read-only-input"
                                label="Email"
                                defaultValue="miguelescalera@gmail.com"
                                InputProps={ {
                                    readOnly: true,
                                } }
                                focused
                            />
                        </Box>
                    </Box>
                </Container>
            </Box>
        </Layout>
    )
}

export default Perfil