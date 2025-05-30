import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const Splash = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Duolingo chafa</Text>
    </View>
  );
};

export default Splash;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#58cc02',  // Verde Duolingo
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 48,
    fontWeight: '900',
    color: '#fff',
    textShadowColor: '#3a7d01',
    textShadowOffset: { width: 2, height: 2 },
    textShadowRadius: 4,
  },
});
