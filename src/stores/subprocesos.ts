import { defineStore } from 'pinia';
import { RespuestaTramites } from 'src/utils-arboles/interface';


const Subprocesos = defineStore({
  id: 'subprocesos',
  state: () => ({
    nombres_tramites: [],
    requisitos_base: [],
    catalogoTramites: [] as RespuestaTramites,
    require_demolicion: false,
    requiere_lotificacion: false,
    requisitos_ubicacion: [],
    requisitos_personaliza: [],
    requisitos_especificos_personaliza: [],
    requisitos_especificos_ubicacion: [],
    gravamen: false,
    requiere_demolicion_ampliacion: false,
    medida_demolicion: '',
    maquinaria_propia_instalacion: false,
    maquinaria_propia_construccion: false,
    requiere_vehiculos_pesados: false,
    requiere_maniobra_carga_descarga: false,
    requiere_aderirse_servicio_publico: false,
    requiere_obstruir_via_publica: false,
    requiere_venta_alcohol: false,
    requiere_servicio_residuos: false,
    tipoSolicitante: '',
    tipoRepresentante: '',
    requiere_vehiculo_carga_pesada_construccion: false,
    requiere_maniobras_carga_descarga_construccion: false,
    requiere_adherirse_red_servicio_publico_construccion:false,
    requiere_obstruir_via_publica_construccion: false,
    requiere_venta_alcohol_construccion: false,
  }),
  actions: {
    setNombresTramites(nombre_tramite:any) {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      this.nombres_tramites.push(nombre_tramite)
    },
    setRequisitosBase(requisitos_base:any) {
      this.requisitos_base = requisitos_base
    },
    setCatalogoTramites(catalogoTramite:any) {
      this.catalogoTramites.push(catalogoTramite)
    },
    setRequiereDemolicion(requiere_demolicion:boolean) {
      this.require_demolicion = requiere_demolicion
    },
    setRequiereLotificacion(requiere_lotificacion:boolean) {
      this.requiere_lotificacion = requiere_lotificacion
    },
    setGravamen(respuesta:boolean) {
      this.gravamen = respuesta
    },
    setDemolicionAmpliacion(respuesta:boolean) {
      this.requiere_demolicion_ampliacion = respuesta
    },
    setMedidaDemolicion(respuesta:string){
      this.medida_demolicion = respuesta
    },
    setMaquinariaPropiaInstalacion(respuesta:boolean) {
      this.maquinaria_propia_instalacion = respuesta
    },
    setMaquinariaPropiaConstruccion(respuesta:boolean) {
      this.maquinaria_propia_construccion = respuesta
    },
    setRequiereVehiculosPesados(respuesta:boolean) {
      this.requiere_vehiculos_pesados = respuesta
    },
    setRequiereManiobraCargaDescarga(respuesta:boolean) {
      this.requiere_maniobra_carga_descarga = respuesta
    },
    setRequiereAderirseServicioPublico(respuesta:boolean) {
      this.requiere_aderirse_servicio_publico = respuesta
    },
    setRequiereObstruirViaPublica(respuesta:boolean) {
      this.requiere_obstruir_via_publica = respuesta
    },
    setRequiereVentaAlcohol(respuesta:boolean) {
      this.requiere_venta_alcohol = respuesta
    },
    setRequiereServicioResiduos(respuesta:boolean) {
      this.requiere_servicio_residuos = respuesta
    },
    setTipoSolicitante(respuesta:string) {
      this.tipoSolicitante = respuesta
    },
    setTipoRepresentante(respuesta:string) {
      this.tipoRepresentante = respuesta
    },
    setRequisitosUbicacion(respuesta:any) {
      this.requisitos_ubicacion.push(respuesta)
    },
    setRequisitosPersonaliza(respuesta:any){
      this.requisitos_personaliza.push(respuesta)
    },
    setRequisitosEspecificosPersonaliza(respuesta:any){
      this.requisitos_especificos_personaliza.push(respuesta)
    },
    setRequisitosEspecificosUbicacion(respuesta:any){
      this.requisitos_especificos_ubicacion.push(respuesta)
    },
    setRequiereVehiculoCargaPersadaConstruccion(respuesta:boolean) {
      this.requiere_vehiculo_carga_pesada_construccion = respuesta
    },
    setRequiereManiobrasCargaDescargaConstruccion(respuesta:boolean) {
      this.requiere_maniobras_carga_descarga_construccion = respuesta
    },
    setRequiereAdherirseServicioPublicoConstruccion(respuesta:boolean) {
      this.requiere_adherirse_red_servicio_publico_construccion = respuesta
    },
    setRequiereObstruirViaPublicaConstruccion(respuesta:boolean) {
      this.requiere_obstruir_via_publica_construccion = respuesta
    },
    setRequiereVentaDeAlcoholConstruccion(respuesta:boolean) {
      this.requiere_venta_alcohol_construccion = respuesta
    },
    reset() {
      this.$state = {
        nombres_tramites: [] ,
        require_demolicion: false,
        requiere_lotificacion: false,
        requisitos_ubicacion: [],
        gravamen: false,
        requiere_demolicion_ampliacion: false,
        medida_demolicion: '',
        maquinaria_propia_instalacion: false,
        maquinaria_propia_construccion: false,
        requiere_vehiculos_pesados: false,
        requiere_maniobra_carga_descarga: false,
        requiere_aderirse_servicio_publico: false,
        requiere_obstruir_via_publica: false,
        requiere_venta_alcohol: false,
        tipoSolicitante:  '',
        tipoRepresentante: '',
        requisitos_especificos_ubicacion: [],
        requiere_vehiculo_carga_pesada_construccion: false,
        requiere_maniobras_carga_descarga_construccion: false,
        requiere_adherirse_red_servicio_publico_construccion:false,
        requiere_obstruir_via_publica_construccion: false,
        requiere_venta_alcohol_construccion: false,
        requisitos_especificos_personaliza: []
      }
    }
  }
})

export {Subprocesos}
