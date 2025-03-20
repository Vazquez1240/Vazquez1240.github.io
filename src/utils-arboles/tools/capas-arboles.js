import { LayerTool } from 'oltb/src/oltb/js/tools/LayerTool';
import { TranslationManager } from 'src/utils/Herramientas/TranslationManager';
import { ElementManager } from 'oltb/src/oltb/js/managers/ElementManager';
import { getIcon, SvgPaths } from 'oltb/src/oltb/js/icons/GetIcon';
import { DOM } from 'oltb/src/oltb/js/helpers/browser/DOM';
import { createApp } from 'vue';
import MenuOpacidad from 'components/MenuPropiedades.vue';
import { Loading, Notify, Quasar } from 'quasar';
import { ImageWMS } from 'ol/source';
// import '../../../css/toolbox.scss';
import '../../../src/css/toolbox.scss'
import { ShortcutKeys } from 'oltb/src/oltb/js/helpers/constants/ShortcutKeys';
import { fillSelectElement } from 'src/utils/Herramientas/EjesMide/apiEjes';
import { LoadingLayersStore } from 'stores/capas';
import { MideEje } from 'src/utils/Herramientas/EjesMide/apiEjes';
import { LayerManager } from 'oltb/src/oltb/js/managers/LayerManager';
import cargar_mapas from 'src/layers/DefaultLayers';
import { LogManager } from 'oltb/src/oltb/js/managers/LogManager';

const I18N_BASE = 'tools.layerTool';
const CLASS_TOOLBOX_SECTION = 'oltb-toolbox-section';
const CLASS_TOOLBOX_LIST = 'oltb-toolbox-list';
const ID_PREFIX = 'oltb-layer';
const I18N_BASE_COMMON = 'commons';
const CLASS_FUNC_BUTTON = 'oltb-func-btn';

export class ToolLayerMapas extends LayerTool {
  constructor(options = {}) {
    super(options);

    const i18n = TranslationManager.get(I18N_BASE);

    const button = this.button;
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

    console.log(i18nCommon.toggleVisibility, 'i18nCommon')

    const html = `
            <div id="${ID_PREFIX}-toolbox" class="${CLASS_TOOLBOX_SECTION}">
                <div class="${CLASS_TOOLBOX_SECTION}__header oltb-toggleable" data-oltb-toggleable-target="${ID_PREFIX}-map-toolbox-collapsed">
                    <h5 style="font-size: 1.5rem;" class="${CLASS_TOOLBOX_SECTION}__title" data-oltb-i18n="${I18N_BASE}.toolbox.titles.mapLayers">Capas del Mapa</h5>
                    <span class="${CLASS_TOOLBOX_SECTION}__icon oltb-tippy" data-oltb-i18n="${I18N_BASE_COMMON}.titles.toggleSection" title="www${
      i18nCommon.toggleSection
    }"></span>
                </div>
                <div class="${CLASS_TOOLBOX_SECTION}__groups" id="${ID_PREFIX}-map-toolbox-collapsed" style="display: ${
      this.localStorage[`${ID_PREFIX}-map-toolbox-collapsed`] ? 'none' : 'block'
    }">
                   <div class="${CLASS_TOOLBOX_SECTION}__groups">
                   </div>
                    <div class="${CLASS_TOOLBOX_SECTION}__group ${
      this.options.disableMapCreateLayerButton
        ? `${CLASS_TOOLBOX_SECTION}__group--topmost`
        : ''
    }">
                        <ul id="${ID_PREFIX}-map-stack" class="${CLASS_TOOLBOX_LIST}"></ul>
                    </div>
                </div>

                <!-- El display none de este div, no se debe de quitar a menos que se quiera ver las features -->
                <div style="display: none" class="${CLASS_TOOLBOX_SECTION}__header oltb-toggleable" data-oltb-toggleable-target="${ID_PREFIX}-feature-toolbox-collapsed">
                    <h4 class="${CLASS_TOOLBOX_SECTION}__title" data-oltb-i18n="${I18N_BASE}.toolbox.titles.featureLayers">${
      i18n.titles.featureLayers
    }</h4>
                    <span  class="${CLASS_TOOLBOX_SECTION}__icon oltb-tippy" data-oltb-i18n="${I18N_BASE_COMMON}.titles.toggleSection" title="${i18nCommon.toggleSection}"></span>
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
        `;

    ElementManager.getToolboxElement().insertAdjacentHTML('beforeend', html);

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
    if(layerWrapper.layer.sourceChangeKey_.target.params_ !== undefined){
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

        const initialOpacity = layerWrapper.layer.getOpacity() * 100; // Obtener la opacidad inicial de la capa
        const opacityInput = document.getElementById(`opacity-input-${layerId}`);
        const opacityOutput = document.getElementById(`opacity-output-${layerId}`);

        // Setear el valor inicial del input de opacidad
        opacityInput.value = initialOpacity;
        opacityOutput.innerText = `${initialOpacity}%`;

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
    } else {
      Notify.create({
        timeout: 1300,
        color: 'red-5',
        message: 'Esta capa no contiene simbología',
      });
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
