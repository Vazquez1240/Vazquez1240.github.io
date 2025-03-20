<template>

      <q-card style="max-width: 590px; max-height: 370px; justify-content: center; align-items: center; padding: 1.25rem">
        <div class="text-h6" style="text-align: center;">
          Este Giro es {{props.cve_giro}} {{props.giro}}
        </div>
        <q-card-section v-model="showCardSection">
          <q-form @submit="enviarFormulario()" >

            <div v-if="giro?.toLowerCase().includes('huéspedes') || giro?.toLowerCase().includes('hostales') || giro?.toLowerCase().includes('4 estrellas') || giro?.toLowerCase().includes('3 estrellas') || giro?.toLowerCase().includes('moteles')" style="display: grid; grid-template-columns: repeat(2,1fr); gap: 25px">
              <div style="display: flex; flex-direction: row">
                <q-input v-model="construccion" label="Construcción"
                         type="number"
                         :rules="[val => !!val || 'Este campo no puede estar vacío']"
                         error-message="Este campo no puede estar vacío">
                </q-input>
              </div>
              <div>
                <q-input v-model="personas" label="¿Cuántas personas?"
                         type="number"
                         :rules="[val => !!val || 'Este campo no puede estar vacío']"
                         error-message="Este campo no puede estar vacío">
                </q-input>
              </div>
            </div>
            <div v-if="giro?.toLowerCase().includes('lofts')" style="display: flex; flex-direction: row; gap: 25px">
              <div>
                <q-input v-model="viviendas" label="Viviendas"
                         type="number"
                         :rules="[val => !!val || 'Este campo no puede estar vacío']"
                         error-message="Este campo no puede estar vacío">
                </q-input>
              </div>
              <div>
                <q-input v-model="niveles" label="Niveles"
                         type="number"
                         :rules="[val => !!val || 'Este campo no puede estar vacío']"
                         error-message="Este campo no puede estar vacío">
                </q-input>
              </div>
            </div>
            <div  style="display: grid; grid-template-columns: repeat(2,1fr); gap: 25px">
              <div style="display: flex; flex-direction: row">
                <q-input v-model="construccion" label="Construcción"
                         type="number"
                         :rules="[val => !!val || 'Este campo no puede estar vacío']"
                         error-message="Este campo no puede estar vacío">
                </q-input>
              </div>
            </div>
            <q-card-actions style="display:flex; justify-content: center; margin-top: .60rem">
              <q-btn type="submit" label="Validar" color="light-blue-4" />
            </q-card-actions>
          </q-form>
        </q-card-section>
        <q-dialog style="display: flex; justify-content: center" v-model="showAlerta">
          <q-card>
            <q-card-section>
              {{mensajeContenido}}
            </q-card-section>
          </q-card>
        </q-dialog>
      </q-card>
</template>

<script setup lang="ts">

import { ref } from 'vue'

const props = defineProps({
  giro: String,
  cve_giro:String
});

let construccion = ref<number>()
let personas = ref<number>()
let viviendas = ref<number>()
let niveles = ref<number>()
let showCardSection = ref(true)
let showAlerta = ref(false)
let mensajeContenido = ref('')


const validarPersonas = () => {
  return !!(props.giro?.toLowerCase().includes('huéspedes') || props.giro?.toLowerCase().includes('hostales') || props.giro?.toLowerCase().includes('4 estrellas') || props.giro?.toLowerCase().includes('3 estrellas') || props.giro?.toLowerCase().includes('moteles'));
}
const validarNivelesViviendas = () => {
  return !!(props.giro?.toLowerCase().includes('lofts'))
}

const validarVistoBueno = () => {
  const showPersonas = validarPersonas()
  const showNivelesViviendas = validarNivelesViviendas()

  if(construccion.value >= 1501){
    return true
  }
  if(showNivelesViviendas){
    if(niveles.value >= 5 || viviendas.value >= 5){
      if(showPersonas){
        return personas.value >= 20;
      }
    }
    return false
  }
  if(showPersonas){
    return personas.value >= 20;
  }

  return false
}

const enviarFormulario = () => {
  const vistoBueno = validarVistoBueno()
  if(vistoBueno){

    showAlerta.value = true
    showCardSection.value = false
    mensajeContenido.value = 'La atribución calculada es estatal'
  }else{
    showAlerta.value = true
    showCardSection.value = false
    mensajeContenido.value = 'La atribución calculada es municipal'
  }
}

</script>

<style scoped>


</style>
