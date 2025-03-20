<template>
  <q-card class="justify-center text-center"
          flat
          :style="$q.screen.lt.sm ? {minHeight: '100px', maxHeight: '200px'}: {minHeight: '150px', maxHeight: '200px', maxWidth: '900px'}">
    <q-card-section class="q-ml-sm"
      :style="$q.screen.lt.sm ? {minHeight: '100px', maxHeight: '180px', display:'flex', flexDirection:'column', gap:'12px', alignItems:'center'}:
      {minHeight: '150px', maxHeight: '200px', display: 'flex', flexDirection:'column', gap:'12px', alignItems:'center'}">
      <q-icon
        name="assignment_turned_in"
        :style="$q.screen.lt.sm ? {color: '#3cbae8', fontSize:'80px', marginTop: '-8px'} : {color: '#3cbae8', fontSize: '80px'}"
      />
      <p
       :style="$q.screen.lt.sm ? {fontSize: '.85rem', fontFamily: ['Roboto', 'sans-serif'], textAlign:'justify'} :
        {fontSize: '1rem',fontFamily: ['Roboto', 'sans-serif']}"
      >{{props.mensaje}}</p>
    </q-card-section>
  </q-card>
</template>

<script setup lang="ts">
const props = defineProps({
  mensaje: String,
});
</script>
