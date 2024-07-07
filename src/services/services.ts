import {LoginType, RegisterType,EspecialistasType, PacientesType } from '../components/Interfaces/interfaces'
import { LOGIN, REGISTER,CARTILLA_MEDICA, TURNOS, PACIENTES } from '../constants/constants'
import api from './instance.axios'

  const registerService = (data: RegisterType) => {
    return new Promise((resolve, reject) => {
    api.post(`${REGISTER}`, data)
        .then(response => {
          resolve(response)
        })
        .catch(err => {
          reject(err)
        })
    })
  }

  const loginService = (data: LoginType) => {
    return new Promise((resolve, reject) => {
      api.post(`${LOGIN}`, data)
        .then(response => {
          resolve(response)
        })
        .catch(err => {
          reject(err)
        })
    })
  }

  const especialistasService = () => {
    return new Promise<EspecialistasType[]>((resolve, reject) => {
      api.get(`${CARTILLA_MEDICA}`)
        .then(response => {
          resolve(response.data);
        })
        .catch(err => {
          reject(err); // Permitir que el consumidor maneje el error
        });
    });
  }

  const getPacientes = () => {
    return new Promise<PacientesType[]>((resolve, reject) =>{
      api.get(`${PACIENTES}`)
        .then(response  => {
          resolve(response.data);
        })
        .catch(err => {
          reject(err)
        })
    })
  }

  const newTurnoService = (dataTurno : any) =>{
    return new Promise((resolve, reject) =>{
      //cambiamos las {} en dataTurno
      api.post(`${TURNOS}`,dataTurno)
        .then(response => {
          resolve(response)
          console.log("respons data axios",response)
          console.log(dataTurno)
        })
        .catch(err => {
          reject(err)
        })
    }
    )
  }

export {
  registerService,
  loginService,
  especialistasService,
  newTurnoService,
  getTurns,
  getPacientes,
  getPacientes
}