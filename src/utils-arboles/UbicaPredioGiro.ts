import { userTree } from 'stores/arboles';
import { Subprocesos } from 'stores/subprocesos';
import { PeticionRequisitosPersonaliza, RequisitosUbicacion } from 'src/utils-arboles/RequisitosGiro';


const useUserTree = userTree()
const useSubprocesos = Subprocesos()


// Funcion padre (Es la que se llama en el archivo principal y va llamando a sus funciones hijas en cadena de las preguntas)

export default async function UbicaPredioGiro(){
  await RequisitosUbicacion()
  await PeticionRequisitosPersonaliza()
  if(useUserTree.giro_seleccionado.compatibilidad === 'CONDICIONADO') {
    console.log(useUserTree.giro_seleccionado.compatibilidad, 'compatibilidad')
    const giro = useSubprocesos.requisitos_ubicacion.find(item => item.properties.giro_condicionado !== 'NA')
    console.log(giro.properties.giro_condicionado, 'giro condicionado')
    useSubprocesos.setRequisitosEspecificosUbicacion(
      {
        nombre_tramite: giro.properties.nombre_tramite,
        valor: giro.properties.giro_condicionado
      }
    )
  }
  await ZonaValorCultural()
}

// Funciones hijas (Se ejecutan una vez que la funcion padre se va ejecutando)

async function ZonaValorCultural(){
  if(useUserTree.zona !== ''){
    const giro = useSubprocesos.requisitos_ubicacion.find(item => item.properties.zona_valor_cultural !== 'NA')
    useSubprocesos.setRequisitosEspecificosUbicacion({
      nombre_tramite: giro.properties.nombre_tramite,
      valor: giro.properties.zona_valor_cultural
    })
  }
  await ZonaAltoRiesgo()
}


async function ZonaAltoRiesgo() {

  if(useUserTree.escenario_geologico !== ''){
    const giro = useSubprocesos.requisitos_ubicacion.find(item => item.properties.hidrologico !== 'NA')
    useSubprocesos.setRequisitosEspecificosUbicacion({
      nombre_tramite: giro.properties.nombre_tramite,
      valor: giro.properties.hidrologico
    })
  }
  if(useUserTree.encharcamiento !== '' || useUserTree.planicie_inundacion !== ''){
    const giro = useSubprocesos.requisitos_ubicacion.find(item => item.properties.geologico !== 'NA')

    useSubprocesos.setRequisitosEspecificosUbicacion({
      nombre_tramite: giro.properties.nombre_tramite,
      valor: giro.properties.geologico
    })
  }
  await ZonaNaturalProtegida()
}


async function ZonaNaturalProtegida() {
  if(useUserTree.clave_zonificacion === 'ANP'){
    const giro = useSubprocesos.requisitos_ubicacion.find(item => item.properties.clave_anp !== 'NA')
    useSubprocesos.setRequisitosEspecificosUbicacion({
      nombre_tramite: giro.properties.nombre_tramite,
      valor:giro.properties.clave_anp
    })
  }
  await ZonaCorredoresBiologicos()
}

async function ZonaCorredoresBiologicos(){
  if(useUserTree.zonificiacion_secundaria === 'CB'){
    const giro = useSubprocesos.requisitos_ubicacion.find(item => item.properties.clave_cb !== 'NA')
    useSubprocesos.setRequisitosEspecificosUbicacion({
      nombre_tramite: giro.properties.nombre_tramite,
      valor: giro.properties.clave_cb
    })
  }
  await pendientes()
}


async function pendientes (){
  if(useUserTree.pendiente_terreno !== '' && useUserTree.pendiente_terreno === '>45%'){
    const giro = useSubprocesos.requisitos_ubicacion.find(item => item.properties.pendiente !== 'NA')
    useSubprocesos.setRequisitosEspecificosUbicacion({
      nombre_tramite: giro.properties.nombre_tramite,
      valor: giro.properties.pendiente
    })
    if(useUserTree.zonificiacion_secundaria === ''){
      const giro = useSubprocesos.requisitos_ubicacion.find(item => item.properties.clave_cb !== 'NA')
      useSubprocesos.setRequisitosEspecificosUbicacion({
        nombre_tramite: giro.properties.nombre_tramite,
        valor: giro.properties.clave_cb
      })
    }
  }
}
