<template>
  <div id="map" class="mapa" tabindex="0"> <!-- El div que dibuja el mapa -->
    <div id="oltb"></div> <!-- Barra de herramientas -->
    <ComponentSearchResults style="position: absolute; z-index: 10; bottom: 4rem;"/>
  </div>

  <div v-show="useLoadingMapsStore.showOverlay" id="overlay" class="overlay-marker">
    <q-icon name="location_on" size="45px" class="text-blue"/>
  </div>
  <div v-show="useLoadingMapsStore.showOverlayBusqueda" id="overlayBusqueda" class="overlay-marker">
    <q-icon name="location_on" size="45px" class="text-blue"/>
  </div>
  <ComponenteDialogoUbicacion />
</template>
<script setup lang="ts">

import { createApp, onMounted } from 'vue';
import ComponenteDialogoUbicacion from 'components/ComponenteDialogoUbicacion.vue';
import ComponentSearchResults from 'components/ComponentSearchResults.vue';
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
import { ToolLayerMapas } from 'src/utils/Herramientas/MenuCapas/capas-mapas';
import LayerGroup from 'ol/layer/Group';
import TileLayer from 'ol/layer/Tile';
import {OSM, XYZ} from 'ol/source';
import {BaseLayerOptions, GroupLayerOptions} from 'ol-layerswitcher';
import {BuscarMapaPk} from 'src/layers/GeonodePk';
import LayerSwitcherMod from 'src/utils/Herramientas/LayerSwitcherMod';

import {watchEffect, watch} from 'vue';
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
import { ToolSplitView } from 'src/utils/Herramientas/tools/SplitViewTool';

// onMounted
import { ref } from 'vue';
import {LoadingLayersStore} from 'stores/capas';


import { TituloCapa } from 'src/layers/LayerOverlay';
import { ArbolDecisionesTool } from 'src/utils/Herramientas/tools/ArbolDecisionesTool';
import { Quasar, useQuasar } from 'quasar';
import { useRouterStore } from 'stores/router';
import RemoveMapLayers from 'src/utils/Herramientas/RemoveMapLayers';
import { FiltroDatosOverlay } from 'src/utils-arboles/PeticionesArbol';
import { menuUbicacion } from 'stores/menuUbicacion';
import ComponenteBuscarCapas from 'components/ComponenteBuscarCapas.vue';

// router
import { useRouter, useRoute } from 'vue-router';
import MenuInfoUbicacion from 'components/Mira/MenuInfoUbicacion.vue';


interface Feature {
  layerName: string;
  propiedades: any; // O define el tipo exacto de propiedades si lo sabes
}

// Declararion de variables
const useLoadingMapsStore = LoadingLayersStore();
const routerStore = useRouterStore();
const $q = useQuasar();
const features = ref<Feature[]>([]);
let app = null;
const router = useRouter()
const campos_descartados = ref([
  'fid', 'y', 'x', '_id', 'nota','num_inf', 'area_km', 'area_ha', 'fecha_digitalizacion', 'delegacion_id', 'distrito_id'
])
import { contextMap } from 'stores/contextMap';
// const router = useRoute()

const closeOverlay = () => {
  useLoadingMapsStore.showOverlay = false;
}
const skeleton = ref(true)

const showLocationData = ref(false)

const useMenuUbicacion = menuUbicacion()

const useStoreContextMap = contextMap()


onMounted(() => {
  watchEffect(() => {
    if(routerStore.currentRoute === '/todas-capas'){
      const buscarMapasContainer = document.getElementById('buscador-capas');
      if (buscarMapasContainer){
        app = createApp(ComponenteBuscarCapas);

        app.use(Quasar);
        app.mount(buscarMapasContainer);
      }
      routerStore.pk = 'null'
      const MapsLayers = LayerManager.getMapLayers();
      RemoveMapLayers(MapsLayers)
      $q.loading.show()
    }else{
      BuscarMapaPk(routerStore.pk)
    }
  })

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

      const Monterrey2022 = new TileLayer({
        title: ' ',
        type: 'base',
        visible: false,
        source: new XYZ({
          crossOrigin: 'anonymous',
          url:'https://engine.ec.appsmty.gob.mx/stiles/5ba54d62469b11eebe7f00155d649203/{z}/{x}/{-y}.jpg'
        })
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
        layers: [osm, Monterrey2022, satelite, topo]
      } as GroupLayerOptions);


      const defaultProjection = ConfigManager.getConfig().projection.default;
      const map = new Map({
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
              ubicacion: showLocationData,
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
            },
              showLocationData),
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
            new ToolSplitView({}),
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
        stopEvent: false
      })

      map.on('click', async function (evt) {
        useLoadingMapsStore.setShowOverlayBusqueda(false)
        useMenuUbicacion.setShowLoader(true);
        const coordinate = evt.coordinate;
        showLocationData.value = true

        overlay.setPosition(coordinate);
        const viewResolution = map.getView().getResolution();
        // Get all visible layers with sourceChangeKey_ property
        const visibleLayers = map.getLayers().getArray().filter(
          (layer) => layer.getVisible() && layer.sourceChangeKey_ != undefined && layer.sourceChangeKey_.target.params_ != undefined
        );

        if (visibleLayers.length === 0) {
          // Si no hay capas visibles, no se muestra el overlay
          useLoadingMapsStore.showOverlay = false;
          return;
        }

        features.value = []; // Clear previous features

        for (const layer of visibleLayers) {
          const alternate = layer.sourceChangeKey_.target.params_.LAYERS;
          const datosCapa = TituloCapa(alternate)
          const url = LayerOverlay(alternate, coordinate, viewResolution);

          try {
            const response = await apiUrlOverlay.get(`${url}`);
            if (response.data.features.length > 0) {
              skeleton.value = true;
              useLoadingMapsStore.showOverlay = true;
              features.value.push(...response.data.features.map((feature: { properties: never; }) => {
                const filtrate = FiltroDatosOverlay(feature.properties)
                return {
                  layerName: datosCapa.name,
                  propiedades: filtrate,
                };
              }));
            }
          } catch (error) {
            console.error('Error fetching layer data:', error);
          }
          if (features.value.length > 0) {
            useLoadingMapsStore.showOverlay = true;
          } else {
            useLoadingMapsStore.showOverlay = false;
          }
        }
        setTimeout(() => { skeleton.value = false }, 500);

        if(features.value.length > 0) {
          useMenuUbicacion.setFeatures(features.value)
          const contenedorUbicacion = document.getElementById('contenedor-ubicacion');

          if (!app) {
            contenedorUbicacion.style.display = 'block';

            app = createApp(MenuInfoUbicacion);

            app.use(Quasar);
            app.mount(contenedorUbicacion);
          }
          useMenuUbicacion.setShowLoader(false);
        }else{
          useMenuUbicacion.setFeatures(features.value)
          useMenuUbicacion.setShowLoader(false);
        }
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
      useStoreContextMap.setContextMap(map)
  }
})

</script>

<style scoped>

@keyframes show-overlay {
    from { opacity: 0; }
    to { opacity: 1; }
  }
.overlay-marker {
  position: absolute;
  transform: translate(-50%, -100%);
}

.layer-switcher button {
  height: 65px !important;
}
</style>
