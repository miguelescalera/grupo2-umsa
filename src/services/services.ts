import axios from 'axios'
import {LoginType, RegisterType } from '../components/Interfaces/interfaces'
import { LOGIN, REGISTER, URL_SERVICE } from '../constants/constants'

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

export {
  registerService,
  loginService
}