import React, { useState, useEffect } from 'react';
import { View, Text } from 'react-native';

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
        return <Icon name={iconName} size={size} color={color} />;
      },
    })}
  >
    <Tab.Screen name="Inicio" component={Home} />
    <Tab.Screen name="Cursos" component={Cursos} />
    <Tab.Screen name="Perfil" component={Perfil} />
  </Tab.Navigator>
);

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
    return (
      <View style={{ flex:1, justifyContent: 'center', alignItems: 'center' }}>
        <Text>Cargando...</Text>
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
