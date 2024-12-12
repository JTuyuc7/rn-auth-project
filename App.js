import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
// import { createStackNavigator } from '@react-navigation/stack'
import { StatusBar } from 'expo-status-bar'

import LoginScreen from './screens/LoginScreen'
import SignupScreen from './screens/SignupScreen'
import WelcomeScreen from './screens/WelcomeScreen'
import { Colors } from './constants/styles'
import AuthContextProvider, { AuthContext } from './store/auth-context'
import { useContext, useEffect, useState } from 'react'
import IconButton from './components/ui/IconButton'
import AsyncStorage from '@react-native-async-storage/async-storage'
import AppLoading from 'expo-app-loading'

const Stack = createNativeStackNavigator()

function AuthStack() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: { backgroundColor: Colors.primary500 },
        headerTintColor: 'white',
        contentStyle: { backgroundColor: Colors.primary100 }
      }}
    >
      <Stack.Screen name="Login" component={LoginScreen} />
      <Stack.Screen name="Signup" component={SignupScreen} />
    </Stack.Navigator>
  )
}

function AuthenticatedStack() {
  const { logout } = useContext(AuthContext)

  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: { backgroundColor: Colors.primary500 },
        headerTintColor: 'white',
        contentStyle: { backgroundColor: Colors.primary100 }
      }}
    >
      <Stack.Screen
        name="Welcome"
        component={WelcomeScreen}
        options={{
          headerRight: ({ tintColor }) => <IconButton icon="exit" onPress={logout} color={tintColor} size={24} />
        }}
      />
    </Stack.Navigator>
  )
}

function Navigation() {
  const { isAuthenticated } = useContext(AuthContext)

  return <NavigationContainer>{isAuthenticated ? <AuthenticatedStack /> : <AuthStack />}</NavigationContainer>
}

const Root = () => {
  const [isReady, setIsReady] = useState(true)
  const { authenticate } = useContext(AuthContext)

  useEffect(() => {
    const fetchToken = async () => {
      const token = await AsyncStorage.getItem('authToken')
      if (token) {
        authenticate(token)
      }
      setIsReady(false)
    }
    fetchToken()
  }, [])

  if (isReady) {
    return <AppLoading />
  }

  return <Navigation />
}

export default function App() {
  return (
    <>
      <AuthContextProvider>
        <StatusBar style="light" />
        <Root />
      </AuthContextProvider>
    </>
  )
}
