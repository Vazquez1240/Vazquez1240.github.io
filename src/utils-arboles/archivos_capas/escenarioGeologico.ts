import { userTree } from 'stores/arboles';


const useUserTree = userTree()

export default async function escenarioGeologico(datos_mapa:any){
  useUserTree.setEscenarioGeologico(datos_mapa[0].properties.escenario_geologico)
}
