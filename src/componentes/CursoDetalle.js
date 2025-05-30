import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, SafeAreaView } from 'react-native';

const quizzes = {
  '1': {
    title: 'Básico 1 - Presente Simple',
    questions: [
      {
        id: 1,
        question: 'I ___ (to eat) apples every day.',
        options: ['eat', 'eats', 'eating', 'ate'],
        answer: 'eat',
      },
      {
        id: 2,
        question: 'She ___ (to go) to school yesterday.',
        options: ['go', 'went', 'going', 'goes'],
        answer: 'went',
      },
    ],
  },
  '2': {
    title: 'Saludos - Adivina el idioma',
    questions: [
      {
        id: 1,
        question: '¿Cómo se dice "Hola" en francés?',
        options: ['Bonjour', 'Hola', 'Ciao', 'Hallo'],
        answer: 'Bonjour',
      },
      {
        id: 2,
        question: '¿Cómo se dice "Hola" en alemán?',
        options: ['Hola', 'Hallo', 'Salut', 'Ciao'],
        answer: 'Hallo',
      },
    ],
  },
  '3': {
    title: 'Comida - Completa las oraciones',
    questions: [
      {
        id: 1,
        question: 'I like to eat ___ for breakfast.',
        options: ['bread', 'car', 'house', 'book'],
        answer: 'bread',
      },
      {
        id: 2,
        question: 'She cooks ___ very well.',
        options: ['pizza', 'computer', 'apple', 'shoe'],
        answer: 'pizza',
      },
    ],
  },
  '4': {
    title: 'Viajes - Oraciones sobre viajes',
    questions: [
      {
        id: 1,
        question: 'I am going to ___ to France next summer.',
        options: ['travel', 'eat', 'study', 'sleep'],
        answer: 'travel',
      },
      {
        id: 2,
        question: 'They ___ to the beach yesterday.',
        options: ['go', 'went', 'going', 'gone'],
        answer: 'went',
      },
    ],
  },
};

const CursoDetalle = ({ route, navigation }) => {
  const { curso } = route.params;
  const quiz = quizzes[curso.id];

  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState(null);
  const [score, setScore] = useState(0);
  const [showScore, setShowScore] = useState(false);

  if (!quiz) {
    return (
      <View style={styles.center}>
        <Text>Curso no encontrado.</Text>
      </View>
    );
  }

  const currentQuestion = quiz.questions[currentQuestionIndex];

  const handleOptionPress = (option) => {
    setSelectedOption(option);
  };

  const handleNext = () => {
    if (selectedOption === currentQuestion.answer) {
      setScore(score + 1);
    }
    setSelectedOption(null);

    if (currentQuestionIndex + 1 < quiz.questions.length) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      setShowScore(true);
    }
  };

  const handleRestart = () => {
    setScore(0);
    setCurrentQuestionIndex(0);
    setShowScore(false);
    setSelectedOption(null);
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>{quiz.title}</Text>

      {showScore ? (
        <View style={styles.scoreContainer}>
          <Text style={styles.scoreText}>Tu puntaje es {score} de {quiz.questions.length}</Text>
          <TouchableOpacity style={styles.button} onPress={handleRestart}>
            <Text style={styles.buttonText}>Reiniciar Quiz</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.button, styles.backButton]} onPress={() => navigation.goBack()}>
            <Text style={styles.buttonText}>Volver a lecciones</Text>
          </TouchableOpacity>
        </View>
      ) : (
        <View style={styles.quizContainer}>
          <Text style={styles.question}>{currentQuestion.question}</Text>
          {currentQuestion.options.map((option) => (
            <TouchableOpacity
              key={option}
              style={[
                styles.optionButton,
                selectedOption === option && styles.selectedOption,
              ]}
              onPress={() => handleOptionPress(option)}
            >
              <Text style={styles.optionText}>{option}</Text>
            </TouchableOpacity>
          ))}
          <TouchableOpacity
            style={[styles.button, !selectedOption && styles.disabledButton]}
            onPress={handleNext}
            disabled={!selectedOption}
          >
            <Text style={styles.buttonText}>Siguiente</Text>
          </TouchableOpacity>
        </View>
      )}
    </SafeAreaView>
  );
};

export default CursoDetalle;

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: '#f0fdf4' },
  center: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  title: { fontSize: 24, fontWeight: 'bold', marginBottom: 20, color: '#222' },
  quizContainer: {},
  question: { fontSize: 18, marginBottom: 12, color: '#333' },
  optionButton: {
    backgroundColor: '#58cc02',
    paddingVertical: 12,
    paddingHorizontal: 15,
    borderRadius: 12,
    marginVertical: 6,
  },
  selectedOption: {
    backgroundColor: '#3a9e00',
  },
  optionText: {
    color: '#fff',
    fontWeight: '600',
    fontSize: 16,
  },
  button: {
    marginTop: 20,
    backgroundColor: '#6c63ff',
    paddingVertical: 14,
    borderRadius: 12,
    alignItems: 'center',
  },
  disabledButton: {
    backgroundColor: '#aaa',
  },
  buttonText: {
    color: '#fff',
    fontWeight: '700',
    fontSize: 16,
  },
  scoreContainer: { alignItems: 'center' },
  scoreText: { fontSize: 22, fontWeight: '700', marginBottom: 20 },
  backButton: { backgroundColor: '#aaa', marginTop: 10 },
});
