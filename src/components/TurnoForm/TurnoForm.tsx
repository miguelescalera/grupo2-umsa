import React, { useEffect, useState } from 'react';
import { TextField, Button, Select, MenuItem, InputLabel, FormControl } from '@mui/material';
import { especialistasService, getPacientes, newTurnoService } from '../../services/services';
import { EspecialistasType, PacientesType, ProfesionalType } from '../Interfaces/interfaces';
import { styled } from '@mui/system';
import Calendar from '../TurnoForm/Calendar'
import dayjs, { Dayjs } from 'dayjs';


const FormContainer = styled('div')({
  backgroundColor: '#fff', // Color blanco
  padding: '20px', // Opcional: Agrega un poco de relleno alrededor del contenido
});


const TurnoForm: React.FC = () => {
  const [motivoConsulta, setMotivoConsulta] = useState('');
  const [doctoresDisponibles, setDoctoresDisponibles] = useState<ProfesionalType[]>([]);
  const [selectedDoctor, setSelectedDoctor] = useState('');
  //const [horariosDisponibles, setHorariosDisponibles] = useState<HorariosType[]>(); // Ajusta el tipo según sea necesario
  //const [selectedHorario, setSelectedHorario] = useState<string>('');
  const [especialidades, setEspecialidades] = useState([]);
  const [selectedEspecialidad, setSelectedEspecialidad] = useState('');
  const [dataProfesionales, setDataProfesionales] = useState<EspecialistasType[]>([]);
  const [fechaHora, setFechaHora] = useState(null);
  const [pacientes, setPacientes] = useState<PacientesType[]>([]);
  const [selectedPaciente, setSelectedPaciente] = useState<any>();


  useEffect(() => {
    especialistasService().then(response => {
      const especialidades: any = new Set(response.map((especialista: EspecialistasType) => especialista.especialidad));
      console.log("primer useEffrc", response);
      setEspecialidades(Array.from(especialidades));
      setDataProfesionales(response);

    })
    getPacientes().then(response => {
      setPacientes(response);
    })
  }, []);

  useEffect(() => {
    console.log({ dataProfesionales, selectedEspecialidad })
    if (selectedEspecialidad !== '') {
      const doctorEspecialidad = dataProfesionales.filter((profesional: EspecialistasType) => (profesional.especialidad === selectedEspecialidad))
      console.log("especialidad 2effect", doctorEspecialidad);
      setDoctoresDisponibles(doctorEspecialidad.map(doctor => ({ id: doctor.id, nombre: doctor.nombreProfesional })))
    }
    //eslint-disabled-next-line react-hooks/exhaustive-deps
  }, [selectedEspecialidad]);


  //HORARIOS DISPONIBLES NO LLEGAMOS A TERMINAR
  // useEffect(() => {
  //   if (selectedDoctor!=='') {
  //     const doctor = dataProfesionales.filter((profesional : EspecialistasType) => (profesional.id===selectedDoctor))
  //     console.log("doctor 2effect",doctor);
  //     setHorariosDisponibles(doctor[0].horarioConsulta)
  //   }
  //   //eslint-disabled-next-line react-hooks/exhaustive-deps
  // }, [selectedDoctor]);

  const handleEspecialidad = (e: any) => {
    setSelectedEspecialidad(e.target.value)
  }

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    newTurnoService({
      paciente: { "id": selectedPaciente },
      profesional: { "id": selectedDoctor },
      fechaHora: fechaHora,
      motivoConsulta: motivoConsulta
    });
  };

  return (
    <FormContainer>
      <form onSubmit={handleSubmit}>

        <FormControl fullWidth>
          <InputLabel id="select-paciente-label">Paciente</InputLabel>
          <Select
            labelId="select-paciente"
            value={selectedPaciente}

            onChange={(e) => setSelectedPaciente(e.target.value)}
            label="Paciente"
          >
            {pacientes.map((paciente) => (
              <MenuItem key={paciente.id} value={paciente.id}>
                {paciente.nombre}
              </MenuItem>
            ))}
          </Select>
        </FormControl>



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
            onChange={(e) => {
              setSelectedDoctor(e.target.value)
              console.log("Doctor", e.target.value)
            }} // Añade un estado setter para el doctor seleccionado
            label="Doctor"
            defaultValue={'probando'}
          >
            {doctoresDisponibles.map((especialista) => (
              <MenuItem
                key={especialista.id} value={
                  especialista.id}>
                {especialista.nombre}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        {//HORARIO CONSULTA CON ID
        /* <FormControl fullWidth>
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
        </FormControl> */}

        <Calendar
          onChange={(e: any) => {
            console.log("calendar", e.format('YYYY-MM-DDTHH:mm:ss'))
            setFechaHora(e.format('YYYY-MM-DDTHH:mm:ss'))
          }
          }
          value={fechaHora !== '' ? dayjs(fechaHora) : dayjs()}
        />

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
