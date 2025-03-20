import { apiMapaPk } from 'boot/axios';
import { Loading } from 'quasar';
import { addMapLayer, addOrtofoto } from 'src/layers/DefaultLayers';
import RemoveMapLayers from 'src/utils/Herramientas/RemoveMapLayers';
import { LayerManager } from 'oltb/src/oltb/js/managers/LayerManager';
import { useRouter } from 'vue-router';
import { ApiResponse } from 'src/utils-arboles/interface';

export async function BuscarMapa(pk: string) {
  const router = useRouter();
  Loading.show();
  try {
    const response = await apiMapaPk.get<ApiResponse>(`${pk}`);
    const datasets = response.data.map.maplayers;
    NombrarMapa(response.data.map.title);
    const layers = LayerManager.getMapLayers();
    await RemoveMapLayers(layers);
    datasets.sort((a: { order: number; }, b: { order: number; }) => a.order - b.order);
    addOrtofoto()
    datasets.forEach((dataset: { dataset: { title: any; alternate: any; links: any[]; } | null; }) => {
      if (dataset.dataset !== null) {
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        addMapLayer(
          dataset.dataset.title,
          dataset.dataset.alternate,
          dataset.dataset.links.find((link: { link_type: string; }) => link.link_type == 'OGC:WMS')!.url,
          false,
          dataset.dataset.title.toLowerCase() !== 'manzanas' && dataset.dataset.title.toLowerCase() !== 'predios' ? 0 : 1
        );
      }
    });

  } catch (error) {
    console.error(error);
    await router.push('/NotFound');
  } finally {
    Loading.hide();
  }
}

export function NombrarMapa(nombreMapa: string) {
  const tituloCapa = document.getElementById('titulo-mapa');
  if (tituloCapa) {
    tituloCapa.innerText = nombreMapa;
  }
}
