<template>
  <q-form
    :style="$q.screen.xs ?
    null : $q.screen.sm ? {width: '38%', marginRigth: '14px'} :  $q.screen.md ? {width: '38%', marginRigth: '14px'} :
    $q.screen.lg ?{width: '34%', marginRigth: '14px'} : {width: '23%', marginRigth: '14px'}"
    @submit.prevent="buscarDireccion">
    <div class="full-width">
      <q-input
        input-style="font-size: 14px; padding: 15px 10px;"
        dense
        prepend-icon="search"
        rounded outlined v-model="direccion">
        <template v-slot:append>
          <q-icon name="search" @click="buscarDireccion" class="cursor-pointer" />
        </template>
      </q-input>
    </div>
  </q-form>
</template>

<script setup lang="ts">
import axios from 'axios';
import { ref } from 'vue'
import { RespuestaNominatim } from 'src/utils-arboles/interface';
import { LoadingLayersStore } from 'stores/capas';
import { dialogoBuscadorLugar } from 'stores/dialogoBuscadorLugar';
import { dialogoResultadosNominatim } from 'stores/dialogoResultadosNominatim';

const direccion = ref('')
const showNominatim = ref(false)
const useDialogoBuscadorLugar = dialogoBuscadorLugar();
const useDataNominatim = dialogoResultadosNominatim()
const useLoadingLayersStore = LoadingLayersStore()

const buscarDireccion = async () => {
  useLoadingLayersStore.showOverlay = false
  try{
    const response: RespuestaNominatim = await axios.get(`https://nominatim.openstreetmap.org/search?q=${direccion.value}&format=json&polygon_geojson`)
    if( response.data.length > 0){
      showNominatim.value = true
      useDataNominatim.setDataNominatim(response)
    }else{
      useDialogoBuscadorLugar.setDireccion(direccion.value)
      useDialogoBuscadorLugar.setShowDialogo(true)
    }
  }catch(error){
    useDialogoBuscadorLugar.setDireccion(direccion.value)
    useDialogoBuscadorLugar.setShowDialogo(true)
    console.log(error)
  }

}
</script>
