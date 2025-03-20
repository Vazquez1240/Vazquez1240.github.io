import { DebugInfoTool } from 'oltb/src/oltb/js/tools/DebugInfoTool';
import { TranslationManager } from 'src/utils/Herramientas/TranslationManager';
import { ShortcutKeys } from 'oltb/src/oltb/js/helpers/constants/ShortcutKeys';

const I18N_BASE = 'tools.debugInfoTool';

export class ToolDebugInfo extends DebugInfoTool {
  constructor(options = {}) {
    super(options);
    const i18n = TranslationManager.get(I18N_BASE);

    const button = this.button;
    button.setAttribute(
      'data-tippy-content',
      `${i18n.title} (${ShortcutKeys.debugInfoTool})`
    );
    button.setAttribute(
      'data-tippy-content-post',
      `(${ShortcutKeys.debugInfoTool})`
    );
    button.setAttribute('data-oltb-i18n', `${I18N_BASE}.title`);
  }
}
