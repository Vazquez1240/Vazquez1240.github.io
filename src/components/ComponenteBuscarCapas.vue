<template>
  <div style="margin-top: 10px">
    <q-form @submit="buscar">
      <q-input
        input-style="font-size: 14px; padding: 25px 10px;"
        dense
        label="Buscar Capas"
        outlined
        prepend-icon="search"
        v-model="capa">
        <template v-slot:append>
          <q-icon @click="() => buscar()" name="search" class="cursor-pointer" />
        </template>
      </q-input>
    </q-form>
  </div>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue'

const capa = ref('')

const buscar = () => {
  const divCapas = document.getElementById('div-capas');
  if (!divCapas) return;

  const liElements = divCapas.querySelectorAll('li');

  liElements.forEach((li) => {
    const nombre = li.textContent?.trim().toLowerCase() || '';
    if (!capa.value) {
      li.style.display = 'flex';
    } else {
      li.style.display = nombre.includes(capa.value.toLowerCase()) ? 'flex' : 'none';
    }
  });
}

watch(capa, () => {
  buscar();
});

</script>

