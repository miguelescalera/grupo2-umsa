import React, { useEffect, useState } from 'react';
import { TextField, Button, Select, MenuItem, InputLabel, FormControl } from '@mui/material';
import axios from 'axios';
import { especialistasService } from '../../services/services';
import { EspecialistaType, HorariosType } from '../Interfaces/interfaces';
import { styled } from '@mui/system';

const FormContainer = styled('div')({
  backgroundColor: '#fff', // Color blanco
  padding: '20px', // Opcional: Agrega un poco de relleno alrededor del contenido
});

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
  const [horariosDisponibles, setHorariosDisponibles] = useState<any[]>([]); // Ajusta el tipo según sea necesario
  const [selectedHorario, setSelectedHorario] = useState<string>('');
  const [especialidades, setEspecialidades] = useState([]);
  const [selectedEspecialidad, setSelectedEspecialidad] = useState('');


  useEffect(() => {
    especialistasService()
      .then(response => {
        const especialidades: any = new Set(response.map((especialista: EspecialistaType) => especialista.especialidad));
        console.log("ss",response);
        setEspecialidades(Array.from(especialidades));
        //setHorariosDisponibles([]);

        if (selectedEspecialidad) {
          const doctoresConEspecialidad = response.filter((especialista: EspecialistaType) => especialista.especialidad === selectedEspecialidad);

          setDoctoresDisponibles(doctoresConEspecialidad);

        }
      })
      .catch(error => console.error('Error fetching especialidades', error));
  }, [selectedEspecialidad]);

  useEffect(() => {
    if (selectedEspecialidad) {
      especialistasService()
        .then(response => {
          const doctoresConEspecialidad = response.filter((especialista: EspecialistaType) => especialista.especialidad === selectedEspecialidad);

          setDoctoresDisponibles(doctoresConEspecialidad);
        })
        .catch(error => console.error('Error fetching doctores by specialty', error));
    }
  }, [selectedEspecialidad]);

  useEffect(() => {
    if (selectedDoctor && selectedEspecialidad) {
      especialistasService()
        .then(response => {
          console.log('selectedDoctor:', selectedDoctor);
          console.log('selectedEspecialidad:', selectedEspecialidad);
          const selectedDoctorInfo: any = response.find(doctor => doctor.nombreProfesional === selectedDoctor);
          console.log("doctor");
          console.log(selectedDoctorInfo);
          //const horarios = response.flatMap(item => item.horarioConsulta);
          //console.log("horarios");
          //console.log(horarios);
          //si funciona, pero el async parece que espera a que recien
          //cambien el estado de la especialidad, para cambiar el estado
          //de los horarios disponibles, y el selectedHorario
          setHorariosDisponibles([]);

          if (selectedDoctor) {
            setHorariosDisponibles(selectedDoctorInfo.horarioConsulta); // Actualiza los horarios basándose en el doctor seleccionado
            console.log("horarioDisponibles");
            console.log(horariosDisponibles);
            console.log("selectedHorario");
            console.log(selectedHorario);
          }
        })
        .catch(error => console.error('Error fetching doctores by specialty', error));
    }
  }, [selectedDoctor, selectedEspecialidad]);

  const handleEspecialidad = (e: any) => {
    setSelectedEspecialidad(e.target.value)
    setHorariosDisponibles([]);
    console.log('shorariosDisponibles:',horariosDisponibles);

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
            defaultValue={''}
          >
            {doctoresDisponibles.map((especialista) => (
              <MenuItem
                key={especialista.id} value={
                  //este codigo es para evitar el out of range provider, pero no me 
                  //selecciona el nombre en el menudesplegable
                  /*(especialista.nombreProfesional === undefined ||
                  especialista.nombreProfesional === null ||
                  Option.length === 0) ? '' :*/
                  especialista.nombreProfesional}>
                {especialista.nombreProfesional}
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
            defaultValue={''}
          >
            {horariosDisponibles.map((horario) => (
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
