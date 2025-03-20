import { ZoomInTool } from 'oltb/src/oltb/js/tools/ZoomInTool';
import { TranslationManager } from 'src/utils/Herramientas/TranslationManager';
import { ShortcutKeys } from 'oltb/src/oltb/js/helpers/constants/ShortcutKeys';

const I18N_BASE = 'tools.zoomInTool';

class ToolZoomIn extends ZoomInTool {
  constructor(options = {}) {
    super(options);

    const i18n = TranslationManager.get(I18N_BASE);

    const button = this.button;
    button.setAttribute(
      'data-tippy-content',
      `${i18n.title} (${ShortcutKeys.zoomInTool})`
    );
    button.setAttribute(
      'data-tippy-content-post',
      `(${ShortcutKeys.zoomInTool})`
    );
    button.setAttribute('data-oltb-i18n', `${I18N_BASE}.title`);
  }
}

export { ToolZoomIn };
