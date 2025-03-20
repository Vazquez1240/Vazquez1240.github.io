<template>

  <div v-if="tipoInteraccion === 'seleccion' ">
    <div v-if="nombreSubprocesos.includes(tipoSubproceso)"
    style="display: flex; justify-content: center;">
      <q-card flat class="q-mt-sm"
        style="max-width: 500px;"
        >
        <div>
          <div :style=" $q.screen.lt.sm ? {width: '250px', display: 'flex', justifyContent: 'center'} : {width: '500px', display: 'flex', justifyContent: 'center' } ">
            <p :style="!$q.screen.lt.sm ? {fontFamily: ['Roboto', 'sans-serif'], fontSize: '15px'} : {fontFamily: ['Roboto', 'sans-serif'], fontSize:'14px', textAlign:'justify'}">{{ props.preguntaUsuario }}</p>
          </div>
        </div>
        <q-card-actions :style="botones[0].label !== 'No' ? {display: 'flex', flexDirection: 'column', justifyContent: 'center', gap: '8px'} :
        {display: 'flex', flexDirection: 'row', justifyContent: 'flex-end', gap: '8px'}">
          <q-btn
            v-for="(boton, index) in botones"
            :key="index"
            :outline="boton.outLine"
            :label="boton.label"
            no-caps
            :class="[
              {'q-ml-sm': botones.length >= 2 && index === 0 },
              'btnDialogo'
            ]"
            :color="boton.color"
            :style="$q.screen.lt.sm ? { width: botones.length >= 3 || ['Persona'].some(label => boton.label.includes(label)) ? '70%' : '15%' } : { width: botones.length >= 3 || ['Persona'].some(label => boton.label.includes(label)) ? '32%' : '15%' } "
            @click="
            boton.label === 'Si' || boton.label === 'No' ? handleClick(boton.label.toLowerCase() === 'si') :
            funcionesSubprocesos(boton.label)"
            />
        </q-card-actions>
      </q-card>
    </div>
  </div>

  <!--        En caso de que sea para input -->
  <div v-if="tipoInteraccion === 'input' ">
    <div v-if="nombreSubprocesos.includes(tipoSubproceso)">
      <q-card class="q-mt-sm"
        style="max-width: 500px"
        flat>
        <div>
          <div :style="!$q.screen.lt.sm ? {fontFamily: ['Roboto', 'sans-serif'], fontSize: '15px'} : {fontFamily: ['Roboto', 'sans-serif'], fontSize:'14px', textAlign:'justify'}">
            {{ props.preguntaUsuario }}
            <q-input color="light-blue-5" :label="labelInput" v-model="dimensiones" :rules="rulesInput"/>
          </div>
        </div>
        <q-card-actions :style="botones.length >= 3 ? {display: 'flex', flexDirection:'column', justifyContent: 'center'} :
        {display: 'flex', flexDirection: 'row', justifyContent: 'end'}">
          <q-btn class="q-mt-md"
            v-for="(boton, index) in botones"
            :key="index"
            :label="boton.label"
            no-caps
            :color="boton.color"
            style="font-family: Roboto, sans-serif"
            @click="() => {
              if (dimensiones !== '') {
                funcionesInputs();
              } else {
                rulesInput = [
                  val => (val !== '' && val.length > 0) || 'Este campo no puede estar vacío.'
                ];
              }
            }"
          />

         </q-card-actions>
      </q-card>
    </div>
  </div>

</template>

<script setup lang="ts">
import { onMounted, ref, watch } from 'vue';
import {
  SubProcesoDemolicion,
  SubProcesoDemolicionAmpliacion,
  SubProcesoDimensiones,
  SubProcesoGravamen,
  SubProcesoLotificacion,
  SubProcesoMaquinariaInstalacion,
  SubProcesoVehiculosPesados,
  SubProcesoManiobrasCargaDescarga,
  SubProcesoAderirseServicioPublico,
  SubProcesoObstruccionViaPublica,
  SubProcesoVentaAlcohol,
  SubProcesoServicioResiduos,
  SubProcesoDesarrolloSuperiorMetrosAltura,
  SubProcesoConcluidoObrasLicenciaDeConstruccion,
  SubProcesoCortesMayoresMetros
} from 'src/utils-arboles/SubProcesos';

import { useQuasar } from 'quasar';
import { Subprocesos } from 'stores/subprocesos';
import { SubProcesoTipoSolicitante, SubProcesoTipoRepresentante } from 'src/utils-arboles/ClasificacionSolicitante';
import {
  SubprocesoSuperficiePredio,
  SubProcesoMetrosAConstruir,
  SubProcesoUbicacionDentroFraccionamiento,
  SubProcesoFueraFraccionamientoColonia,
} from 'src/utils-arboles/SubProcesosInput';
import { userTree } from 'stores/arboles';
import { ComponentDialogUsers } from 'stores/component-dialog-users';
import {
  SubProcesoAdherirseServicioPublicoConstruccion,
  SubProcesoManiobraCargaDescargaConstruccion,
  SubProcesoMaquinariaPropiaConstruccion,
  SubProcesoObstruccionViaPublicaConstruccion,
  SubProcesoRequeriraVentaAlcoholConstruccion,
  SubProcesoVehiculosCargaPesadaConstruccion
} from 'src/utils-arboles/SubProcesosConstruccion';

const nombreSubprocesos = ['demolicion', 'lotificacion', 'gravamen',
  'demolicionAmpliacion', 'dimensiones', 'maquinariaInstalacion',
  'vehiculoPesado', 'maniobraCargaDescarga', 'aderirseServicioPublico', 'requiereObstruirViaPublica',
  'ventaAlcohol', 'servicioRecoleccion', 'tipoSolicitante', 'tipoRepresentante', 'superficieDelPredio',
  'metrosAConstruir', 'supuestosConstruccion', 'ubicadoDentroFraccionamiento', 'ubicadoFueraFraccionamientoColonia',
  'desarrolloSuperiorMetrosAltura', 'concluidoObrasLicenciaDeConstruccion', 'cortesMayoresMetros', 'maquinariaPropiaConstruccion',
  'vehiculosCargaPesadaConstruccion', 'maniobrasCargaDescargaConstruccion', 'requiereAdherirseServicioPublicoConstruccion',
  'requiereObstruirViaPublicaConstruccion', 'requiereVentaAlcoholConstruccion']

const props = defineProps({
  tipoInteraccion: String,
  botones: {
    type: Array as () => string[], // Array de strings para los labels
    default: () => [],
  },
  tipoSubproceso: String,
  preguntaUsuario: String,
  labelInput : {
    type: String,
    required: false
  },
})
const useComponentDialogUsers  = ComponentDialogUsers()
const tipoInteraccion = ref(props.tipoInteraccion)
const tipoSubproceso = ref(props.tipoSubproceso)
const botones = ref(props.botones)
const labelInput = ref(props.labelInput)
const dimensiones = ref('')
const $q = useQuasar()
const useSubprocesos = Subprocesos()
const useUSerTree = userTree()
const rulesInput = ref(null)


const funcionesSubprocesos = ( respuesta: string ) => {
  tipoSubproceso.value === 'tipoSolicitante' ? procesoTipoSolicitante(respuesta) : null
  tipoSubproceso.value === 'tipoRepresentante' ? procesoTipoRepresentante(respuesta) : null
}

const handleClick = (respuesta: boolean) => {
  tipoSubproceso.value === 'demolicion' ? requiereDemolicion(respuesta) : null
  tipoSubproceso.value === 'lotificacion' ? requiereLotificacion(respuesta) : null
  tipoSubproceso.value === 'gravamen' ? requiereGravamen(respuesta) : null
  tipoSubproceso.value === 'demolicionAmpliacion' ? requiereDemolicionAmplicacion(respuesta) : null
  tipoSubproceso.value === 'maquinariaInstalacion' ? maquinariaPropiaInstalacion(respuesta) : null
  tipoSubproceso.value === 'vehiculoPesado' ? requiereVehiculosPesados(respuesta) : null
  tipoSubproceso.value === 'maniobraCargaDescarga' ? requiereManiobraCargaDescarga(respuesta) : null
  tipoSubproceso.value === 'aderirseServicioPublico' ? requiereAderirseServicioPublico(respuesta) : null
  tipoSubproceso.value === 'requiereObstruirViaPublica' ? requiereObstruirViaPublica(respuesta) : null
  tipoSubproceso.value === 'ventaAlcohol' ? requiereVentaAlcohol(respuesta) : null
  tipoSubproceso.value === 'servicioRecoleccion' ? requiereServicioResiduos(respuesta) : null
  tipoSubproceso.value === 'ubicadoDentroFraccionamiento' ? dentroDeFraccionamiento(respuesta): null
  tipoSubproceso.value === 'ubicadoFueraFraccionamientoColonia' ? fueraFraccionamientoColonia(respuesta) : null
  tipoSubproceso.value === 'desarrolloSuperiorMetrosAltura' ? desarrolloSuperiorMetrosAltura(respuesta) : null
  tipoSubproceso.value === 'concluidoObrasLicenciaDeConstruccion' ? concluidoObrasAutorizadasLicenciaDeConstruccion() : null
  tipoSubproceso.value === 'cortesMayoresMetros' ? cortesMayoresMetros(respuesta) : null
  tipoSubproceso.value === 'maquinariaPropiaConstruccion' ? maquinariaPropiaConstruccion(respuesta) : null
  tipoSubproceso.value === 'vehiculosCargaPesadaConstruccion' ? vehiculosCargaPesadaConstruccion(respuesta) : null
  tipoSubproceso.value === 'maniobrasCargaDescargaConstruccion' ? maniobrasCargaDescargaConstruccion(respuesta) : null
  tipoSubproceso.value === 'requiereAdherirseServicioPublicoConstruccion' ? requiereAdherirseServicioPublicoConstruccion(respuesta) : null
  tipoSubproceso.value === 'requiereObstruirViaPublicaConstruccion' ? requiereObstruirViaPublicaConstruccion(respuesta) : null
  tipoSubproceso.value === 'requiereVentaAlcoholConstruccion' ? requiereVentaAlcoholConstruccion(respuesta) : null

}


const funcionesInputs = () => {
  tipoSubproceso.value === 'dimensiones' ? dimensionesDemolicion() : null
  tipoSubproceso.value === 'superficieDelPredio' ? dimensionPredioSuperficie(): null
  tipoSubproceso.value === 'metrosAConstruir' ? metrosAConstruir() : null
}

const requiereDemolicion = async (respuesta:boolean) => {
  useSubprocesos.setRequiereDemolicion(respuesta)
  await SubProcesoDemolicion()
}

const requiereLotificacion = async (respuesta:boolean) => {
  useSubprocesos.setRequiereLotificacion(respuesta)
  await SubProcesoLotificacion()
}
const requiereGravamen = async (respuesta: boolean) => {
  useSubprocesos.setGravamen(respuesta)
  await SubProcesoGravamen()
}

const dimensionesDemolicion = async () => {
  if (dimensiones.value !== '' && !/[^0-9]/.test(dimensiones.value)) {
    useSubprocesos.setMedidaDemolicion(dimensiones.value)
    await SubProcesoDimensiones()
  }else{
    $q.notify({
      message: 'El campo del giro es obligatorio',
      timeout: 1300,
      color: 'red',
    })
  }
}

// Esto es de la modalidad de Ampliación

const requiereDemolicionAmplicacion = async (respuesta: boolean) => {
  useSubprocesos.setDemolicionAmpliacion(respuesta)
  await SubProcesoDemolicionAmpliacion()
}

const maquinariaPropiaInstalacion = async (respuesta: boolean) => {
  useSubprocesos.setMaquinariaPropiaInstalacion(respuesta)
  await SubProcesoMaquinariaInstalacion()
}

const requiereVehiculosPesados = async (respuesta:boolean) => {
  useSubprocesos.setRequiereVehiculosPesados(respuesta)
  await SubProcesoVehiculosPesados()
}

const requiereManiobraCargaDescarga = async (respuesta:boolean) => {
  useSubprocesos.setRequiereManiobraCargaDescarga(respuesta)
  await SubProcesoManiobrasCargaDescarga()
}

const requiereAderirseServicioPublico = async (respuesta:boolean) => {
  useSubprocesos.setRequiereAderirseServicioPublico(respuesta)
  await SubProcesoAderirseServicioPublico()
}

const requiereObstruirViaPublica = async (respuesta:boolean) => {
  useSubprocesos.setRequiereObstruirViaPublica(respuesta)
  await SubProcesoObstruccionViaPublica()
}

const requiereVentaAlcohol = async (respuesta:boolean) => {
  useSubprocesos.setRequiereVentaAlcohol(respuesta)
  await SubProcesoVentaAlcohol()
}

const requiereServicioResiduos = async (respuesta:boolean) => {
  useSubprocesos.setRequiereServicioResiduos(respuesta)
  await  SubProcesoServicioResiduos()
}

const procesoTipoSolicitante = async (respuesta:string) => {
  useSubprocesos.setTipoSolicitante(respuesta)
  await SubProcesoTipoSolicitante()
}

const procesoTipoRepresentante = async (respuesta:string) => {
  useSubprocesos.setTipoRepresentante(respuesta)
  await SubProcesoTipoRepresentante()
}


const dimensionPredioSuperficie = async () => {
  if(Number(dimensiones.value) > 0){
    useUSerTree.setDimensionSuperficiePredio(dimensiones.value)
    await SubprocesoSuperficiePredio()
    dimensiones.value = ''
  }
}

const metrosAConstruir = async () => {
  if(Number(dimensiones.value) > 0){
    useUSerTree.setMetrosAConstruir(dimensiones.value)
    await SubProcesoMetrosAConstruir()
    dimensiones.value = ''
  }
}

const dentroDeFraccionamiento = async (respuesta:string) => {
  useUSerTree.setUbicadoDentroFraccionamiento(respuesta)
  await SubProcesoUbicacionDentroFraccionamiento()
  dimensiones.value = ''
}

const fueraFraccionamientoColonia = async (respuesta) => {
  useUSerTree.setUbicadoFueraFraccionamientoColonia(respuesta)
  await SubProcesoFueraFraccionamientoColonia()
  dimensiones.value = ''
}

const desarrolloSuperiorMetrosAltura = async (respuesta) => {
  useUSerTree.setDesarrolloSuperiorMetrosAltura(respuesta)
  await SubProcesoDesarrolloSuperiorMetrosAltura()
}
const concluidoObrasAutorizadasLicenciaDeConstruccion = async (respuesta) => {
  useUSerTree.setConcluidoLicenciaDeConstruccion(respuesta)
  await SubProcesoConcluidoObrasLicenciaDeConstruccion()
}

const cortesMayoresMetros = async (respuesta:boolean) => {
  useUSerTree.setCortesMayoresMetors(respuesta)
  await SubProcesoCortesMayoresMetros()
}

const maquinariaPropiaConstruccion = async (respuesta:boolean) => {
  useSubprocesos.setMaquinariaPropiaConstruccion(respuesta)
  await SubProcesoMaquinariaPropiaConstruccion()
}

const vehiculosCargaPesadaConstruccion = async(respuesta:boolean) => {
  useSubprocesos.setRequiereVehiculoCargaPersadaConstruccion(respuesta)
  await SubProcesoVehiculosCargaPesadaConstruccion()
}

const maniobrasCargaDescargaConstruccion = async (respuesta:boolean) => {
  useSubprocesos.setRequiereManiobrasCargaDescargaConstruccion(respuesta)
  await SubProcesoManiobraCargaDescargaConstruccion()
}

const requiereAdherirseServicioPublicoConstruccion = async (respuesta:boolean) => {
  useSubprocesos.setRequiereAdherirseServicioPublicoConstruccion(respuesta)
  await SubProcesoAdherirseServicioPublicoConstruccion()
}

const requiereObstruirViaPublicaConstruccion = async (respuesta:boolean) => {
  useSubprocesos.setRequiereObstruirViaPublicaConstruccion(respuesta)
  await SubProcesoObstruccionViaPublicaConstruccion()
}

const requiereVentaAlcoholConstruccion = async (respuesta:boolean) => {
  useSubprocesos.setRequiereVentaDeAlcoholConstruccion(respuesta)
  await SubProcesoRequeriraVentaAlcoholConstruccion()
}

watch(() => props.tipoInteraccion, (newValue) => {
  tipoInteraccion.value = newValue
})

watch(() => props.tipoSubproceso, (newValue) => {
  tipoSubproceso.value = newValue
})

watch(() => props.botones, (newValue) => {
  botones.value = newValue
})

watch(() => props.labelInput, (newValue) => {
  labelInput.value = newValue
})


onMounted(() => {
  tipoInteraccion.value = props.tipoInteraccion
})
</script>

<style scoped>
.btnDialogo{
  font-family: Roboto, sans-serif;
}
</style>/
