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

export type  EspecialistaType ={
  id : string;
  especialidad: string;
  nombreProfesional: string;
}
