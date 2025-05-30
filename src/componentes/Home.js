import React from 'react';
import { View, Text, ScrollView, TouchableOpacity, StyleSheet, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/Ionicons';

// Datos simulados
const lessons = [
  { id: '1', title: 'Basics 1', icon: 'book' },
  { id: '2', title: 'Greetings', icon: 'chatbubbles' },
  { id: '3', title: 'Food', icon: 'restaurant' },
  { id: '4', title: 'Travel', icon: 'airplane' },
];

const Home = () => {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.greeting}>¡Hola, Juan! 👋</Text>
        <TouchableOpacity onPress={() => navigation.navigate('Profile')}>
          <Icon name="person-circle-outline" size={36} color="#333" />
        </TouchableOpacity>
      </View>

      {/* XP */}
      <Text style={styles.xpText}>XP: 120</Text>

      {/* Lecciones */}
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        {lessons.map((lesson, index) => (
          <TouchableOpacity key={lesson.id} style={styles.bubble}>
            <Icon name={lesson.icon} size={32} color="#fff" />
            <Text style={styles.bubbleText}>{lesson.title}</Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );
};

export default Home;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f0f4ff',
    paddingTop: 60,
    paddingHorizontal: 20,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  greeting: {
    fontSize: 22,
    fontWeight: 'bold',
  },
  xpText: {
    marginTop: 10,
    fontSize: 16,
    color: '#666',
  },
  scrollContainer: {
    marginTop: 30,
    paddingBottom: 100,
    alignItems: 'center',
  },
  bubble: {
    width: 100,
    height: 100,
    backgroundColor: '#6c63ff',
    borderRadius: 50,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 30,
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowOffset: { width: 0, height: 3 },
    shadowRadius: 5,
    elevation: 5,
  },
  bubbleText: {
    color: '#fff',
    fontWeight: '600',
    marginTop: 5,
  },
});
