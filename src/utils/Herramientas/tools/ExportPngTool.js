import { ExportPngTool } from 'oltb/src/oltb/js/tools/ExportPngTool';
import { TranslationManager } from 'src/utils/Herramientas/TranslationManager';
import { ShortcutKeys } from 'oltb/src/oltb/js/helpers/constants/ShortcutKeys';

const I18N_BASE = 'tools.exportPngTool';

export class ToolExportPng extends ExportPngTool {
  constructor(options = {}) {
    super(options);

    const i18n = TranslationManager.get(I18N_BASE);

    const button = this.button;
    button.setAttribute(
      'data-tippy-content',
      `${i18n.title} (${ShortcutKeys.exportPngTool})`
    );
    button.setAttribute(
      'data-tippy-content-post',
      `(${ShortcutKeys.exportPngTool})`
    );
    button.setAttribute('data-oltb-i18n', `${I18N_BASE}.title`);
  }
}
