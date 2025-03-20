import { MyLocationTool } from 'oltb/src/oltb/js/tools/MyLocationTool';
import { TranslationManager } from 'src/utils/Herramientas/TranslationManager';
import { ShortcutKeys } from 'oltb/src/oltb/js/helpers/constants/ShortcutKeys';

const I18N_BASE = 'tools.myLocationTool';

const DefaultOptions = Object.freeze({
    title: 'Mi ubi',
    enableHighAccuracy: true,
    timeout: 10000,
    description: 'This is the location that the browser was able to find. It might not be your actual location.',
    markerLabelUseEllipsisAfter: 20,
    markerLabelUseUpperCase: false,
    onInitiated: undefined,
    onClicked: undefined,
    onLocationFound: undefined,
    onError: undefined
});

export class ToolMyLocation extends MyLocationTool {
  constructor(options = {}) {
    super(options);

    const i18n = TranslationManager.get(I18N_BASE);

    const button = this.button;
    button.setAttribute(
      'data-tippy-content',
      `${i18n.title} (${ShortcutKeys.myLocationTool})`
    );
    button.setAttribute(
      'data-tippy-content-post',
      `(${ShortcutKeys.myLocationTool})`
    );
    button.setAttribute('data-oltb-i18n', `${I18N_BASE}.title`);
  }
}
