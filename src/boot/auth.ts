import { firebaseAuth } from 'boot/firebase';
import { apiId } from 'boot/axios';
import { useAuthStore } from 'stores/auth';

const authStore = useAuthStore();

export default async ({}) => {
  firebaseAuth.onAuthStateChanged(async (user) => {
    try {
      if (user) {
        authStore.firebaseUserData.uid = user.uid;
        authStore.firebaseUserData.accessToken = user.accessToken;
        const response = await apiId.get('/users/user/', {
          headers: {
            Authorization: 'Bearer ' + authStore.firebaseUserData.accessToken,
            'Content-Type': 'application/json',
          },
        });
        if (response && response.data) {
          const datos = response.data?.pop();
          authStore.firebaseUserData.uidID = datos.username;
        }
        const results = await apiId.get(
          `/perfiles/perfil-basico/${authStore.firebaseUserData.uidID}/`,
          {
            headers: {
              Authorization: `Bearer ${authStore.firebaseUserData.accessToken}`,
            },
          }
        );
        if (results) {
          const perfil = results.data;
          authStore.datosPerfilUsuario.nombre = perfil.nombre;
          authStore.datosPerfilUsuario.user = perfil.user;
          authStore.datosPerfilUsuario.correo = perfil.email;
          authStore.datosPerfilUsuario.primer_apellido = perfil.primer_apellido;
          authStore.datosPerfilUsuario.segundo_apellido =
            perfil.segundo_apellido;
        }
      }
    } catch (error) {
      console.error('error', error);
    }
  });
};
