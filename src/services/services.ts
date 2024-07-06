import axios, { Axios, AxiosResponse } from 'axios'
import {LoginType, RegisterType,EspecialistasType, TurnoType, PacienteType } from '../components/Interfaces/interfaces'
import { LOGIN, REGISTER,CARTILLA_MEDICA, URL_SERVICE, TURNOS, PACIENTES } from '../constants/constants'

  const registerService = (data: RegisterType) => {
    return new Promise((resolve, reject) => {
    axios.post(`${URL_SERVICE}${REGISTER}`, {data})
        .then(response => {
          resolve(response)
        })
        .catch(err => {
          // reject(err)
          resolve('registro con exito')
        })
    })
  }

  const loginService = (data: LoginType) => {
    return new Promise((resolve, reject) => {
      axios.post(`${URL_SERVICE}${LOGIN}`, {data})
        .then(response => {
          resolve(response)
        })
        .catch(err => {
          //reject(err)
          resolve('login con exito')
        })
    })
  }

  const especialistasService = () => {
    return new Promise<EspecialistasType[]>((resolve, reject) => {
      axios.get(`${URL_SERVICE}${CARTILLA_MEDICA}`)
        .then(response => {
          resolve(response.data);
        })
        .catch(err => {
          reject(err); // Permitir que el consumidor maneje el error
        });
    });
  }

  const getPacientes = () => {
    return new Promise<PacienteType[]>((resolve, reject) =>{
      axios.get(`${URL_SERVICE}${PACIENTES}`)
        .then((response : any) => {
          resolve(response.data)
        })
        .catch(err => {
          reject(err)
        })
    })
  }

  const newTurnoService = (dataTurno : any) =>{
    return new Promise((resolve, reject) =>{
      //cambiamos las {} en dataTurno
      axios.post(`${URL_SERVICE}${TURNOS}`,dataTurno)
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
  const getTurns = () => {
    return new Promise((resolve, reject) =>{
      axios.get<any>(`${URL_SERVICE}${TURNOS}`)
        .then((response : any) => {
          resolve(response.data)
        })
        .catch(err => {
          reject(err)
        })
    })
  }



  

export {
  registerService,
  loginService,
  especialistasService,
  newTurnoService,
  getTurns,
  getPacientes
}