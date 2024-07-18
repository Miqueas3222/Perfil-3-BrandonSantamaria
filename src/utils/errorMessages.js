const errorMessages = {
    'auth/email-already-in-use': 'El correo electrónico ya está en uso.',
    'auth/invalid-email': 'El correo electrónico no es válido.',
    'auth/operation-not-allowed': 'Operación no permitida.',
    'auth/weak-password': 'La contraseña debe tener al menos 6 caracteres.',
    'auth/user-disabled': 'El usuario ha sido deshabilitado.',
    'auth/user-not-found': 'Correo o contraseña incorrectos.',
    'auth/wrong-password': 'Correo o contraseña incorrectos.',
  };
  
  export const getErrorMessage = (errorCode) => {
    return errorMessages[errorCode] || 'Correo o contraseña incorrectos.';
  };
  