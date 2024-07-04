import React, { useEffect, useState } from 'react';
import { TextField, Button, Select, MenuItem, InputLabel, FormControl } from '@mui/material';
import axios from 'axios';
import { especialistasService } from '../../services/services';
import { EspecialistaType } from '../Interfaces/interfaces';


interface TurnoFormProps {
  onSubmit: (data: any) => void;
}

/*
interface Especialista {
  id : string;
  especialidad: string;
  nombreProfesional: string;
}
*/

const TurnoForm: React.FC<TurnoFormProps> = ({ onSubmit }) => {
  //const [especialidades, setEspecialidades] = useState<string[]>([]);
  const [motivoConsulta, setMotivoConsulta] = useState('');
  const [doctoresDisponibles, setDoctoresDisponibles] = useState<EspecialistaType[]>([]);
  const [selectedDoctor, setSelectedDoctor] = useState('');

  const [especialidades, setEspecialidades] = useState([]);
  const [selectedEspecialidad, setSelectedEspecialidad] = useState('');

  //get<Especialista[]>
  useEffect(() => {
    especialistasService()
      .then(response => {
        const especialidades: any = new Set(response.map((especialista: EspecialistaType) => especialista.especialidad));
        setEspecialidades(Array.from(especialidades));

        if (selectedEspecialidad) {
        const doctoresConEspecialidad = response.filter((especialista: EspecialistaType) => especialista.especialidad === selectedEspecialidad);
        console.log(doctoresConEspecialidad)
        setDoctoresDisponibles(doctoresConEspecialidad);
        }
      })
      .catch(error => console.error('Error fetching especialidades', error));
  }, []);

  useEffect(() => {
    if (selectedEspecialidad) {
      especialistasService()
        .then(response => {
          const doctoresConEspecialidad = response.filter((especialista: EspecialistaType) => especialista.especialidad === selectedEspecialidad);
          console.log(doctoresConEspecialidad);
          setDoctoresDisponibles(doctoresConEspecialidad);
        })
        .catch(error => console.error('Error fetching doctores by specialty', error));
    }
  }, [selectedEspecialidad]);



const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
  event.preventDefault();
  onSubmit({
    especialidad: selectedEspecialidad,
    motivo: motivoConsulta,
    doctor: selectedDoctor // Añade el doctor seleccionado
  });
};


  return (
    <form onSubmit={handleSubmit}>
      
      <FormControl fullWidth>
        <InputLabel id="select-especialidad-label">Especialidad</InputLabel>
        <Select
          labelId="select-especialidad"
          value={selectedEspecialidad}
          onChange={(e) => setSelectedEspecialidad(e.target.value)}
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
          defaultValue={''}
        >
          {doctoresDisponibles.map((especialista) => (
            <MenuItem //este codigo es para evitar el out of range provider
              key={especialista.id} value={
                (especialista.nombreProfesional === undefined ||
                especialista.nombreProfesional === null ||
                Option.length === 0) ? '' : especialista.nombreProfesional}>
                  {especialista.nombreProfesional}
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
  );
};

export default TurnoForm;
