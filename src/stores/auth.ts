import { defineStore } from 'pinia';

const useAuthStore = () => {
  return defineStore('auth', {
    state: () => ({
      datosPerfilUsuario: {
        user: '',
        nombre: '',
        primer_apellido: '',
        segundo_apellido: '',
        correo: '',
      },
      firebaseUserData: {
        accessToken: null,
        uid: '',
        uidID: undefined,
      },
    }),
  })();
};

export { useAuthStore };
