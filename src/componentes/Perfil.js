import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, Alert } from 'react-native';

const Perfil = ({ navigation }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const currentUser = auth().currentUser;
    setUser(currentUser);
  }, []);

  const handleLogout = async () => {
    try {
      await auth().signOut();
    } catch (error) {
      Alert.alert('Error al cerrar sesión', error.message);
    }
  };

  return (
    <View style={styles.container}>
      <Image
        source={{
          uri: user?.photoURL || 'https://i.pravatar.cc/150?img=10',
        }}
        style={styles.avatar}
      />
      <Text style={styles.name}>{user?.displayName || 'Usuario Anónimo'}</Text>
      <Text style={styles.email}>{user?.email}</Text>

      <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
        <Text style={styles.logoutText}>Cerrar sesión</Text>
      </TouchableOpacity>
    </View>
  );
};

export default Perfil;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#eef1f9',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 20,
  },
  avatar: {
    width: 120,
    height: 120,
    borderRadius: 60,
    marginBottom: 20,
    borderWidth: 2,
    borderColor: '#6c63ff',
  },
  name: {
    fontSize: 24,
    fontWeight: '600',
    marginBottom: 5,
  },
  email: {
    fontSize: 16,
    color: '#666',
    marginBottom: 30,
  },
  logoutButton: {
    backgroundColor: '#ff4d4d',
    paddingVertical: 12,
    paddingHorizontal: 30,
    borderRadius: 10,
  },
  logoutText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
