import { defineStore } from 'pinia';
import { RespuestaTramites, RespuestaMatriz } from 'src/utils-arboles/interface';

const userTree = defineStore({
  id: 'arboles',
  state: () => ({
    proceso: '',
    modalidad: '',
    carta: '',
    zona: '',
    escenario_geologico: '',
    encharcamiento: '',
    planicie_inundacion: '',
    pendiente_terreno: '',
    falla_volteo: '',
    clave_zonificacion: '',
    zonificiacion_secundaria: '',
    tramite_seleccionado: '',
    giro_seleccionado:  {} as RespuestaMatriz,
    objeto_tramite: {} as RespuestaTramites,
    giros: [],
    requisitos_giro: [],
    requistos_especificos_dep: [],
    tipoProcesoDialogo: '',
    preguntaUsuario: '',
    mensajeSuccessCard: '',
    dimension_superficie_predio: 0,
    metros_a_construir: 0,
    ubicadoDentroFraccionamiento: '',
    ubicadoFueraFraccionamientoColonia: '',
    desarrolloSuperiorMetrosAltura: false,
    concluidoLicenciaDeConstruccion: false,
    cortesMayoresMetros: false,
    maquinariaPropiaConstruccion:false
  }),
  actions: {
    setClaveZonificacion(clave_zonificacion:string){
      this.clave_zonificacion = clave_zonificacion
    },
    setGiroSeleccionado(giro:RespuestaMatriz){
      this.giro_seleccionado = giro
    },
    setProcesoSeleccionado(proceso:string){
      this.proceso = proceso
    },
    setModalidadSeleccionada(modalidad:string){
      this.modalidad = modalidad
    },
    setCarta(respuesta:string){
      this.carta = respuesta
    },
    setZonaValorCultural(zonaValorCultural:string){
      this.zona = zonaValorCultural
    },
    setEscenarioGeologico(respuesta:string){
      this.escenario_geologico = respuesta
    },
    setEncharcamiento(respuesta:string){
      this.encharcamiento = respuesta
    },
    setPlanicieInundacion(respuesta:string){
      this.planicie_inundacion = respuesta
    },
    setPendienteTerreno(respuesta:string){
      this.pendiente_terreno = respuesta
    },
    setGiros(respuesta:any){
      this.giros = respuesta
    },
    setMensajesSuccessCard(mensaje:string){
      this.mensajeSuccessCard = mensaje
    },
    setDimensionSuperficiePredio(respuesta:number){
      this.dimension_superficie_predio = respuesta
    },
    setMetrosAConstruir(respuesta:number){
      this.metros_a_construir = respuesta
    },
    setRequisitoGiro(giro){
      this.requisitos_giro.push(giro)
    },
    setZonificacionSecundaria(clave:string){
      this.zonificiacion_secundaria = clave
    },
    setRequisitosEspecificosDep(respuesta:any){
      this.requistos_especificos_dep = respuesta
    },
    setUbicadoDentroFraccionamiento(respuesta:string){
      this.ubicadoDentroFraccionamiento = respuesta
    },
    setUbicadoFueraFraccionamientoColonia(respuesta:string){
      this.ubicadoFueraFraccionamientoColonia = respuesta
    },
    setDesarrolloSuperiorMetrosAltura(respuesta:boolean){
      this.desarrolloSuperiorMetrosAltura = respuesta
    },
    setConcluidoLicenciaDeConstruccion(respuesta:boolean){
      this.concluidoLicenciaDeConstruccion = respuesta
    },
    setCortesMayoresMetors(respuesta:boolean){
      this.cortesMayoresMetros = respuesta
    },
    regresar() {
      this.$state = {
        proceso: '',
        modalidad: '',
        tipoProcesoDialogo: '',
        requisitos_giro: [],
        metros_a_construir: 0,
        dimension_superficie_predio: '',
        preguntaUsuario: '',
        mensajeSuccessCard: '',
        cortesMayoresMetros: false
      }
    },
    reset() {
      this.$state = {
        proceso: '',
        modalidad: '',
        tipoProcesoDialogo: '',
        zona: '',
        escenario_geologico: '',
        preguntaUsuario: '',
        mensajeSuccessCard: '',
        dimension_superficie_predio: '',
        metros_a_construir: 0,
        requisitos_giro: [],
        encharcamiento: '',
        planicie_inundacion: '',
        clave_zonificacion: '',
        zonificiacion_secundaria: '',
        ubicadoDentroFraccionamiento: '',
        ubicadoFueraFraccionamientoColonia: '',
        concluidoLicenciaDeConstruccion: false,
        cortesMayoresMetros: false
      };
    }
  },
});

export { userTree };
