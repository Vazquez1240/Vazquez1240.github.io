<template>
  <div>
    <q-footer class="footer bg-white">
      <q-toolbar class="full-height">
        <q-toolbar-title
          class="text-black toolbar-title"
          style="font-size: 13px; text-align: center"
        >
          <q-img
            src="https://mty-microwebapps.web.app/img/sig/mty_sig_logo_iso_200.png"
            style="flex: none; width: 25px; height: 18px"
          ></q-img>
          Secretaria de Innovación y Gobierno Abierto
          {{ new Date().getFullYear() }}
        </q-toolbar-title>
      </q-toolbar>
    </q-footer>
  </div>
</template>

<script setup lang="ts"></script>

<style scoped>
.footer {
  height: 25px;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
}

.toolbar-title {
  text-align: center;
}
</style>
