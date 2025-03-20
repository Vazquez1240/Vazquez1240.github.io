<template>
  <div id="map" class="mapa" tabindex="0">
    <div id="oltb"></div>
  </div>
  <DialogoUsuario :model-value="modelValueDialogoUsuario" />

  <ComponenteDialogoUbicacion />

</template>
<script setup lang="ts">
import ComponenteDialogoUbicacion from 'components/ComponenteDialogoUbicacion.vue';


import {onMounted} from 'vue';
import 'ol/ol.css'
import { Map, Overlay, View } from 'ol';
import {fromLonLat} from 'ol/proj';
import {get as getProjection} from 'ol/proj'
import {defaults as defaultControls} from 'ol/control'
import { platformModifierKeyOnly, altShiftKeysOnly, shiftKeyOnly, targetNotEditable } from 'ol/events/condition';
import { defaults as defaultInterctions, MouseWheelZoom, DragPan, DragRotate, KeyboardZoom, KeyboardPan } from 'ol/interaction';


// Layers
import '../../css/layerswitcher.scss'
// style
import 'oltb/src/oltb/scss/oltb.scss';
import '../../css/toolbar.scss'
import '../../css/layerswitcher.scss'
// Browser prototype extensions
import 'oltb/src/oltb/js/helpers/extensions/Cycle';
import 'oltb/src/oltb/js/helpers/prototypes/String';
import 'oltb/src/oltb/js/helpers/prototypes/SlideToggle';
// Core Toolbar
import {Settings} from 'oltb/src/oltb/js/helpers/constants/Settings';
import {LocalStorageKeys} from 'oltb/src/oltb/js/helpers/constants/LocalStorageKeys';
// Core Managers
import {LogManager} from 'oltb/src/oltb/js/managers/LogManager';
import {UrlManager} from 'oltb/src/oltb/js/managers/UrlManager';
import {ToolManager} from 'oltb/src/oltb/js/managers/ToolManager';
import {SnapManager} from 'oltb/src/oltb/js/managers/SnapManager';
import {StyleManager} from 'oltb/src/oltb/js/managers/StyleManager';
import {LayerManager} from 'oltb/src/oltb/js/managers/LayerManager';
import {StateManager} from 'oltb/src/oltb/js/managers/StateManager';
import {TippyManager} from 'oltb/src/oltb/js/managers/TippyManager';
import {ErrorManager} from 'oltb/src/oltb/js/managers/ErrorManager';
import {ConfigManager} from 'oltb/src/oltb/js/managers/ConfigManager';
import {ElementManager} from 'oltb/src/oltb/js/managers/ElementManager';
import {TooltipManager} from 'oltb/src/oltb/js/managers/TooltipManager';
import {FeatureManager} from 'oltb/src/oltb/js/managers/FeatureManager';
import {SettingsManager} from 'oltb/src/oltb/js/managers/SettingsManager';
import {BootstrapManager} from 'oltb/src/oltb/js/managers/BootstrapManager';
import {InfoWindowManager} from 'oltb/src/oltb/js/managers/InfoWindowManager';
import {ProjectionManager} from 'oltb/src/oltb/js/managers/ProjectionManager';
import {TranslationManager} from 'oltb/src/oltb/js/managers/TranslationManager';
import {ColorPickerManager} from 'oltb/src/oltb/js/managers/ColorPickerManager';
import {AccessibilityManager} from 'oltb/src/oltb/js/managers/AccessibilityManager';


// Toolbar Tools
import { HiddenMarkerTool } from 'oltb/src/oltb/js/tools/hidden-tools/HiddenMarkerTool';
import { HiddenMapNavigationTool } from 'oltb/src/oltb/js/tools/hidden-tools/HiddenMapNavigationTool';
import { ToolLayerMapas } from 'src/utils-arboles/tools/capas-arboles';
import LayerGroup from 'ol/layer/Group';
import TileLayer from 'ol/layer/Tile';
import { OSM, XYZ } from 'ol/source';
import {BaseLayerOptions, GroupLayerOptions} from 'ol-layerswitcher';
import { BuscarMapa } from 'src/utils-arboles/layers/MidePk';
import LayerSwitcherMod from 'src/utils/Herramientas/LayerSwitcherMod';
import { ToolHome } from 'src/utils/Herramientas/tools/HomeTool';
import { ToolZoomIn } from 'src/utils/Herramientas/tools/ZoomInTool';
import { ToolZoomOut } from 'src/utils/Herramientas/tools/ZoomOutTool';
import { ToolFullscreen } from 'src/utils/Herramientas/tools/FullscreenTool';
import { ToolGraticule } from 'src/utils/Herramientas/tools/GraticuleTool';
import { ToolResetNorth } from 'src/utils/Herramientas/tools/ResetNorthTool';
import { ToolCoordinates } from 'src/utils/Herramientas/tools/CoordinatesTool';
import { ToolOverview } from 'src/utils/Herramientas/tools/OverviewTool';
import { ToolMyLocation } from 'src/utils/Herramientas/tools/MyLocationTool';
import { ToolScaleLine } from 'src/utils/Herramientas/tools/ScaleLineTool';
import { ToolBookmark } from 'src/utils/Herramientas/tools/BookmarkTool';
import { ToolExportPng } from 'src/utils/Herramientas/tools/ExportPngTool';
import { ToolHelp } from 'src/utils/Herramientas/tools/HelpTool';
import { LayerOverlay } from 'src/layers/LayerOverlay';
import { apiUrlOverlay } from 'boot/axios';

// onMounted
import { ref } from 'vue';
import {LoadingLayersStore} from 'stores/capas';
import { MiraTool } from 'src/utils-arboles/tools/Mira';
import { useRouterStore } from 'stores/router';
import { RespuestaTramites } from 'src/utils-arboles/interface';

import DialogoUsuario from 'components/Arboles/Dialogos/DialogoUsuario.vue';
import { usoSuelo } from 'src/utils-arboles/archivos_capas/usoSuelo';
import { Predios } from 'src/utils-arboles/archivos_capas/predios';
import { ComponentesArboles } from 'stores/componentes-arboles';
import { watch } from 'vue'
import { Notify, useQuasar } from 'quasar';
import {
  PeticionRequisitosBase,
  PeticionCatalogoTramites,
  PeticionRequisitosBaseDep
} from 'src/utils-arboles/PeticionesArbol';
import zonaProteccionEspecial from 'src/utils-arboles/archivos_capas/zonaProteccionEspecial';
import escenarioGeologico from 'src/utils-arboles/archivos_capas/escenarioGeologico';
import zonasEncharcamientosPlanicieInundacion from 'src/utils-arboles/archivos_capas/zonasEncharcamiento';
import pendienteTerreno from 'src/utils-arboles/archivos_capas/pendienteTerreno';
import riberasArroyos from 'src/utils-arboles/archivos_capas/riberasArroyos';
import { PeticionRequisitosPersonaliza, RequisitosUbicacion } from 'src/utils-arboles/RequisitosGiro';
import corredoresBiologicos from 'src/utils-arboles/archivos_capas/corredoresBiologicos';

// Declararion de variables
const useLoadingMapsStore = LoadingLayersStore();
const routerStore = useRouterStore();
const features = ref<RespuestaTramites[]>([]);
const skeleton = ref(true)
const valorSelect = ref()
let capaResaltadaActual = ref();
const showDialog = ref(false)
var map: Map
const useComponenteArboles = ComponentesArboles()
const $q = useQuasar()

const tipoProcesoDialogo = ref('')
const preguntaUsuarioDialogo = ref('')
const modelValueDialogoTipoProceso = ref(false)
const modelValueDialogoDemolicion = ref(false)
const modelValueDialogoLotificacion = ref(false)
const modelValueDialogoGravamen = ref(false)
const modelValueTramites = ref(false)
const modelValueDialogoUsuario = ref(false)
let count = 0


// Estos wathc sirven oara estar escuchando en que momento cambia el valor de la
// variable en la store y ais poder pasar ese nuevo valor a la variable que se
// le pasara al componente

watch(() => useComponenteArboles.componentLoading, (newValue) => {
  useComponenteArboles.componentLoading ? $q.loading.show() : $q.loading.hide()
})

watch(() => useComponenteArboles.capaResaltada, (newValue) => {
  capaResaltadaActual.value ? map.removeLayer(capaResaltadaActual.value) : null
})

watch(() => useComponenteArboles.componentDialogoUsuario, (newValue) => {
  modelValueDialogoUsuario.value = newValue
})

watch(() => useComponenteArboles.componentTipoProceso, (newValue) => {
  modelValueDialogoTipoProceso.value = newValue
}, { deep: true })

watch(() => useComponenteArboles.componentLotificacion, (newValue) => {
  modelValueDialogoLotificacion.value = newValue
}, { deep: true })

watch(() => useComponenteArboles.componentDemolicion, (newValue) => {
  modelValueDialogoDemolicion.value = newValue
}, { deep: true })

watch(() => useComponenteArboles.componentGravamen, (newValue) => {
  modelValueDialogoGravamen.value = newValue
}, { deep: true })

watch(() => useComponenteArboles.componentTramites, (newValue) => {
  modelValueTramites.value = newValue
}, { deep: true })

onMounted(() => {
  routerStore.setRoute('arboles-decisiones/','263')
  BuscarMapa('263')
  BootstrapManager.initAsync([
    { manager: LogManager },
    { manager: StyleManager },
    { manager: ErrorManager },
    { manager: FeatureManager },
    { manager: StateManager, options: {
        ignoredKeys: []
      }},
    { manager: ElementManager },
    { manager: ConfigManager },
    { manager: TranslationManager },
    { manager: ProjectionManager },
    { manager: LayerManager },
    { manager: ColorPickerManager },
    { manager: TippyManager },
    { manager: TooltipManager },
    { manager: UrlManager },
    { manager: ToolManager },
    { manager: SettingsManager },
    { manager: SnapManager },
    { manager: InfoWindowManager },
    { manager: AccessibilityManager }
  ]).then(() => {
    initMapAndToolbar();
  });
  const initMapAndToolbar = () => {
    const defaultLocation = ConfigManager.getConfig().location.default;
    const localStorageNodeName = LocalStorageKeys.mapData;
    const localStorageDefaults = Object.freeze({
      lon: -100.3001,
      lat: 25.6866,
      zoom: 13,
      rotation: defaultLocation.rotation,
    });

    const localStorage = StateManager.getAndMergeStateObject(
      localStorageNodeName,
      localStorageDefaults
    );

    const osm = new TileLayer({
      title: ' ',
      type: 'base',
      visible: true,
      source: new OSM()
    } as BaseLayerOptions);

    const satelite = new TileLayer({
      title: ' ',
      type: 'base',
      visible: false,
      source: new XYZ({
        crossOrigin: 'anonymous',
        url:'https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}'
      })
    } as BaseLayerOptions);

    const topo = new TileLayer({
      title: ' ',
      type:'base',
      visible: false,
      source: new XYZ({
        crossOrigin:'anonymous',
        url:'https://tile.opentopomap.org/{z}/{x}/{y}.png'
      })
    } as BaseLayerOptions)

    const baseMaps = new LayerGroup({
      title: 'Mapas base',
      layers: [osm, satelite, topo]
    } as GroupLayerOptions);


    const defaultProjection = ConfigManager.getConfig().projection.default;
    map = new Map({
      interactions: defaultInterctions({
        mouseWheelZoom: true,
        altShiftDragRotate: false,
        dragPan: false,
        keyboard: false
      }).extend([
        new MouseWheelZoom({
          condition: function(event) {
            return (
              platformModifierKeyOnly(event) ||
              SettingsManager.getSetting(Settings.mouseWheelZoom)
            );
          }
        }),
        new DragRotate({
          condition: function(event) {
            return (
              altShiftKeysOnly(event) &&
              SettingsManager.getSetting(Settings.altShiftDragRotate)
            );
          }
        }),
        new DragPan({
          condition: function(event) {
            return (
              (
                platformModifierKeyOnly(event) ||
                SettingsManager.getSetting(Settings.dragPan)
              ) && !altShiftKeysOnly(event) && !shiftKeyOnly(event)
            );
          }
        }),
        new KeyboardZoom({
          condition: function(event) {
            return (
              SettingsManager.getSetting(Settings.keyboardZoom) &&
              targetNotEditable(event)
            );
          }
        }),
        new KeyboardPan({
          condition: function(event) {
            return (
              SettingsManager.getSetting(Settings.keyboardPan) &&
              targetNotEditable(event)
            );
          }
        })
      ]),
      layers:[baseMaps],
      controls: defaultControls({
        zoom: false,
        rotate: false
      }).extend([
        new MiraTool({
          target: '_blank',
          onInitiated: {},
          onClicked: {},
        }),
        new HiddenMarkerTool({
          onAdded: function(marker: never) {
            console.log('HiddenMarkerTool: Marker added', marker);
          },
          onRemoved: function(marker: never) {
            console.log('HiddenMarkerTool: Marker removed', marker);
          },
          onEdited: function(before: never, after: never) {
            console.log('HiddenMarkerTool: Marker edited', before, after);
          }
        }),
        new HiddenMapNavigationTool({
          focusZoom: 10
        }),
        new ToolHome({
          lon: 2959333.8145,
          lat: -11167217.0009,
          zoom: 10,
        }),
        new ToolZoomIn({}),
        new ToolZoomOut({}),
        new ToolLayerMapas({
          onInitiated: {},
          onClicked: {
          },
          onBrowserStateCleared: {},
          // eslint-disable-next-line @typescript-eslint/no-unused-vars,@typescript-eslint/no-empty-function
          onMapLayerAdded: function(layerWrapper: never) {},
          // eslint-disable-next-line @typescript-eslint/no-unused-vars,@typescript-eslint/no-empty-function
          onMapLayerRemoved: function(layerWrapper: never) {},
          // eslint-disable-next-line @typescript-eslint/no-unused-vars,@typescript-eslint/no-empty-function
          onMapLayerRenamed: function(layerWrapper: never) {},
          // eslint-disable-next-line @typescript-eslint/no-unused-vars,@typescript-eslint/no-empty-function
          onMapLayerVisibilityChanged: function(layerWrapper: never) {},
          // eslint-disable-next-line @typescript-eslint/no-unused-vars,@typescript-eslint/no-empty-function
          onMapLayerDragged(item: never, list: never) {},
          // eslint-disable-next-line @typescript-eslint/no-unused-vars,@typescript-eslint/no-empty-function
          onFeatureLayerAdded: function(layerWrapper: never) {},
          // eslint-disable-next-line @typescript-eslint/no-unused-vars,@typescript-eslint/no-empty-function
          onFeatureLayerRemoved: function(layerWrapper: never) {},
          // eslint-disable-next-line @typescript-eslint/no-unused-vars,@typescript-eslint/no-empty-function
          onFeatureLayerRenamed: function(layerWrapper: never) {},
          // eslint-disable-next-line @typescript-eslint/no-unused-vars,@typescript-eslint/no-empty-function
          onFeatureLayerVisibilityChanged: function(layerWrapper: never) {},
          // eslint-disable-next-line @typescript-eslint/no-unused-vars,@typescript-eslint/no-empty-function
          onFeatureLayerDownloaded: function(layerWrapper: never, filename: never, content: never) {},
          // eslint-disable-next-line @typescript-eslint/no-unused-vars,@typescript-eslint/no-empty-function
          onFeatureLayerDragged(item: never, list: never) {}
        }),
        new ToolFullscreen({
          onInitiated: {},
          onClicked: {},
          onEnter: {},
          onLeave: {},
        }),
        new ToolGraticule({
          color: '#12ABE3',
          dashed: true,
          width: 2,
          showLabels: true,
          wrapX: true,
          onInitiated: {},
          onClicked: {},
          onBrowserStateCleared: {},
        }),
        new ToolResetNorth({
          onInitiated: {},
          onClicked: {},
          // eslint-disable-next-line @typescript-eslint/no-empty-function,@typescript-eslint/no-unused-vars
          onReset: function(result: never) {},
        }),
        new ToolCoordinates({
          onInitiated: {},
          onClicked: {},
          onBrowserStateCleared: {},
          // eslint-disable-next-line @typescript-eslint/no-unused-vars,@typescript-eslint/no-empty-function
          onMapClicked: function(coordinates: never) {}
        }),
        new ToolOverview({

          onInitiated: {},
          onClicked: {},
          onBrowserStateCleared: {}
        }),
        new ToolMyLocation({
          enableHighAccuracy: true,
          title: 'Mi ubicación',
          timeout: 10000,
          description: 'Esta es la ubicación que el navegador pudo encontrar. Puede que no sea tu ubicación real.',
          markerLabelUseEllipsisAfter: 20,
          markerLabelUseUpperCase: false,
          onInitiated: {},
          onClicked: {},
          // eslint-disable-next-line @typescript-eslint/no-unused-vars,@typescript-eslint/no-empty-function
          onLocationFound: function(location: never) {},
          // eslint-disable-next-line @typescript-eslint/no-unused-vars,@typescript-eslint/no-empty-function
          onError: function(error: never) {}
        }),
        new ToolScaleLine({
          isActive: true,
          activateTool: {}
        }),
        new ToolBookmark({
          markerLayerVisibleOnLoad: false,
          markerLabelUseEllipsisAfter: 20,
          markerLabelUseUpperCase: false,
          bookmarks: [{
            id: '6812cc22-f490-46b7-a9f3-42eb9ea58ac2',
            name: 'Marca personalizada',
            zoom: 5,
            coordinates: [57.123, 16.456]
          }],
          onInitiated: {},
          onClicked: {},
          onBrowserStateCleared: {},
          onAdded: {},
          onRemoved: {},
          onRenamed: {},
          onZoomedTo: {},
          onCleared: {},
          onDragged: {},
        }),
        new ToolExportPng({
          filename: 'map-image-export',
          appendTime: true,
          onInitiated: {},
          onClicked: {},
          onExported: {},
          onError: {},
        }),
        new ToolHelp({
          url: 'https://mide.monterrey.gob.mx/#/',
          target: '_blank',
          onInitiated: {},
          onClicked: {},
        }),
      ]),

      target: ElementManager.getMapElement(),
      view: new View({
        projection: getProjection(defaultProjection.code),
        center: fromLonLat([localStorage.lon, localStorage.lat]),
        zoom: localStorage.zoom,
        rotation: localStorage.rotation
      })

    });

    const pos = fromLonLat([16.3725, 48.208889]);
    const overlay = new Overlay({
      positioning: 'bottom-center',
      position: pos,
      element: document.getElementById('overlay'),
    })

    map.on('click', async function (evt) {
      $q.loading.show()
      useComponenteArboles.setComponenteLoading(true)
      reestablecerVariables()
      const viewResolution = map.getView().getResolution();


      await Promise.all([PeticionCatalogoTramites(), PeticionRequisitosBase(), PeticionRequisitosBaseDep(), PeticionRequisitosPersonaliza()]);

      const visibleLayers = map.getLayers().getArray().filter(
        (layer) => layer.getVisible() && layer.sourceChangeKey_ != undefined && layer.sourceChangeKey_.target.params_ != undefined
      );

      if(visibleLayers.length === 0) {
        $q.loading.hide()
        Notify.create({
          timeout: 1300,
          color: 'red',
          message: 'Seleccione un predio válido, por favor.',
        })
      }

      const seleccionPredio = [
        'uso_suelo',
        'tramites_riberas_arroyos'
      ]
      const encharcamientoPlanicie = [
        'zonas_encharcamiento',
        'planicies_inundacion'
      ]

      for (const layer of visibleLayers) {
        const alternate = layer.sourceChangeKey_.target.params_ !== 'undefined' ? layer.sourceChangeKey_.target.params_.LAYERS : null;
        const url = LayerOverlay(alternate, evt.coordinate, viewResolution);
        try {
          const response = await apiUrlOverlay.get(`${url}`);

          if(response.data.features[0] !== undefined) {

            if(response.data.features[0].id.split('.')[0] === 'corredores_biologicos'){
              await corredoresBiologicos()
            }
            if (response.data.features[0].id.split('.')[0] === 'predios_2023') {
              console.log(response.data.features[0].geometry.coordinates[0][0], 'response.data.features[0].geometry.coordinates[0][0]')
              Predios(map, capaResaltadaActual, showDialog, response.data.features[0].geometry.coordinates[0][0], modelValueDialogoTipoProceso, tipoProcesoDialogo, preguntaUsuarioDialogo)
            }
            if (seleccionPredio.includes(response.data.features[0].id.split('.')[0])) {
              count = 0
              await usoSuelo(response, skeleton, features)
            }
            if (response.data.features[0].id.split('.')[0] === 'zonas_proteccion_especial') {
              await  zonaProteccionEspecial(response.data.features)
            }
            if(response.data.features[0].id.split('.')[0] === 'escenario_geologico'){
              await escenarioGeologico(response.data.features)
            }
            if( encharcamientoPlanicie.includes(response.data.features[0].id.split('.')[0])){
              await zonasEncharcamientosPlanicieInundacion(response.data.features, response.data.features[0].id.split('.')[0])
            }
            if(response.data.features[0].id.split('.')[0] === 'pendientes_terreno'){
              await pendienteTerreno(response.data.features)
            }
            if(response.data.features[0].id.split('.')[0] === 'tramites_riberas_arroyos'){
              await riberasArroyos(response.data.features)
            }
          }else{
            count += 1
            if(count >= 8){
              count = 0
              Notify.create({
                timeout: 1300,
                color: 'red',
                message: 'Esto no es un predio',
              })
              $q.loading.hide()

            }
          }
        } catch (error) {
          if (capaResaltadaActual.value) {
            map.removeLayer(capaResaltadaActual.value);
          }
          console.error(error);
        }
      }
      // setTimeout(() => { skeleton.value = false }, 500);
    });

    map.on('moveend', () => {
      const zoom = map.getView().getZoom();
      const layers = LayerManager.getMapLayers()
      layers.forEach(layer => {
        if(zoom >= 16.451666666666657){
          layer.name.toLowerCase() === 'manzanas' ? layer.getLayer().setVisible(true) : null
          layer.name.toLowerCase() === 'predios' ? layer.getLayer().setVisible(true) : null
          layer.getLayer().setVisible(true)
        }
        if(zoom < 16.451666666666657  ){
          layer.name.toLowerCase() !== 'ortofoto monterrey 2022' ? layer.getLayer().setVisible(false) : null
          layer.name.toLowerCase() === 'predios' ? layer.getLayer().setVisible(false) : null
          useLoadingMapsStore.showOverlay = false
          if (capaResaltadaActual.value) {
            map.removeLayer(capaResaltadaActual.value);
          }
        }
      })
    });

    map.once('postrender', () => {
      setTimeout(() => {
        const zoom = map.getView().getZoom();
        const layers = LayerManager.getMapLayers();

        layers.forEach(layer => {
          if(zoom >= 16.451666666666657){
            layer.name.toLowerCase() === 'manzanas' ? layer.getLayer().setVisible(true) : null;
            layer.name.toLowerCase() === 'predios' ? layer.getLayer().setVisible(true) : null;
            layer.getLayer().setVisible(true);
          } else {
            layer.name.toLowerCase() !== 'ortofoto monterrey 2022' ? layer.getLayer().setVisible(false) : null;
            layer.name.toLowerCase() === 'predios' ? layer.getLayer().setVisible(false) : null;
            useLoadingMapsStore.showOverlay = false;
            if (capaResaltadaActual.value) {
              map.removeLayer(capaResaltadaActual.value);
            }
          }
        });
      }, 2500)
    });


    const layerSwitcher = new LayerSwitcherMod({
      reverse: true,
      label: 'Mapa base',
    });

    // eslint-disable-next-line vue/no-export-in-script-setup
    BootstrapManager.setMap(map);
    BootstrapManager.ready();
    map.addControl(layerSwitcher);
    map.addOverlay(overlay)
  }

})

const reestablecerVariables = () => {
  useComponenteArboles.componentTramites ? useComponenteArboles.setComponenteTramites(false) : null
  showDialog.value = true
  features.value = [];
  modelValueDialogoTipoProceso.value = false
  valorSelect.value = ''
}



</script>

<style>
.layer-switcher button {
  height: 65px !important;
}
</style>
