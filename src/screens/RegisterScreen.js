import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, StyleSheet, TouchableOpacity } from 'react-native';
import { createUserWithEmailAndPassword, onAuthStateChanged } from 'firebase/auth';
import { auth } from '../config/firebase';
import { showMessage } from 'react-native-flash-message';
import { getErrorMessage } from '../utils/errorMessages'; // Importa la función para obtener mensajes de error

const RegisterScreen = ({ navigation }) => {
  const [name, setName] = useState('');
  const [surname, setSurname] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, user => {
      if (user) {
        navigation.replace('Home');
      }
    });

    return unsubscribe;
  }, []);

  const handleRegister = async () => {
    // Validaciones personalizadas
    if (/\d/.test(name)) {
      showMessage({
        message: "Error al registrarse",
        description: "El nombre no puede contener números.",
        type: "danger",
      });
      return;
    }

    if (/\d/.test(surname)) {
      showMessage({
        message: "Error al registrarse",
        description: "El apellido no puede contener números.",
        type: "danger",
      });
      return;
    }

    if (password.length < 5) {
      showMessage({
        message: "Error al registrarse",
        description: "La contraseña debe tener al menos 5 caracteres.",
        type: "danger",
      });
      return;
    }

    try {
      await createUserWithEmailAndPassword(auth, email, password);
      navigation.replace('Home');
      showMessage({
        message: "Registro exitoso",
        type: "success",
      });
    } catch (error) {
      showMessage({
        message: "Error al registrarse",
        description: getErrorMessage(error.code),
        type: "danger",
      });
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Registrar</Text>
      <TextInput
        style={styles.input}
        placeholder="Nombre"
        value={name}
        onChangeText={setName}
      />
      <TextInput
        style={styles.input}
        placeholder="Apellido"
        value={surname}
        onChangeText={setSurname}
      />
      <TextInput
        style={styles.input}
        placeholder="Correo electrónico"
        value={email}
        onChangeText={setEmail}
      />
      <TextInput
        style={styles.input}
        placeholder="Contraseña"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />
      <Button title="Registrarse" onPress={handleRegister} />
      <TouchableOpacity onPress={() => navigation.navigate('Login')}>
        <Text style={styles.link}>¿Ya tienes una cuenta? Inicia Sesión</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
    textAlign: 'center',
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 12,
    paddingHorizontal: 8,
  },
  link: {
    marginTop: 20,
    textAlign: 'center',
    color: 'blue',
  },
});

export default RegisterScreen;
