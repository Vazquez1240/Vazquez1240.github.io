import { CoordinatesTool } from 'oltb/src/oltb/js/tools/CoordinatesTool';
import { TranslationManager } from 'src/utils/Herramientas/TranslationManager';
import { ShortcutKeys } from 'oltb/src/oltb/js/helpers/constants/ShortcutKeys';
import { ElementManager } from 'oltb/src/oltb/js/managers/ElementManager';

const CLASS_TOOLBOX_SECTION = 'oltb-toolbox-section';
const ID_PREFIX = 'oltb-coordinates';
const I18N_BASE = 'tools.coordinatesTool';
const I18N_BASE_COMMON = 'commons';

export class ToolCoordinates extends CoordinatesTool {
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
  }
  initToolboxHTML() {
    const i18n = TranslationManager.get(`${I18N_BASE}.toolbox`);
    const i18nCommon = TranslationManager.get(`${I18N_BASE_COMMON}.titles`);

    const html = `
            <div id="${ID_PREFIX}-toolbox" class="${CLASS_TOOLBOX_SECTION}">
                <div class="${CLASS_TOOLBOX_SECTION}__header oltb-toggleable" data-oltb-toggleable-target="${ID_PREFIX}-toolbox-collapsed">
                    <h5 style="font-size: 1.3rem; font-weight: bold" class="${CLASS_TOOLBOX_SECTION}__title" data-oltb-i18n="${I18N_BASE}.toolbox.titles.coordinates">${
      i18n.titles.coordinates
    }</h5>
                    <span class="${CLASS_TOOLBOX_SECTION}__icon oltb-tippy" data-oltb-i18n="${I18N_BASE_COMMON}.titles.toggleSection" title="${
      i18nCommon.toggleSection
    }"></span>
                </div>
                <div class="${CLASS_TOOLBOX_SECTION}__groups" id="${ID_PREFIX}-toolbox-collapsed" style="display: ${
      this.localStorage.isCollapsed ? 'none' : 'block'
    }">
                    <div class="${CLASS_TOOLBOX_SECTION}__group">
                        <label class="oltb-label" for="${ID_PREFIX}-format" data-oltb-i18n="${I18N_BASE}.toolbox.groups.formats.title">${
      i18n.groups.formats.title
    }</label>
                        <select id="${ID_PREFIX}-format" class="oltb-select">
                            <option value="DD" data-oltb-i18n="${I18N_BASE}.toolbox.groups.formats.dd">${
      i18n.groups.formats.dd
    }</option>
                            <option value="DMS" data-oltb-i18n="${I18N_BASE}.toolbox.groups.formats.dms">${
      i18n.groups.formats.dms
    }</option>
                        </select>
                    </div>
                    <div class="${CLASS_TOOLBOX_SECTION}__group">
                        <label class="oltb-label" data-oltb-i18n="${I18N_BASE}.toolbox.groups.coordinates.title">${
      i18n.groups.coordinates.title
    } <em>(Lat, Lon)</em></label>
                        <table class="oltb-table oltb-table--horizontal oltb-table--no-background oltb-table--tight-bottom-and-top oltb-mt-05" id="${ID_PREFIX}-table"></table>
                    </div>
                </div>
            </div>
        `;

    ElementManager.getToolboxElement().insertAdjacentHTML('beforeend', html);
  }
}
