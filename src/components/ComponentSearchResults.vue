<template>
  <div v-if="dataNominatim.data !== undefined && dataNominatim.data.length > 0"
       class="flex flex-col justify-center items-center full-width">
    <q-card :style="$q.screen.xs ? {width: '90%', padding: '2px 5px'} : {width: '40%', padding: '2px 5px'}">
      <q-card-section class="full-width">
        <div class="flex full-width justify-between items-center">
          <p style="font-size: 14px; margin: auto 0"> {{ indice + 1 }} de {{ dataNominatim.data.length }}</p>
          <q-btn
            flat
            @click="() => useDialogoResultadosNominatim.$reset()"
            rounded>
            <q-icon
              name="close"/>
          </q-btn>
        </div>
        <p style="font-size: 15px; font-width: bold;">{{ dataNominatim.data[indice].display_name }}</p>
        <div class="full-width flex justify-between">
          <q-btn color="light-blue-5"
                 rounded size="8px"
                 :disable="indice === 0"
                 @click="() => indice -= 1">
            <q-icon name="arrow_back"/>
          </q-btn>

          <q-btn color="light-blue-5"
                 rounded
                 :disable="indice === dataNominatim.data.length - 1"
                 size="8px"
                 @click="() => indice += 1">
            <q-icon name="arrow_forward"/>
          </q-btn>
        </div>
      </q-card-section>
    </q-card>
  </div>
</template>

<script setup lang="ts">
import { DataNominatimStore } from 'src/utils-arboles/interface';
import { watch, ref } from 'vue';
import { dialogoResultadosNominatim } from 'stores/dialogoResultadosNominatim';
import { fromLonLat } from 'ol/proj';
import { contextMap } from 'stores/contextMap';
import { LoadingLayersStore } from 'stores/capas';
import { Overlay } from 'ol';


const dataNominatim = ref<DataNominatimStore>({});
const useDialogoResultadosNominatim = dialogoResultadosNominatim();
const useStoreContextMap = contextMap();
const indice = ref(0);
const useLoadingLayersStore = LoadingLayersStore()
const variantsZoom = {
  'city': 12,
  'addresstype': 18,
  'road': 18,
  'building': 18
};
const actualizarUbicacion = (newValue: number) => {
  const view = useStoreContextMap.context.getView();
  const ciudad = dataNominatim.value.data[newValue];

  if (!ciudad) return;

  const coordenadas = fromLonLat([parseFloat(ciudad.lon), parseFloat(ciudad.lat)]);
  view.animate({
    center: coordenadas,
    zoom: variantsZoom[ciudad['addresstype']],
    duration: 3000
  });

  useLoadingLayersStore.setShowOverlayBusqueda(true);
  const overlay = new Overlay({
    positioning: 'bottom-center',
    position: coordenadas,
    element: document.getElementById('overlayBusqueda'),
    stopEvent: false
  });

  useStoreContextMap.context.addOverlay(overlay);
};

watch(() => indice.value, (newValue) => {
  actualizarUbicacion(newValue);
});

watch(() => useDialogoResultadosNominatim.dataNominatim.data, (NewValue: DataNominatimStore) => {
  dataNominatim.value.data = NewValue

  if (dataNominatim.value.data.length > 0) {
    indice.value = 0
    actualizarUbicacion(indice.value);
  }
})

</script>
