import { userTree } from 'stores/arboles';


const userUserTree = userTree()


export default async function pendienteTerreno (datos_mapa) {
  userUserTree.setPendienteTerreno(datos_mapa[0].properties.pendiente_terreno)
}
