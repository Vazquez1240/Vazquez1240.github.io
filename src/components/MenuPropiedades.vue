<template>
  <div v-if="props">
    <q-card class="full-width">
      <q-card-section>
        <q-img
          :ratio="4 / 3"
          :src="props.miniMapa"
          class="rounded-borders"
          style="max-height: 150px"
          fit="contain"
        />
        <q-item>
          <q-item-section side>
            <q-icon name="mdi-opacity" />
          </q-item-section>
          <q-item-section>
            <label>
              <input
                :id="`opacity-input-${layerid}`"
                type="range"
                min="0"
                max="100"
                step="1"
                value="100"
              />
              <span
                :id="`opacity-output-${layerid}`"
                style="padding-left: 10px"
              ></span>
            </label>
          </q-item-section>
        </q-item>
      </q-card-section>
      <q-card-section>
        <q-tabs v-model="tab" dense>
          <q-tab name="simbologia" icon="mdi-format-list-bulleted-type" />
          <q-tab name="herramienta" icon="mdi-toolbox" disable>
            <q-tooltip> Próximamente... </q-tooltip>
          </q-tab>
        </q-tabs>
        <q-tab-panels v-model="tab">
          <q-tab-panel name="herramienta"> {Opacidad} </q-tab-panel>
          <q-tab-panel v-if="showContent" name="simbologia">
            <p class="text-h6">Simbología</p>
            <q-list bordered separator>
              <q-skeleton height="150px" square />
            </q-list>
          </q-tab-panel>
          <q-tab-panel v-else name="simbologia">
            <p class="text-h6">Simbología</p>
            <img
              style="border-style: none; margin: 0 !important"
              :src="props.simbologia"
              alt="Simbologia del mapa"
            />
          </q-tab-panel>
        </q-tab-panels>
      </q-card-section>
    </q-card>
  </div>
</template>

<script setup>
import { ref } from 'vue';

let tab = ref('simbologia');
const props = defineProps({
  simbologia: String,
  miniMapa: String,
  layerid: String,
});

const showContent = ref(true);
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const opacityValue = ref(100); // Valor inicial del rango (100%)

if (props.simbologia) {
  setTimeout(() => {
    showContent.value = false;
  }, 500);
}
</script>

<style scoped>
/*********** Baseline, reset styles ***********/
input[type='range'] {
  -webkit-appearance: none;
  appearance: none;
  background: transparent;
  cursor: pointer;
  width: 180px;
}

/* Removes default focus */
input[type='range']:focus {
  outline: none;
}

/******** Chrome, Safari, Opera and Edge Chromium styles ********/
/* slider track */
input[type='range']::-webkit-slider-runnable-track {
  background-color: #97cafd;
  border-radius: 0.5rem;
  height: 4.5px;
}

/* slider thumb */
input[type='range']::-webkit-slider-thumb {
  -webkit-appearance: none; /* Override default look */
  appearance: none;
  margin-top: -5.75px; /* Centers thumb on the track */
  background-color: #808080;
  border-radius: 0.5rem;
  height: 1rem;
  width: 1rem;
}

input[type='range']:focus::-webkit-slider-thumb {
  outline: 3px solid #808080;
  outline-offset: 0.125rem;
}

/*********** Firefox styles ***********/
/* slider track */
input[type='range']::-moz-range-track {
  background-color: #97cafd;
  border-radius: 0.5rem;
  height: 4.5px;
}

/* slider thumb */
input[type='range']::-moz-range-thumb {
  background-color: #808080;
  border: none; /*Removes extra border that FF applies*/
  border-radius: 0.5rem;
  height: 1rem;
  width: 1rem;
}

input[type='range']:focus::-moz-range-thumb {
  outline: 3px solid #808080;
  outline-offset: 0.125rem;
}
</style>
