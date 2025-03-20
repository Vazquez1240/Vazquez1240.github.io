<template>
  <q-btn
    v-if="listaApps.length > 0"
    round
    dense
    flat
    text-color="grey-7"
    icon="apps"
    class="relative-position"
  >
    <q-tooltip :delay="3000">Aplicaciones</q-tooltip>

    <q-menu
      anchor="top middle"
      self="bottom middle"
      class="z-top"
      transition-show="jump-down"
      transition-hide="jump-up"
    >
      <div
        class="row wrap justify-start q-pa-xs"
        style="width: auto; max-width: 380px"
      >
        <div
          class="col-4 q-pa-xs text-center"
          v-for="(item, index) of listaApps"
          :key="index"
        >
          <q-btn
            square
            flat
            color="grey-7"
            stack
            no-caps
            size="xl"
            class="full-width"
            style="min-height: 90px"
            type="a"
            :href="item.url"
          >
            <div v-if="item.icono">
              <q-img
                :src="item.icono"
                :alt="item.titulo"
                ratio="1"
                width="40px"
                fit="contain"
              />
            </div>
            <div v-else>
              <q-icon size="40px" :name="item.icono_mdi" :color="item.color" />
            </div>
            <span
              style="font-size: 15px; line-height: 1.2"
              class="text-weight-regular q-mt-sm"
            >
              {{ item.titulo }}
            </span>
          </q-btn>
        </div>
      </div>
    </q-menu>
  </q-btn>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { apiCMS } from 'boot/axios';

const listaApps = ref([]);

apiCMS
  .get('base/aplicacion-sistema-sitio-web/')
  .then((response) => {
    listaApps.value = response.data.map((item: never) => ({
      id: item.id,
      url: item.url,
      icono: item.icono,
      titulo: item.titulo,
      hits: item.hits,
      icono_mdi: item.icono_mdi,
      color: item.color,
    }));
  })
  .catch(() => {
    listaApps.value = [];
  });
</script>
