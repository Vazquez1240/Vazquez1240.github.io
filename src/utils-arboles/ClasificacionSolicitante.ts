import { userTree } from 'stores/arboles';
import { Subprocesos } from 'stores/subprocesos';
import { ComponentesArboles } from 'stores/componentes-arboles';
import { ComponentDialogUsers } from 'stores/component-dialog-users';


const useUserTree = userTree()
const useSubprocesos = Subprocesos()
const useComponenteArboles = ComponentesArboles()
const useComponentDialogUsers = ComponentDialogUsers()

async function SubProcesoTipoSolicitante() {
  if(useSubprocesos.tipoSolicitante === 'Persona moral'){

    if(useUserTree.proceso === 'instalación' || useUserTree.modalidad.toLowerCase() === 'ampliación' || useUserTree.modalidad.toLowerCase() === 'regularización'){
      const personaliza = useSubprocesos.requisitos_personaliza.find(item =>
        item.properties.persona_moral !== 'N/A' && item.properties.nombre_tramite === 'licencia_uso_edificacion')

      useSubprocesos.setRequisitosEspecificosPersonaliza({
        nombre_tramite: personaliza.properties.nombre_tramite,
        valor: personaliza.properties.persona_moral,
      })
    }else{
      const personaliza = useSubprocesos.requisitos_personaliza.find(item => item.properties.persona_moral !== 'N/A')
      useSubprocesos.setRequisitosEspecificosPersonaliza({
        nombre_tramite: personaliza.properties.nombre_tramite,
        valor: personaliza.properties.persona_moral,
      })
    }

    useComponenteArboles.setComponenteTipoRepresentante(true)
  }else{
    useComponenteArboles.setComponenteTipoRepresentante(true)
  }
}

async function SubProcesoTipoRepresentante() {
  useComponenteArboles.setComponenteStepper(useComponenteArboles.componentStepper += 1)

  if(useSubprocesos.tipoRepresentante.toLowerCase() === 'propietario'){
    if(useUserTree.proceso === 'instalación' || useUserTree.modalidad.toLowerCase() === 'ampliación' || useUserTree.modalidad.toLowerCase() === 'regularización'){
      const personaliza = useSubprocesos.requisitos_personaliza.find(item =>
        item.properties.propietario !== 'N/A' && item.properties.nombre_tramite === 'licencia_uso_edificacion')
      useSubprocesos.setRequisitosEspecificosPersonaliza({
        nombre_tramite: personaliza.properties.nombre_tramite,
        valor: personaliza.properties.propietario,
      })
    }else{
      const personaliza = useSubprocesos.requisitos_personaliza.find(item => item.properties.propietario !== 'N/A')
      useSubprocesos.setRequisitosEspecificosPersonaliza({
        nombre_tramite: personaliza.properties.nombre_tramite,
        valor: personaliza.properties.propietario,
      })
    }
  }

  if(useSubprocesos.tipoRepresentante.toLowerCase() === 'fiduciaria'){

    if(useUserTree.proceso === 'instalación' || useUserTree.modalidad.toLowerCase() === 'ampliación' || useUserTree.modalidad.toLowerCase() === 'regularización'){
      const personaliza = useSubprocesos.requisitos_personaliza.find(item =>
        item.properties.fiduciaria !== 'N/A' && item.properties.nombre_tramite === 'licencia_uso_edificacion')
      useSubprocesos.setRequisitosEspecificosPersonaliza({
        nombre_tramite: personaliza.properties.nombre_tramite,
        valor: personaliza.properties.fiduciaria
      })
    }else{
      const personaliza = useSubprocesos.requisitos_personaliza.find(item => item.properties.fiduciaria !== 'N/A')
      useSubprocesos.setRequisitosEspecificosPersonaliza({
        nombre_tramite: personaliza.properties.nombre_tramite,
        valor: personaliza.properties.fiduciaria
      })
    }
  }

  if(useSubprocesos.tipoRepresentante.toLowerCase() === 'representante legal'){

    if(useUserTree.proceso === 'instalación' || useUserTree.modalidad.toLowerCase() === 'ampliación' || useUserTree.modalidad.toLowerCase() === 'regularización'){
      const personaliza = useSubprocesos.requisitos_personaliza.find(item =>
        item.properties.representante_legal_apoderado !== 'N/A' && item.properties.nombre_tramite === 'licencia_uso_edificacion')
      useSubprocesos.setRequisitosEspecificosPersonaliza({
        nombre_tramite: personaliza.properties.nombre_tramite,
        valor: personaliza.properties.representante_legal_apoderado
      })
    }else{
      const personaliza = useSubprocesos.requisitos_personaliza.find(item =>
        item.properties.representante_legal_apoderado !== 'N/A')
      useSubprocesos.setRequisitosEspecificosPersonaliza({
        nombre_tramite: personaliza.properties.nombre_tramite,
        valor: personaliza.properties.representante_legal_apoderado
      })
    }
  }

  useComponentDialogUsers.setTipoInteraccion('seleccion')
  useComponentDialogUsers.setTipoProceso('ubicadoDentroFraccionamiento')
  useComponentDialogUsers.setPreguntaUsuario('¿El predio se encuentra dentro de un fraccionamiento?')
  useComponentDialogUsers.setBtns([
    {
      label: 'No',
      color: 'light-blue-5',
      outLine:true
    },
    {
      label: 'Si',
      color: 'light-blue-5',
      outLine:false
    }
    ])
}

export {SubProcesoTipoSolicitante, SubProcesoTipoRepresentante}
