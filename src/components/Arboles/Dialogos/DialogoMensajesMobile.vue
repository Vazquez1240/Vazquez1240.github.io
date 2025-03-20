<template>
  <q-dialog
  v-model="visible"
  >
    <q-card>
      <div style="display: flex; width: 100%; justify-content: end">
        <q-btn class="q-mt-sm q-mr-sm" icon="close" flat dense rounded @click="closeDialog"/>
      </div>
      <q-card-section >
        <p class="q-ma-sm" style="font-family: 'Roboto', sans-serif; font-size: .85rem; text-align: justify ">{{message}}</p>
      </q-card-section>
      <q-card-actions style="display: flex; flex-direction: row; justify-content: end">
        <q-btn class="q-mr-sm q-mb-sm" style="background: #3cbae8; color: white" label="Cerrar" @click="closeDialog" no-caps/>
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>

<script setup lang="ts">
import { ref, onMounted, watch } from 'vue'
import { ComponentesArboles } from 'stores/componentes-arboles';

const props = defineProps({
  modelValue:Boolean,
  message: String
})

const visible = ref(props.modelValue)
const message = ref(props.message)
const emit = defineEmits(['update:modelValue'])
const useComponentesArboles = ComponentesArboles()

const closeDialog = () => {
  useComponentesArboles.setComponenteDialogMessage(false)
}

watch(() => props.modelValue, (newValue) => {
  visible.value = newValue
})

watch(visible, (newValue) => {
  emit('update:modelValue', newValue)
})

onMounted(() => {
  visible.value = props.modelValue
})

</script>

