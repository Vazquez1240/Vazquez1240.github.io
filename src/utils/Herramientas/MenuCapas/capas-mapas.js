import { LayerTool } from 'oltb/src/oltb/js/tools/LayerTool';
import { TranslationManager } from 'src/utils/Herramientas/TranslationManager';
import { ElementManager } from 'oltb/src/oltb/js/managers/ElementManager';
import { getIcon, SvgPaths } from 'oltb/src/oltb/js/icons/GetIcon';
import { DOM } from 'oltb/src/oltb/js/helpers/browser/DOM';
import { createApp } from 'vue';
import MenuOpacidad from 'components/MenuPropiedades.vue';
import { Loading, Quasar } from 'quasar';
import { ImageWMS } from 'ol/source';
import '../../../css/toolbox.scss';
import { ShortcutKeys } from 'oltb/src/oltb/js/helpers/constants/ShortcutKeys';
import { fillSelectElement } from 'src/utils/Herramientas/EjesMide/apiEjes';
import { LoadingLayersStore } from 'stores/capas';
import { MideEje } from 'src/utils/Herramientas/EjesMide/apiEjes';
import { LayerManager } from 'oltb/src/oltb/js/managers/LayerManager';
import cargar_mapas from 'src/layers/DefaultLayers';

const I18N_BASE = 'tools.layerTool';
const CLASS_TOOLBOX_SECTION = 'oltb-toolbox-section';
const CLASS_TOOLBOX_LIST = 'oltb-toolbox-list';
const ID_PREFIX = 'oltb-layer';
const I18N_BASE_COMMON = 'commons';
const CLASS_FUNC_BUTTON = 'oltb-func-btn';

export class ToolLayerMapas extends LayerTool {
  constructor(options = {}, ubicacion) {
    super(options);

    const i18n = TranslationManager.get(I18N_BASE);

    const button = this.button;

    // this.ubicacion = options.ubicacion;
    this.ubicacion = options.ubicacion;

    button.setAttribute(
      'data-tippy-content',
      `${i18n.title} (${ShortcutKeys.coordinatesTool})`
    );
    button.setAttribute(
      'data-tippy-content-post',
      `(${ShortcutKeys.coordinatesTool})`
    );
    button.setAttribute('data-oltb-i18n', `${I18N_BASE}.title`);
    this.activateTool();
  }

  initToolboxHTML() {
    const i18n = TranslationManager.get(`${I18N_BASE}.toolbox`);
    const i18nCommon = TranslationManager.get(`${I18N_BASE_COMMON}.titles`);

    const html = `
            <div id="${ID_PREFIX}-toolbox" class="${CLASS_TOOLBOX_SECTION}">
                <div class="${CLASS_TOOLBOX_SECTION}__header oltb-toggleable" data-oltb-toggleable-target="${ID_PREFIX}-map-toolbox-collapsed">
                    <h5 style="font-size: 1.3rem; font-weight: bold" class="${CLASS_TOOLBOX_SECTION}__title" data-oltb-i18n="${I18N_BASE}.toolbox.titles.mapLayers">Elige y explora:</h5>
                    <span class="${CLASS_TOOLBOX_SECTION}__icon oltb-tippy" data-oltb-i18n="${I18N_BASE_COMMON}.titles.toggleSection" title="${
      i18nCommon.toggleSection
    }"></span>
                </div>
                <div class="${CLASS_TOOLBOX_SECTION}__groups" id="${ID_PREFIX}-map-toolbox-collapsed" style="display: ${
      this.localStorage[`${ID_PREFIX}-map-toolbox-collapsed`] ? 'none' : 'block'
    }">
                   <div class="${CLASS_TOOLBOX_SECTION}__groups">
                      <select name="select" id="selectEje" class="oltb-input">
                        <option value=96>Zonificación secundaria</option>
                      </select>
                      <div id="buscador-capas"></div>
                    </div>
                    <div id="div-capas" class="${CLASS_TOOLBOX_SECTION}__group ${
      this.options.disableMapCreateLayerButton
        ? `${CLASS_TOOLBOX_SECTION}__group--topmost`
        : ''
    }">
                        <ul id="${ID_PREFIX}-map-stack" class="${CLASS_TOOLBOX_LIST}"></ul>
                    </div>
                    <button style="display: none" id="añadirCapas" type="button" class="oltb-btn oltb-btn--green-mid oltb-w-100">Cargar mas capas</button>
                </div>

                <!-- El display none de este div, no se debe de quitar a menos que se quiera ver las features -->
                <div style="display: none" class="${CLASS_TOOLBOX_SECTION}__header oltb-toggleable" data-oltb-toggleable-target="${ID_PREFIX}-feature-toolbox-collapsed">
                    <h4 class="${CLASS_TOOLBOX_SECTION}__title" data-oltb-i18n="${I18N_BASE}.toolbox.titles.featureLayers">${
      i18n.titles.featureLayers
    }</h4>
                    <span class="${CLASS_TOOLBOX_SECTION}__icon oltb-tippy" data-oltb-i18n="${I18N_BASE_COMMON}.titles.toggleSection" title="${
      i18nCommon.toggleSection
    }"></span>
                </div>
                <div  class="${CLASS_TOOLBOX_SECTION}__groups" id="${ID_PREFIX}-feature-toolbox-collapsed" style="display: none">
                    <div class="${CLASS_TOOLBOX_SECTION}__group">
                        ${
                          !this.options.disableFeatureCreateLayerButton
                            ? `
                                <div class="oltb-input-button-group">
                                    <input type="text" id="${ID_PREFIX}-feature-stack-add-text" class="oltb-input" data-oltb-i18n="${I18N_BASE}.toolbox.groups.createFeatureLayer.placeholder" placeholder="${
                                i18n.groups.createFeatureLayer.placeholder
                              }">
                                    <button type="button" id="${ID_PREFIX}-feature-stack-add-button" class="oltb-btn oltb-btn--green-mid oltb-tippy" data-oltb-i18n="${I18N_BASE}.toolbox.groups.createFeatureLayer.create" title="${
                                i18n.groups.createFeatureLayer.create
                              }">
                                        ${getIcon({
                                          path: SvgPaths.plus.stroked,
                                          width: 20,
                                          height: 20,
                                          fill: 'none',
                                          stroke: '#FFFFFFFF',
                                          strokeWidth: 1,
                                          class: 'oltb-btn__icon',
                                        })}
                                    </button>
                                </div>
                            `
                            : ''
                        }
                    </div>
                    <div class="${CLASS_TOOLBOX_SECTION}__group ${
      this.options.disableFeatureCreateLayerButton
        ? `${CLASS_TOOLBOX_SECTION}__group--topmost`
        : ''
    }">
                        <ul id="${ID_PREFIX}-feature-stack" class="${CLASS_TOOLBOX_LIST} ${CLASS_TOOLBOX_LIST}--selectable"></ul>
                    </div>
                </div>
            </div>

            <div id="contenedor-ubicacion">

            </div>
        `;

    ElementManager.getToolboxElement().insertAdjacentHTML('beforeend', html);
    const selecElement = document.getElementById('selectEje');
    const botonAgregarCapas = document.getElementById('añadirCapas');
    const useLoadingMapsStore = LoadingLayersStore();

    fillSelectElement();

    selecElement.addEventListener('change', () => {
      const selectedOption = Number(selecElement.value);
      const MapsLayers = LayerManager.getMapLayers();
      MideEje(MapsLayers, selectedOption, this.options.route);
    });

    botonAgregarCapas.addEventListener('click', async () => {
      if (useLoadingMapsStore.maximoCapas === true) {
        botonAgregarCapas.textContent = 'Ya no hay mas capas para mostrar';
        botonAgregarCapas.disable = true;
        botonAgregarCapas.style = 'background-color: #adb5bd; border-color: #adb5bd';
        Loading.hide();
      } else {
        Loading.show();
        await useLoadingMapsStore.obtenerMasCapas();
        // botonAgregarCapas.classList.add('oltb-btn oltb-btn--green-mid oltb-w-100')
        cargar_mapas();
        await Loading.hide();
      }
    });
  }

  createUIPropertiesButton(layerWrapper, callback, layerName) {
    const i18nKey = 'Propiedades';
    const opacityButton = DOM.createElement({
      element: 'button',
      class: `${CLASS_FUNC_BUTTON} ${CLASS_FUNC_BUTTON}--opacity propiedades-btn oltb-tippy`,
      title: TranslationManager.get(i18nKey),
      attributes: {
        type: 'button',
        'data-oltb-i18n': i18nKey,
      },
      listeners: {
        click: this.onLayerProperties.bind(
          this,
          layerWrapper,
          callback,
          layerName
        ),
      },
    });

    return opacityButton;
  }

  onLayerProperties(layerWrapper, callback) {
    this.doProperties(layerWrapper, callback);
  }
  doProperties(layerWrapper, callback) {
    this._callback = callback;
    const layerId = layerWrapper.getId();
    const elementId = `${ID_PREFIX}-map-${layerId}`;
    const quasarId = `${ID_PREFIX}-quasar-${layerId}`;
    const contenedor = document.getElementById(elementId);
    const prueba = contenedor.querySelector('.contenedor3');
    const wmsSource = new ImageWMS({
      url: layerWrapper.layer.sourceChangeKey_.target.urls[0],
      params: {
        layer: layerWrapper.layer.sourceChangeKey_.target.params_.LAYERS,
        LEGEND_OPTIONS: 'forceLabels:on',
      },
    });
    const legendUrl = wmsSource.getLegendUrl();

    const baseUrl = 'https://mide.monterrey.gob.mx/geoserver/wms/reflect?';
    const params = new URLSearchParams({
      LAYERS: layerWrapper.layer.sourceChangeKey_.target.params_.LAYERS,
      format: 'image/png8',
    });
    const constructedUrl = `${baseUrl}${params}`;

    if (!prueba) {
      contenedor.classList.add('prueba');
      contenedor.insertAdjacentHTML(
        'beforeend',
        `<div class='contenedor3' id=${quasarId}></div>`
      );
      const app = createApp(MenuOpacidad, {
        simbologia: legendUrl,
        miniMapa: constructedUrl,
        layerid: layerId,
      });
      app.use(Quasar);
      app.mount(`#${quasarId}`);

      const opacityInput = document.getElementById(`opacity-input-${layerId}`);
      const opacityOutput = document.getElementById(
        `opacity-output-${layerId}`
      );

      function update() {
        const opacity = parseFloat(opacityInput.value) / 100;
        layerWrapper.layer.setOpacity(opacity);
        opacityOutput.innerText = opacityInput.value + '%';
      }

      opacityInput.addEventListener('input', update);
      update();
    } else if (prueba.classList) {
      prueba.classList.toggle('oculto');
    }
  }
  doMapLayerAdded(event) {
    const isSilent = event.detail.isSilent;
    const layerWrapper = event.detail.layerWrapper;
    const disableOpacityButton =
      event.detail.disableMapLayerOpacityButton || false;
    this.createUIMapLayerItem(layerWrapper, {
      ...(!disableOpacityButton && {
        opacityButton: {
          function: this.createUIPropertiesButton.bind(this),
          callback: this.onLayerProperties.bind(this),
        },
      }),
    });
    if (!isSilent && this.options.onMapLayerAdded instanceof Function) {
      this.options.onMapLayerAdded(layerWrapper);
    }
  }
}
