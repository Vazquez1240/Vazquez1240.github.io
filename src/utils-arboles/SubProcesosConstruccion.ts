import { userTree } from 'stores/arboles';
import { ComponentDialogUsers } from 'stores/component-dialog-users';
import { ComponentesArboles } from 'stores/componentes-arboles';
import { Subprocesos } from 'stores/subprocesos';
import { PeticionCatalogoTramites } from 'src/utils-arboles/PeticionesArbol';

const useUserTree = userTree()
const useComponentDialogUsers = ComponentDialogUsers()
const useComponenteArboles = ComponentesArboles()
const useSubprocesos = Subprocesos()


async function SubProcesoMaquinariaPropiaConstruccion(){
  const response = await PeticionCatalogoTramites()
  if(useSubprocesos.maquinaria_propia_construccion){
    response.forEach((tramite:{nombre_tramite:string}) => {
      tramite.nombre_tramite.toLowerCase() === 'constancia de terminación de obra' ? useSubprocesos.setNombresTramites(tramite.nombre_tramite) : null
      // tramite.nombre_tramite.toLowerCase() === 'constancia de terminación de obras y liberación de garantías' ? useSubprocesos.setNombresTramites(tramite.nombre_tramite) : null
      tramite.nombre_tramite.toLowerCase() === 'proyecto de ventas en condominio, régimen en condominio, multifamiliar o usos mixtos' ? useSubprocesos.setNombresTramites(tramite.nombre_tramite) : null
    })
    useComponenteArboles.setComponenteVehiculosPesadosConstruccion(true)
  }else{
    useComponenteArboles.setComponenteManiobraCargaDescargaConstruccion(true)
  }
}

async function SubProcesoVehiculosCargaPesadaConstruccion(){
  if(useSubprocesos.requiere_vehiculo_carga_pesada_construccion){
    useSubprocesos.setNombresTramites('Registro de circulación de vehículo de transporte de carga pesada en vías limitadas y/o restringidas')
    useComponenteArboles.setComponenteManiobraCargaDescargaConstruccion(true)
  }else{
    useComponenteArboles.setComponenteManiobraCargaDescargaConstruccion(true)
  }
}


async function SubProcesoManiobraCargaDescargaConstruccion(){
  if(useSubprocesos.requiere_maniobras_carga_descarga_construccion){
    useSubprocesos.setNombresTramites('Permiso de carga y descarga')
    useComponenteArboles.setRequiereAdherirseServicioPublicoConstruccion(true)
  }else{
    useComponenteArboles.setRequiereAdherirseServicioPublicoConstruccion(true)
  }
}

async function SubProcesoAdherirseServicioPublicoConstruccion() {
  if(useSubprocesos.requiere_adherirse_red_servicio_publico_construccion){
    useSubprocesos.setNombresTramites('Permiso especial para trabajos en la vía pública')
    useComponenteArboles.setRequiereObstruirViaPublicaConstruccion(true)
  }else{
    useComponenteArboles.setRequiereObstruirViaPublicaConstruccion(true)
  }
}

async function SubProcesoObstruccionViaPublicaConstruccion(){
  if(useSubprocesos.requiere_obstruir_via_publica_construccion){
    useSubprocesos.setNombresTramites('Obstrucción de carril')
    useComponenteArboles.setRequiereVentaAlcoholConstruccion(true)
  }else{
    useComponenteArboles.setRequiereVentaAlcoholConstruccion(true)
  }
}

async function SubProcesoRequeriraVentaAlcoholConstruccion(){
  if(useSubprocesos.requiere_venta_alcohol_construccion){
    useSubprocesos.setNombresTramites('Anuencia municipal')
  }
  useComponenteArboles.setComponenteBtnContinuarStepper(true)
  useUserTree.setMensajesSuccessCard('Preguntas completadas')
  useComponenteArboles.setComponenteCardSuccess(true)
}

export {
  SubProcesoMaquinariaPropiaConstruccion,
  SubProcesoVehiculosCargaPesadaConstruccion,
  SubProcesoManiobraCargaDescargaConstruccion,
  SubProcesoAdherirseServicioPublicoConstruccion,
  SubProcesoObstruccionViaPublicaConstruccion,
  SubProcesoRequeriraVentaAlcoholConstruccion
}
