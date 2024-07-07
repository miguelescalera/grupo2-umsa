import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import AdbIcon from '@mui/icons-material/Adb';
import { pages, settings } from './ResponsiveAppBar.constans';
import { Link } from 'react-router-dom';
import { useAppContext } from '../../Context/Context';

function ResponsiveAppBar() {
  const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(null);
  const {logout} = useAppContext()

  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  return (
    <AppBar position="fixed" color='primary' sx={{opacity:0.9, borderRadius:5, margin:'0 auto', display:'flex', justifyContent:'center', mb:'50px'}}>
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <AdbIcon sx={{ display: { xs: 'none', md: 'flex' }, mr: 1 }} />
          <Typography
            variant="h6"
            noWrap
            component="a"
            href="/"
            sx={{
              mr: 2,
              display: { xs: 'none', md: 'flex' },
              fontFamily: 'monospace',
              fontWeight: 700,
              color: 'inherit',
              textDecoration: 'none',
            }}
          >
            Obra Social
          </Typography>
          {/*Titulo pantalla pequeña*/}
          <Typography
            variant="h6"
            noWrap
            component="a"
            href="#app-bar-with-responsive-menu"
            sx={{
              mr: 2,
              display: { xs: 'flex', md: 'none' },
              flexGrow: 1,
              fontFamily: 'monospace',
              fontWeight: 700,
              letterSpacing: '.3rem',
              color: 'inherit',
              textDecoration: 'none',
            }}
          >
            Obra Social
          </Typography>
          {/*Menu*/}
          <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
            {pages.map(({name, route}) => (
              <Link style={{textDecoration:'none'}} to={route}>
                <Button
                  key={`${name}`}
                  variant='text'
                  sx={{ my: 2, color: 'white', display: 'block' }}
                >
                  {name}
                </Button>
              </Link>
            ))}
          </Box>
          {/*Opciones*/}
          <Box sx={{ flexGrow: 0 }}>
            <Tooltip title="Perfil">
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 0}}>
                <Avatar sx={{bgcolor: "transparent"}}/>
              </IconButton>
            </Tooltip>
            <Menu
              sx={{ mt: '45px'}}
              id="menu-appbar"
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
            >
              {settings.map(({name, route}) => {
                const close = name === 'Cerrar Sesion'
                return (
                  <MenuItem key={`${name}${route}`} onClick={close ? logout :  handleCloseUserMenu}>
                    {route ? <Link style={{textDecoration:'none'}} to={route}>
                      <Typography textAlign="center" fontSize="18px">{name}</Typography>
                    </Link> : 
                    <Typography textAlign="center" fontSize="18px">{name}</Typography>
                    }
                  </MenuItem>
                )
              })}
            </Menu>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}
export default ResponsiveAppBar;