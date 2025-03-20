import { ZoomOutTool } from 'oltb/src/oltb/js/tools/ZoomOutTool';
import { ShortcutKeys } from 'oltb/src/oltb/js/helpers/constants/ShortcutKeys';
import { TranslationManager } from 'src/utils/Herramientas/TranslationManager';

const I18N_BASE = 'tools.zoomOutTool';

class ToolZoomOut extends ZoomOutTool {
  constructor(options = {}) {
    super(options);

    const i18n = TranslationManager.get(I18N_BASE);

    const button = this.button;
    button.setAttribute(
      'data-tippy-content',
      `${i18n.title} (${ShortcutKeys.zoomOutTool})`
    );
    button.setAttribute(
      'data-tippy-content-post',
      `(${ShortcutKeys.zoomOutTool})`
    );
    button.setAttribute('data-oltb-i18n', `${I18N_BASE}.title`);
  }
}

export { ToolZoomOut };
