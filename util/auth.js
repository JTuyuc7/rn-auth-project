import { FIREBASE_API_KEY } from '@env'
import axios from 'axios'

export const authtenticate = async (mode, email, password) => {
  const url = `https://identitytoolkit.googleapis.com/v1/accounts:${mode}?key=${FIREBASE_API_KEY}`

  const response = await axios.post(url, {
    email,
    password,
    returnSecureToken: true
  })

  const token = response.data.idToken
  return token
}

export const loginUser = async (email, password) => {
  const token = await authtenticate('signInWithPassword', email, password)
  return token
}

export const createUser = async (email, password) => {
  const token = await authtenticate('signUp', email, password)
  return token
}
