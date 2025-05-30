import React, { useState, useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { auth } from './firebase/firebaseConfig';
import { onAuthStateChanged } from 'firebase/auth';

import Home from './src/componentes/Home';
import Perfil from './src/componentes/Perfil';
import Login from './src/componentes/Login';
import Registro from './src/componentes/Registro';

const Stack = createNativeStackNavigator();

const App = () => {
  const [user, setUser] = useState(null);
  const [initializing, setInitializing] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (usuario) => {
      setUser(usuario);
      if (initializing) setInitializing(false);
    });
    return unsubscribe;
  }, []);

  if (initializing) {
    return null; // Aquí puedes poner un spinner o pantalla de carga
  }

  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        {user ? (
          <>
            <Stack.Screen name="Home" component={Home} />
            <Stack.Screen name="Perfil" component={Perfil} />
          </>
        ) : (
          <>
            <Stack.Screen name="Login" component={Login} />
            <Stack.Screen name="Registro" component={Registro} />
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
