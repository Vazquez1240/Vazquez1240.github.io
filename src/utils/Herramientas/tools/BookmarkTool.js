import { BookmarkTool } from 'oltb/src/oltb/js/tools/BookmarkTool';
import { TranslationManager } from 'src/utils/Herramientas/TranslationManager';
import { ShortcutKeys } from 'oltb/src/oltb/js/helpers/constants/ShortcutKeys';
import { getIcon, SvgPaths } from 'oltb/src/oltb/js/icons/GetIcon';
import { ElementManager } from 'oltb/src/oltb/js/managers/ElementManager';

const CLASS_TOOLBOX_SECTION = 'oltb-toolbox-section';
const CLASS_TOOLBOX_LIST = 'oltb-toolbox-list';
const ID_PREFIX = 'oltb-bookmark';
const I18N_BASE = 'tools.bookmarkTool';
const I18N_BASE_COMMON = 'commons';

export class ToolBookmark extends BookmarkTool {
  constructor(options = {}) {
    super(options);

    const i18n = TranslationManager.get(I18N_BASE);

    const button = this.button;
    button.setAttribute(
      'data-tippy-content',
      `${i18n.title} (${ShortcutKeys.bookmarkTool})`
    );
    button.setAttribute(
      'data-tippy-content-post',
      `(${ShortcutKeys.bookmarkTool})`
    );
    button.setAttribute('data-oltb-i18n', `${I18N_BASE}.title`);
  }

  initToolboxHTML() {
    const i18n = TranslationManager.get(`${I18N_BASE}.toolbox`);
    const i18nCommon = TranslationManager.get(`${I18N_BASE_COMMON}.titles`);

    const html = `
            <div id="${ID_PREFIX}-toolbox" class="${CLASS_TOOLBOX_SECTION}">
                <div class="${CLASS_TOOLBOX_SECTION}__header oltb-toggleable" data-oltb-toggleable-target="${ID_PREFIX}-toolbox-collapsed">
                    <h5 style="font-size: 1.3rem; font-weight: bold" class="${CLASS_TOOLBOX_SECTION}__title" data-oltb-i18n="${I18N_BASE}.toolbox.titles.bookmarks">${
      i18n.titles.bookmarks
    }</h5>
                    <span class="${CLASS_TOOLBOX_SECTION}__icon oltb-tippy" data-oltb-i18n="${I18N_BASE_COMMON}.titles.toggleSection" title="${
      i18nCommon.toggleSection
    }"></span>
                </div>
                <div class="${CLASS_TOOLBOX_SECTION}__groups" id="${ID_PREFIX}-toolbox-collapsed" style="display: ${
      this.localStorage.isCollapsed ? 'none' : 'block'
    }">
                    <div class="${CLASS_TOOLBOX_SECTION}__group">
                        <div class="oltb-input-button-group">
                            <input type="text" id="${ID_PREFIX}-add-text" class="oltb-input" data-oltb-i18n="${I18N_BASE}.toolbox.groups.addBookmark.placeholder" placeholder="${
      i18n.groups.addBookmark.placeholder
    }">
                            <button type="button" id="${ID_PREFIX}-add-button" class="oltb-btn oltb-btn--green-mid oltb-tippy" data-oltb-i18n="${I18N_BASE}.toolbox.groups.addBookmark.add" title="${
      i18n.groups.addBookmark.add
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
                    </div>
                    <div class="${CLASS_TOOLBOX_SECTION}__group">
                        <ul id="${ID_PREFIX}-stack" class="${CLASS_TOOLBOX_LIST}"></ul>
                    </div>
                </div>
            </div>
        `;

    ElementManager.getToolboxElement().insertAdjacentHTML('beforeend', html);
  }
}
