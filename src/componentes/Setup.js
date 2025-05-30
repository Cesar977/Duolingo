import React, { useState } from 'react';
import {
  View, Text, StyleSheet, TouchableOpacity, Image, Alert, ScrollView
} from 'react-native';
import * as ImagePicker from 'expo-image-picker';

import { auth, db, storage } from '../firebase/firebaseConfig'; // Ajusta la ruta si hace falta
import { updateProfile } from 'firebase/auth';
import { doc, setDoc } from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';

const interestsList = [
  'Inglés',
  'Francés',
  'Italiano',
  'Alemán',
  'Japonés',
  'Coreano',
  'Viajar',
  'Cultura',
  'Gramática',
  'Pronunciación',
  'Idiomas nativos',
  'Vocabulario',
];

const Setup = ({ navigation }) => {
  const [selectedInterests, setSelectedInterests] = useState([]);
  const [imageUri, setImageUri] = useState(null);
  const [uploading, setUploading] = useState(false);

  const toggleInterest = (interest) => {
    if (selectedInterests.includes(interest)) {
      setSelectedInterests(selectedInterests.filter(i => i !== interest));
    } else {
      setSelectedInterests([...selectedInterests, interest]);
    }
  };

  const pickImage = async () => {
    const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (permissionResult.granted === false) {
      Alert.alert('Permiso denegado', 'Se necesita permiso para acceder a las fotos');
      return;
    }

    const pickerResult = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      quality: 0.7,
      allowsEditing: true,
      aspect: [1, 1],
    });

    if (!pickerResult.canceled) {
      setImageUri(pickerResult.assets[0].uri);
    }
  };

  const uploadImageToFirebase = async (uri, uid) => {
    setUploading(true);
    try {
      const response = await fetch(uri);
      const blob = await response.blob();
      const storageRef = ref(storage, `profilePics/${uid}.jpg`);
      await uploadBytes(storageRef, blob);
      const url = await getDownloadURL(storageRef);
      setUploading(false);
      return url;
    } catch (error) {
      setUploading(false);
      Alert.alert('Error', 'Error al subir la imagen');
      return null;
    }
  };

  const handleSaveProfile = async () => {
    if (selectedInterests.length === 0) {
      Alert.alert('Selecciona al menos un interés');
      return;
    }
    if (!imageUri) {
      Alert.alert('Sube una foto de perfil');
      return;
    }
    try {
      const user = auth.currentUser;
      if (!user) {
        Alert.alert('Error', 'Usuario no autenticado');
        return;
      }

      // Subir imagen y obtener URL
      const photoURL = await uploadImageToFirebase(imageUri, user.uid);
      if (!photoURL) return;

      // Actualizar foto en perfil de Firebase Auth
      await updateProfile(user, { photoURL });

      // Guardar intereses en Firestore
      await setDoc(doc(db, 'users', user.uid), {
        interests: selectedInterests,
      }, { merge: true });

      // Navegar al home limpio (reset)
      navigation.reset({
        index: 0,
        routes: [{ name: 'AppTabs' }],
      });
    } catch (error) {
      Alert.alert('Error', error.message);
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Configura tu perfil</Text>

      <TouchableOpacity style={styles.avatarContainer} onPress={pickImage}>
        {imageUri ? (
          <Image source={{ uri: imageUri }} style={styles.avatar} />
        ) : (
          <View style={styles.avatarPlaceholder}>
            <Text style={styles.avatarText}>Sube tu foto</Text>
          </View>
        )}
      </TouchableOpacity>

      <Text style={styles.subtitle}>Selecciona tus intereses</Text>
      <View style={styles.interestsContainer}>
        {interestsList.map((interest) => (
          <TouchableOpacity
            key={interest}
            style={[
              styles.interestBubble,
              selectedInterests.includes(interest) && styles.interestBubbleSelected,
            ]}
            onPress={() => toggleInterest(interest)}
          >
            <Text
              style={[
                styles.interestText,
                selectedInterests.includes(interest) && styles.interestTextSelected,
              ]}
            >
              {interest}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      <TouchableOpacity
        style={[styles.button, uploading && { opacity: 0.6 }]}
        onPress={handleSaveProfile}
        disabled={uploading}
      >
        <Text style={styles.buttonText}>{uploading ? 'Guardando...' : 'Guardar y continuar'}</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

export default Setup;

const styles = StyleSheet.create({
  container: {
    padding: 20,
    alignItems: 'center',
    backgroundColor: '#f0fdf4',
    flexGrow: 1,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#2a4501',
    marginBottom: 20,
  },
  avatarContainer: {
    marginBottom: 25,
  },
  avatar: {
    width: 140,
    height: 140,
    borderRadius: 70,
  },
  avatarPlaceholder: {
    width: 140,
    height: 140,
    borderRadius: 70,
    backgroundColor: '#ccc',
    justifyContent: 'center',
    alignItems: 'center',
  },
  avatarText: {
    color: '#555',
  },
  subtitle: {
    fontSize: 20,
    fontWeight: '600',
    marginBottom: 10,
    color: '#2a4501',
  },
  interestsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    marginBottom: 30,
  },
  interestBubble: {
    borderWidth: 1,
    borderColor: '#2a4501',
    paddingVertical: 8,
    paddingHorizontal: 15,
    borderRadius: 20,
    margin: 6,
  },
  interestBubbleSelected: {
    backgroundColor: '#6c63ff',
    borderColor: '#6c63ff',
  },
  interestText: {
    color: '#2a4501',
    fontWeight: '500',
  },
  interestTextSelected: {
    color: '#fff',
  },
  button: {
    backgroundColor: '#6c63ff',
    paddingVertical: 15,
    paddingHorizontal: 50,
    borderRadius: 30,
  },
  buttonText: {
    color: '#fff',
    fontWeight: '700',
    fontSize: 18,
  },
});
