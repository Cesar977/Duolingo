// src/componentes/Cursos.jsx
import React from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

const duolingoCourses = [
  { id: 'en', title: 'Inglés', icon: 'language' },
  { id: 'fr', title: 'Francés', icon: 'language' },
  { id: 'de', title: 'Alemán', icon: 'language' },
  { id: 'it', title: 'Italiano', icon: 'language' },
  { id: 'pt', title: 'Portugués', icon: 'language' },
  { id: 'jp', title: 'Japonés', icon: 'language' },
  { id: 'ru', title: 'Ruso', icon: 'language' },
  { id: 'es', title: 'Español', icon: 'language' },
];

const Cursos = ({ navigation }) => {
  const renderItem = ({ item }) => (
    <TouchableOpacity
      style={styles.courseCard}
      onPress={() => navigation.navigate('QuizScreen', { idioma: item.id })}
    >
      <Icon name={item.icon} size={36} color="#4caf50" />
      <Text style={styles.courseText}>{item.title}</Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Cursos disponibles en Duolingo</Text>
      <FlatList
        data={duolingoCourses}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        contentContainerStyle={styles.listContainer}
      />
    </View>
  );
};

export default Cursos;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f0fdf4',
    paddingHorizontal: 20,
    paddingTop: 30,
  },
  title: {
    fontSize: 22,
    fontWeight: '700',
    color: '#2a4501',
    marginBottom: 20,
    textAlign: 'center',
  },
  listContainer: {
    paddingBottom: 20,
  },
  courseCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#d9f99d',
    padding: 15,
    marginBottom: 15,
    borderRadius: 12,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
    elevation: 3,
  },
  courseText: {
    fontSize: 18,
    color: '#33691e',
    fontWeight: '600',
    marginLeft: 15,
  },
});
