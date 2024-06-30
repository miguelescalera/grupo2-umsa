import React from 'react'
import ResponsiveAppBar from '../components/AppBar/ResponsiveAppBar'
import SignIn from '../components/Login/SignIn'
import { Box, Typography } from '@mui/material'


export function Home() {
  return (
    <>
      <Box sx={{mb:5, display:'flex', justifyContent:'center'}}>
        <ResponsiveAppBar/> 
      </Box>
      <Box border={5} color={'black'} pt={10} pb={10} >
        <Typography variant='h1' color={'white'} 
                      sx={{textShadow: '-1px -1px 0 #000, 1px -1px 0 #000,-1px  1px 0 #000, 1px  1px 0 #000, -2px -2px 0 #000, 2px -2px 0 #000, -2px 2px 0 #000, 2px 2px 0 #000, -3px -3px 0 #000, 3px -3px 0 #000, -3px 3px 0 #000, 3px 3px 0 #000, -4px -4px 0 #000, 4px -4px 0 #000, -4px 4px 0 #000, 4px 4px 0 #000'}} >
          Obra Social
        </Typography>
      </Box>
    </>
  )
}
