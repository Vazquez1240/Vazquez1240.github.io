import { userTree } from 'stores/arboles';


const useUserTree = userTree()

export default async function zonasEncharcamientosPlanicieInundacion(datos_mapa:any, capa:string) {
  if(capa === 'zonas_encharcamiento'){
    useUserTree.setEncharcamiento(datos_mapa[0].properties.encharcamiento);
  }else{
    useUserTree.setPlanicieInundacion(datos_mapa[0].properties.planicies_inundacion)
  }
}
