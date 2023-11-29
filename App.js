import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';
import Home from './screens/Home.js'
import Login from './screens/Login.js';
import Registro from './screens/Registro.js';
import CompletarPerfil from './screens/CompletarPerfil.js';
import UserContext from './context/context.js';
import { useEffect, useState } from 'react';
import addOc from './screens/addOc.js';
import detalleOc from './screens/detalleOc.js';

const Stack = createNativeStackNavigator();

export default function App() {
  const [user, setUser] = useState({});
  const [computadoraUser, setComputadoraUser] = useState({});
  const [reloadOcs, setReloadOcs] = useState(false);

  useEffect(() => {
    localStorage.setItem("user", JSON.stringify(user));
  }, [user])

  return (
    <NavigationContainer>
      <UserContext.Provider value={{user, setUser, computadoraUser, setComputadoraUser, reloadOcs, setReloadOcs}}>
        <Stack.Navigator screenOptions={{ headerShown: false }}>
          <Stack.Screen name="Login" component={Login}/>
          <Stack.Screen name="Registro" component={Registro}/>
          <Stack.Screen name="CompletarPerfil" component={CompletarPerfil}/>
          <Stack.Screen name="Home" component={Home} />
          <Stack.Screen name="addOc" component={addOc} />
          <Stack.Screen name="detalleOc" component={detalleOc} />
        </Stack.Navigator>
      </UserContext.Provider>
    </NavigationContainer>
  );
}