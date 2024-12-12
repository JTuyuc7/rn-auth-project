import { createContext, useEffect, useState } from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage'

export const AuthContext = createContext({
  token: '',
  isAuthenticated: false,
  authenticate: (token) => {},
  logout: () => {}
})

function AuthContextProvider({ children }) {
  const [authToken, setAuthToken] = useState(null)

  const authenticate = async (token) => {
    await AsyncStorage.setItem('authToken', token)
    setAuthToken(token)
  }

  const logout = () => {
    AsyncStorage.removeItem('authToken')
    setAuthToken(null)
  }

  const value = {
    token: authToken,
    isAuthenticated: !!authToken,
    authenticate,
    logout
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export default AuthContextProvider
