import { apiMatrizArbol, apiCatalogoTramites, apiRequisitosBase, apiRequisitosBaseDep } from 'boot/axios';
import { RespuestaMatriz, RespuestaTramites, RespuestaRequisitosBase } from 'src/utils-arboles/interface';
import { userTree } from 'stores/arboles';
import { Subprocesos } from 'stores/subprocesos';

const useUserTree = userTree()
const useSubprocesos = Subprocesos()

export const PeticionArbol = async (clave_zonificacion: string) => {
  try{
    const response = await apiMatrizArbol.get('', {
      params: {
        CQL_FILTER: `clave_zonificacion_secundaria='${clave_zonificacion}'`
      }
    });
    const claves = response.data.features.map( (feature: { properties: RespuestaMatriz }) => {
      if(feature.properties.clave_zonificacion_secundaria === clave_zonificacion){
        useUserTree.setClaveZonificacion(clave_zonificacion)
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        const nombreLabel = nombrarLabelGiro(feature.properties.clave_giro, feature.properties.nombre_giro, feature.properties.compatibilidad)
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        return {
          ogc_fid: feature.properties.ogc_fid,
          giro: feature.properties.nombre_giro,
          clave_zonficiacion: clave_zonificacion,
          cve_giro: feature.properties.clave_giro,
          compatibilidad: feature.properties.compatibilidad,
          label: nombreLabel
        };
      }
    });
    return await claves.sort((a: { cve_giro: string; }, b: { cve_giro: any; }) => {
      return a.cve_giro.localeCompare(b.cve_giro)
    });
  }catch(error){
    console.log(error)
    return null
  }
}

export const PeticionCatalogoTramites = async() => {
  const response = await apiCatalogoTramites('', {
    params: {
      CQL_FILTER: `clave_dependencia='SDU' OR clave_dependencia='SSP' OR clave_dependencia='SEG'  OR clave_dependencia='SAY'`
    }
  });
  const datosCatalogo = response.data.features.map( (feature: {properties: RespuestaTramites})  => {
    return {
      clave_dependencia:feature.properties.clave_dependencia,
      dependencia: feature.properties.dependencia,
      homoclave_tramite: feature.properties.homoclave_tramite,
      link_tramite: feature.properties.link_tramite,
      nombre_tramite: feature.properties.nombre_tramite,
      ogc_fid: feature.properties.ogc_fid.toString(),
      unidad_administrativa: feature.properties.unidad_administrativa,
    }
  })
  const catalogoOrdenado = datosCatalogo.sort( (a: { ogc_fid: string; }, b: { ogc_fid: string; }) => {
    return a.ogc_fid.localeCompare(b.ogc_fid)
  })
  useSubprocesos.setCatalogoTramites(catalogoOrdenado)
  return datosCatalogo.sort( (a: { ogc_fid: string; }, b: { ogc_fid: string; }) => {
    return a.ogc_fid.localeCompare(b.ogc_fid)
  })
}


export const PeticionRequisitosBase = async () => {
  const propiedades: any[] = [];

  try {
    const response = await apiRequisitosBase.get('');
    const requisitos = response.data.features.map( ( feature: {properties:RespuestaRequisitosBase}) => {
      if (feature.properties) {
        const properties = feature.properties;
        const filteredProperties = {
          nombre_tramite: '',
          id_tramite: '',
          requisitos_base: {}
        };

        // Filtra las propiedades que no tienen el valor "N/A"
        Object.entries(properties).forEach(([key, value]) => {
          // eslint-disable-next-line @typescript-eslint/ban-ts-comment
          // @ts-ignore
          if(key !== 'ogc_fid'){
            key === 'nombre_tramite' ? filteredProperties['nombre_tramite'] = value : null
            key === 'id_tramite' ? filteredProperties['id_tramite'] = value : null
            if (key.startsWith('requisito_') && value === 'N/A') return;
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-ignore
            key !== 'nombre_tramite' && key !== 'id_tramite' ? filteredProperties['requisitos_base'][key] = value : null
          }
        });
        propiedades.push(filteredProperties);
      }
    });
    useSubprocesos.setRequisitosBase(propiedades)

  } catch (error) {
    console.error(error);
  }
};
const nombrarLabelGiro = (cve_zonificacion:string, giro:string, compatibilidad:string) => {
  return cve_zonificacion + ' ' + giro + ' - ' + compatibilidad
}

export const FiltroDatosOverlay = (properties: any) => {
  return Object.fromEntries(
    Object.entries(properties).filter(([key, value]) => {
      if (key === 'descripcion_zonificacion_secundaria') {
        return true;
      }
      return value !== null && (typeof value !== 'string' || value.length <= 15);
    })
  );
}


export const PeticionRequisitosBaseDep = async () => {
  const propiedades: any[] = [];

  try {
    const response = await apiRequisitosBaseDep.get('');
    const requisitos = response.data.features.map((feature: { properties: any }) => {
      if (feature.properties) {
        const properties = feature.properties;
        const filteredProperties = {
          nombre_tramite: '',
          id_tramite: '',
          requisitos_base: {}
        };

        // Filtra las propiedades que no tienen el valor "N/A"
        Object.entries(properties).forEach(([key, value]) => {
          if (key !== 'ogc_fid') {
            if (key === 'nombre_tramite') filteredProperties['nombre_tramite'] = value;
            if (key === 'id_tramite') filteredProperties['id_tramite'] = value;
            if (key.startsWith('requisito_') && value === 'NA') return;
            if (key !== 'nombre_tramite' && key !== 'id_tramite' && key !== 'tramite') {
              filteredProperties['requisitos_base'][key] = value;
            }
          }
        });
        propiedades.push(filteredProperties);
      }
    });

    useUserTree.setRequisitosEspecificosDep(propiedades);
  } catch (error) {
    console.error(error);
  }
};
