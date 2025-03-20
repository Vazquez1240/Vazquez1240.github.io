import { TileWMS } from 'ol/source';
import { LayerManager } from 'oltb/src/oltb/js/managers/LayerManager';

export function LayerOverlay(layer, coordinate, viewResolution) {
  const wmsSource = new TileWMS({
    url: 'https://mide.monterrey.gob.mx/geoserver/ows',
    params: { LAYERS: layer, TILED: true },
    serverType: 'geoserver',
    crossOrigin: 'anonymous',
  });
  return wmsSource.getFeatureInfoUrl(coordinate, viewResolution, 'EPSG:3857', {
    INFO_FORMAT: 'application/json',
  });
}

export function TituloCapa(alternate) {
  return LayerManager.getMapLayers().find(
    (layer) => layer.layer.sourceChangeKey_.target.params_ !== 'undefined' ? layer.layer.sourceChangeKey_.target.params_.LAYERS === alternate : null
  );
}
