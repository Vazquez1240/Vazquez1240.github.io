<template>
  <q-dialog style="height: 800px;"
  v-model="visible"
  persistent>
    <q-card style="width: 500px;">
      <div class="q-ma-lg">
        <div class="flex justify-end" style="margin-top: -10px;">
          <q-btn icon="close" rounded flat dense  @click="closeOverlay"/>
        </div>
        <div>
          <div style="display: flex; justify-content: center">
            <p style="font-size: 1.3rem; font-family: 'Roboto', sans-serif">{{ preguntaUsuario }}</p>
          </div>
        </div>
        <q-card-actions class="ma-1 flex column q-gap-1 q-gutter-sm">
          <q-btn
            :class="{ 'first-button': index === 0 }"
            style="width: 180px; font-family: 'Roboto', sans-serif"
            v-for="(label, index) in botones"
            :key="index"
            :label="label"
            no-caps
            :color="label.toLowerCase() === 'cerrar' ? 'grey-7' : 'light-blue-5'"

            @click="label.toLowerCase() === 'cerrar' ? closeOverlay() : ProcesoSeleccionado(`${label.toLowerCase()}`)"
          />
        </q-card-actions>
        <q-inner-loading
          :showing="skeletone"
          label-class="text-teal"
          label-style="font-size: 1.1em"
        />
      </div>
    </q-card>
  </q-dialog>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue'
import { userTree } from 'stores/arboles';
import { ComponentesArboles } from 'stores/componentes-arboles';


const props = defineProps({
  modelValue: Boolean,
  preguntaUsuario: String,
  botones: {
    type: Array as () => string[], // Array de strings para los labels
    default: () => []
  }
})

const visible = ref(props.modelValue)
const useUserTree = userTree()
const useComponenteArboles = ComponentesArboles()
const emit = defineEmits(['update:modelValue'])
const skeletone = ref(false)

const ProcesoSeleccionado = (proceso: string) => {
  skeletone.value = true
  useUserTree.setProcesoSeleccionado(proceso)
  useComponenteArboles.setComponenteDialogoProceso(false)
  useComponenteArboles.setComponenteStepper(1)
}

watch(() => props.modelValue, (newValue) => {
  skeletone.value ? skeletone.value = false : null
  visible.value = newValue
})

watch(visible, (newValue) => {
  emit('update:modelValue', newValue)
})

const closeOverlay = () => {
  useComponenteArboles.setComponenteDialogoProceso(true)
  useComponenteArboles.setComponenteDialogoUsuario(false)
  useComponenteArboles.setCapaResaltada(!useComponenteArboles.capaResaltada)
}
</script>

<style scoped>
.first-button {
  margin-left: 7px;
}
</style>/
