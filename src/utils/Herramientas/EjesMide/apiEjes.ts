import { Loading } from 'quasar';
import cargar_mapas from 'src/layers/DefaultLayers';
import { apiMapaPk } from 'boot/axios';
import { LoadingLayersStore } from 'stores/capas';
import { useRouter } from 'vue-router';
// import { NombrarMapa } from 'src/layers/GeonodePk';
import { useRouterStore } from 'stores/router';
import RemoveMapLayers from 'src/utils/Herramientas/RemoveMapLayers';
import { LayerManager } from 'oltb/src/oltb/js/managers/LayerManager';


const useLoadingLayersStore = LoadingLayersStore();
const router = useRouter();
const routerStore = useRouterStore()

interface Option {
  title: string;
  pk: number;
}
const actions: Record<string, (mapsLayers: never, pk: number, route: string[]) => Promise<void>> = {
  '-1': async function () {
    routerStore.setRoute( '/todas-capas', 'null')
    useLoadingLayersStore.showOverlay = false
    await routerStore.router.push(routerStore.currentRoute)
    const botonAgregarCapas = document.getElementById(
      'añadirCapas'
    ) as  HTMLButtonElement;
    botonAgregarCapas.style.display = 'block';
    if(!useLoadingLayersStore.maximoCapas){
      await cargar_mapas()
      useLoadingLayersStore.currentPage = 1
      useLoadingLayersStore.inicioCapas = 3
      botonAgregarCapas.textContent = 'Cargar mas capas'
      // NombrarMapa('Todas las capas');
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      botonAgregarCapas.style = 'background-color: oltb-btn--green-mid'
    }
  },
  default: async function (mapsLayers, pk) {
    const botonAgregarCapas = document.getElementById(
      'añadirCapas'
    ) as HTMLButtonElement;
    botonAgregarCapas.style.display = 'none';
    useLoadingLayersStore.maximoCapas = false
    useLoadingLayersStore.showOverlay = false
    routerStore.setRoute(`/mapa/${pk}`, pk)
    await routerStore.router.push(routerStore.currentRoute)
  },
};

export async function MideEje(mapsLayers: never, pk: number, route: string[]) {
  useLoadingLayersStore.showOverlay = true;
  try {
    const MapsLayers = LayerManager.getMapLayers();
    await RemoveMapLayers(MapsLayers)
    const action = actions[pk] || actions['default'];
    await action(mapsLayers, pk, route);
    setTimeout(() => {
      Loading.hide();
    }, 1000);
  } catch (error) {
    console.error(error);
    route.push('/NotFound');
    Loading.hide();
  }
}

export async function fillSelectElement() {
  try {

    const selectElement = document.getElementById(
      'selectEje'
    ) as HTMLSelectElement;
    const options = await getOptions();

    options.forEach((option) => {
      const optionElement = document.createElement('option');
      optionElement.value = option.pk.toString();
      optionElement.id = option.pk.toString();
      optionElement.innerText = option.title;

      if (!selectElement.querySelector(`option[value="${option.pk}"]`)) {
        selectElement.appendChild(optionElement);
      }
    });

    // Agregar la opción de todas las capas
    const optionElement = document.createElement('option');
    if(document.getElementById('-1') === null){
      optionElement.value = '-1';
      optionElement.innerText = 'Todas las capas';
      optionElement.id = '-1'
    }else{
      optionElement.style.display = 'none'
    }


    if (routerStore.pk === undefined || routerStore.pk === null) {
      await cargar_mapas();
      // NombrarMapa('Todas las capas');
      optionElement.setAttribute('selected', 'selected');
      const botonAgregarMapas = document.getElementById('añadirCapas');
      botonAgregarMapas.style.display = 'block';
      selectElement.appendChild(optionElement);
      await Loading.hide();
    } else {
      const elemento = document.getElementById(routerStore.pk)
      if (routerStore.pk === elemento?.id) {
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        elemento.setAttribute('selected', 'selected');
      }
      selectElement.appendChild(optionElement);
      Loading.hide();
    }
    Loading.hide();
  } catch (error) {
    console.error(error);
    await router.push('/NotFound');
    Loading.hide();
  }
}

async function getOptions(): Promise<Option[]> {
  let currentPage = 1
  const maxPage = 3
  let options = [] as Option[]
  const datos_espaciales = []
    try {
      while(currentPage <= maxPage){
        const response = await apiMapaPk.get(`?page=${currentPage}`);
        datos_espaciales.push(...response.data.maps)
        currentPage += 1
      }
    }catch (error){
      console.log(error)
    }
    finally {
      options = datos_espaciales.filter( (dataset: { title: string; }) => dataset.title !== 'Croquis')
        .map((dataset: any) => {
          const keyword = dataset.keywords?.find((data: { name: string; }) => data.name.toLowerCase() === 'mira');
          if (keyword) {
            return {
              title: dataset.title,
              pk: dataset.pk
            };
          }
          return undefined;
        })
        .filter((option: Option | undefined): option is Option => option !== undefined);
      return options
    }
}
