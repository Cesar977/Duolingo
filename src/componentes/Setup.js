import React, { useState } from 'react';
import {
  View, Text, StyleSheet, TouchableOpacity, Image, Alert, ScrollView
} from 'react-native';
import * as ImagePicker from 'expo-image-picker';

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

  const handleSaveProfile = () => {
    if (selectedInterests.length === 0) {
      Alert.alert('Selecciona al menos un interés');
      return;
    }
    if (!imageUri) {
      Alert.alert('Sube una foto de perfil');
      return;
    }
    // Navegar a AppTabs (el contenedor de Home y Perfil)
    navigation.reset({
      index: 0,
      routes: [{ name: 'AppTabs', params: { imageUri, selectedInterests } }],
    });
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
        style={styles.button}
        onPress={handleSaveProfile}
      >
        <Text style={styles.buttonText}>Guardar y continuar</Text>
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
    backgroundColor: '#a1c349',
    justifyContent: 'center',
    alignItems: 'center',
  },
  avatarText: {
    color: '#f0fdf4',
    fontWeight: 'bold',
  },
  subtitle: {
    fontSize: 20,
    marginBottom: 15,
    fontWeight: '600',
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
    borderColor: '#a1c349',
    borderRadius: 20,
    paddingVertical: 8,
    paddingHorizontal: 15,
    margin: 6,
  },
  interestBubbleSelected: {
    backgroundColor: '#58cc02',
    borderColor: '#2a4501',
  },
  interestText: {
    color: '#2a4501',
    fontWeight: '600',
  },
  interestTextSelected: {
    color: '#f0fdf4',
  },
  button: {
    backgroundColor: '#58cc02',
    paddingVertical: 15,
    paddingHorizontal: 50,
    borderRadius: 15,
  },
  buttonText: {
    color: '#f0fdf4',
    fontWeight: 'bold',
    fontSize: 18,
  },
});