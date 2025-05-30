import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, TextInput, FlatList, Alert } from 'react-native';

const diasSemana = ['Dom', 'Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb'];

const Calendario = () => {
  const [fechaActual, setFechaActual] = useState(new Date());
  const [diaSeleccionado, setDiaSeleccionado] = useState(null);
  const [actividadTexto, setActividadTexto] = useState('');
  const [actividades, setActividades] = useState({}); 

  const diasEnMes = (mes, año) => {
    return new Date(año, mes + 1, 0).getDate();
  };

  const cambiarMes = (incremento) => {
    setDiaSeleccionado(null);
    setFechaActual((prev) => {
      const nuevoMes = prev.getMonth() + incremento;
      return new Date(prev.getFullYear(), nuevoMes, 1);
    });
  };

  const año = fechaActual.getFullYear();
  const mes = fechaActual.getMonth();
  const primerDiaSemana = new Date(año, mes, 1).getDay();
  const totalDias = diasEnMes(mes, año);

  const diasArray = [];
  for (let i = 0; i < primerDiaSemana; i++) diasArray.push(null);
  for (let i = 1; i <= totalDias; i++) diasArray.push(i);

  const fechaKey = (day) => {
    const mm = (mes + 1).toString().padStart(2, '0');
    const dd = day.toString().padStart(2, '0');
    return `${año}-${mm}-${dd}`;
  };

  const agregarActividad = () => {
    if (!actividadTexto.trim()) return;
    if (!diaSeleccionado) return Alert.alert('Seleccione un día primero');
    
    const key = fechaKey(diaSeleccionado);
    setActividades((prev) => {
      const prevActividades = prev[key] || [];
      return { ...prev, [key]: [...prevActividades, actividadTexto.trim()] };
    });
    setActividadTexto('');
  };

  const eliminarActividad = (index) => {
    const key = fechaKey(diaSeleccionado);
    Alert.alert(
      'Eliminar actividad',
      '¿Estás seguro que quieres eliminar esta actividad?',
      [
        { text: 'Cancelar', style: 'cancel' },
        { text: 'Eliminar', style: 'destructive', onPress: () => {
          setActividades((prev) => {
            const nuevas = [...(prev[key] || [])];
            nuevas.splice(index, 1);
            return { ...prev, [key]: nuevas };
          });
        }},
      ]
    );
  };

  return (
    <View style={styles.container}>
      {/* Header mes */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => cambiarMes(-1)}>
          <Text style={styles.cambiarMesBtn}>‹</Text>
        </TouchableOpacity>
        <Text style={styles.tituloMes}>
          {fechaActual.toLocaleString('es-ES', { month: 'long', year: 'numeric' })}
        </Text>
        <TouchableOpacity onPress={() => cambiarMes(1)}>
          <Text style={styles.cambiarMesBtn}>›</Text>
        </TouchableOpacity>
      </View>

      {/* Días de la semana */}
      <View style={styles.diasSemanaContainer}>
        {diasSemana.map((dia) => (
          <Text key={dia} style={styles.diaSemana}>{dia}</Text>
        ))}
      </View>

      {/* Días mes */}
      <View style={styles.diasContainer}>
        {diasArray.map((dia, index) => {
          if (!dia) return <View key={index} style={styles.diaVacio} />;

          const isSelected = dia === diaSeleccionado;
          const tieneActividad = actividades[fechaKey(dia)] && actividades[fechaKey(dia)].length > 0;

          return (
            <TouchableOpacity
              key={index}
              style={[styles.dia, isSelected && styles.diaSeleccionado]}
              onPress={() => setDiaSeleccionado(dia)}
            >
              <Text style={isSelected ? { color: 'white', fontWeight: 'bold' } : {}}>{dia}</Text>
              {tieneActividad && !isSelected && <View style={styles.puntoActividad} />}
            </TouchableOpacity>
          );
        })}
      </View>

      {/* Sección actividades */}
      <View style={styles.actividadesContainer}>
        <Text style={styles.subtitulo}>
          {diaSeleccionado ? `Actividades para ${diaSeleccionado}/${mes + 1}/${año}` : 'Selecciona un día'}
        </Text>

        {diaSeleccionado && (
          <>
            <FlatList
              data={actividades[fechaKey(diaSeleccionado)] || []}
              keyExtractor={(_, i) => i.toString()}
              renderItem={({ item, index }) => (
                <View style={styles.actividadItem}>
                  <Text>{item}</Text>
                  <TouchableOpacity onPress={() => eliminarActividad(index)}>
                    <Text style={styles.borrarTexto}>X</Text>
                  </TouchableOpacity>
                </View>
              )}
              ListEmptyComponent={<Text style={{ fontStyle: 'italic' }}>No hay actividades</Text>}
              style={{ maxHeight: 120 }}
            />

            <View style={styles.formAgregar}>
              <TextInput
                placeholder="Nueva actividad"
                value={actividadTexto}
                onChangeText={setActividadTexto}
                style={styles.input}
              />
              <TouchableOpacity style={styles.btnAgregar} onPress={agregarActividad}>
                <Text style={{ color: 'white', fontWeight: 'bold' }}>Agregar</Text>
              </TouchableOpacity>
            </View>
          </>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    margin: 20,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    padding: 10,
    backgroundColor: '#fff',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  cambiarMesBtn: {
    fontSize: 30,
    color: '#6c63ff',
    paddingHorizontal: 10,
  },
  tituloMes: {
    fontSize: 18,
    fontWeight: 'bold',
    textTransform: 'capitalize',
  },
  diasSemanaContainer: {
    flexDirection: 'row',
    marginTop: 10,
  },
  diaSemana: {
    flex: 1,
    textAlign: 'center',
    fontWeight: 'bold',
    color: '#555',
  },
  diasContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginTop: 5,
  },
  dia: {
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 6,
    marginVertical: 4,
    marginHorizontal: 4,
    position: 'relative',
  },
  diaSeleccionado: {
    backgroundColor: '#6c63ff',
    borderWidth: 2,
    borderColor: '#ffde59',
  },
  diaVacio: {
    width: 40,
    height: 40,
    marginVertical: 4,
    marginHorizontal: 4,
  },
  puntoActividad: {
    width: 6,
    height: 6,
    backgroundColor: '#ffde59',
    borderRadius: 3,
    position: 'absolute',
    bottom: 6,
    alignSelf: 'center',
  },
  actividadesContainer: {
    marginTop: 20,
  },
  subtitulo: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 6,
  },
  actividadItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: '#f3f3f3',
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 4,
    marginVertical: 2,
  },
  borrarTexto: {
    color: 'red',
    fontWeight: 'bold',
  },
  formAgregar: {
    flexDirection: 'row',
    marginTop: 10,
  },
  input: {
    flex: 1,
    borderColor: '#6c63ff',
    borderWidth: 1,
    borderRadius: 4,
    paddingHorizontal: 10,
    height: 40,
  },
  btnAgregar: {
    marginLeft: 8,
    backgroundColor: '#6c63ff',
    borderRadius: 4,
    paddingHorizontal: 12,
    justifyContent: 'center',
  },
});

export default Calendario;

