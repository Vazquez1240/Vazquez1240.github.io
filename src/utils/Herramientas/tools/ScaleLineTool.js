import { ScaleLineTool } from 'oltb/src/oltb/js/tools/ScaleLineTool';
// import {TranslationManager} from 'src/utils/Herramientas/TranslationManager';
// import {ShortcutKeys} from 'oltb/src/oltb/js/helpers/constants/ShortcutKeys';
import { DOM } from 'oltb/src/oltb/js/helpers/browser/DOM';

// const I18N_BASE = 'tools.scaleLineTool';

export class ToolScaleLine extends ScaleLineTool {
  constructor(options = {}) {
    super(options);

    const button = this.button;
    DOM.removeElement(button);
    this.isActive = true;
    this.localStorage.isActive = true;
  }
}
