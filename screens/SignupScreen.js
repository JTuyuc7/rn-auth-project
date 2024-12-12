import { useContext, useState } from 'react'
import AuthContent from '../components/Auth/AuthContent'
import LoadingOverlay from '../components/ui/LoadingOverlay'
import { createUser } from '../util/auth'
import { Alert } from 'react-native'
import { AuthContext } from '../store/auth-context'

function SignupScreen() {
  const [isAuthenticating, setIsAuthenticating] = useState(false)

  const { authenticate } = useContext(AuthContext)

  const signupHnadler = async ({ email, password }) => {
    setIsAuthenticating(true)
    try {
      const token = await createUser(email, password)
      authenticate(token)
    } catch (error) {
      Alert.alert('Authtentication failed', 'Something went wrong, try again later.')
      setIsAuthenticating(false)
    }
  }

  if (isAuthenticating) {
    return <LoadingOverlay message={'Creating User...'} />
  }

  return <AuthContent onAuthenticate={signupHnadler} />
}

export default SignupScreen
