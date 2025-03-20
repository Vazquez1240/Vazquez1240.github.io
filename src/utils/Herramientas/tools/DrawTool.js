import { DrawTool } from 'oltb/src/oltb/js/tools/DrawTool';
import { TranslationManager } from 'src/utils/Herramientas/TranslationManager';
import { ShortcutKeys } from 'oltb/src/oltb/js/helpers/constants/ShortcutKeys';
import { ElementManager } from 'oltb/src/oltb/js/managers/ElementManager';

const CLASS_TOOLBOX_SECTION = 'oltb-toolbox-section';
const ID_PREFIX = 'oltb-draw';
const I18N_BASE = 'tools.drawTool';
const I18N_BASE_COMMON = 'commons';

export class ToolDraw extends DrawTool {
  constructor(options = {}) {
    super(options);

    const i18n = TranslationManager.get(I18N_BASE);

    const button = this.button;
    button.setAttribute(
      'data-tippy-content',
      `${i18n.title} (${ShortcutKeys.drawTool})`
    );
    button.setAttribute(
      'data-tippy-content-post',
      `(${ShortcutKeys.drawTool})`
    );
    button.setAttribute('data-oltb-i18n', `${I18N_BASE}.title`);
  }
  initToolboxHTML() {
    const i18n = TranslationManager.get(`${I18N_BASE}.toolbox`);
    const i18nCommon = TranslationManager.get(`${I18N_BASE_COMMON}.titles`);

    const html = `
            <div id="${ID_PREFIX}-toolbox" class="${CLASS_TOOLBOX_SECTION}">
                <div class="${CLASS_TOOLBOX_SECTION}__header oltb-toggleable" data-oltb-toggleable-target="${ID_PREFIX}-toolbox-collapsed">
                    <h5 style="font-size: 1.3rem; font-weight: bold" class="${CLASS_TOOLBOX_SECTION}__title" data-oltb-i18n="${I18N_BASE}.toolbox.titles.draw">${
      i18n.titles.draw
    }</h5>
                    <span class="${CLASS_TOOLBOX_SECTION}__icon oltb-tippy" data-oltb-i18n="${I18N_BASE_COMMON}.titles.toggleSection" title="${
      i18nCommon.toggleSection
    }"></span>
                </div>
                <div class="${CLASS_TOOLBOX_SECTION}__groups" id="${ID_PREFIX}-toolbox-collapsed" style="display: ${
      this.localStorage.isCollapsed ? 'none' : 'block'
    }">
                    <div class="${CLASS_TOOLBOX_SECTION}__group">
                        <label class="oltb-label" for="${ID_PREFIX}-type" data-oltb-i18n="${I18N_BASE}.toolbox.groups.shapes.title">${
      i18n.groups.shapes.title
    }</label>
                        <select id="${ID_PREFIX}-type" class="oltb-select">
                            <option value="Circle" data-oltb-i18n="${I18N_BASE}.toolbox.groups.shapes.circle">${
      i18n.groups.shapes.circle
    }</option>
                            <option value="Square" data-oltb-i18n="${I18N_BASE}.toolbox.groups.shapes.square">${
      i18n.groups.shapes.square
    }</option>
                            <option value="Rectangle" data-oltb-i18n="${I18N_BASE}.toolbox.groups.shapes.rectangle">${
      i18n.groups.shapes.rectangle
    }</option>
                            <option value="LineString" data-oltb-i18n="${I18N_BASE}.toolbox.groups.shapes.lineString">${
      i18n.groups.shapes.lineString
    }</option>
                            <option value="Point" data-oltb-i18n="${I18N_BASE}.toolbox.groups.shapes.point">${
      i18n.groups.shapes.point
    }</option>
                            <option value="Polygon" data-oltb-i18n="${I18N_BASE}.toolbox.groups.shapes.polygon">${
      i18n.groups.shapes.polygon
    }</option>
                        </select>
                    </div>
                    <div class="${CLASS_TOOLBOX_SECTION}__group ${CLASS_TOOLBOX_SECTION}__group--split-group">
                        <div class="${CLASS_TOOLBOX_SECTION}__group-part">
                            <label class="oltb-label" for="${ID_PREFIX}-intersection-enable" data-oltb-i18n="${I18N_BASE}.toolbox.groups.intersectable.title">${
      i18n.groups.intersectable.title
    }</label>
                            <select id="${ID_PREFIX}-intersection-enable" class="oltb-select">
                                <option value="false" data-oltb-i18n="${I18N_BASE}.toolbox.groups.intersectable.false">${
      i18n.groups.intersectable.false
    }</option>
                                <option value="true" data-oltb-i18n="${I18N_BASE}.toolbox.groups.intersectable.true">${
      i18n.groups.intersectable.true
    }</option>
                            </select>
                        </div>
                        <div class="${CLASS_TOOLBOX_SECTION}__group-part">
                            <label class="oltb-label" for="${ID_PREFIX}-stroke-width" data-oltb-i18n="${I18N_BASE}.toolbox.groups.strokeWidth.title">${
      i18n.groups.strokeWidth.title
    }</label>
                            <select id="${ID_PREFIX}-stroke-width" class="oltb-select">
                                <option value="1">1</option>
                                <option value="1.25">1.25</option>
                                <option value="1.5">1.5</option>
                                <option value="2">2</option>
                                <option value="2.5">2.5</option>
                                <option value="3">3</option>
                                <option value="4">4</option>
                                <option value="5">5</option>
                                <option value="6">6</option>
                                <option value="7">7</option>
                                <option value="8">8</option>
                                <option value="9">9</option>
                                <option value="10">10</option>
                            </select>
                        </div>
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
