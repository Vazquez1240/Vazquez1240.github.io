import { userTree } from 'stores/arboles';


const useUserTree = userTree()


export default async function riberasArroyos(datos_mapa:any) {
  useUserTree.setCarta(datos_mapa[0].properties.carta)
}
