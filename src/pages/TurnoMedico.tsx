import React from 'react'
import TurnoForm from '../components/TurnoForm/TurnoForm'



function TurnoMedico() {
  return (
    <>
      TURNO MEDICO

      <TurnoForm onSubmit={function (data: any): void {
        throw new Error('Function not implemented.')
      } }/>
    </>
    )
}

export default TurnoMedico