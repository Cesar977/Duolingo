import React, { useState, useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { onAuthStateChanged } from 'firebase/auth';
import { doc, getDoc } from 'firebase/firestore';
import { View, Text } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

import { auth, db } from './firebase/firebaseConfig';

import Home from './src/componentes/Home';
import Perfil from './src/componentes/Perfil';
import Login from './src/componentes/Login';
import Registro from './src/componentes/Registro';
import Setup from './src/componentes/Setup';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

const AppTabs = () => (
  <Tab.Navigator
    screenOptions={({ route }) => ({
      headerShown: false,
      tabBarActiveTintColor: '#6c63ff',
      tabBarInactiveTintColor: '#aaa',
      tabBarStyle: { backgroundColor: '#fff', borderTopWidth: 0, height: 60 },
      tabBarIcon: ({ color }) => {
        let iconName = route.name === 'Home' ? 'home' : 'person';
        return <Icon name={iconName} size={24} color={color} />;
      },
    })}
  >
    <Tab.Screen name="Home" component={Home} />
    <Tab.Screen name="Perfil" component={Perfil} />
  </Tab.Navigator>
);

const App = () => {
  const [user, setUser] = useState(null);
  const [profileComplete, setProfileComplete] = useState(false);
  const [initializing, setInitializing] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (usuario) => {
      if (usuario) {
        setUser(usuario);

        // Revisa si el perfil está completo
        const userDocRef = doc(db, 'users', usuario.uid);
        const userDoc = await getDoc(userDocRef);
        const userData = userDoc.data();

        if (userDoc.exists() && userData?.interests?.length > 0 && usuario.photoURL) {
          setProfileComplete(true);
        } else {
          setProfileComplete(false);
        }
      } else {
        setUser(null);
        setProfileComplete(false);
      }

      if (initializing) setInitializing(false);
    });

    return unsubscribe;
  }, []);

  if (initializing) return null; // Aquí puedes poner un SplashScreen si quieres

  return (
    <View style={{ flex: 1 }}>
      <View style={{ backgroundColor: '#e0e0e0', padding: 6 }}>
        <Text style={{ fontSize: 12, color: '#333', textAlign: 'center' }}>
          exp://phhxnds-anonymous-8081.exp.direct
        </Text>
      </View>

      <NavigationContainer>
        <Stack.Navigator screenOptions={{ headerShown: false }}>
          {!user ? (
            <>
              <Stack.Screen name="Login" component={Login} />
              <Stack.Screen name="Registro" component={Registro} />
            </>
          ) : !profileComplete ? (
            <Stack.Screen name="Setup" component={Setup} />
          ) : (
            <Stack.Screen name="AppTabs" component={AppTabs} />
          )}
        </Stack.Navigator>
      </NavigationContainer>
    </View>
  );
};

export default App;
