<template>
  <q-dialog
    :maximized="visible"
    :model-value="visible"
    @update:modelValue="updateVisible"
  >
    <q-card>
      <q-card-section
        v-if="skeletone"
        class="q-pa-sm"
        style="
          display: flex;
          flex-direction: column;
          gap: 15px;
          min-width: 400px;
        "
      >
        <q-skeleton
          v-for="i in 10"
          :key="i"
          type="QToolbar"
          style="height: 3.3rem"
        />
      </q-card-section>

      <q-card-section v-else style="height: 100%">
        <q-card-section
          class="q-mt-lg"
          style="
            display: flex;
            flex-direction: row;
            justify-content: space-between;
            align-items: center;
            height: 1.8rem;
            border-bottom: 0.5px solid black;
            margin-right: 25px;
            margin-left: 25px;
          "
        >
          <div class="q-mb-lg">
            <p
              style="
                font-family: Roboto, sans-serif;
                font-size: 1.5rem;
                margin-top: 10px;
                margin-left: -15px;
              "
            >
              Trámites necesarios
            </p>
          </div>
          <q-separator />
          <div>
            <q-btn
              style="margin-top: -40px; margin-right: -10px"
              icon="close"
              @click="useComponenteArboles.setComponenteTramitesFinales(false)"
              flat
              round
              dense
            />
          </div>
        </q-card-section>

        <q-card-section
          style="display: flex; flex-direction: column; gap: 15px; height: 100%"
        >
          <div class="q-mt-lg flex justify-end" v-if="false">
            <q-btn
              label="Descargar"
              style="
                color: white;
                background: #3cbae8;
                margin-top: -20px;
                margin-right: 10px;
                font-size: 15px;
              "
              icon="download"
              @click="generatePDF"
              no-caps
            />
          </div>
          <div class="q-mr-sm q-ml-sm" v-if="tramites.length > 0">
            <q-expansion-item
              v-if="
                useUserTree.giro_seleccionado.compatibilidad === 'CONDICIONADO'
              "
              expand-separator
              :header-style="
                $q.screen.lt.sm
                  ? {
                      fontFamily: ['Roboto', 'sans-serif'],
                      fontWeight: 'bold',
                      fontSize: '15px',
                      color: '',
                    }
                  : {
                      fontFamily: ['Roboto', 'sans-serif'],
                      fontWeight: 'bold',
                      fontSize: '15px',
                      color: 'light-blue-5',
                    }
              "
              :content-inset-level="$q.screen.lt.md ? 0 : 1"
              label="Requisitos de acuerdo al giro"
            >
              <div>
                <q-item style="font-family: Roboto, sans-serif">
                  - {{ useUserTree.giro_seleccionado.label }}
                </q-item>
                <q-item
                  style="font-family: Roboto, sans-serif"
                  v-for="item in useUserTree.requisitos_giro[0]"
                  :key="item"
                >
                  - {{ item }}
                </q-item>
              </div>
            </q-expansion-item>

            <q-expansion-item
              expand-separator
              v-for="item in tramites"
              :header-style="
                $q.screen.lt.sm
                  ? {
                      fontFamily: ['Roboto', 'sans-serif'],
                      fontWeight: 'bold',
                      fontSize: '15px',
                    }
                  : {
                      fontFamily: ['Roboto', 'sans-serif'],
                      fontWeight: 'bold',
                      fontSize: '15px',
                    }
              "
              :content-inset-level="$q.screen.lt.md ? 0 : 1"
              :label="item.nombre_tramite"
              :key="item"
            >
              <div v-for="obj in item" :key="obj">
                <q-item
                  style="font-family: Roboto, sans-serif"
                  v-for="requisito in obj['requisitos_base']"
                  :key="requisito"
                >
                  - {{ requisito }}
                </q-item>
              </div>

              <div v-if="item['requisitos_ubicacion'].length > 0">
                <q-expansion-item
                  default-opened
                  label="Requisitos específicos de acuerdo con su ubicación"
                  :content-inset-level="$q.screen.lt.md ? 0 : 1"
                  :header-style="
                    $q.screen.lt.sm
                      ? {
                          fontFamily: ['Roboto', 'sans-serif'],
                          fontWeight: 'bold',
                          fontSize: '15px',
                        }
                      : {
                          fontFamily: ['Roboto', 'sans-serif'],
                          fontWeight: 'bold',
                          fontSize: '15px',
                        }
                  "
                >
                  <q-item
                    v-for="obj in item['requisitos_ubicacion']"
                    style="font-family: Roboto, sans-serif"
                    :key="obj"
                  >
                    - {{ obj.valor }}
                  </q-item>
                </q-expansion-item>
              </div>
              <div v-if="item['requistos_personalizado'].length > 0">
                <q-expansion-item
                  default-opened
                  label="Requisitos específicos de acuerdo a la personalización del proyecto"
                  :content-inset-level="$q.screen.lt.md ? 0 : 1"
                  :header-style="
                    $q.screen.lt.sm
                      ? {
                          fontFamily: ['Roboto', 'sans-serif'],
                          fontWeight: 'bold',
                          fontSize: '15px',
                        }
                      : {
                          fontFamily: ['Roboto', 'sans-serif'],
                          fontWeight: 'bold',
                          fontSize: '15px',
                        }
                  "
                >
                  <q-item
                    v-for="obj in item['requistos_personalizado']"
                    style="font-family: Roboto, sans-serif"
                    :key="obj"
                  >
                    - {{ obj.valor }}
                  </q-item>
                </q-expansion-item>
              </div>
            </q-expansion-item>
          </div>

          <div
            v-else
            style="
              height: 100%;
              display: flex;
              align-items: center;
              justify-content: center;
            "
          >
            <div
              style="
                display: flex;
                justify-content: center;
                align-items: center;
              "
            >
              <NotFoundTramites
                mensaje="No se encontraron trámites para este proceso."
              />
            </div>
          </div>
          <q-space />
          <p
            class="q-ml-sm q-mr-sm"
            :style="
              $q.screen.lt.sm
                ? {
                    fontSize: '11px',
                    textAlign: 'justify',
                    marginTop: '50px',
                    fontStyle: 'italic',
                    color: 'grey',
                  }
                : {
                    fontSize: '13px',
                    textAlign: 'justify',
                    marginTop: '50px',
                    paddingBottom: '16px',
                    fontStyle: 'italic',
                    color: 'grey',
                  }
            "
          >
            "Los requisitos y trámites del Municipio de Monterrey, aquí
            presentados, se emiten en conformidad con los principios de
            publicidad, transparencia y gobierno abierto. Este contenido no
            confiere derechos por sí mismo ni generará derechos en caso de
            modificaciones al Plan de Desarrollo Urbano del Municipio de
            Monterrey 2013-2025 y/o a la normativa estatal o municipal
            correspondiente. Cualquier interpretación de la información debe ser
            confirmada por la autoridad municipal competente mediante la
            autorización respectiva. La información divulgada aquí es una
            recopilación de leyes, reglamentos e información pública previamente
            publicada, en concordancia con lo dispuesto en los artículos 4, 60,
            70 fracciones XX, XXVII, XXIX, XXX, XXXVII y XLVIII, y 71 fracción I
            inciso a) de la Ley General de Transparencia y Acceso a la
            Información Pública, así como los artículos 95 fracciones XXI,
            XXVIII, XXX, XXXI y XXXVIII, y 96 fracciones I y VII de la Ley de
            Transparencia y Acceso a la Información Pública del Estado de Nuevo
            León. Asimismo, se aplica lo estipulado en el Capítulo XIX relativo
            a la publicidad del registro público, de la Ley Reglamentaria del
            Registro Público de la Propiedad y del Comercio para el Estado de
            Nuevo León."
          </p>
        </q-card-section>
      </q-card-section>
    </q-card>
  </q-dialog>
</template>

<script setup lang="ts">
import { userTree } from 'stores/arboles';
import { ref, toRaw, watch } from 'vue';
import { ComponentesArboles } from 'stores/componentes-arboles';
import { Subprocesos } from 'stores/subprocesos';
import NotFoundTramites from 'components/Arboles/NotFoundTramites.vue';
import { jsPDF } from 'jspdf';

const props = defineProps({
  modelValue: Boolean,
});

const visible = ref(props.modelValue);
const skeletone = ref(false);
const informacion = ref(false);
const tramites = ref([]);
const useComponenteArboles = ComponentesArboles();
const useSubprocesos = Subprocesos();
const useUserTree = userTree();
const requisitosGiros = ref([]);

const id_proteccion_civil = [
  '162',
  '163',
  '156',
  '96',
  '97',
  '3',
  '111',
  '105',
];

const generatePDF = () => {
  const doc = new jsPDF();

  tramites.value.forEach((tramite, index) => {
    const requisitosBase = tramite.requisitos.requisitos_base;
    const tramiteTitle = `${index + 1}. ${tramite.nombre_tramite}`;

    doc.text(tramiteTitle, 10, 10 + index * 10);

    let requisitoIndex = 1;
    let lineHeight = 10; // Altura de línea

    // Espacio de margen superior para los requisitos
    let yPosition = 20 + index * 10;

    for (const [key, value] of Object.entries(requisitosBase)) {
      // Dividir líneas largas
      const splitText = doc.splitTextToSize(`${requisitoIndex}. ${value}`, 180);

      // Añadir texto y mover la posición 'y' hacia abajo
      doc.text(splitText, 20, yPosition);
      yPosition += splitText.length * lineHeight; // Incrementar la posición 'y' dependiendo del número de líneas

      requisitoIndex++;
    }

    // Añadir una nueva página después de cada trámite
    if (index < tramites.value.length - 1) {
      doc.addPage();
    }
  });

  // Descargar el PDF
  // doc.save("requisitos_tramites.pdf");
};

async function acomodarTramites() {
  const catalogoTramites = useSubprocesos.catalogoTramites;
  const requisitosBase = useSubprocesos.requisitos_base;
  const nombresTramites = useSubprocesos.nombres_tramites;
  const requistosBaseDep = useUserTree.requistos_especificos_dep;
  const requisitos_ubicacion = useSubprocesos.requisitos_especificos_ubicacion;
  const requisitos_personaliza = useSubprocesos.requisitos_especificos_personaliza;

  console.log(nombresTramites, 'tramites')

  let resultados = nombresTramites.map((nombreTramite) => {
    // Buscar el trámite en catalogoTramites
    let tramiteEncontrado = catalogoTramites
      .find((tramite) =>
        tramite.find((obj) => obj.nombre_tramite === nombreTramite)
      )
      ?.find((tramite) => tramite.nombre_tramite === nombreTramite);

    if (tramiteEncontrado) {
      const ogc_fid = tramiteEncontrado.ogc_fid;

      if (id_proteccion_civil.includes(ogc_fid)) {
        const requisitosEncontrados = requistosBaseDep.find(
          (requisito) => requisito.id_tramite === ogc_fid
        );

        const requisitosBaseUbicacion = requisitos_ubicacion.filter(
          (item) => item.nombre_tramite === requisitosEncontrados.nombre_tramite
        );

        const requisitBasePersonaliza = requisitos_personaliza.filter(
          (item) => item.nombre_tramite === requisitosEncontrados.nombre_tramite
        )

        return {
          nombre_tramite: nombreTramite,
          tramite: requisitosEncontrados.nombre_tramite,
          requisitos: requisitosEncontrados,
          orden_tramites: '',
          requisitos_ubicacion:
            requisitosBaseUbicacion.length !== 0 ? requisitosBaseUbicacion : [],
          requistos_personalizado:
            requisitBasePersonaliza.length !== 0 ? requisitBasePersonaliza : []
        };
      } else {
        // Buscar en requisitosBase el objeto cuyo id_tramite coincida con el ogc_fid
        const requisitosEncontrados = requisitosBase.find(
          (requisito) => requisito.id_tramite === ogc_fid
        );

        const requisitosBaseUbicacion = requisitos_ubicacion
          .filter(
            (item) =>
              item.nombre_tramite === requisitosEncontrados.nombre_tramite
          )
          .map((item) => toRaw(item));

        const requisitBasePersonaliza = requisitos_personaliza.filter(
          (item) =>
            item.nombre_tramite === requisitosEncontrados.nombre_tramite
        )

        return {
          nombre_tramite: nombreTramite,
          tramite: requisitosEncontrados.nombre_tramite,
          requisitos: requisitosEncontrados,
          orden_tramites: '',
          requisitos_ubicacion:
            requisitosBaseUbicacion.length !== 0 ? requisitosBaseUbicacion : [],
          requistos_personalizado:
            requisitBasePersonaliza.length !== 0 ? requisitBasePersonaliza : []
        };
      }
    } else {
      // Si no se encuentra el trámite, devolver null o algún indicador de que no se encontró
      return {
        nombre_tramite: nombreTramite,
        tramite: null,
      };
    }
  });


  // Añadir "orden_tramites" a los resultados
  resultados.forEach((resultado) => {
    const matchingRequisito = useSubprocesos.requisitos_ubicacion.find((require) => require.properties.tramites === resultado.tramite)
    if (matchingRequisito) {
      resultado.orden_tramites = matchingRequisito.properties.orden_tramites;
    }
  });

  // Filtrar duplicados usando un Set para asegurar que solo queda uno por cada 'tramite'
  const uniqueTramites = new Set();

  resultados = resultados.filter((resultado) => {
    // Crear una clave única basada en 'tramite' y 'nombre_tramite'
    const uniqueKey = resultado.tramite || resultado.nombre_tramite;

    const isDuplicate = uniqueTramites.has(uniqueKey);
    uniqueTramites.add(uniqueKey);

    return !isDuplicate;
  });


  // Ordenar los resultados por "orden_tramites"
  resultados.sort((a, b) => {
    if (!a.orden_tramites) return 1;
    if (!b.orden_tramites) return -1;

    // Ordenar normalmente cuando ambos tienen valores
    if (a.orden_tramites < b.orden_tramites) return -1;
    if (a.orden_tramites > b.orden_tramites) return 1;
    return 0;
  });


  return resultados;
}

watch(
  () => props.modelValue,
  (newValue) => {
    skeletone.value = true;
    visible.value = newValue;
    const acomodo = acomodarTramites();
    acomodo.then((res) => {
      tramites.value = res;
      setTimeout(() => {
        skeletone.value = false;
        informacion.value = true;
      }, 1500);
    });
  }
);

const updateVisible = (newValue: boolean) => {
  visible.value = newValue;
};
</script>
