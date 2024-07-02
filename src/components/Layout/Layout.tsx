import { Box } from '@mui/material'
import { ReactNode } from 'react'
import ResponsiveAppBar from '../AppBar/ResponsiveAppBar'

const Layout = ({children}:{children:ReactNode}) => {
    return (
        <Box sx={ { mb: 5, display: 'flex', justifyContent: 'center' } }>
            <ResponsiveAppBar />
            { children }
        </Box>
    )
}

export default Layout