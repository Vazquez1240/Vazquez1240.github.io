import { HelpTool } from 'oltb/src/oltb/js/tools/HelpTool';
import { getIcon, SvgPaths } from 'src/utils/Iconos/GetIcon';
import { TranslationManager } from 'src/utils/Herramientas/TranslationManager';
import { useRouterStore } from 'stores/router';
import { fillSelectElement, MideEje } from 'src/utils/Herramientas/EjesMide/apiEjes';
const I18N_BASE = 'tools.TreeDecisionTool';
const routerStore = useRouterStore()

export class MiraTool extends HelpTool {
  constructor(options = {}) {
    super(options);

    const icon = getIcon({
      path: SvgPaths.MiraIcon.stroked,
      class: 'Mira_icon',
    });

    this.button.innerHTML = icon;
    const i18n = TranslationManager.get('tools.MiraTool');

    const button = this.button;
    button.setAttribute('data-tippy-content', `${i18n.title}`);
    button.setAttribute('data-tippy-content-post', '');
    button.setAttribute('data-oltb-i18n', `${I18N_BASE}.title`);
  }
  onClickTool(event) {
    super.onClickTool(event);

    routerStore.setRoute('mapa/96', '96')

    // routerStore.router.push('/arboles-decisiciones')
    routerStore.router.push('/mapa/96')

    fillSelectElement()

    if (this.options.onClicked instanceof Function) {
      this.options.onClicked();
    }
  }
  doOpenTabOrWindow() {
    console.log('Activacion');
  }
  momentaryActivation() {
    this.doOpenTabOrWindow();
  }
}
