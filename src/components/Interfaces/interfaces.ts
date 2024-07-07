export type LoginType = {
  email: FormDataEntryValue | null
  password: FormDataEntryValue | null
}

export type RegisterType = {
  name: FormDataEntryValue | null
  lastName: FormDataEntryValue | null
  email: FormDataEntryValue | null
  password: FormDataEntryValue | null
}

export interface  EspecialistasType {
  id : string;
  especialidad: string;
  nombreProfesional: string;
  horarioConsulta: HorariosType[];
}

export type ProfesionalType = {
  id : string;
  nombre: string
}

export type HorariosType = {
  id : string;
  dia : string;
  horario: string;
  disponibilidad: boolean | null
}

export type PacientesType = {
  id : string;
  nombre : string;
  email : string;
  telefono: string;
  
}

export type TurnoType = {
  
  profesional : string;
  paciente: string;
  fechaHora: string;
  motivoConsulta: string ;
  
}