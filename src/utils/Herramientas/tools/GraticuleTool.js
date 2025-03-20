import { GraticuleTool } from 'oltb/src/oltb/js/tools/GraticuleTool';
import { TranslationManager } from 'src/utils/Herramientas/TranslationManager';
import { ShortcutKeys } from 'oltb/src/oltb/js/helpers/constants/ShortcutKeys';

const I18N_BASE = 'tools.graticuleTool';

export class ToolGraticule extends GraticuleTool {
  constructor(options = {}) {
    super(options);

    const i18n = TranslationManager.get(I18N_BASE);

    const button = this.button;
    button.setAttribute(
      'data-tippy-content',
      `${i18n.title} (${ShortcutKeys.graticuleTool})`
    );
    button.setAttribute(
      'data-tippy-content-post',
      `(${ShortcutKeys.graticuleTool})`
    );
    button.setAttribute('data-oltb-i18n', `${I18N_BASE}.title`);
  }
}
