import { EditTool } from 'oltb/src/oltb/js/tools/EditTool';
import { TranslationManager } from 'src/utils/Herramientas/TranslationManager';
import { ShortcutKeys } from 'oltb/src/oltb/js/helpers/constants/ShortcutKeys';
import { getIcon, SvgPaths } from 'oltb/src/oltb/js/icons/GetIcon';
import { ElementManager } from 'oltb/src/oltb/js/managers/ElementManager';

const CLASS_TOOLBOX_SECTION = 'oltb-toolbox-section';
const ID_PREFIX = 'oltb-edit';
const I18N_BASE = 'tools.editTool';
const I18N_BASE_COMMON = 'commons';

const DefaultButtonProps = Object.freeze({
  width: 20,
  height: 20,
  fill: '#FFFFFFFF',
  stroke: 'none',
  class: 'oltb-btn__icon',
});

export class ToolEdit extends EditTool {
  constructor(options = {}) {
    super(options);

    const i18n = TranslationManager.get(I18N_BASE);

    const button = this.button;
    button.setAttribute(
      'data-tippy-content',
      `${i18n.title} (${ShortcutKeys.editTool})`
    );
    button.setAttribute(
      'data-tippy-content-post',
      `(${ShortcutKeys.editTool})`
    );
    button.setAttribute('data-oltb-i18n', `${I18N_BASE}.title`);
  }
  initToolboxHTML() {
    const i18n = TranslationManager.get(`${I18N_BASE}.toolbox`);
    const i18nCommon = TranslationManager.get(`${I18N_BASE_COMMON}.titles`);

    const buttonClasses = 'class="oltb-btn oltb-btn--blue-mid oltb-tippy"';
    const html = `
            <div id="${ID_PREFIX}-toolbox" class="${CLASS_TOOLBOX_SECTION}">
                <div class="${CLASS_TOOLBOX_SECTION}__header oltb-toggleable" data-oltb-toggleable-target="${ID_PREFIX}-toolbox-collapsed">
                    <h5 style="font-size: 1.3rem; font-weight: bold" class="${CLASS_TOOLBOX_SECTION}__title" data-oltb-i18n="${I18N_BASE}.toolbox.titles.edit">${
      i18n.titles.edit
    }</h5>
                    <span class="${CLASS_TOOLBOX_SECTION}__icon oltb-tippy" data-oltb-i18n="${I18N_BASE_COMMON}.titles.toggleSection" title="${
      i18nCommon.toggleSection
    }"></span>
                </div>
                <div class="${CLASS_TOOLBOX_SECTION}__groups" id="${ID_PREFIX}-toolbox-collapsed" style="display: ${
      this.localStorage.isCollapsed ? 'none' : 'block'
    }">
                    <div class="${CLASS_TOOLBOX_SECTION}__group ${CLASS_TOOLBOX_SECTION}__group--sub-toolbar">
                        <label class="oltb-label" data-oltb-i18n="${I18N_BASE}.toolbox.groups.misc.title">${
      i18n.groups.misc.title
    }</label>
                        <button type="button" id="${ID_PREFIX}-delete-selected-button" ${buttonClasses} data-oltb-i18n="${I18N_BASE}.toolbox.groups.misc.delete" title="${
      i18n.groups.misc.delete
    }">
                            ${getIcon({
                              ...DefaultButtonProps,
                              path: SvgPaths.trash.stroked,
                            })}
                        </button>
                        <button type="button" id="${ID_PREFIX}-rotate-selected-button" ${buttonClasses} data-oltb-i18n="${I18N_BASE}.toolbox.groups.misc.rotate" title="${
      i18n.groups.misc.rotate
    }">
                            ${getIcon({
                              ...DefaultButtonProps,
                              path: SvgPaths.arrowRepeat.stroked,
                            })}
                        </button>
                        <button type="button" id="${ID_PREFIX}-info-button" ${buttonClasses} data-oltb-i18n="${I18N_BASE}.toolbox.groups.misc.geometryData" title="${
      i18n.groups.misc.geometryData
    }">
                            ${getIcon({
                              ...DefaultButtonProps,
                              path: SvgPaths.infoCircle.stroked,
                            })}
                        </button>
                    </div>
                    <div class="${CLASS_TOOLBOX_SECTION}__group ${CLASS_TOOLBOX_SECTION}__group--sub-toolbar">
                        <label class="oltb-label" data-oltb-i18n="${I18N_BASE}.toolbox.groups.shapes.title">${
      i18n.groups.shapes.title
    }</label>
                        <button type="button" id="${ID_PREFIX}-union-selected-button" ${buttonClasses} data-oltb-i18n="${I18N_BASE}.toolbox.groups.shapes.union" title="${
      i18n.groups.shapes.union
    }">
                            ${getIcon({
                              ...DefaultButtonProps,
                              path: SvgPaths.union.mixed,
                            })}
                        </button>
                        <button type="button" id="${ID_PREFIX}-intersect-selected-button" ${buttonClasses} data-oltb-i18n="${I18N_BASE}.toolbox.groups.shapes.intersect" title="${
      i18n.groups.shapes.intersect
    }">
                            ${getIcon({
                              ...DefaultButtonProps,
                              path: SvgPaths.intersect.mixed,
                            })}
                        </button>
                        <button type="button" id="${ID_PREFIX}-exclude-selected-button" ${buttonClasses} data-oltb-i18n="${I18N_BASE}.toolbox.groups.shapes.exclude" title="${
      i18n.groups.shapes.exclude
    }">
                            ${getIcon({
                              ...DefaultButtonProps,
                              path: SvgPaths.exclude.mixed,
                            })}
                        </button>
                        <button type="button" id="${ID_PREFIX}-difference-selected-button" ${buttonClasses} data-oltb-i18n="${I18N_BASE}.toolbox.groups.shapes.difference" title="${
      i18n.groups.shapes.difference
    }">
                            ${getIcon({
                              ...DefaultButtonProps,
                              path: SvgPaths.subtract.mixed,
                            })}
                        </button>
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
