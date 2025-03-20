import { OverviewTool } from 'oltb/src/oltb/js/tools/OverviewTool';
import { TranslationManager } from 'src/utils/Herramientas/TranslationManager';
import { ShortcutKeys } from 'oltb/src/oltb/js/helpers/constants/ShortcutKeys';
import { ElementManager } from 'oltb/src/oltb/js/managers/ElementManager';

const CLASS_TOOLBOX_SECTION = 'oltb-toolbox-section';
const ID_PREFIX = 'oltb-overview';
const I18N_BASE = 'tools.overviewTool';
const I18N_BASE_COMMON = 'commons';

export class ToolOverview extends OverviewTool {
  constructor(options = {}) {
    super(options);

    const i18n = TranslationManager.get(I18N_BASE);

    const button = this.button;
    button.setAttribute(
      'data-tippy-content',
      `${i18n.title} (${ShortcutKeys.overviewTool})`
    );
    button.setAttribute(
      'data-tippy-content-post',
      `(${ShortcutKeys.overviewTool})`
    );
    button.setAttribute('data-oltb-i18n', `${I18N_BASE}.title`);
  }

  initToolboxHTML() {
    const i18n = TranslationManager.get(`${I18N_BASE}.toolbox`);
    const i18nCommon = TranslationManager.get(`${I18N_BASE_COMMON}.titles`);

    const html = `
            <div id="${ID_PREFIX}-toolbox" class="${CLASS_TOOLBOX_SECTION}">
                <div class="${CLASS_TOOLBOX_SECTION}__header oltb-toggleable" data-oltb-toggleable-target="${ID_PREFIX}-toolbox-collapsed">
                <h5 style="font-size: 1.3rem; font-weight: bold" class="${CLASS_TOOLBOX_SECTION}__title" data-oltb-i18n="${I18N_BASE}.toolbox.titles.overview">${
      i18n.titles.overview
    }</h5>
                    <span class="${CLASS_TOOLBOX_SECTION}__icon oltb-tippy" data-oltb-i18n="${I18N_BASE_COMMON}.titles.toggleSection" title="${
      i18nCommon.toggleSection
    }"></span>
                </div>
                <div class="${CLASS_TOOLBOX_SECTION}__groups" id="${ID_PREFIX}-toolbox-collapsed" style="display: ${
      this.localStorage.isCollapsed ? 'none' : 'block'
    }">
                    <div class="${CLASS_TOOLBOX_SECTION}__group" id="${ID_PREFIX}-target"></div>
                </div>
            </div>
        `;

    ElementManager.getToolboxElement().insertAdjacentHTML('beforeend', html);
  }
}
