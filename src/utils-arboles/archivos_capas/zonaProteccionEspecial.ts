import { userTree } from 'stores/arboles';

const useUserTree = userTree()

export default async function zonaProteccionEspecial(datos_mapa:any){
  useUserTree.setZonaValorCultural(datos_mapa[0].properties.zona)
}
