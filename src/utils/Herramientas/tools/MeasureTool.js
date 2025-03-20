import { MeasureTool } from 'oltb/src/oltb/js/tools/MeasureTool';
import { ShortcutKeys } from 'oltb/src/oltb/js/helpers/constants/ShortcutKeys';
import { TranslationManager } from 'src/utils/Herramientas/TranslationManager';
import { ElementManager } from 'oltb/src/oltb/js/managers/ElementManager';

const CLASS_TOOLBOX_SECTION = 'oltb-toolbox-section';
const ID_PREFIX = 'oltb-measure';
const I18N_BASE = 'tools.measureTool';
const I18N_BASE_COMMON = 'commons';

export class ToolMeasure extends MeasureTool {
  constructor(options = {}) {
    super(options);

    const i18n = TranslationManager.get(I18N_BASE);

    const button = this.button;
    button.setAttribute(
      'data-tippy-content',
      `${i18n.title} (${ShortcutKeys.measureTool})`
    );
    button.setAttribute(
      'data-tippy-content-post',
      `(${ShortcutKeys.measureTool})`
    );
    button.setAttribute('data-oltb-i18n', `${I18N_BASE}.title`);
  }

  initToolboxHTML() {
    const i18n = TranslationManager.get(`${I18N_BASE}.toolbox`);
    const i18nCommon = TranslationManager.get(`${I18N_BASE_COMMON}.titles`);

    const html = `
            <div id="${ID_PREFIX}-toolbox" class="${CLASS_TOOLBOX_SECTION}">
                <div class="${CLASS_TOOLBOX_SECTION}__header oltb-toggleable" data-oltb-toggleable-target="${ID_PREFIX}-toolbox-collapsed">
                    <h5 style="font-size: 1.3rem; font-weight: bold" class="${CLASS_TOOLBOX_SECTION}__title" data-oltb-i18n="${I18N_BASE}.toolbox.titles.measure">${
      i18n.titles.measure
    }</h5>
                    <span class="${CLASS_TOOLBOX_SECTION}__icon oltb-tippy" data-oltb-i18n="${I18N_BASE_COMMON}.titles.toggleSection" title="${
      i18nCommon.toggleSection
    }"></span>
                </div>
                <div class="${CLASS_TOOLBOX_SECTION}__groups" id="${ID_PREFIX}-toolbox-collapsed" style="display: ${
      this.localStorage.isCollapsed ? 'none' : 'block'
    }">
                    <div class="${CLASS_TOOLBOX_SECTION}__group">
                        <label class="oltb-label" for="${ID_PREFIX}-type" data-oltb-i18n="${I18N_BASE}.toolbox.groups.type.title">${
      i18n.groups.type.title
    }</label>
                        <select id="${ID_PREFIX}-type" class="oltb-select">
                            <option value="LineString" data-oltb-i18n="${I18N_BASE}.toolbox.groups.type.lineString">${
      i18n.groups.type.lineString
    }</option>
                            <option value="Polygon" data-oltb-i18n="${I18N_BASE}.toolbox.groups.type.polygon">${
      i18n.groups.type.polygon
    }</option>
                        </select>
                    </div>
                    <div class="${CLASS_TOOLBOX_SECTION}__group ${CLASS_TOOLBOX_SECTION}__group--split-group">
                        <div class="${CLASS_TOOLBOX_SECTION}__group-part">
                            <label class="oltb-label" for="${ID_PREFIX}-stroke-color" data-oltb-i18n="${I18N_BASE}.toolbox.groups.strokeColor.title">${
      i18n.groups.strokeColor.title
    }</label>
                            <div id="${ID_PREFIX}-stroke-color" class="oltb-color-input oltb-color-tippy" data-oltb-color-target="#${ID_PREFIX}-stroke-color" data-oltb-color="${
      this.localStorage.strokeColor
    }" tabindex="0">
                                <div class="oltb-color-input__inner" style="background-color: ${
                                  this.localStorage.strokeColor
                                };"></div>
                            </div>
                        </div>
                        <div class="${CLASS_TOOLBOX_SECTION}__group-part">
                            <label class="oltb-label" for="${ID_PREFIX}-fill-color" data-oltb-i18n="${I18N_BASE}.toolbox.groups.fillColor.title">${
      i18n.groups.fillColor.title
    }</label>
                            <div id="${ID_PREFIX}-fill-color" class="oltb-color-input oltb-color-tippy" data-oltb-color-target="#${ID_PREFIX}-fill-color" data-oltb-color="${
      this.localStorage.fillColor
    }" tabindex="0">
                                <div class="oltb-color-input__inner" style="background-color: ${
                                  this.localStorage.fillColor
                                };"></div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        `;

    ElementManager.getToolboxElement().insertAdjacentHTML('beforeend', html);
  }
}
