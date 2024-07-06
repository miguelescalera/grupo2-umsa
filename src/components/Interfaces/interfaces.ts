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

export type ProfesionalType = {
  id: String
  emailProfesional: String
  especialidad: String
  nombreProfesional: String
  ubicacionConsulta: String
}

export type PacienteType = {
  id: String
  nombre: String
  telefono: String
}

export type HorarioConsulta = {
  id: String | null
  dia: String | null
  horario: String | null
}

export type TurnosType = {
  id: String | null
  profesional: ProfesionalType
  paciente: PacienteType 
  horarioConsulta: HorarioConsulta
  fechaHora: String | null
  motivoConsulta: String | null
}
