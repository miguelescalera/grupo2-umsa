export type LoginType = {
  username: FormDataEntryValue | null
  password: FormDataEntryValue | null
}

export type RegisterType = {
  username: FormDataEntryValue | null
  password: FormDataEntryValue | null
  rol: (FormDataEntryValue | null)[];
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

export type TurnoType = {
  
  profesional : string;
  paciente: string;
  fechaHora: string;
  motivoConsulta: string ;
  
}