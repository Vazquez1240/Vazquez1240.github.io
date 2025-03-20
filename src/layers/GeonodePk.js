import { apiMapaPk } from 'boot/axios';
import { Loading } from 'quasar';
import { addMapLayer } from 'src/layers/DefaultLayers';
import RemoveMapLayers from 'src/utils/Herramientas/RemoveMapLayers';
import { LayerManager } from 'oltb/src/oltb/js/managers/LayerManager';
import { useRouter } from 'vue-router';

export async function BuscarMapaPk(pk) {
  const router = useRouter()
  Loading.show();
  apiMapaPk
    .get(`${pk}`)
    .then((response) => {
      const datasets = response.data.map.maplayers;
      if(response.data.map.keywords.find(item => item.name.toLowerCase() === 'mira')) {
        const layers = LayerManager.getMapLayers();
        RemoveMapLayers(layers);
        datasets.sort((a, b) => a.order - b.order);
        datasets.forEach((dataset) => {
          if (dataset.dataset !== null) {
            addMapLayer(
              dataset.dataset.title,
              dataset.dataset.alternate,
              dataset.dataset.links.find((link) => link.link_type === 'OGC:WMS')
                .url,
              true
            );
          }
        });
      }
      // NombrarMapa(response.data.map.title);
    })
    .catch((error) => {
      console.error(error);
      router.push('/NotFound');
      Loading.hide();
    });
}

export function NombrarMapa(nombreMapa) {
  var tituloCapa = document.getElementById('titulo-mapa');
  tituloCapa.innerText = nombreMapa;
}
