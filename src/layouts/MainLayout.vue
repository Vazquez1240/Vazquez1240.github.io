<template>
  <q-layout class="contenido" view="lHh Lpr lFf">
    <NavBar />
    <q-page-container :style="$q.screen.xs ? {height: 'calc(93vh)'} : {height: 'calc(100vh)'}">
      <router-view />
    </q-page-container>
    <FooterBar />
  </q-layout>
</template>

<script setup lang="ts">
import NavBar from 'components/NavBar.vue';
import FooterBar from 'components/FooterBar.vue';
</script>
<style scoped></style>
