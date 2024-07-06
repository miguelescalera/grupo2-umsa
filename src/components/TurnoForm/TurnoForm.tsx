import React, { useEffect, useState } from 'react';
import { TextField, Button, Select, MenuItem, InputLabel, FormControl } from '@mui/material';
import axios from 'axios';
import { especialistasService } from '../../services/services';
import { EspecialistasType, HorariosType, ProfesionalType } from '../Interfaces/interfaces';
import { styled } from '@mui/system';

const FormContainer = styled('div')({
  backgroundColor: '#fff', // Color blanco
  padding: '20px', // Opcional: Agrega un poco de relleno alrededor del contenido
});

interface TurnoFormProps {
  onSubmit: (data: any) => void;
}

const TurnoForm: React.FC<TurnoFormProps> = ({ onSubmit }) => {
  //const [especialidades, setEspecialidades] = useState<string[]>([]);
  const [motivoConsulta, setMotivoConsulta] = useState('');
  const [doctoresDisponibles, setDoctoresDisponibles] = useState<ProfesionalType[]>([]);
  const [selectedDoctor, setSelectedDoctor] = useState('');
  const [horariosDisponibles, setHorariosDisponibles] = useState<HorariosType[]>(); // Ajusta el tipo según sea necesario
  const [selectedHorario, setSelectedHorario] = useState<string>('');
  const [especialidades, setEspecialidades] = useState([]);
  const [selectedEspecialidad, setSelectedEspecialidad] = useState('');
  const [dataProfesionales, setDataProfesionales] = useState<EspecialistasType[]>([]);

  useEffect(() => {
    especialistasService().then(response => {
      const especialidades: any = new Set(response.map((especialista: EspecialistasType) => especialista.especialidad));
      console.log("primer useEffrc", response);
      setDataProfesionales(response);
      setEspecialidades(Array.from(especialidades));
      //aca traigo el objeto con esas propiedades de especialista
      // const doctoresConEspecialidad = response.map((especialista: EspecialistasType) => ({ id: especialista.id, nombre: especialista.nombreProfesional }));
      // setDoctoresDisponibles(doctoresConEspecialidad);
    })
  }, []);

  useEffect(() => {
    if (selectedDoctor!=='') {
      const doctor = dataProfesionales.filter((profesional : EspecialistasType) => (profesional.id===selectedDoctor))
      console.log("doctor 2effect",doctor);
      setHorariosDisponibles(doctor[0].horarioConsulta)
    }
    //eslint-disabled-next-line react-hooks/exhaustive-deps
  }, [selectedDoctor]);

  useEffect(() => {
    console.log({dataProfesionales,selectedEspecialidad})
    if (selectedEspecialidad!=='') {
      const doctorEspecialidad  = dataProfesionales.filter((profesional : EspecialistasType) => (profesional.especialidad===selectedEspecialidad))
      console.log("especialidad 2effect",doctorEspecialidad);
      setDoctoresDisponibles(doctorEspecialidad.map(doctor => ({id : doctor.id, nombre: doctor.nombreProfesional})))
    }
    //eslint-disabled-next-line react-hooks/exhaustive-deps
  }, [selectedEspecialidad]);




  const handleEspecialidad = (e: any) => {
    setSelectedEspecialidad(e.target.value)
    setHorariosDisponibles([]);
    console.log('shorariosDisponibles:', horariosDisponibles);

  }


  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    onSubmit({
      especialidad: selectedEspecialidad,
      motivo: motivoConsulta,
      doctor: selectedDoctor, // Añade el doctor seleccionado
      horario: selectedHorario
    });
  };


  return (
    <FormContainer>
      <form onSubmit={handleSubmit}>

        <FormControl fullWidth>
          <InputLabel id="select-especialidad-label">Especialidad</InputLabel>
          <Select
            labelId="select-especialidad"
            value={selectedEspecialidad}
            onChange={handleEspecialidad}
            label="Especialidad"
          >
            {especialidades.map((especialidad) => (
              <MenuItem key={especialidad} value={especialidad}>{especialidad}</MenuItem>
            ))}
          </Select>
        </FormControl>

        <FormControl fullWidth>
          <InputLabel id="select-doctor-label">Doctor</InputLabel>
          <Select
            labelId="select-doctor"
            value={selectedDoctor} // Añade un estado para el doctor seleccionado
            onChange={(e) => setSelectedDoctor(e.target.value)} // Añade un estado setter para el doctor seleccionado
            label="Doctor"
            defaultValue={'probando'}
          >
            {doctoresDisponibles.map((especialista) => (
              <MenuItem
                key={especialista.id} value={
                  //este codigo es para evitar el out of range provider, pero no me 
                  //selecciona el nombre en el menudesplegable
                  /*(especialista.nombreProfesional === undefined ||
                  especialista.nombreProfesional === null ||
                  Option.length === 0) ? '' :*/
                  especialista.id}>
                {especialista.nombre}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        <FormControl fullWidth>
          <InputLabel id="select-horario-label">Horario</InputLabel>
          <Select
            labelId="select-horario"
            value={selectedHorario}
            onChange={(e) => setSelectedHorario(e.target.value)}
            label="Horario"
            
          >
             {horariosDisponibles?.map((horario) => (
              //verificar porque sí aparecen, pero no me deja seleccionarlo
              // en la solapa esa, el id me da continuado con otros horarios
              <MenuItem key={horario.id} value={`Dia: ${horario.dia}, Horario: ${horario.horario}`}>
                {`${horario.dia} - ${horario.horario}`}
              </MenuItem>
            ))} 
          </Select>
        </FormControl>

        <TextField
          label="Motivo de Consulta"
          value={motivoConsulta}
          onChange={(e) => setMotivoConsulta(e.target.value)}
        />
        <Button variant="contained" color="primary" type="submit">
          Crear Turno
        </Button>
      </form>
    </FormContainer>
  );
};

export default TurnoForm;
