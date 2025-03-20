<template>
  <q-icon name="mdi-account-circle-outline" color="dark" size="30px" disabled>
    <q-tooltip> Proximamente... </q-tooltip>
    <!--            <q-menu>-->
    <!--              <div v-if="authStore.firebaseUserData.uid" style="max-width: 300px;" class="justify-center flex q-pt-md q-py-sm q-pb-sm">-->
    <!--                <div v-if="authStore.datosPerfilUsuario.nombre && authStore.datosPerfilUsuario.correo">-->
    <!--                  <div style="display: flex; align-items: center;">-->
    <!--                    <p v-if="authStore.datosPerfilUsuario.segundo_apellido" class="full-width text-center">Hola, {{authStore.datosPerfilUsuario.nombre + ' ' + authStore.datosPerfilUsuario.primer_apellido + ' ' + authStore.datosPerfilUsuario.segundo_apellido}}</p>-->
    <!--                    <p v-else class="full-width text-center">Hola, {{authStore.datosPerfilUsuario.nombre + ' ' + authStore.datosPerfilUsuario.primer_apellido}}</p>-->
    <!--                  </div>-->
    <!--                  <div class="q-mb-sm" style="display: flex; align-items: center; justify-content: center;">-->
    <!--                    <q-icon size="20px" name="mdi-email-outline" style="padding-right: 0.5rem;"/>-->
    <!--                    <p style="padding: 0; margin: 0;">{{ authStore.datosPerfilUsuario.correo }}</p>-->
    <!--                  </div>-->
    <!--                </div>-->
    <!--                <div v-else>-->
    <!--                  <div style="display: flex; align-items: center;">-->
    <!--                    <p v-if="authStore.datosPerfilUsuario.segundo_apellido" class="full-width text-center">Hola, {{authStore.datosPerfilUsuario.nombre + authStore.datosPerfilUsuario.primer_apellido + authStore.datosPerfilUsuario.segundo_apellido}}</p>-->
    <!--                    <p v-else class="full-width text-center">Hola, {{authStore.datosPerfilUsuario.nombre + authStore.datosPerfilUsuario.primer_apellido}}</p>-->
    <!--                  </div>-->
    <!--                  <div style="display: flex; align-items: center;">-->
    <!--                    <q-icon size="20px" name="mdi-email-outline" style="padding-right: 0.5rem;"/>-->
    <!--                    <p style="padding: 0; margin: 0;">{{ authStore.datosPerfilUsuario.correo }}</p>-->
    <!--                  </div>-->
    <!--                </div>-->
    <!--                <div class="column full-width justify-center content-center">-->
    <!--                  <div class="col q-pb-sm full-width justify-center content-center flex">-->
    <!--                    <q-btn @click="editarCuenta" outline style="color: dodgerblue; width: 80%; text-transform: none;" label="Editar cuenta" />-->
    <!--                  </div>-->
    <!--                  <div class="col q-pb-sm full-width justify-center content-center flex">-->
    <!--                    <q-btn @click="logOutOIDCFirebase()" outline style="color: dodgerblue; width: 80%; text-transform: none;" label="Cerrar sesión" />-->
    <!--                  </div>-->
    <!--                  <div class="col q-pb-sm full-width justify-center content-center flex">-->
    <!--                    <q-btn flat style="color: dodgerblue; margin-bottom: 0!important; width: 80%; text-transform: none;" label="Aviso de privacidad" />-->
    <!--                  </div>-->
    <!--                </div>-->
    <!--              </div>-->
    <!--              <q-list v-else style="max-width: 280px;" class="justify-center flex q-pa-md">-->
    <!--                <div>-->
    <!--                  <div style="display: flex; align-items: center;">-->
    <!--                    <p class="full-width text-center">ICONO MIRA</p>-->
    <!--                  </div>-->
    <!--                </div>-->
    <!--                <div class="column full-width justify-center content-center">-->
    <!--                  <div class="col q-pb-sm full-width justify-center content-center flex">-->
    <!--                    <q-btn @click="loginOIDC($q)" outline style="color: dodgerblue; width: 90%; text-transform: none;" label="Acceder con iD Digital Mty" />-->
    <!--                  </div>-->
    <!--                  <div class="col q-pb-sm full-width justify-center content-center flex">-->
    <!--                    <q-btn flat style="color: dodgerblue; margin-bottom: 0!important; width: 90%; text-transform: none;" label="Aviso de privacidad" />-->
    <!--                  </div>-->
    <!--                </div>-->
    <!--              </q-list>-->
    <!--            </q-menu>-->
  </q-icon>
</template>
<script setup lang="ts">
// import { loginOIDC, logOutOIDCFirebase } from 'boot/utils';
// import { useAuthStore } from 'stores/auth';

// const authStore = useAuthStore()

// const $q = useQuasar()
// const editarCuenta = () => {
//   window.open('https://id.monterrey.gob.mx/completar-perfil/', '_blank')
// }
</script>
