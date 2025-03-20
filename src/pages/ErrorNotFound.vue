<template>
  <div
    class="fullscreen bg-white text-white text-center q-pa-md flex flex-center"
  >
    <div>
      <div style="font-size: 20vh; color: #11abe3">
        404
        <q-img
          v-bind:width="$q.screen.lt.sm ? '0%' : '20%'"
          src="https://mty-microwebapps.web.app/img/sig/sig-god/datosmty/mty_mira_logo_iso.png"
        />
      </div>
      <div class="text-h2" style="opacity: 0.4; color: #11abe3">
        Pagina no encontrada...
      </div>

      <q-btn
        class="q-mt-xl"
        color="light-blue-13"
        text-color="white"
        unelevated
        to="/"
        label="Volver a mira +"
        no-caps
      />
    </div>
  </div>
</template>

<script setup lang="ts"></script>
