<template>
  <q-card flat class="justify-center text-center"
          :style="$q.screen.lt.sm ? {minHeight: '130px', maxHeight: '150px'}: {minHeight: '150px', maxHeight: '200px'}">
    <q-card-section
      :style="$q.screen.lt.sm ? {minHeight: '100px', maxHeight: '140px', display:'flex', flexDirection:'column', alignItems:'center', gap:'5px'}
      : {minHeight: '150px', maxHeight: '200px'}">
      <q-icon
        name="info"
        :style="$q.screen.lt.sm ? {color: '#3cbae8', fontSize:'60px'} : {color: '#3cbae8', fontSize: '100px'}"
      />
      <p
        :style="$q.screen.lt.sm ? {fontSize: '1.1rem'} : {fontSize: '1.3rem'}"
      >{{props.mensaje}}</p>
    </q-card-section>
  </q-card>
</template>

<script setup lang="ts">
const props = defineProps({
  mensaje: String,
});
</script>
