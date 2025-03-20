import { userTree } from 'stores/arboles';


const useUserTree = userTree()

export default async function corredoresBiologicos(){
  useUserTree.setZonificacionSecundaria('CB')
}
