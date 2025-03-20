<template>
  <q-dialog
    v-model="visible"
    persistent>

    <q-card style="display: flex; flex-direction: column; gap: 8px; max-width: 1150px">
        <DialogoProceso pregunta-usuario="Seleccionar proceso" :model-value="modelValueProceso" :botones="['Construcción', 'Instalación', 'Cerrar']"/>
    </q-card>

    <q-card v-show="ComponenteStepper" style="display: flex; flex-direction: column; min-width: 150px; max-width: 1150px">
      <div style="width: 97%; display: flex; justify-content: end; margin-top: 10px">
        <q-btn class="q-mt-sm" icon="close" flat round dense @click="cerrarDialogo"/>
      </div>
      <q-card-section v-show="ComponenteStepper" style="min-width: 250px; max-width: 100%">
        <ComponentStepper :model-value="ComponenteStepper" :proceso="useUserTree.proceso"/>
      </q-card-section>

    </q-card>
  </q-dialog>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue'
import { ComponentesArboles } from 'stores/componentes-arboles';
import { ComponentDialogUsers } from 'stores/component-dialog-users';

// Componentes
import ComponentStepper from 'components/Arboles/ComponentStepper.vue';
import DialogoProceso from 'components/Arboles/Dialogos/DialogoProceso.vue';
import { userTree } from 'stores/arboles';

const props = defineProps({
  modelValue: Boolean,
})

const useComponentesArboles = ComponentesArboles();
const useUserTree = userTree()
const emit = defineEmits(['update:modelValue'])
const visible = ref(props.modelValue)

const SeleccionProceso = ref(true)
const ComponenteStepper = ref(false)
const useComponentDialogUsers = ComponentDialogUsers()

const modelValueProceso = ref(useComponentesArboles.componentDialogoProceso)
const modelValueStepper = ref(useComponentesArboles.componentStepper)

watch(() => props.modelValue, (newValue) => {
  visible.value = newValue
})

watch(() => useComponentesArboles.componentStepper, (newValue) => {
  ComponenteStepper.value = newValue
  modelValueStepper.value = newValue
})

watch(() => useComponentesArboles.componentDialogoProceso, (newValue) => {
  !newValue ? SeleccionProceso.value = false : SeleccionProceso.value = true
  modelValueProceso.value = newValue
})


const cerrarDialogo = () => {
  useComponentesArboles.setComponenteDialogoProceso(true)
  useComponentesArboles.setComponenteDialogoUsuario(false)
  useComponentesArboles.setComponenteStepper(0)
  useComponentesArboles.setCapaResaltada(!useComponentesArboles.capaResaltada)
  modelValueProceso.value = true
  useUserTree.reset()
  useComponentesArboles.setComponenteCardSuccess(false)
  useUserTree.setModalidadSeleccionada('')
  useComponentDialogUsers.reset()

}
watch(visible, (newValue) => {
  emit('update:modelValue', newValue)
})
</script>
