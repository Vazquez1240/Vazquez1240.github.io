import { HelpTool } from 'oltb/src/oltb/js/tools/HelpTool';
import { getIcon, SvgPaths } from 'src/utils/Iconos/GetIcon';
import { TranslationManager } from 'src/utils/Herramientas/TranslationManager';
import { useRouterStore } from 'stores/router';
import { fillSelectElement, MideEje } from 'src/utils/Herramientas/EjesMide/apiEjes';
import { LayerManager } from 'oltb/src/oltb/js/managers/LayerManager';

const I18N_BASE = 'tools.TreeDecisionTool';
const routerStore = useRouterStore()

export class ArbolDecisionesTool extends HelpTool {
  constructor(options = {}) {
    super(options);

    const icon = getIcon({
      path: SvgPaths.treeDecisions.stroked,
      class: 'Arbol_Decisiones_icon',
    });

    this.button.innerHTML = icon;
    const i18n = TranslationManager.get('tools.TreeDecisionTool');

    const button = this.button;
    button.setAttribute('data-tippy-content', `${i18n.title}`);
    button.setAttribute('data-tippy-content-post', '');
    button.setAttribute('data-oltb-i18n', `${I18N_BASE}.title`);
  }
  onClickTool(event) {
    super.onClickTool(event);

    routerStore.setRoute('mapa/263', '263')

    // routerStore.router.push('/arboles-decisiciones')
    routerStore.router.push('/arboles-decisiones')
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
