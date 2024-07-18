import React, { useState, useEffect } from 'react';
import { View, Text, Button, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import { signOut } from 'firebase/auth';
import { auth } from '../config/firebase'; // Asegúrate de que la ruta sea correcta
import { collection, onSnapshot, orderBy, query } from 'firebase/firestore'; // Importa funciones de Firestore para consultas en tiempo real
import { database } from '../config/firebase'; // Importa la configuración de la base de datos de Firebase
import CardProductos from '../components/CardProductos'; // Importa el componente de tarjeta de producto

const Home = ({ navigation }) => {
  const [productos, setProductos] = useState([]);

  useEffect(() => {
    const q = query(collection(database, 'productos'), orderBy('creado', 'desc'));

    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const docs = [];
      querySnapshot.forEach((doc) => {
        docs.push({ id: doc.id, ...doc.data() });
      });
      setProductos(docs);
    });

    return () => unsubscribe();
  }, []);

  const handleSignOut = async () => {
    try {
      await signOut(auth);
      navigation.replace('Login');
    } catch (error) {
      console.error("Error signing out: ", error);
    }
  };

  const goToAdd = () => {
    navigation.navigate('Add');
  };

  const renderItem = ({ item }) => (
    <CardProductos
      id={item.id}
      nombre={item.nombre}
      precio={item.precio}
      vendido={item.vendido}
      imagen={item.imagen}
    />
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Productos</Text>
        <Button title="Cerrar Sesión" onPress={handleSignOut} />
      </View>

      {productos.length !== 0 ? (
        <FlatList
          data={productos}
          renderItem={renderItem}
          keyExtractor={(item) => item.id}
          contentContainerStyle={styles.list}
        />
      ) : (
        <Text style={styles.subtitle}>No hay productos disponibles</Text>
      )}

      <TouchableOpacity style={styles.button} onPress={goToAdd}>
        <Text style={styles.buttonText}>Agregar Producto</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FEFEFE',
    justifyContent: 'center',
    padding: 20,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  subtitle: {
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 10,
    color: '#ff9800',
  },
  button: {
    backgroundColor: '#0288d1',
    padding: 10,
    borderRadius: 5,
    marginTop: 20,
    marginHorizontal: 50,
    paddingVertical: 20,
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  list: {
    flexGrow: 1,
  },
});

export default Home;
