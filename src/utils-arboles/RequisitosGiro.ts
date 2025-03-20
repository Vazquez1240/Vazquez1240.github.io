import { apiRequisitosEspecificosGiro, apiRequisitosUbicacion, apiRequisitosPersonaliza } from 'boot/axios';
import { userTree } from 'stores/arboles';
import { Subprocesos } from 'stores/subprocesos';

const useUSerTree = userTree();
const useSubprocesos = Subprocesos()

async function RequisitosGiro() {
  const response = await apiRequisitosEspecificosGiro.get('');
  if (response.data.features.length > 0) {
    const propiedades = response.data.features.map(item => item.properties);
    const giroSeleccionado = useUSerTree.giro_seleccionado;

    const giroEncontrado = propiedades.find(giro =>
      giro.clave_giro === giroSeleccionado.cve_giro &&
      giro.compatibilidad === giroSeleccionado.compatibilidad
    );
    if (giroEncontrado) {
      const giroFiltrado = Object.fromEntries(
        Object.entries(giroEncontrado).filter(([key, value]) => value !== 'NA' && key !== 'clave_giro' && key !== 'compatibilidad'
        && key !== 'clave_zonificacion_secundaria' && key !== 'cve' && key !== 'nombre_giro' && key !== 'ogc_fid' && key !== 'descripcion_zonificacion_secundaria' && key !== 'tramite')
      );
      useUSerTree.setRequisitoGiro(giroFiltrado)
      return giroFiltrado
    }
  }
}

async function RequisitosUbicacion () {
  if(useSubprocesos.requisitos_ubicacion.length <= 0 ){
    const response = await apiRequisitosUbicacion.get('')
    if(response.data.features.length > 0) {
      response.data.features.map(item => {
        useSubprocesos.setRequisitosUbicacion(item)
      });
    }
  }
}

async function PeticionRequisitosPersonaliza() {
  if(useSubprocesos.requisitos_personaliza.length <= 0){
    const response = await apiRequisitosPersonaliza.get('')
    if(response.data.features.length > 0){
      response.data.features.map(item => {
        useSubprocesos.setRequisitosPersonaliza(item)
      })
    }
  }
}

export {
  RequisitosGiro,
  RequisitosUbicacion,
  PeticionRequisitosPersonaliza
}
