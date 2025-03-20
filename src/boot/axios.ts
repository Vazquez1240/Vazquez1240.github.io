import { boot } from 'quasar/wrappers';
import axios, { AxiosInstance } from 'axios';

declare module '@vue/runtime-core' {
  interface ComponentCustomProperties {
    $axios: AxiosInstance;
  }
}

// const baseURL = 'https://geonode.appsmty.gob.mx/api/v2';
const baseURL = 'https://mide.monterrey.gob.mx/api/v2';
const apiIdMty = 'https://id.run.dev.apismty.gob.mx/rest/v1';
const APICMS = 'https://cms.run.apismty.gob.mx/rest/v1';
// const apiIdMty = 'https://id.drf.dev.mun.apismty.gob.mx/rest/v1'
const MapaPk = 'https://mide.monterrey.gob.mx/api/v2/maps';
const MapaDatasets = 'https://mide.monterrey.gob.mx/api/v2/datasets';
const Ejes = 'https://mide.monterrey.gob.mx/api/v2/datasets/';

const matrizArbol = 'https://mide.monterrey.gob.mx/geoserver/ows?service=wfs&version=2.0.0&request=GetFeature&typeNames=geonode:zonificacion_secundaria_giros_compatibilidad&cve_grupo&outputFormat=application/json'

const catalogoTramites = 'https://mide.monterrey.gob.mx/geoserver/ows?service=wfs&version=2.0.0&request=GetFeature&typeNames=geonode:catalogo_tramites_mr&cve_grupo&outputFormat=application/json'

const requisitosBase = 'https://mide.monterrey.gob.mx/geoserver/ows?service=wfs&version=2.0.0&request=GetFeature&typeNames=geonode:idtramite_requisitos_base&cve_grupo&outputFormat=application/json'

const requistosEspecificosGiro = 'https://mide.monterrey.gob.mx/geoserver/ows?service=wfs&version=2.0.0&request=GetFeature&typeNames=geonode:matriz_requisitos_especificos&cve_grupo&outputFormat=application/json'

const requisitosUbicacion = 'https://mide.monterrey.gob.mx/geoserver/ows?service=wfs&version=2.0.0&request=GetFeature&typeNames=geonode:requisitos_ubicacion&cve_grupo&outputFormat=application/json'

const requisitosBaseDep = 'https://mide.monterrey.gob.mx/geoserver/ows?service=wfs&version=2.0.0&request=GetFeature&typeNames=geonode:requisitos_base_dep&cve_grupo&outputFormat=application/json'

const requisitosPersonaliza = 'https://mide.monterrey.gob.mx/geoserver/ows?service=wfs&version=2.0.0&request=GetFeature&typeNames=geonode:requisitos_personaliza&cve_grupo&outputFormat=application/json'

const UrlOverlay = '';

const nominatim = 'https://nominatim.openstreetmap.org/search?'

const apiGeonode = axios.create({ baseURL: baseURL });
const apiMapaPk = axios.create({ baseURL: MapaPk });
const apiMapDatasets = axios.create({ baseURL: MapaDatasets });
const apiId = axios.create({ baseURL: apiIdMty });

const apiEjesMide = axios.create({ baseURL: Ejes });

const apiMatrizArbol = axios.create({baseURL: matrizArbol})

const apiCatalogoTramites = axios.create({baseURL: catalogoTramites})

const apiRequisitosBase = axios.create({baseURL: requisitosBase})

const apiUrlOverlay = axios.create({ baseURL: UrlOverlay });

const apiRequisitosEspecificosGiro = axios.create({baseURL: requistosEspecificosGiro})

const apiRequisitosBaseDep = axios.create({baseURL: requisitosBaseDep})

const apiRequisitosUbicacion = axios.create({baseURL: requisitosUbicacion})

const apiRequisitosPersonaliza = axios.create({baseURL: requisitosPersonaliza})

const apiCMS = axios.create({ baseURL: APICMS });

// Be careful when using SSR for cross-request state pollution
// due to creating a Singleton instance here;
// If any client changes this (global) instance, it might be a
// good idea to move this instance creation inside of the
// "export default () => {}" function below (which runs individually
// for each client)
export default boot(({ app }) => {
  // for use inside Vue files (Options API) through this.$axios and this.$api

  app.config.globalProperties.$axios = axios;
  // ^ ^ ^ this will allow you to use this.$axios (for Vue Options API form)
  //       so you won't necessarily have to import axios in each vue file
  app.config.globalProperties.$apiGeonode = apiGeonode;
  app.config.globalProperties.$apiMapaPk = apiMapaPk;
  app.config.globalProperties.$apiMapaDatasets = apiMapDatasets;
  app.config.globalProperties.$apiEjes = apiEjesMide;
  app.config.globalProperties.$apiUrlOverlay = apiUrlOverlay;
  app.config.globalProperties.$apiMatrizArbol = apiMatrizArbol;
  app.config.globalProperties.$apiCatalogoTramites = apiCatalogoTramites;
  app.config.globalProperties.$apiRequisitosBAse = apiRequisitosBase;
  app.config.globalProperties.$apiRequisitosEspecificosGiro = apiRequisitosEspecificosGiro;
  app.config.globalProperties.$apiRequisitosUbicacion = apiRequisitosUbicacion;
  app.config.globalProperties.$apiRequisitosBaseDep = apiRequisitosBaseDep;
  app.config.globalProperties.$apiRequisitosPersonaliza = apiRequisitosPersonaliza;
  // ^ ^ ^ this will allow you to use this.$api (for Vue Options API form)
  //       so you can easily perform requests against your app's API
});

export {
  apiGeonode,
  apiMapaPk,
  apiMapDatasets,
  apiId,
  apiEjesMide,
  apiUrlOverlay,
  apiCMS,
  apiMatrizArbol,
  apiCatalogoTramites,
  apiRequisitosBase,
  apiRequisitosEspecificosGiro,
  apiRequisitosUbicacion,
  apiRequisitosBaseDep,
  apiRequisitosPersonaliza,
};
