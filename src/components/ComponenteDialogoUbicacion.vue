<template>
  <q-dialog persistent v-model="showDialog">
    <q-card>
      <q-card-section class="flex flex-col justify-end">
        <q-icon class="cursor-pointer" name="close" size="25px" @click="() => useDialogoBuscadorLugar.setShowDialogo(false)"  />
        <div>
          <p style="font-weight: bold; font-size: 18px">No se encontraron resultados</p>
          <p style="font-size: 15px; color: #A1A1AA">No se encontraron resultados para la búsqueda "<b>{{useDialogoBuscadorLugar.direccion}}</b>". Por favor, intenta con una búsqueda diferente o más específica.</p>
        </div>
      </q-card-section>
    </q-card>
  </q-dialog>
</template>
<script setup lang="ts">
import { ref, watch } from 'vue';
import { dialogoBuscadorLugar } from 'stores/dialogoBuscadorLugar';


const useDialogoBuscadorLugar = dialogoBuscadorLugar();

const showDialog = ref(false);

watch(() => useDialogoBuscadorLugar.showDialogo, (newValue:boolean) => {
  showDialog.value = newValue
})

</script>
