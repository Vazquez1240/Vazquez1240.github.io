<template>
    <div v-if="tipoProceso === 'modalidad'">
      <q-card-actions style="display: flex; flex-direction: column; gap: 5px;">
        <q-btn
          style="width: 160px;"
          v-for="(label, index) in botones"
          :key="index"
          :label="label"
          no-caps
          color="light-blue-5"
          :class="{ 'first-button': index === 0 }"
          @click="modalidadSeleccionada(label)"
        />
      </q-card-actions>
    </div>
</template>


<script setup lang="ts">
import { ref, watch, onMounted } from 'vue'
import { userTree } from 'stores/arboles';

import { ComponentesArboles } from 'stores/componentes-arboles';

const props = defineProps({
  tipoProceso: String,
  preguntaUsuario: String,
  modelValue: Boolean,
  tipoInteraccion: {
    type: String,
    required: false
  },
  color: {
    type: String,
    required: false
  },
  tipoModalidad: {
    type: String,
    required: false
  },
  botones: {
    type: Array as () => string[], // Array de strings para los labels
    default: () => []
  }
})

const useUserTree = userTree()
const useComponenteAroles = ComponentesArboles()
const visible = ref(props.modelValue)
const loading = ref(false)
const tipoProceso = ref(props.tipoProceso)
const botones = ref(props.botones)

const modalidadSeleccionada = (modalidad: string) => {
  useUserTree.setModalidadSeleccionada(modalidad.toLowerCase());
  useComponenteAroles.setComponenteStepper(useComponenteAroles.componentStepper + 1)
}


watch(() => props.tipoProceso, (newValue) => {
  tipoProceso.value = newValue
})

watch(() => props.botones, (newValue) => {
  botones.value = newValue
})


onMounted(() => {
  visible.value = props.modelValue
  tipoProceso.value = props.tipoProceso
})

</script>

<style scoped>
.first-button {
  margin-left: 7px;
}
</style>/
