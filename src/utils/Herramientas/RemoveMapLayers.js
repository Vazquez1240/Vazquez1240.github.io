import { LayerManager } from 'oltb/src/oltb/js/managers/LayerManager';

async function RemoveMapLayers(MapsLayers) {
  for (let i = 0; i < MapsLayers.length; i++) {
    LayerManager.removeMapLayer(MapsLayers[i]);
  }
}

export default RemoveMapLayers;
