<template>
  <q-header
    class="bg-white"
    :style="$q.screen.lt.md ? 'height: 60px;' : 'height: 65px;'"
  >
    <q-toolbar
      class="q-py-none justify-between "
      :style="$q.screen.lt.md ? 'height: 60px;' : 'height: 65px;'"
    >

      <div v-if="router.fullPath !== '/arboles-decisiones'" class="flex justify-end full-width">
        <ComponenteSearch/>
      </div>

      <BotonApps />

      <!--<BotonCuenta /> -->
    </q-toolbar>
  </q-header>
</template>

<script setup lang="ts">
import BotonApps from 'components/BotonApps.vue';
import ComponenteSearch from 'components/ComponenteSearch.vue';
import { useRoute } from 'vue-router';

const router = useRoute();
console.log(router.fullPath)
</script>
<style>
p {
  font-size: 1rem;
}

span {
  margin: 0 !important;
}
</style>
