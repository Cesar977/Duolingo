import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { auth } from '../../firebase/firebaseConfig';

const lessons = [
  { id: '1', title: 'Básico 1', icon: 'book' },
  { id: '2', title: 'Saludos', icon: 'chatbubbles' },
  { id: '3', title: 'Comida', icon: 'restaurant' },
  { id: '4', title: 'Viajes', icon: 'airplane' },
];

const Home = () => {
  const [nombreUsuario, setNombreUsuario] = useState('');

  useEffect(() => {
    const user = auth.currentUser;
    if (user) {
      setNombreUsuario(user.displayName || 'Usuario');
    }
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      {/* Saludo */}
      <View style={styles.header}>
        <Text style={styles.bienvenida}>¡Bienvenido de nuevo!</Text>
        <Text style={styles.nombre}>👋 {nombreUsuario}</Text>
      </View>

      {/* XP */}
      <View style={styles.xpBox}>
        <Text style={styles.xpText}>⭐ 120 XP</Text>
      </View>

      {/* Lecciones */}
      <Text style={styles.seccion}>Tus lecciones</Text>
      <ScrollView
        contentContainerStyle={styles.scrollContainer}
        showsVerticalScrollIndicator={false}
      >
        {lessons.map((lesson) => (
          <TouchableOpacity key={lesson.id} style={styles.lessonCard}>
            <Icon name={lesson.icon} size={36} color="#fff" />
            <Text style={styles.lessonText}>{lesson.title}</Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
};

export default Home;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f0fdf4', // fondo suave verde
    paddingHorizontal: 20,
  },
  header: {
    marginTop: 20,
    marginBottom: 20,
  },
  bienvenida: {
    fontSize: 16,
    color: '#4b5563',
  },
  nombre: {
    fontSize: 24,
    fontWeight: '700',
    color: '#222',
    marginTop: 4,
  },
  xpBox: {
    backgroundColor: '#d9f99d',
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 12,
    alignSelf: 'flex-start',
    marginBottom: 20,
  },
  xpText: {
    fontSize: 16,
    color: '#3f6212',
    fontWeight: '600',
  },
  seccion: {
    fontSize: 20,
    fontWeight: '600',
    marginBottom: 10,
    color: '#222',
  },
  scrollContainer: {
    flexGrow: 1,
    paddingBottom: 100,
    alignItems: 'center',
  },
  lessonCard: {
    width: '100%',
    backgroundColor: '#58cc02', // verde Duolingo
    borderRadius: 16,
    paddingVertical: 20,
    paddingHorizontal: 25,
    marginBottom: 16,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 4 },
    shadowRadius: 6,
    elevation: 5,
  },
  lessonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 18,
    marginTop: 8,
  },
});