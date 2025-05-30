import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { quizData } from './Quiz';

const QuizScreen = ({ route, navigation }) => {
  const { idioma } = route.params;
  const questions = quizData[idioma] || [];

  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState(null);
  const [score, setScore] = useState(0);

  if (questions.length === 0) {
    return (
      <View style={styles.container}>
        <Text>No hay preguntas disponibles para este idioma.</Text>
      </View>
    );
  }

  const question = questions[currentIndex];

  const handleOptionPress = (idx) => {
    setSelectedOption(idx);
  };

  const handleNext = () => {
    if (selectedOption === null) {
      Alert.alert('Selecciona una opción');
      return;
    }

    if (selectedOption === question.correcta) {
      setScore(score + 1);
    }

    setSelectedOption(null);

    if (currentIndex + 1 < questions.length) {
      setCurrentIndex(currentIndex + 1);
    } else {
      Alert.alert(
        'Quiz finalizado',
        `Tu puntaje es ${score + (selectedOption === question.correcta ? 1 : 0)} de ${questions.length}`,
        [
          {
            text: 'Volver a cursos',
            onPress: () => navigation.goBack(),
          },
        ]
      );
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.question}>{question.pregunta}</Text>
      {question.opciones.map((option, idx) => (
        <TouchableOpacity
          key={option}
          style={[
            styles.optionButton,
            selectedOption === idx && styles.selectedOption,
          ]}
          onPress={() => handleOptionPress(idx)}
        >
          <Text style={styles.optionText}>{option}</Text>
        </TouchableOpacity>
      ))}
      <TouchableOpacity style={styles.nextButton} onPress={handleNext}>
        <Text style={styles.nextButtonText}>
          {currentIndex + 1 === questions.length ? 'Terminar' : 'Siguiente'}
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default QuizScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f0fdf4',
    padding: 20,
    justifyContent: 'center',
  },
  question: {
    fontSize: 20,
    fontWeight: '700',
    marginBottom: 20,
    color: '#2a4501',
  },
  optionButton: {
    backgroundColor: '#d9f99d',
    padding: 15,
    borderRadius: 12,
    marginBottom: 15,
  },
  selectedOption: {
    backgroundColor: '#a3b91c',
  },
  optionText: {
    fontSize: 18,
    color: '#33691e',
  },
  nextButton: {
    backgroundColor: '#6c63ff',
    padding: 15,
    borderRadius: 12,
    marginTop: 10,
    alignItems: 'center',
  },
  nextButtonText: {
    color: 'white',
    fontWeight: '700',
    fontSize: 18,
  },
});
