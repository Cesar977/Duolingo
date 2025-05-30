import React, { useEffect, useState } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  Image, 
  TouchableOpacity, 
  Alert, 
  ScrollView,
  Platform
} from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { signOut, updateProfile } from 'firebase/auth';
import { auth } from '../../firebase/firebaseConfig'; 

const dummyCourses = [
  { id: '1', title: 'Basics 1', completed: true },
  { id: '2', title: 'Greetings', completed: true },
  { id: '3', title: 'Food', completed: false },
  { id: '4', title: 'Travel', completed: false },
];

const dummyAchievements = [
  { id: 'a1', name: 'Primer Curso Completado', icon: '🏅' },
  { id: 'a2', name: '5 Horas Estudiadas', icon: '⏰' },
  { id: 'a3', name: '100% en Evaluación', icon: '🎯' },
];

const Perfil = () => {
  const [user, setUser] = useState(null);
  const [photoURI, setPhotoURI] = useState(null);

  useEffect(() => {
    const currentUser = auth.currentUser;
    setUser(currentUser);
    setPhotoURI(currentUser?.photoURL || null);
  }, []);

  // Solicitar permisos para usar la galería (solo iOS y Android)
  useEffect(() => {
    (async () => {
      if (Platform.OS !== 'web') {
        const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (status !== 'granted') {
          Alert.alert('Permiso necesario', 'Se necesita permiso para acceder a la galería.');
        }
      }
    })();
  }, []);

  const pickImage = async () => {
    try {
      let result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [1, 1],
        quality: 1,
      });

      if (!result.canceled) {
        const uri = result.assets[0].uri;
        setPhotoURI(uri);

        // Actualizar foto de perfil en Firebase
        await updateProfile(auth.currentUser, { photoURL: uri });
        Alert.alert('Foto actualizada', 'La foto de perfil se actualizó correctamente.');
      }
    } catch (error) {
      Alert.alert('Error', 'No se pudo actualizar la foto de perfil.');
    }
  };

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
        <TouchableOpacity onPress={pickImage}>
          <Image
            source={{
              uri: photoURI || 'https://upload.wikimedia.org/wikipedia/commons/4/44/Duolingo_logo.png',
            }}
            style={styles.avatar}
          />
          <Text style={styles.changePhotoText}>Cambiar foto</Text>
        </TouchableOpacity>
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
          {dummyAchievements.map((ach) => (
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
    marginBottom: 10,
  },
  changePhotoText: {
    color: '#58cc02',
    fontSize: 14,
    fontWeight: '600',
    textAlign: 'center',
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
