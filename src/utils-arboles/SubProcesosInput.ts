import { userTree } from 'stores/arboles';
import { ComponentesArboles } from 'stores/componentes-arboles';
import {ComponentDialogUsers} from 'stores/component-dialog-users'
import { Subprocesos } from 'stores/subprocesos';

const useUserTree = userTree()
const useComponentesArboles = ComponentesArboles()
const useComponentDialogUsers = ComponentDialogUsers()
const useSubprocesos = Subprocesos()


//if(useUserTree.proceso === 'instalación' || useUserTree.modalidad.toLowerCase() === 'ampliación' || useUserTree.modalidad.toLowerCase() === 'regularización'){


async function SubprocesoSuperficiePredio() {
  if(useUserTree.dimension_superficie_predio > 1000){
    const personaliza = useSubprocesos.requisitos_personaliza.find(item => item.properties.superficie_predio !== 'N/A')
    useSubprocesos.setRequisitosEspecificosPersonaliza({
      nombre_tramite: personaliza.properties.nombre_tramite,
      valor: personaliza.properties.superficie_predio
    })
    useComponentesArboles.setComponenteMetrosAConstruir(true)
  }else{
    useComponentesArboles.setComponenteMetrosAConstruir(true)
  }
}
async function SubProcesoMetrosAConstruir() {
  if(useUserTree.metros_a_construir > 1500){
    const servicios_agua = useSubprocesos.requisitos_personaliza.find(item =>
      item.properties.servicios_agua !== 'N/A')

      useSubprocesos.setRequisitosEspecificosPersonaliza({
        nombre_tramite: servicios_agua.properties.nombre_tramite,
        valor: servicios_agua.properties.servicios_agua
      })

      const servicios_electricidad = useSubprocesos.requisitos_personaliza.find(item =>
        item.properties.servicios_electricidad !== 'N/A')

    useSubprocesos.setRequisitosEspecificosPersonaliza({
      nombre_tramite: servicios_electricidad.properties.nombre_tramite,
      valor: servicios_electricidad.properties.servicios_electricidad
    })

    useComponentesArboles.setComponenteDesarrolloSuperiorMetrosAltura(true)
  }else{
    useComponentesArboles.setComponenteDesarrolloSuperiorMetrosAltura(true)
  }
}

async function SubProcesoUbicacionDentroFraccionamiento(){
  if(useUserTree.ubicadoDentroFraccionamiento){
    useComponentesArboles.setComponenteUbicadoFueraFraccionamientoColonia(true)
  }else{
    useComponentesArboles.setComponenteUbicadoFueraFraccionamientoColonia(true)
  }
}

async function SubProcesoFueraFraccionamientoColonia() {
  if(useUserTree.ubicadoFueraFraccionamientoColonia){
    const personaliza = useSubprocesos.requisitos_personaliza.find(item => item.properties.ubicado_fuera_fraccionamiento_colonia !== 'N/A')
    if(personaliza !== undefined){
      useSubprocesos.setRequisitosEspecificosPersonaliza({
        nombre_tramite: personaliza.properties.nombre_tramite,
        valor: personaliza.properties.ubicado_fuera_fraccionamiento_colonia,
      })
    }

    if(useUserTree.proceso.toLowerCase() === 'construcción'){
      useUserTree.modalidad.toLowerCase() === 'obra nueva' ? useComponentesArboles.setComponenteSuperficieDelPredio(true) : null
      useUserTree.modalidad.toLowerCase() === 'ampliación' ? useComponentesArboles.setComponenteCortesMayoresMetros(true) : null
      useUserTree.modalidad.toLowerCase() === 'regularización' ? useComponentesArboles.setComponenteCortesMayoresMetros(true) : null
    }else{
      useComponentDialogUsers.setTipoProceso('maquinariaInstalacion')
      useComponentDialogUsers.setBtns([{ label:'No', color: 'light-blue-5', outLine: true },
        {label:'Si', color: 'light-blue-5', outLine: false },])
      useComponentDialogUsers.setPreguntaUsuario('¿Dispone de maquinaria propia para llevar a cabo la instalación de su proyecto?')
    }
  }else{
    if(useUserTree.proceso.toLowerCase() === 'construcción'){
      useUserTree.modalidad.toLowerCase() === 'obra nueva' ? useComponentesArboles.setComponenteSuperficieDelPredio(true) : null
      useUserTree.modalidad.toLowerCase() === 'ampliación' ? useComponentesArboles.setComponenteCortesMayoresMetros(true) : null
      useUserTree.modalidad.toLowerCase() === 'regularización' ? useComponentesArboles.setComponenteCortesMayoresMetros(true) : null
    }else{
      useComponentDialogUsers.setTipoProceso('maquinariaInstalacion')
      useComponentDialogUsers.setBtns([{ label:'No', color: 'light-blue-5', outLine: true },
        {label:'Si', color: 'light-blue-5', outLine: false },])
      useComponentDialogUsers.setPreguntaUsuario('¿Dispone de maquinaria propia para llevar a cabo la instalación de su proyecto?')
    }
  }
}

async function VerificacionSupuestosConstruccion() {
  console.log('funion')
}

export {
  SubprocesoSuperficiePredio,
  SubProcesoMetrosAConstruir,
  VerificacionSupuestosConstruccion,
  SubProcesoUbicacionDentroFraccionamiento,
  SubProcesoFueraFraccionamientoColonia,
}
