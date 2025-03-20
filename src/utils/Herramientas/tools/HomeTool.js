import { HomeTool } from 'oltb/src/oltb/js/tools/HomeTool';
import { TranslationManager } from 'src/utils/Herramientas/TranslationManager';
import { ShortcutKeys } from 'oltb/src/oltb/js/helpers/constants/ShortcutKeys';
import { StateManager } from 'oltb/src/oltb/js/managers/StateManager';
import { LocalStorageKeys } from 'oltb/src/oltb/js/helpers/constants/LocalStorageKeys';
import { ConfigManager } from 'oltb/src/oltb/js/managers/ConfigManager';

const I18N_BASE = 'tools.homeTool'; // Cambia el valor de i18n para la nueva herramienta

class ToolHome extends HomeTool {
  constructor(options = {}) {
    super(options);

    const LocalStorageNodeName = LocalStorageKeys.homeTool;

    const DefaultLocation = ConfigManager.getConfig().location.default;

    const LocalStorageDefaults = Object.freeze({
      lon: -100.3001,
      lat: 25.6866,
      zoom: 10,
      rotation: DefaultLocation.rotation,
    });

    this.localStorage = StateManager.getAndMergeStateObject(
      LocalStorageNodeName,
      LocalStorageDefaults
    );

    const i18n = TranslationManager.get(I18N_BASE); // Cambia el valor de i18n para la nueva herramienta

    // Actualiza el botón con el nuevo valor de i18n
    const button = this.button;
    button.setAttribute(
      'data-tippy-content',
      `${i18n.title} (${ShortcutKeys.homeTool})`
    );
    button.setAttribute(
      'data-tippy-content-post',
      `(${ShortcutKeys.homeTool})`
    );
    button.setAttribute('data-oltb-i18n', `${I18N_BASE}.title`);
  }
}

export { ToolHome };
