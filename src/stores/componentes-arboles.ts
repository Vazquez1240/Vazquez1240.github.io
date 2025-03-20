import { defineStore } from 'pinia';

const ComponentesArboles = defineStore({
  id: 'componentesArboles',
  state: () => ({
    componentTipoProceso: false,
    componentDemolicion: false,
    componentLotificacion: false,
    componentGravamen: false,
    componentTramites: false,
    componentLoading: false,
    componentDialogoUsuario: false,
    componentStepper: 0,
    componentDialogoProceso: true,
    capaResaltada: false,
    componentDialogMessage: false,
    componentDimensiones: false,
    componentBtnContinuarStepper: false,
    componentCardSuccess: false,
    componentTramitesFinales: false,
    componentVehiculosPesados: false,
    componentManiobraCargaDescarga: false,
    componentAderirseServicioPublicoInstalacion: false,
    componentObstruirViaPublica: false,
    componentVentaAlcohol: false,
    componentServiciosRecoleccion: false,
    componentTipoSolicitante: false,
    componentTipoRepresentante:false,
    componentSuperficieDelPredio: false,
    componentMetrosAConstruir: false,
    componentSupuestosConstruccion: false,
    componentUbicadoFueraFraccionamientoColonia: false,
    componentDemolicionAmpliacion: false,
    componentRegularizacion: false,
    componentDesarrolloSuperiorMetrosAltura: false,
    componentConcluidoLicenciaDeConstruccion: false,
    componentCortesMayoresMetros: false,
    componentMaquinariaPropiaConstruccion: false,
    componentVehiculosPesadosConstruccion: false,
    componentManiobraCargaDescargaConstruccion: false,
    componentRequiereAdherirseServicioPublicoConstruccion:false,
    componentRequiereObstruirViaPublicaConstruccion:false,
    componentRequiereVentaAlcoholConstruccion:false,
  }),
  actions: {
    setComponenteTipoProceso(activar_componente: boolean) {
      this.componentTipoProceso = activar_componente
    }
    ,
    setComponenteDemolicion(activar_componente: boolean) {
      this.componentDemolicion = activar_componente
    },
    setCompoenteLotificacion(activar_componente: boolean) {
       this.componentLotificacion = activar_componente
    },
    setComponenteGravamen(activar_componente: boolean){
      this.componentGravamen = activar_componente
    },
    setComponenteTramites(activar_componente: boolean){
      this.componentTramites = activar_componente
    },
    setComponenteLoading(activar_componente: boolean) {
      this.componentLoading = activar_componente
    },
    setComponenteDialogoUsuario(activar_componente: boolean) {
      this.componentDialogoUsuario = activar_componente
    },
    setComponenteStepper(activar_componente: number) {
      this.componentStepper = activar_componente
    },
    setComponenteDialogoProceso(activar_componente: boolean) {
      this.componentDialogoProceso = activar_componente
    },
    setCapaResaltada(activar_componente: boolean) {
      this.capaResaltada = activar_componente
    },
    setComponenteDialogMessage(activar_componente: boolean) {
      this.componentDialogMessage = activar_componente
    },
    setComponenteDimensiones(activar_componente: boolean) {
      this.componentDimensiones = activar_componente
    },
    setComponenteBtnContinuarStepper(activar_componente: boolean) {
      this.componentBtnContinuarStepper = activar_componente
    },
    setComponenteCardSuccess(activar_componente: boolean) {
      this.componentCardSuccess = activar_componente
    },
    setComponenteTramitesFinales(activar_componente: boolean) {
      this.componentTramitesFinales = activar_componente
    },
    setComponenteVehiculosPesados(activar_componente: boolean) {
      this.componentVehiculosPesados = activar_componente
    },
    setComponenteManiobraCargaDescarga(activar_componente: boolean) {
      this.componentManiobraCargaDescarga = activar_componente
    },
    setComponenteAderirseServicioPublicoInstalacion(activar_componente: boolean) {
      this.componentAderirseServicioPublicoInstalacion = activar_componente
    },
    setComponenteObstruirViaPublica(activar_componente: boolean) {
      this.componentObstruirViaPublica = activar_componente
    },
    setComponenteVentaAlcohol(activar_componente: boolean) {
      this.componentVentaAlcohol = activar_componente
    },
    setComponenteServiciosRecoleccion(activar_componente: boolean) {
      this.componentServiciosRecoleccion = activar_componente
    },
    setComponenteTipoSolicitante(activar_componente: boolean) {
      this.componentTipoSolicitante = activar_componente
    },
    setComponenteTipoRepresentante(activar_componente: boolean) {
      this.componentTipoRepresentante = activar_componente
    },
    setComponenteMetrosAConstruir(activar_componente: boolean) {
      this.componentMetrosAConstruir = activar_componente
    },
    setComponentSupuestosConstruccion(activar_componente: boolean) {
      this.componentSupuestosConstruccion = activar_componente
    },
    setComponenteUbicadoFueraFraccionamientoColonia(activar_componente: boolean) {
      this.componentUbicadoFueraFraccionamientoColonia = activar_componente
    },
    setComponenteSuperficieDelPredio(activar_componente: boolean) {
      this.componentSuperficieDelPredio = activar_componente
    },
    setComponenteDemolicionAmpliacion(activar_componente: boolean) {
      this.componentDemolicionAmpliacion = activar_componente
    },
    setComponenteRegularizacion(activar_componente: boolean) {
      this.componentRegularizacion = activar_componente
    },
    setComponenteDesarrolloSuperiorMetrosAltura(activar_componente: boolean) {
      this.componentDesarrolloSuperiorMetrosAltura = activar_componente
    },
    setComponenteConcluidoLicenciaDeConstruccion(activar_componente: boolean) {
      this.componentConcluidoLicenciaDeConstruccion = activar_componente
    },
    setComponenteCortesMayoresMetros(activar_componente: boolean) {
      this.componentCortesMayoresMetros = activar_componente
    },
    setComponenteMaquinariaPropiaConstruccion(activar_componente: boolean) {
      this.componentMaquinariaPropiaConstruccion = activar_componente
    },
    setComponenteVehiculosPesadosConstruccion(activar_componente: boolean) {
      this.componentVehiculosPesadosConstruccion = activar_componente
    },
    setComponenteManiobraCargaDescargaConstruccion(activar_componente: boolean) {
      this.componentManiobraCargaDescargaConstruccion = activar_componente
    },
    setRequiereAdherirseServicioPublicoConstruccion(activar_componente: boolean) {
      this.componentRequiereAdherirseServicioPublicoConstruccion = activar_componente
    },
    setRequiereObstruirViaPublicaConstruccion(activar_componente: boolean) {
      this.componentRequiereObstruirViaPublicaConstruccion = activar_componente
    },
    setRequiereVentaAlcoholConstruccion(activar_componente: boolean) {
      this.componentRequiereVentaAlcoholConstruccion = activar_componente
    },
    reset(){
      this.$state = {
        componentBtnContinuarStepper: false,
        componentTramitesFinales: false,
        componentVehiculosPesados: false,
        componentManiobraCargaDescarga: false,
        componentAderirseServicioPublicoInstalacion: false,
        componentObstruirViaPublica: false,
        componentVentaAlcohol: false,
        componentServiciosRecoleccion: false,
        componentTipoSolicitante: false,
        componentTipoRepresentante:false,
        componentSuperficieDelPredio: false,
        componentMetrosAConstruir: false,
        componentSupuestosConstruccion: false,
        componentUbicadoFueraFraccionamientoColonia: false,
        componentDemolicionAmpliacion: false,
        componentRegularizacion: false,
        componentDesarrolloSuperiorMetrosAltura: false,
        componentConcluidoLicenciaDeConstruccion: false,
        componentCortesMayoresMetros: false,
        componentMaquinariaPropiaConstruccion:false,
        componentVehiculosPesadosConstruccion: false,
        componentManiobraCargaDescargaConstruccion: false,
        componentRequiereAdherirseServicioPublicoConstruccion:false,
        componentRequiereObstruirViaPublicaConstruccion:false,
        componentRequiereVentaAlcoholConstruccion:false,
      }
    }
  }
})

export {ComponentesArboles}
