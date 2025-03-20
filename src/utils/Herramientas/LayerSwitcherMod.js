import LayerSwitcher from 'ol-layerswitcher';

export default class LayerSwitcherMod extends LayerSwitcher {
  constructor(options) {
    super(options);
    this.agregarClases();
  }

  agregarClases() {
    const observer = new MutationObserver((mutationsList) => {
      for (let mutation of mutationsList) {
        if (
          mutation.type === 'childList' &&
          mutation.target.classList.contains('panel')
        ) {
          this.aplicarClases();
        }
      }
    });

    observer.observe(document.body, { childList: true, subtree: true });
  }

  aplicarClases() {
    const olViewport = document.querySelector('.ol-viewport');
    if (olViewport) {
      const layers = olViewport.querySelectorAll('.layer');
      layers.forEach((layer, index) => {
        const input = layer.querySelector('input');
        if (input) {
          input.classList.add(`input-${index}`);
        }
        const label = layer.querySelector('label');
        if (label) {
          label.classList.add(`label-${index}`);
        }
      });
    }
  }
}
