import axios from 'axios'
import {LoginType, RegisterType,EspecialistaType } from '../components/Interfaces/interfaces'
import { LOGIN, REGISTER,CARTILLA_MEDICA, URL_SERVICE } from '../constants/constants'

    // ejemplo para consumo de api
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
    return new Promise<EspecialistaType[]>((resolve, reject) => {
      axios.get(`${URL_SERVICE}${CARTILLA_MEDICA}`)
        .then(response => {
          resolve(response.data);
        })
        .catch(err => {
          reject(err); // Permitir que el consumidor maneje el error
        });
    });
  }
  

export {
  registerService,
  loginService,
  especialistasService
}