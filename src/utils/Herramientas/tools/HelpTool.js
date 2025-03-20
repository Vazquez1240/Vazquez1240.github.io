import { HelpTool } from 'oltb/src/oltb/js/tools/HelpTool';
import { TranslationManager } from 'src/utils/Herramientas/TranslationManager';
import { ShortcutKeys } from 'oltb/src/oltb/js/helpers/constants/ShortcutKeys';

const I18N_BASE = 'tools.infoTool';

export class ToolHelp extends HelpTool {
  constructor(options = {}) {
    super(options);

    const i18n = TranslationManager.get('tools.helpTool');

    const button = this.button;
    button.setAttribute(
      'data-tippy-content',
      `${i18n.title} (${ShortcutKeys.helpTool})`
    );
    button.setAttribute(
      'data-tippy-content-post',
      `(${ShortcutKeys.infoTool})`
    );
    button.setAttribute('data-oltb-i18n', `${I18N_BASE}.title`);
  }
}
