import React, { useEffect, useState } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  Image, 
  TouchableOpacity, 
  Alert, 
  ScrollView 
} from 'react-native';
import { signOut } from 'firebase/auth';
import { auth } from '../../firebase/firebaseConfig'; // Importación corregida

const dummyCourses = [
  { id: '1', title: 'Basics 1', completed: true },
  { id: '2', title: 'Greetings', completed: true },
  { id: '3', title: 'Food', completed: false },
  { id: '4', title: 'Travel', completed: false },
];

const Perfil = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    setUser(auth.currentUser);
  }, []);

  // Calculamos los logros según cursos completados
  const completedCourses = dummyCourses.filter(course => course.completed);

  const achievements = [];

  if (completedCourses.length >= 1) {
    achievements.push({ id: 'a1', name: 'Primer Curso Completado', icon: '🏅' });
  }
  if (completedCourses.length >= 3) {
    achievements.push({ id: 'a2', name: '3 Cursos Completados', icon: '🎓' });
  }
  if (completedCourses.length === dummyCourses.length) {
    achievements.push({ id: 'a3', name: 'Todos los Cursos Completados', icon: '🏆' });
  }

  // Suponiendo 1.5 horas por curso completado
  const hoursStudied = (completedCourses.length * 1.5).toFixed(1);
  if (hoursStudied > 0) {
    achievements.push({ id: 'a4', name: `${hoursStudied} Horas Estudiadas`, icon: '⏰' });
  }

  // Logro 100% evaluación (simplificado, si completó al menos un curso)
  if (completedCourses.length > 0) {
    achievements.push({ id: 'a5', name: '100% en Evaluación', icon: '🎯' });
  }

  const handleLogout = async () => {
    try {
      await signOut(auth);
    } catch (error) {
      Alert.alert('Error al cerrar sesión', error.message);
    }
  };

  if (!user) {
    return (
      <View style={styles.center}>
        <Text style={styles.loadingText}>Cargando perfil...</Text>
      </View>
    );
  }

  return (
    <ScrollView style={styles.container} contentContainerStyle={{ paddingBottom: 40 }}>
      <View style={styles.profileSection}>
        <Image
          source={{
            uri: user.photoURL || 'https://i.pravatar.cc/150?img=10',
          }}
          style={styles.avatar}
        />
        <Text style={styles.name}>{user.displayName || 'Usuario Anónimo'}</Text>
        <Text style={styles.email}>{user.email}</Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Historial de Cursos</Text>
        {dummyCourses.map((course) => (
          <View
            key={course.id}
            style={[
              styles.courseItem,
              course.completed && styles.courseCompleted,
            ]}
          >
            <Text style={styles.courseTitle}>{course.title}</Text>
            <Text style={styles.courseStatus}>
              {course.completed ? 'Completado ✅' : 'En progreso ⏳'}
            </Text>
          </View>
        ))}
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Logros</Text>
        <View style={styles.achievementsContainer}>
          {achievements.map((ach) => (
            <View key={ach.id} style={styles.achievementItem}>
              <Text style={styles.achievementIcon}>{ach.icon}</Text>
              <Text style={styles.achievementName}>{ach.name}</Text>
            </View>
          ))}
        </View>
      </View>

      <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
        <Text style={styles.logoutText}>Cerrar sesión</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

export default Perfil;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f0fdf4',
    paddingHorizontal: 20,
    paddingTop: 40,
  },
  center: {
    flex:1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f0fdf4',
  },
  loadingText: {
    fontSize: 16,
    color: '#2a4501',
  },
  profileSection: {
    alignItems: 'center',
    marginBottom: 30,
  },
  avatar: {
    width: 120,
    height: 120,
    borderRadius: 60,
    borderWidth: 3,
    borderColor: '#58cc02',
    marginBottom: 15,
  },
  name: {
    fontSize: 26,
    fontWeight: '700',
    color: '#2a4501',
  },
  email: {
    fontSize: 16,
    color: '#4a6e01',
    marginTop: 5,
  },
  section: {
    marginBottom: 30,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#2a4501',
    marginBottom: 15,
    borderBottomWidth: 2,
    borderBottomColor: '#58cc02',
    paddingBottom: 5,
  },
  courseItem: {
    backgroundColor: '#d9f99d',
    padding: 15,
    borderRadius: 12,
    marginBottom: 12,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  courseCompleted: {
    backgroundColor: '#a1c349',
  },
  courseTitle: {
    fontSize: 16,
    color: '#2a4501',
  },
  courseStatus: {
    fontSize: 14,
    color: '#375801',
    fontWeight: '600',
  },
  achievementsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
  },
  achievementItem: {
    backgroundColor: '#d9f99d',
    width: '45%',
    marginBottom: 15,
    paddingVertical: 15,
    borderRadius: 12,
    alignItems: 'center',
  },
  achievementIcon: {
    fontSize: 32,
    marginBottom: 8,
  },
  achievementName: {
    fontSize: 14,
    fontWeight: '600',
    color: '#2a4501',
    textAlign: 'center',
  },
  logoutButton: {
    backgroundColor: '#58cc02',
    paddingVertical: 15,
    borderRadius: 12,
    alignItems: 'center',
    marginTop: 10,
    marginHorizontal: 30,
    shadowColor: '#4b7501',
    shadowOpacity: 0.4,
    shadowOffset: { width: 0, height: 4 },
    shadowRadius: 6,
    elevation: 5,
  },
  logoutText: {
    color: '#f0fdf4',
    fontSize: 18,
    fontWeight: 'bold',
  },
});
