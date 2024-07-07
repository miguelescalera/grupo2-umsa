import React from 'react'
import TurnoForm from '../components/TurnoForm/TurnoForm'
import { Box } from '@mui/material'

function TurnoMedico() {
  return (
    <Box sx={{ bgcolor: '#f0f0f0', p: 2, color: '#333', fontSize: '24px', fontWeight: 'bold' }}>
      TURNO MEDICO
      <TurnoForm />
    </Box>

  )
}

export default TurnoMedico