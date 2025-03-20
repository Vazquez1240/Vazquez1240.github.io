export interface MapLayer {
  id: number;
  name: string;
  type: string;
  visibility: boolean;
  order: number;
  dataset: {
    title: string;
    alternate: string;
    links: Array<{ link_type: string; url: string }>;
  } | null;
}

export interface MapData {
  pk: string;
  uuid: string;
  resource_type: string;
  maplayers: MapLayer[];
  title: string;
}

export interface ApiResponse {
  map: any;
  data: {
    map: MapData;
  };
}


export interface RespuestaMatriz {
  ogc_fid: number;
  clave_zonificacion_secundaria: string;
  giro: string;
  clave_zonficiacion: string;
  compatibilidad: string,
  clave_giro: string;
  label: string;
}

export interface RespuestaTramites {
  clave_dependencia: string;
  dependencia: string;
  homoclave_tramite: string;
  link_tramite: string;
  nombre_tramite: string;
  ogc_fid: number;
  unidad_administrativa: string;
}

export interface RespuestaRequisitosBase {
  id_tramite:string;
  nombre_tramite:string;
  ogc_fid:number;
  requisitos_base?: object;
}
interface GeoJson {
  type: string;
  coordinates: []
}

export interface DataNominatim {
  lat: string;
  lon: string;
  osm_type: string;
  display_name: string;
  addresstype: string;
}

export interface DataNominatimStore {
  data: DataNominatim[];
}

export interface RespuestaNominatim {
  status: number;
  data: DataNominatim[];
}
