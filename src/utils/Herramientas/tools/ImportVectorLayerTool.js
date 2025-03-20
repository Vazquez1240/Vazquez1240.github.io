import { ImportVectorLayerTool } from 'oltb/src/oltb/js/tools/ImportVectorLayerTool';
import { ShortcutKeys } from 'oltb/src/oltb/js/helpers/constants/ShortcutKeys';
import { TranslationManager } from 'src/utils/Herramientas/TranslationManager';

const I18N_BASE = 'tools.importVectorLayerTool';

export class ToolVectorLayer extends ImportVectorLayerTool {
  constructor(options = {}) {
    super(options);

    const i18n = TranslationManager.get(I18N_BASE);

    const button = this.button;
    button.setAttribute(
      'data-tippy-content',
      `${i18n.title} (${ShortcutKeys.importVectorLayerTool})`
    );
    button.setAttribute(
      'data-tippy-content-post',
      `(${ShortcutKeys.importVectorLayerTool})`
    );
    button.setAttribute('data-oltb-i18n', `${I18N_BASE}.title`);
  }
}
