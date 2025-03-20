<template>
  <div v-if="props.proceso === 'construcción'" class="flex column h-auto">
    <q-stepper
      flat
      bordered
      v-model="step"
      ref="stepper"
      active-color="light-blue-5"
      done-color="light-blue-5"
      alternative-labels
      :contracted="$q.screen.lt.md"
      :style="$q.screen.lt.sm ? {maxHeight: '400px', maxWidth: '300px', fontFamily: ['Roboto', 'sans-serif']} : {maxHeight: '100%', maxWidth: '100%',fontFamily: ['Roboto', 'sans-serif']}"
      class="fixed-stepper"
    >
      <!--        STEPPER NUMERO 1      -->
      <q-step class="q-mt-md"
        :name="1"
        title="Seleccionar modalidad"
        :done="step > 1"
        active-icon="construction"
        :color="'light-blue-5'"
        style="font-family: Roboto, sans-serif"
      >
        <div
          style="
            display: flex;
            flex-direction: column;
            gap: 8px;
          "
        >
          <div
            :style="
              $q.screen.lt.sm
                ? {
                    display: 'flex',
                    gap: '70px',
                    width: '100%',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                  }
                : { display: 'none' }
            "
          >
            <div>
              {{ preguntaUsuarioDialogo }}
            </div>
            <q-icon
              name="help"
              style="cursor: pointer"
              @click="botonAyuda('modalidad')"
            />
          </div>

          <DialogoMensajesMobile
            :model-value="modelValueDialogoMesagesModalidad"
            message="En este apartado se debe se seleccionar una modalidad
    Obra Nueva: Para proyectos de construcción que comienzan desde cero. `
    Ampliación: Para la solicitud de permisos o modificaciones en un proyecto existente.
    Regularización: Para la formalización de obras ya ejecutadas que necesitan ser ajustadas a las normativas vigentes."
          />

          <!--  Seleccion de modalidad  -->
          <DialogoSeleccionModalidad class="q-mt-md"
            :model-value="true"
            :tipo-proceso="tipoProcesoDialogo"
            :pregunta-usuario="preguntaUsuarioDialogo"
            :botones="btnsDialogoUsuarios"
          />
        </div>
      </q-step>

      <!--      STEPPER NUMERO 2 GIRO-->
      <q-step class="q-mt-md"
        :name="2"
        title="Seleccionar giro"
        icon="tune"
        :done="step > 2"
        style="display: flex; flex-direction: column"
      >
        <div
          :style="
            $q.screen.lt.sm
              ? {
                  display: 'flex',
                  gap: '15px',
                  width: '100%',
                  justifyContent: 'space-between',
                  marginBottom: '15px',
                }
              : { display: 'none' }
          "
        >
          <div>Favor de seleccionar un giro</div>

          <q-icon
            name="help"
            style="margin-top: 2.5px; cursor: pointer"
            @click="botonAyuda('giro')"
          />
        </div>
        <div
          :style="
            $q.screen.lt.sm
              ? { display: 'flex', flexDirection: 'column' }
              : {
                  display: 'flex',
                  flexDirection: 'column',
                  width: '100%',
                  justifyContent: 'center',
                  alignItems: 'center',
                }
          "
        >
          <q-select
            v-model="valorSelect"
            :color="'light-blue-5'"
            :options="useUserTree.giros"
            option-label="label"
            option-value="clave_giro"
            transition-show="scale"
            transition-hide="scale"
            label="Seleccionar giro"
            :style="
              $q.screen.lt.sm
                ? { minWidth: '250px', maxWidth: '350px', fontFamily:['Roboto', 'sans-serif'] }
                : { minWidth: '300px', maxWidth: '350px', fontFamily:['Roboto', 'sans-serif'] }
            "
            :popup-content-style="
              $q.screen.lt.sm ? { width: '100%', fontFamily:['Roboto', 'sans-serif'] } : { width: '200px', fontFamily:['Roboto', 'sans-serif']  }
            "
            @update:model-value="GiroSeleccionado(valorSelect)"
          />
          <DialogoMensajesMobile
            :model-value="modelValueDialogoMessagesGiros"
            message="En este apartado, se deberá seleccionar el giro que se planea llevar a cabo en la sección elegida. Esta selección es fundamental para definir qué tipos de construcciones y usos del suelo son viables en esta ubicación. Se determinará si la actividad es: Permitido, Condicionado o Prohibido."
          />
        </div>
        <q-stepper-navigation class="q-mt-lg"
          style="
            display: flex;
            flex-direction: row;
            justify-content: end;
            gap: 8px;
          "
        >
          <!--<q-btn
            outline
            @click="
              () => {
                useComponenteArboles.setComponenteStepper(useComponenteArboles.componentStepper - 1);
                useComponentDialogUsers.reset();
              }
            "
            color="light-blue-5"
            no-caps
            label="Regresar"
            class="q-ml-sm"
            style="font-family: 'Roboto', sans-serif;"
          /> --->
          <q-btn
            @click="
              () => {
                if (useUserTree.modalidad !== '') {
                  if (valorSelect !== '' && valorSelect.compatibilidad !== 'PROHIBIDO' ) {
                    useUserTree.modalidad === 'regularización'
                      ? useComponenteArboles.setComponenteStepper(useComponenteArboles.componentStepper + 1)
                      : useComponenteArboles.setComponenteStepper(useComponenteArboles.componentStepper + 1);
                  } else {
                    if (valorSelect.compatibilidad === 'PROHIBIDO') {
                      $q.notify({
                        message: 'El giro seleccionado no esta permitido.',
                        timeout: 1300,
                        color: 'red',
                      });
                    } else {
                      $q.notify({
                        message: 'El campo del giro es obligatorio.',
                        timeout: 1300,
                        color: 'red',
                      });
                    }
                }
                } else {
                  useComponenteArboles.setComponenteStepper(
                    useComponenteArboles.componentStepper + 1
                  );
                }
              }
            "
            no-caps
            color="light-blue-5"
            :style="
              $q.screen.lt.sm
                ? { fontFamily:['Roboto', 'sans-serif'], fontWeight: 'bold' }
                : { marginRight: '250px', fontFamily:['Roboto', 'sans-serif'], fontWeight: 'bold' }
            "
            label="Continuar"
          />

        </q-stepper-navigation>
      </q-step>

      <q-step
        :name="3"
        title="Clasificación del solicitante"
        icon="group"
        :done="step > 3"
        >
         <div
          style="
            display: flex;
            flex-direction: column;
            gap: 8px;
          "
        >
        <div
          v-if="!componenteCardSuccess"
          :style="
              $q.screen.lt.sm
                ? {
                    display: 'flex',
                    gap: '70px',
                    width: '100%',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                  }
                : { display: 'none' }
            "
        >
        </div>

        <PreguntasUsuario
          :model-value="true"
          :tipo-subproceso="tipoProcesoDialogo"
          :pregunta-usuario="preguntaUsuarioDialogo"
          :botones="btnsDialogoUsuarios"
          :tipo-interaccion="tipoInteraccion"
          :label-input="labelInput"
        />
          </div>
      </q-step>

      <!--   STEPPER NUMERO 3 -->
      <q-step
        :name="4"
        title="Complementa tu proyecto"
        icon="settings"
        :done="step > 4"
        style="display: flex; flex-direction: column"
      >

        <div
          style="
            display: flex;
            flex-direction: column;
            gap: 8px;
          "
        >
          <div v-if="!componenteCardSuccess"
            :style="
              $q.screen.lt.sm
                ? {
                    display: 'flex',
                    gap: '15px',
                    justifyContent: 'end',
                    alignItems: 'end',
                    marginBottom: '10px',
                  }
                : { display: 'none' }
            "
          >
            <q-icon
              name="help"
              style="cursor: pointer"
              @click="botonAyuda('modalidad')"
            />
          </div>

          <DialogoMensajesMobile
            :model-value="modelValueDialogoMesagesModalidad"
            message="Las preguntas a continuación ayudarán a definir los trámites necesarios para la modalidad.
"
          />
        </div>
        <!-- Dialogo Preguntas para el usuario Step 3  -->
        <div
          v-if="!componenteCardSuccess"
          :style="
            $q.screen.lt.sm
              ? { display: 'flex', justifyContent: 'center' }
              : { maxWidth: '100%', display: 'flex', justifyContent: 'center' }
          "
        >
          <PreguntasUsuario
            :model-value="true"
            :tipo-subproceso="tipoProcesoDialogo"
            :pregunta-usuario="preguntaUsuarioDialogo"
            :botones="btnsDialogoUsuarios"
            :tipo-interaccion="tipoInteraccion"
            :label-input="labelInput"
          />
        </div>
        <div v-else>
          <CardSuccess :mensaje="mensajeCard" />
        </div>

        <q-stepper-navigation
          v-if="modelValueAccionesStepper"
          style="
            display: flex;
            flex-direction: row;
            justify-content: end;
            gap: 8px;

          "
        >
          <q-btn
            @click="
              useComponenteArboles.setComponenteStepper(
                useComponenteArboles.componentStepper + 1
              )
            "
            no-caps
            color="light-blue-5"
            label="Continuar"
            style="font-family: Roboto, sans-serif; margin-top: -30px; margin-right: 10px"
          />
        </q-stepper-navigation>
      </q-step>

      <q-step
        :name="5"
        title="Trámites"
        icon="check"
        active-icon="check"
        :done="step > 5"
        style="display: flex; flex-direction: column"
      >
        <div :style="!$q.screen.lt.sm ? {width: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center'}: {}">
          <div :style="!$q.screen.lt.sm ? {width: '80%'}: {}">
            <q-card flat style="min-width: 100%; display: flex; justify-content: center;">
              <q-icon class="q-mt-sm" name="check_circle_outline" size="90px" style="color: #3cbae8" />
            </q-card>
            <p class="q-mt-md" style="font-size: 16.5px; font-family: Roboto, sans-serif; display: flex; justify-content: center;">
             Proceso finalizado
            </p>
          </div>
        </div>
        <TramitesFinales :model-value="modelvalueTramitesFinales" />

        <q-stepper-navigation
          style="
            display: flex;
            flex-direction: row;
            justify-content: end;
            gap: 8px;
            margin-top: -10px;
          "
        >
          <q-btn
            @click="useComponenteArboles.setComponenteTramitesFinales(true)"
            no-caps
            color="light-blue-5"
            label="Ver tramites"
            style="font-family: Roboto, sans-serif"
          />
        </q-stepper-navigation>
      </q-step>
    </q-stepper>
    <div class="max-width flex justify-end">
      <q-btn
        style="margin-top: 15px; font-family: Roboto, sans-serif; background: #757575; color: white"
        label="Cerrar"
        @click="closeDialog"
        no-caps
      />
      <q-btn
        style="margin-top: 15px; font-family: Roboto, sans-serif; background: #29b6f6; color: white"
        class="q-ml-sm"
        label="Regresar proceso"
        @click="btnRegresar()"
        no-caps
      />
    </div>
  </div>

  <!--   Para el otro tipo de proceso   -->
  <div v-else>
    <q-stepper
      flat bordered
      v-model="step"
      ref="stepper"
      active-color="light-blue-5"
      done-color="light-blue-5"
      alternative-labels
      :contracted="$q.screen.lt.sm"
      :style="$q.screen.lt.sm ? {maxHeight: '400px', maxWidth: '300px', fontFamily: ['Roboto', 'sans-serif']} : {maxHeight: '100%', maxWidth: '100%',fontFamily: ['Roboto', 'sans-serif']}"
      class="fixed-stepper"
    >
      <q-step
        :name="1"
        title="Clasificación del solicitante"
        active-icon="group"
        :done="step > 1"
        :header-nav="step > 1"
      >
        <div
          v-if="!componenteCardSuccess"
          :style="
            $q.screen.lt.sm
              ? { display: 'flex', justifyContent: 'center' }
              : { maxWidth: '100%', display: 'flex', justifyContent: 'center' }
          "
        >
          <PreguntasUsuario
            tipo-interaccion="seleccion"
            :botones="btnsDialogoUsuarios"
            :tipo-subproceso="tipoProcesoDialogo"
            :pregunta-usuario="preguntaUsuarioDialogo"
          />
        </div>

        <q-stepper-navigation
          v-if="modelValueAccionesStepper"
          style="
            display: flex;
            flex-direction: row;
            justify-content: end;
            gap: 8px;
          "
        >
          <q-btn
            @click="
              useComponenteArboles.setComponenteStepper(
                useComponenteArboles.componentStepper + 1
              )
            "
            no-caps
            style="font-family: Roboto, sans-serif; margin-top: -30px; margin-right: 10px"
            color="light-blue-5"
            label="Continuar"
          />
        </q-stepper-navigation>
      </q-step>

      <q-step
        :name="2"
        title="Complementa tu proyecto"
        icon="settings"
        :done="step > 2"
        :header-nav="step > 2"
      >
        <div
          style="
            display: flex;
            flex-direction: column;
            min-width: 250px;
            gap: 8px;
          "
        >
          <div v-if="!componenteCardSuccess"
            :style="
              $q.screen.lt.sm
                ? {
                    display: 'flex',
                    gap: '15px',
                    width: '100%',
                    justifyContent: 'end',
                    alignItems: 'end',
                    marginBottom: '10px',
                  }
                : { display: 'none' }
            "
          >
            <q-icon
              name="help"
              style="cursor: pointer"
              @click="botonAyuda('modalidad')"
            />
          </div>

          <DialogoMensajesMobile
            :model-value="modelValueDialogoMesagesModalidad"
            message="Las preguntas a continuación ayudarán a definir los trámites necesarios para la instalación.
"
          />
        </div>
        <div
          v-if="!componenteCardSuccess"
          :style="
            $q.screen.lt.sm
              ? { display: 'flex', justifyContent: 'center' }
              : { maxWidth: '100%', display: 'flex', justifyContent: 'center' }
          "
        >
          <PreguntasUsuario
            tipo-interaccion="seleccion"
            :botones="btnsDialogoUsuarios"
            :tipo-subproceso="tipoProcesoDialogo"
            :pregunta-usuario="preguntaUsuarioDialogo"
          />
        </div>

        <div v-else>
          <CardSuccess :mensaje="mensajeCard" />
        </div>
        <q-stepper-navigation
          v-if="modelValueAccionesStepper"
          style="
            display: flex;
            flex-direction: row;
            justify-content: end;
            gap: 8px;
          "
        >
          <q-btn
            @click="
              useComponenteArboles.setComponenteStepper(
                useComponenteArboles.componentStepper + 1
              )
            "
            no-caps
            color="light-blue-5"
            label="Continuar"
             style="font-family: Roboto, sans-serif; margin-top: -30px; margin-right: 10px"
          />
        </q-stepper-navigation>
      </q-step>

      <q-step
        :name="3"
        title="Trámites"
        icon="check"
        active-icon="check"
        :done="step > 3"
        :header-nav="step > 3"
      >
         <div :style="!$q.screen.lt.sm ? {width: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center'}: {}">
          <div :style="!$q.screen.lt.sm ? {width: '80%'}: {}">
            <q-card flat style="min-width: 100%; display: flex; justify-content: center;">
              <q-icon class="q-mt-sm" name="check_circle_outline" size="90px" style="color: #3cbae8" />
            </q-card>
            <p class="q-mt-md" style="font-size: 16.5px; font-family: Roboto, sans-serif; display: flex; justify-content: center;">
             Proceso finalizado
            </p>
          </div>
        </div>
        <TramitesFinales :model-value="modelvalueTramitesFinales" />

        <q-stepper-navigation
          style="
            display: flex;
            flex-direction: row;
            justify-content: end;
            gap: 8px;
            margin-top: -10px;
          "
        >
          <q-btn
            @click="useComponenteArboles.setComponenteTramitesFinales(true)"
            style="font-family: Roboto, sans-serif"
            no-caps
            color="light-blue-5"
            label="Ver trámites"
          />
        </q-stepper-navigation>
      </q-step>
    </q-stepper>
    <div class="max-width flex justify-end">
      <q-btn
        style="margin-top: 15px; font-family: Roboto, sans-serif; background: #757575; color: white"
        label="Cerrar"
        @click="closeDialog"
        no-caps
      />
      <q-btn
        style="margin-top: 15px; font-family: Roboto, sans-serif; background: #29b6f6; color: white"
        class="q-ml-sm"
        label="Regresar proceso"
        @click="btnRegresar()"
        no-caps
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, watch } from 'vue';
import { ComponentesArboles } from 'stores/componentes-arboles';
import { userTree } from 'stores/arboles';
import { RespuestaMatriz } from 'src/utils-arboles/interface';
import {
  SubProcesoInstalacion,
  SubProcesoUsoSuelo,
} from 'src/utils-arboles/SubProcesos';
import { ComponentDialogUsers } from 'stores/component-dialog-users';
import { Subprocesos } from 'stores/subprocesos';
import { VerificacionSupuestosConstruccion } from 'src/utils-arboles/SubProcesosInput';

// importación componentes
import CardSuccess from 'components/Arboles/CardSuccess.vue';
import DialogoSeleccionModalidad from 'components/Arboles/Dialogos/DialogoSeleccionModalidad.vue';
import DialogoMensajesMobile from 'components/Arboles/Dialogos/DialogoMensajesMobile.vue';
import TramitesFinales from 'components/Arboles/TramitesFinales.vue';
import PreguntasUsuario from 'components/Arboles/Dialogos/PreguntasUsuario.vue';
import { PeticionRequisitosPersonaliza, RequisitosGiro } from 'src/utils-arboles/RequisitosGiro';
import UbicaPredioGiro from 'src/utils-arboles/UbicaPredioGiro';

const props = defineProps({
  modelValue: Number,
  proceso: String,
});

// Componente
const emmit = defineEmits(['update:modelValue']);
const proceso = ref(props.proceso);
const useUserTree = userTree();
const valorSelect = ref('');
const useComponenteArboles = ComponentesArboles();
const useComponentDialogUsers = ComponentDialogUsers();
const step = ref(useComponenteArboles.componentStepper);
const useSubprocesos = Subprocesos();

// Models Value
const modelValueDialogoMesagesModalidad = ref(
  useComponenteArboles.componentDialogMessage
);
const modelValueDialogoMessagesGiros = ref(
  useComponenteArboles.componentDialogMessage
);
const modelValueAccionesStepper = ref(
  useComponenteArboles.componentBtnContinuarStepper
);
const modelvalueTramitesFinales = ref(
  useComponenteArboles.componentTramitesFinales
);

// Dialogo preguntas al usuario
const seccionDialogo = ref('');

const tipoProcesoDialogo = ref(useComponentDialogUsers.tipoProceso);
const preguntaUsuarioDialogo = ref(useComponentDialogUsers.preguntaUsuario);
const btnsDialogoUsuarios = ref(useComponentDialogUsers.btns);
const mensajeCard = ref(useUserTree.mensajeSuccessCard);
const componenteCardSuccess = ref(useComponenteArboles.componentCardSuccess);
const tipoInteraccion = ref(useComponentDialogUsers.tipoInteraccion);
const labelInput = ref(useComponentDialogUsers.label);
const useComponentesArboles = ComponentesArboles()

// Botones
const botonAyuda = (seccion: string) => {
  seccionDialogo.value = seccion;
  useComponenteArboles.setComponenteDialogMessage(true);
};

const btnRegresar = () => {
  useComponenteArboles.reset();
  valorSelect.value = '';
  useComponenteArboles.setComponenteDialogoProceso(true);
  useComponenteArboles.setComponenteStepper(0);
  useUserTree.setModalidadSeleccionada('');
  useComponentDialogUsers.reset();
  useComponentDialogUsers.setTipoInteraccion('seleccion')
  useComponenteArboles.setComponenteCardSuccess(false);
  useUserTree.regresar();
  useSubprocesos.reset();
};

const closeDialog = () => {
  valorSelect.value = '';
  useComponenteArboles.reset();
  useComponentesArboles.setComponenteDialogoProceso(true)
  useComponentesArboles.setComponenteDialogoUsuario(false)
  useComponentesArboles.setComponenteStepper(0)
  useComponentesArboles.setCapaResaltada(!useComponentesArboles.capaResaltada)
  useComponenteArboles.setComponenteDialogoProceso(true)
  useUserTree.reset()
  useComponentesArboles.setComponenteCardSuccess(false)
  useUserTree.setModalidadSeleccionada('')
  useComponentDialogUsers.reset()
  useSubprocesos.reset();
}

// Funcion desubproceso
const GiroSeleccionado = async (cve_giro: RespuestaMatriz) => {
  useComponenteArboles.componentTramites ? useComponenteArboles.setComponenteTramites(false) : null;
  useComponenteArboles.componentDemolicion ? useComponenteArboles.setComponenteDemolicion(false) : null;
  if (cve_giro !== undefined || cve_giro !== null) {
    useUserTree.setGiroSeleccionado(cve_giro);
    useComponentDialogUsers.setTipoInteraccion('seleccion')
    await SubProcesoUsoSuelo();
    await RequisitosGiro()
    await UbicaPredioGiro()

  }
};

watch(
  () => useComponenteArboles.componentTramitesFinales,
  (newValue) => {
    modelvalueTramitesFinales.value = newValue;
  }
);
// Watch
watch(
  () => useComponenteArboles.componentDialogMessage,
  (newValue) => {
    seccionDialogo.value === 'modalidad'
      ? (modelValueDialogoMesagesModalidad.value = newValue)
      : null;
    seccionDialogo.value === 'giro'
      ? (modelValueDialogoMessagesGiros.value = newValue)
      : null;
  }
);

watch(
  () => useComponentDialogUsers.tipoInteraccion,
  (newValue) => {
    tipoInteraccion.value = newValue;
  }
);

watch(
  () => useComponentDialogUsers.label,
  (newValue) => {
    labelInput.value = newValue;
  }
);

// Watch de los subprocesos

/* useComponentDialogUsers.setTipoProceso('demolicion')
    useComponentDialogUsers.setPreguntaUsuario('¿Requiere llevar a cabo una demolición?')
    useComponentDialogUsers.setBtns([{ label:'No', color: 'grey-7' },
      {label:'Si', color: 'primary' },])
useComponenteArboles.setComponenteBtnContinuarStepper(false)
    useComponenteArboles.setComponenteTipoSolicitante(true)
 */

watch(
  () => useUserTree.modalidad,
  (newValue) => {
    if (newValue === 'obra nueva') {
      useComponenteArboles.setComponenteBtnContinuarStepper(false);
      useComponenteArboles.setComponenteTipoSolicitante(true);
    }
    if (newValue === 'ampliación') {
      useUserTree.setMensajesSuccessCard(
        'En esta modalidad, no es necesario seleccionar un giro. Continuar con el proceso.'
      );
      useComponenteArboles.setComponenteBtnContinuarStepper(false);
      useComponenteArboles.setComponenteTipoSolicitante(true);
    }
    if (newValue === 'regularización') {

      console.log('regularizacin')
      useUserTree.setMensajesSuccessCard(
        'En esta modalidad, no es necesario seleccionar un giro. Continuar con el proceso.'
      );
      useComponenteArboles.setComponenteBtnContinuarStepper(false);
      useComponenteArboles.setComponenteTipoSolicitante(true);
    }
  }
);

watch(
  () => useComponenteArboles.componentLotificacion,
  (newValue) => {
    useComponentDialogUsers.setTipoProceso('lotificacion');
    useComponentDialogUsers.setPreguntaUsuario(
      '¿Es necesario implementar un régimen de lotificación para el proyecto?'
    );
  }
);

watch(
  () => useComponenteArboles.componentGravamen,
  (newValue) => {
    useComponentDialogUsers.setTipoProceso('gravamen');
    useComponentDialogUsers.setPreguntaUsuario(
      '¿El inmueble se encuentra afectado por algún gravamen?'
    );
  }
);

watch(
  () => useComponenteArboles.componentDimensiones,
  (newValue) => {
    useComponentDialogUsers.setTipoProceso('dimensiones');
    useComponentDialogUsers.setPreguntaUsuario(
      '¿Cuál es la dimensión total de la demolición que se debe llevar a cabo?'
    );
    useComponentDialogUsers.setBtns([{ label: 'Continuar', color: 'light-blue-5' }]);
    useComponentDialogUsers.setLabels('Ingresar dimesiones (m²)');
  }
);

watch(
  () => useComponenteArboles.componentVehiculosPesados,
  (newValue) => {
    useComponentDialogUsers.setTipoProceso('vehiculoPesado');
    useComponentDialogUsers.setPreguntaUsuario(
      '¿Es necesario utilizar vehículos de carga pesada para la instalación del proyecto?'
    );
  }
);

watch(
  () => useComponenteArboles.componentManiobraCargaDescarga,
  (newValue) => {
    useComponentDialogUsers.setTipoProceso('maniobraCargaDescarga');
    useComponentDialogUsers.setPreguntaUsuario(
      '¿Se requerirá llevar a cabo maniobras de carga y descarga como parte del proceso de instalación?'
    );
  }
);

watch(
  () => useComponenteArboles.componentAderirseServicioPublicoInstalacion,
  (newValue) => {
    useComponentDialogUsers.setTipoProceso('aderirseServicioPublico');
    useComponentDialogUsers.setPreguntaUsuario(
      '¿Se debe integrar la instalación con una red de servicio público como parte del proceso de obras?'
    );
  }
);

watch(
  () => useComponenteArboles.componentObstruirViaPublica,
  (newValue) => {
    useComponentDialogUsers.setTipoProceso('requiereObstruirViaPublica');
    useComponentDialogUsers.setPreguntaUsuario(
      '¿Durante la realización de las obras de instalación será necesario obstruir la vía pública?'
    );
  }
);

watch(
  () => useComponenteArboles.componentVentaAlcohol,
  (newValue) => {
    useComponentDialogUsers.setTipoProceso('ventaAlcohol');
    useComponentDialogUsers.setPreguntaUsuario('¿Requerirá venta de alcohol?');
  }
);

watch(
  () => useComponenteArboles.componentServiciosRecoleccion,
  (newValue) => {
    useComponentDialogUsers.setTipoProceso('servicioRecoleccion');
    useComponentDialogUsers.setPreguntaUsuario(
      '¿Solicitiará servicio de recolección de residuos?'
    );
  }
);

watch(
  () => useComponenteArboles.componentTipoSolicitante,
  (newValue) => {
    useComponentDialogUsers.setTipoProceso('tipoSolicitante');
    useComponentDialogUsers.setPreguntaUsuario(
      'Seleccione el tipo de persona'
    );
    useComponentDialogUsers.setBtns([
      {
        label: 'Persona física',
        color: 'light-blue-5',
      },
      {
        label: 'Persona moral',
        color: 'light-blue-5',
      },
    ]);
  }
);

watch(
  () => useComponenteArboles.componentTipoRepresentante,
  (newValue) => {
    useComponentDialogUsers.setTipoProceso('tipoRepresentante');
    useComponentDialogUsers.setPreguntaUsuario('¿Quién realiza el trámite?');
    useComponentDialogUsers.setBtns([
      {
        label: 'Propietario',
        color: 'light-blue-5',
      },
      {
        label: 'Representante legal',
        color: 'light-blue-5',
      },
      {
        label: 'Fiduciaria',
        color: 'light-blue-5',
      },
    ]);
  }
);

watch(() => useComponenteArboles.componentMetrosAConstruir, (newValue) => {
  useComponentDialogUsers.setTipoInteraccion('input')
  useComponentDialogUsers.setTipoProceso('metrosAConstruir');
  useUserTree.modalidad === 'obra nueva' || useUserTree.modalidad === 'ampliación' || useUserTree.modalidad === 'regularización' ? useComponentDialogUsers.setPreguntaUsuario('Por favor, proporcione el tamaño de su construcción en metros cuadrados (m²).') : null
  useComponentDialogUsers.setBtns([
    {
      label: 'Continuar',
      color: 'light-blue-5',
    }
  ])
})

watch(() => useComponenteArboles.componentSupuestosConstruccion, async (newValue) => {
  await VerificacionSupuestosConstruccion()
  useComponentDialogUsers.setTipoInteraccion('seleccion')
  useComponentDialogUsers.setTipoProceso('demolicion');
  useComponentDialogUsers.setPreguntaUsuario('¿Se debe efectuar una demolición como parte del proceso de instalación del proyecto?');
  useComponentDialogUsers.setBtns([
    {
      label: 'No',
      color: 'light-blue-5',
      outLine:true
    },
    {
      label: 'Si',
      color: 'light-blue-5',
      outLine:false
    }
  ])
})

watch(() => useComponentesArboles.componentUbicadoFueraFraccionamientoColonia, async() => {
  useComponentDialogUsers.setTipoProceso('ubicadoFueraFraccionamientoColonia');
  useComponentDialogUsers.setPreguntaUsuario('¿El predio se encuentra ubicado fuera de un fraccionamiento o colonia?');
})

watch(() => useComponentesArboles.componentSuperficieDelPredio, async() => {
  useComponentDialogUsers.setTipoInteraccion('input')
  useComponentDialogUsers.setTipoProceso('superficieDelPredio')
  useComponentDialogUsers.setPreguntaUsuario('¿Qué superficie tiene el predio en metros cuadrados (m²), tal como se detalla en la escritura?')
  useComponentDialogUsers.setBtns([
    {
      label:'Continuar',
      color: 'light-blue-5',
      outLine:false
    }
  ])
})

watch(() => useComponentesArboles.componentDemolicionAmpliacion, () => {
  useComponentDialogUsers.setTipoProceso('demolicionAmpliacion')
  useComponentDialogUsers.setPreguntaUsuario('¿Se debe efectuar una demolición como parte del proceso de instalación del proyecto?')
  useComponentDialogUsers.setBtns([{ label:'No', color: 'light-blue-5', outLine: true },
    {label:'Si', color: 'light-blue-5', outLine: false },])
})

watch(() => useComponentesArboles.componentRegularizacion, () => {
  useSubprocesos.setNombresTramites('Proyecto ejecutivo arquitectónico o Licencia de construcción')
  useSubprocesos.setNombresTramites('Licencia de uso de edificación')
  useComponenteArboles.setComponenteBtnContinuarStepper(true)
  useComponenteArboles.setComponenteCardSuccess(true)
  useUserTree.setMensajesSuccessCard('Preguntas completadas')
})

watch(() => useComponentesArboles.componentDesarrolloSuperiorMetrosAltura, () => {
  useComponentDialogUsers.setTipoInteraccion('seleccion')
  useComponentDialogUsers.setTipoProceso('desarrolloSuperiorMetrosAltura')
  useComponentDialogUsers.setPreguntaUsuario('¿Alguno(s) de los niveles del desarrollo es superior a 4 m de altura?')
  useComponentDialogUsers.setBtns([{ label:'No', color: 'light-blue-5', outLine: true },
    {label:'Si', color: 'light-blue-5', outLine: false },])
})

watch(() => useComponentesArboles.componentConcluidoLicenciaDeConstruccion, () => {
  useComponentDialogUsers.setTipoProceso('concluidoObrasLicenciaDeConstruccion')
  useComponentDialogUsers.setPreguntaUsuario('¿Se han concluido las obras autorizadas en la licencia de construcción y conforme al proyecto?')
})

watch(() => useComponenteArboles.componentCortesMayoresMetros, () => {
  useComponentDialogUsers.setTipoProceso('cortesMayoresMetros')
  useComponentDialogUsers.setPreguntaUsuario('¿El proyecto a realizar cuenta con cortes de construcción mayores a 3m?')
})

watch(() => useComponentesArboles.componentMaquinariaPropiaConstruccion, () => {
  useComponentDialogUsers.setTipoProceso('maquinariaPropiaConstruccion')
  useComponentDialogUsers.setPreguntaUsuario('¿Cuenta con maquinaria propia para la instalación de su proyecto?')
})

watch(() => useComponentesArboles.componentVehiculosPesadosConstruccion, () => {
  useComponentDialogUsers.setTipoProceso('vehiculosCargaPesadaConstruccion')
  useComponentDialogUsers.setPreguntaUsuario('¿La construcción de su proyecto requiere utilizar vehículos de carga pesada?')
})

watch(() => useComponentesArboles.componentManiobraCargaDescargaConstruccion, () => {
  useComponentDialogUsers.setTipoProceso('maniobrasCargaDescargaConstruccion')
  useComponentDialogUsers.setPreguntaUsuario('¿Para las obras de construcción se realizarán maniobras de carga y descarga?')
})

watch(() => useComponentesArboles.componentRequiereAdherirseServicioPublicoConstruccion, () => {
  useComponentDialogUsers.setTipoProceso('requiereAdherirseServicioPublicoConstruccion')
  useComponentDialogUsers.setPreguntaUsuario('¿Al realizar la construcción, requiere adherirse a una red de servicio público?')
})

watch(() => useComponenteArboles.componentRequiereObstruirViaPublicaConstruccion, () => {
  useComponentDialogUsers.setTipoProceso('requiereObstruirViaPublicaConstruccion')
  useComponentDialogUsers.setPreguntaUsuario('¿Al realizar las obras de construcción requerirá obstruir la vía publica?')
})

watch(() => useComponenteArboles.componentRequiereVentaAlcoholConstruccion, () => {
  useComponentDialogUsers.setTipoProceso('requiereVentaAlcoholConstruccion')
  useComponentDialogUsers.setPreguntaUsuario('¿Requerirá venta de alcohol?')
})

// #########################################################################################################
watch(
  () => useUserTree.mensajeSuccessCard,
  (newValue) => {
    mensajeCard.value = newValue;
  }
);

watch(
  () => useComponenteArboles.componentCardSuccess,
  (newValue) => {
    componenteCardSuccess.value = newValue;
  }
);

// Watchs de las varibles del DialogoPreguntaUsuarios

watch(
  () => useComponentDialogUsers.tipoProceso,
  (newValue) => {
    useComponentDialogUsers.setTipoProceso(newValue);
    tipoProcesoDialogo.value = useComponentDialogUsers.tipoProceso;
  }
);

watch(
  () => useComponentDialogUsers.preguntaUsuario,
  (newValue) => {
    preguntaUsuarioDialogo.value = newValue;
  }
);

watch(
  () => useComponentDialogUsers.btns,
  (newValue) => {
    btnsDialogoUsuarios.value = newValue;
  }
);

watch(
  () => useComponenteArboles.componentBtnContinuarStepper,
  (newValue) => {
    modelValueAccionesStepper.value = newValue;
  }
);

/// ###########################################################################

watch(
  () => useUserTree.tipoProcesoDialogo, (newValue) => {
    tipoProcesoDialogo.value = newValue;
  }
);

watch(() => props.modelValue, (newValue) => {
    step.value = newValue;
  }
);

watch(() => props.proceso, (newValue) => {

  if (newValue === 'instalación') {
    proceso.value = newValue;
    SubProcesoInstalacion();
    // await PeticionRequisitosPersonaliza()
    useComponenteArboles.setComponenteTipoSolicitante(true);
  }
  if (newValue === 'construcción') {
    proceso.value = newValue;
    useComponentDialogUsers.setTipoProceso('modalidad');
    useComponentDialogUsers.setBtns([
      'Obra nueva',
      'Ampliación',
      'Regularización',
    ]);
      useComponentDialogUsers.setPreguntaUsuario('Seleccione una modalidad');
  }
}
);

watch(
  (step,
  (newValue) => {
    emmit('update:modelValue', newValue);
  })
);

onMounted(() => {
  step.value = props.modelValue;
});
</script>
<style scoped>
.fixed-stepper {
  width: 1000px;
  height: 350px;
  max-width: 100%;
  margin: 0 auto;
}

.fixed-stepper .q-step {
  min-height: 200px;
}
</style>/
