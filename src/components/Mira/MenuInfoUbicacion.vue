<template>
  <q-card flat style="margin-top: 1.2rem; margin-bottom: 1.2rem; max-width: 350px; height: 100%">
    <div class="full-height">
      <q-expansion-item
        header-style="padding: 0; margin: 0; font-size: 1.2rem; height: 100%;"
        label="Datos de la ubicación"

      >
        <div v-if="showLoadeer" class="flex justify-center q-mt-lg full-height">
          <q-spinner style="color: #3cbae8" size="50px" />
        </div>

        <div v-else>
          <div v-if="features.length > 0">
            <q-card flat v-for="feature in features" :key="feature.id" style="border-top: 1px solid lightgrey">
              <div style="margin-top: 1.4rem;">
                <p style="font-family: Roboto, sans-serif; font-weight: bold">{{ feature.layerName }}</p>
              </div>
              <q-card-section
                v-for="(value, key) in filteredProperties(feature.propiedades)"
                style="display: flex; flex-direction: row; padding: 0; margin-top: .01rem; gap: 3px"
                :key="key">
                <strong style="font-family: Roboto, sans-serif;">{{ key }}:</strong>
                <p style="font-family: Roboto, sans-serif; font-size: 14px">{{ value ? value : '—' }}</p>
              </q-card-section>
            </q-card>
          </div>

          <div v-else class="flex justify-center q-mt-lg">
            <p>No hay información disponible para este punto</p>
          </div>
        </div>

      </q-expansion-item>
    </div>
  </q-card>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue';
import { menuUbicacion } from 'stores/menuUbicacion';

const useMenuUbicacion = menuUbicacion()

const features = ref(useMenuUbicacion.features);
const showLoadeer = ref(useMenuUbicacion.showLoader);

const campos_descartados = ref([
  'fid', 'y', 'x', '_id', 'nota',
  'num_inf', 'area_km', 'area_ha',
  'fecha_digitalizacion', 'delegacion_id',
  'distrito_id', 'id',
  'clave_zonificacion_secundaria', 'area_m2',
  'area_km2'
]);

const filteredProperties = (propiedades: Record<string, any>) => {
  const result = Object.keys(propiedades)
    .filter(key => !campos_descartados.value.includes(key))
    .reduce((obj, key) => {
      const formattedKey = key
        .split('_')
        .map(word => {
          return word.charAt(0).toUpperCase() + word.slice(1);
        })
        .join(' ');

      obj[formattedKey] = propiedades[key] || '—';
      return obj;
    }, {} as Record<string, any>);
  return result;
};


watch(() => useMenuUbicacion.features, (newValue) => {
  features.value = newValue;
})

watch(() => useMenuUbicacion.showLoader, (newValue) => {
  showLoadeer.value = newValue;
})

</script>
