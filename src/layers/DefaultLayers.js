import { LayerManager } from 'oltb/src/oltb/js/managers/LayerManager';
import { TileWMS, XYZ } from 'ol/source';
import { Tile } from 'ol/layer';
import { LoadingLayersStore } from 'stores/capas';

export async function cargar_mapas() {
  const storage = LoadingLayersStore();
  await storage.obtenerCapasInicial();
  const capasStore = storage.nuevasCapas;
  let nuevasCapas = [];
  if (capasStore.length > 0) {
    nuevasCapas = capasStore;
    let datasets_espaciales = nuevasCapas.filter((objeto) =>
      !objeto.keywords.some((keyword) => keyword.name.toLowerCase() === 'tabular'));
    datasets_espaciales.forEach((dataset) => {
    if (dataset.keywords.find((keyword) => keyword.name.toLowerCase() === 'mira')) {

        addMapLayer(
          dataset.title,
          dataset.alternate,
          dataset.links.find((link) => link.link_type === 'OGC:WMS').url,
          false,
          1
        );
      }
    });
  } else {
    let datasets_espaciales = storage.data.filter((objeto) => !objeto.keywords.some((keyword) => keyword.name.toLowerCase() === 'tabular'));
    datasets_espaciales.forEach((dataset) => {
      if (dataset.keywords.find((keyword) => keyword.name.toLowerCase() === 'mira')) {
        addMapLayer(
          dataset.title,
          dataset.alternate,
          dataset.links.find((link) => link.link_type === 'OGC:WMS').url,
          false
        );
      }
    });
  }
}

export function addMapLayer(title, alternate, url, visible, opacidad) {
  const existingLayer = LayerManager.getMapLayers().find(
    (layer) => layer.layer.sourceChangeKey_.target.params_ !== undefined ? layer.layer.sourceChangeKey_.target.params_.LAYERS === alternate : null
  );
  if (existingLayer) {
    return;
  } else {
    LayerManager.addMapLayers([
      {
        name: title,
        layer: new Tile({
          source: new TileWMS({
            crossOrigin: 'anonymous',
            url: url,
            params: {
              LAYERS: alternate,
              FORMAT: 'image/png8',
            },
          }),
          visible: visible,
          opacity: opacidad
        }),
      },
    ]);
  }
}
export function addOrtofoto(){
  LayerManager.addMapLayers([
    {
      name: 'Ortofoto Monterrey 2022',
      layer: new Tile({
        source: new XYZ({
          crossOrigin: 'anonymous',
          url: 'https://engine.ec.appsmty.gob.mx/stiles/5ba54d62469b11eebe7f00155d649203/{z}/{x}/{-y}.jpg',
        }),
        zIndex: 0,
        visible: true,
      }),
    },
  ]);
}
export default cargar_mapas;
