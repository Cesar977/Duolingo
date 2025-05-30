// src/componentes/Administrativo.jsx
import React from 'react';
import { View, Text, Button, FlatList } from 'react-native';

const usuariosMock = [
  { id: '1', nombre: 'Juan', email: 'juan@mail.com' },
  { id: '2', nombre: 'Ana', email: 'ana@mail.com' },
];

const Administrativo = ({ navigation }) => {
  const manejarEliminar = (id) => {
    alert(`Eliminar usuario con id: ${id}`);
  };

  return (
    <View style={{ flex: 1, padding: 20 }}>
      <Text style={{ fontSize: 24, fontWeight: 'bold', marginBottom: 20 }}>
        Panel Administrativo
      </Text>

      <Text style={{ fontSize: 18, marginBottom: 10 }}>Usuarios registrados:</Text>
      <FlatList
        data={usuariosMock}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View
            style={{
              padding: 10,
              borderBottomWidth: 1,
              borderColor: '#ddd',
              flexDirection: 'row',
              justifyContent: 'space-between',
            }}
          >
            <Text>{item.nombre} - {item.email}</Text>
            <Button title="Eliminar" onPress={() => manejarEliminar(item.id)} />
          </View>
        )}
      />
    </View>
  );
};

export default Administrativo;
