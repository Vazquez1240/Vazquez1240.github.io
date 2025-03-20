import { SplitViewTool } from 'oltb/src/oltb/js/tools/SplitViewTool';
import { TranslationManager } from 'src/utils/Herramientas/TranslationManager';
import { ShortcutKeys } from 'oltb/src/oltb/js/helpers/constants/ShortcutKeys';
import { ElementManager } from 'oltb/src/oltb/js/managers/ElementManager';

const CLASS_TOOLBOX_SECTION = 'oltb-toolbox-section';
const ID_PREFIX = 'oltb-split-view';
const I18N_BASE = 'tools.splitViewTool';
const I18N_BASE_COMMON = 'commons';


export class ToolSplitView extends SplitViewTool {
  constructor(options = {}) {
    super(options);

    const i18n = TranslationManager.get(I18N_BASE);

    const button = this.button;
    button.setAttribute(
      'data-tippy-content',
      `${i18n.title} (${ShortcutKeys.splitViewTool})`
    );
    button.setAttribute(
      'data-tippy-content-post',
      `(${ShortcutKeys.splitViewTool})`
    );
    button.setAttribute('data-oltb-i18n', `${I18N_BASE}.title`);
  }
  initToolboxHTML() {
    const i18n = TranslationManager.get(`${I18N_BASE}.toolbox`);
    const i18nCommon = TranslationManager.get(`${I18N_BASE_COMMON}.titles`);

    const html = `
            <div id="${ID_PREFIX}-toolbox" class="${CLASS_TOOLBOX_SECTION}">
                <div class="${CLASS_TOOLBOX_SECTION}__header oltb-toggleable" data-oltb-toggleable-target="${ID_PREFIX}-toolbox-collapsed">
                    <h5 style="font-size: 1.3rem; font-weight: bold" class="${CLASS_TOOLBOX_SECTION}__title" data-oltb-i18n="${I18N_BASE}.toolbox.titles.splitView">${
      i18n.titles.splitView
    }</h5>
                    <span class="${CLASS_TOOLBOX_SECTION}__icon oltb-tippy" data-oltb-i18n="${I18N_BASE_COMMON}.titles.toggleSection" title="${
      i18nCommon.toggleSection
    }"></span>
                </div>
                <div class="${CLASS_TOOLBOX_SECTION}__groups" id="${ID_PREFIX}-toolbox-collapsed" style="display: ${
      this.localStorage.isCollapsed ? 'none' : 'block'
    }">
                    <div class="${CLASS_TOOLBOX_SECTION}__group ${CLASS_TOOLBOX_SECTION}__group--split-group">
                        <div class="${CLASS_TOOLBOX_SECTION}__group-part">
                            <label class="oltb-label" for="${ID_PREFIX}-left-source" data-oltb-i18n="${I18N_BASE}.toolbox.groups.leftSide.title">${
      i18n.groups.leftSide.title
    }</label>
                            <select id="${ID_PREFIX}-left-source" class="oltb-select"></select>
                        </div>
                        <div class="${CLASS_TOOLBOX_SECTION}__group-part">
                            <label class="oltb-label" for="${ID_PREFIX}-source" data-oltb-i18n="${I18N_BASE}.toolbox.groups.rightSide.title">${
      i18n.groups.rightSide.title
    }</label>
                            <select id="${ID_PREFIX}-right-source" class="oltb-select"></select>
                        </div>
                    </div>
                    <div class="${CLASS_TOOLBOX_SECTION}__group">
                        <button type="button" id="${ID_PREFIX}-swap-button" class="oltb-btn oltb-btn--green-mid oltb-w-100" data-oltb-i18n="${I18N_BASE}.toolbox.groups.swapSides.swap">${
      i18n.groups.swapSides.swap
    }</button>
                    </div>
                </div>
            </div>
        `;

    ElementManager.getToolboxElement().insertAdjacentHTML('beforeend', html);
  }
}
