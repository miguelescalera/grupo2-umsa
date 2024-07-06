import axios from 'axios'
import { LoginType, RegisterType, TurnosType} from '../components/Interfaces/interfaces'
import { LOGIN, REGISTER, URL_SERVICE, TURNOS } from '../constants/constants'

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

  const turn = () => {
    return new Promise<TurnosType[]>((resolve, reject) => {
      axios.get(`${URL_SERVICE}${TURNOS}`)
          .then(response => {
            resolve(response.data)
          })
          .catch(err => {
            reject(err)
            //resolve('turnos error')
          })
    })
  }


export {
  registerService,
  loginService,
  turn
}