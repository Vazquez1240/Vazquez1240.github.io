import { LoadingLayersStore } from 'stores/capas';
import { PeticionArbol } from 'src/utils-arboles/PeticionesArbol';
import { Notify } from 'quasar';
import { userTree } from 'stores/arboles';

const useLoadingMapsStore = LoadingLayersStore()

export  async function usoSuelo(response:any, skeleton:any, features:any){
  const useUserTree = userTree()
  if (response.data.features.length > 0) {
    const respuesta = await PeticionArbol(response.data.features[0] !== undefined ? response.data.features[0].properties.clave_zonificacion_secundaria : 'null')
    if (respuesta !== undefined && respuesta !== null && respuesta.length > 0) {
      features.value.push(...respuesta)
      useUserTree.setGiros(features.value)
    }
  } else {
    Notify.create({
      timeout: 1300,
      color: 'red',
      message: 'Esto no es un predio',
    })
  }
}
