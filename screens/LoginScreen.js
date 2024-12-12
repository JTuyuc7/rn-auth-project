import { useContext, useState } from 'react'
import AuthContent from '../components/Auth/AuthContent'
import { loginUser } from '../util/auth'
import LoadingOverlay from '../components/ui/LoadingOverlay'
import { Alert } from 'react-native'
import { AuthContext } from '../store/auth-context'

function LoginScreen() {
  const [isAuthenticating, setIsAuthenticating] = useState(false)
  const { authenticate } = useContext(AuthContext)

  const loginHandler = async ({ email, password }) => {
    setIsAuthenticating(true)
    try {
      const token = await loginUser(email, password)
      authenticate(token)
    } catch (error) {
      Alert.alert('Authtentication failed', 'Please check your credentials, or try again later.')
      console.log('🚀 ~ file: LoginScreen.js ~ line 20 ~ loginHandler ~ error', error)
      setIsAuthenticating(false)
    }
  }

  if (isAuthenticating) {
    return <LoadingOverlay message={'Logging in...'} />
  }

  return <AuthContent isLogin onAuthenticate={loginHandler} />
}

export default LoginScreen
