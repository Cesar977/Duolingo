import React, { useState, useEffect } from 'react';
import { View, ActivityIndicator } from 'react-native';

import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import Icon from 'react-native-vector-icons/Ionicons';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from './firebase/firebaseConfig';

import Login from './src/componentes/Login';
import Registro from './src/componentes/Registro';
import Home from './src/componentes/Home';
import Cursos from './src/componentes/Cursos';
import Perfil from './src/componentes/Perfil';
import QuizScreen from './src/componentes/QuizScreen';
import CursoDetalle from './src/componentes/CursoDetalle';
import Calendario from './src/componentes/Calendario';
import SplashScreen from './src/componentes/SplashScreen';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

const AppTabs = () => (
  <Tab.Navigator
    screenOptions={({ route }) => ({
      headerShown: false,
      tabBarActiveTintColor: '#6c63ff',
      tabBarInactiveTintColor: '#aaa',
      tabBarStyle: { backgroundColor: '#fff', borderTopWidth: 0, height: 60 },
      tabBarIcon: ({ color, size }) => {
        let iconName;
        if (route.name === 'Inicio') iconName = 'home';
        else if (route.name === 'Cursos') iconName = 'book';
        else if (route.name === 'Perfil') iconName = 'person';
        else if (route.name === 'Calendario') iconName = 'calendar';
        return <Icon name={iconName} size={size} color={color} />;
      },
    })}
  >
    <Tab.Screen name="Inicio" component={Home} />
    <Tab.Screen name="Cursos" component={Cursos} />
    <Tab.Screen name="Perfil" component={Perfil} />
    <Tab.Screen name="Calendario" component={Calendario} />
  </Tab.Navigator>
);

const App = () => {
  const [user, setUser] = useState(null);
  const [initializing, setInitializing] = useState(true);
  const [showSplash, setShowSplash] = useState(true);

  useEffect(() => {
    const splashTimeout = setTimeout(() => setShowSplash(false), 2000); // Mostrar splash 2 segundos

    const unsubscribe = onAuthStateChanged(auth, (usuario) => {
      setUser(usuario);
      if (initializing) setInitializing(false);
    });

    return () => {
      clearTimeout(splashTimeout);
      unsubscribe();
    };
  }, []);

  if (showSplash) return <SplashScreen />;

  if (initializing) {
    return (
      <View style={{ flex:1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" color="#6c63ff" />
      </View>
    );
  }

  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        {!user ? (
          <>
            <Stack.Screen name="Login" component={Login} />
            <Stack.Screen name="Registro" component={Registro} />
          </>
        ) : (
          <>
            <Stack.Screen name="AppTabs" component={AppTabs} />
            <Stack.Screen name="CursoDetalle" component={CursoDetalle} />
            <Stack.Screen name="QuizScreen" component={QuizScreen} />
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
