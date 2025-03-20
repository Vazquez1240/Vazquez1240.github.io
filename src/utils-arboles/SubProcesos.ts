import { userTree } from 'stores/arboles';
import { ComponentesArboles } from 'stores/componentes-arboles';
import { PeticionCatalogoTramites } from 'src/utils-arboles/PeticionesArbol';
import { ComponentDialogUsers } from 'stores/component-dialog-users';
import { Subprocesos } from 'stores/subprocesos';
import { SubProcesoTipoSolicitante } from 'src/utils-arboles/ClasificacionSolicitante';

const useUserTree = userTree()
const useSubprocesos = Subprocesos()
const useComponenteArboles = ComponentesArboles()
const useComponentDialogUsers = ComponentDialogUsers()


async function SubProcesoUsoSuelo(){
  const response = await PeticionCatalogoTramites()

  if(useComponenteArboles.componentDemolicion){
    useComponenteArboles.setComponenteDemolicion(false)
  }
  useSubprocesos.nombres_tramites = []

  if(useUserTree.proceso.toLowerCase() === 'construcción' && useUserTree.modalidad.toLowerCase() === 'obra nueva'){
    response.forEach((tramite: { nombre_tramite: string; }) => {
      tramite.nombre_tramite.toLowerCase() === 'factibilidad de uso de suelo' ? useSubprocesos.setNombresTramites(tramite.nombre_tramite): null
      tramite.nombre_tramite.toLowerCase() === 'fijación de lineamientos generales de diseño arquitectónico' ? useSubprocesos.setNombresTramites(tramite.nombre_tramite): null
      tramite.nombre_tramite.toLowerCase() === 'alineamiento vial' ? useSubprocesos.setNombresTramites(tramite.nombre_tramite) : null
      // tramite.nombre_tramite.toLowerCase() === 'dictamen para establecimientos comerciales' ? useSubprocesos.setNombresTramites(tramite.nombre_tramite): null
      tramite.nombre_tramite.toLowerCase() === 'licencia de uso de suelo' ? useSubprocesos.setNombresTramites(tramite.nombre_tramite) : null
    })
    // useSubprocesos.setNombresTramites('Dictamen para establecimiento de comerciales')
    useComponenteArboles.setComponenteDemolicion(true)
  }
}

// Constancia de terminación de obras y liberación de garantías


async function SubProcesoDemolicion() {

  if(useComponenteArboles.componentLotificacion){
    useComponenteArboles.setCompoenteLotificacion(false)
  }
  const response = await PeticionCatalogoTramites()
  if(useSubprocesos.require_demolicion){
    response.forEach((tramite: {nombre_tramite: string}) => {
      tramite.nombre_tramite.toLowerCase() === 'demolición total' ? useSubprocesos.setNombresTramites(tramite.nombre_tramite) : null
      tramite.nombre_tramite.toLowerCase() === 'proyecto ejecutivo arquitectónico o licencia de construcción' ? useSubprocesos.setNombresTramites(tramite.nombre_tramite) : null
      // tramite.nombre_tramite.toLowerCase() === 'numero oficial' ? useSubprocesos.setNombresTramites(tramite.nombre_tramite) : null
      tramite.nombre_tramite.toLowerCase() === 'permiso de desmonte y desyerbe' ? useSubprocesos.setNombresTramites(tramite.nombre_tramite) : null
      tramite.nombre_tramite.toLowerCase() === 'licencia de uso de edificación' ? useSubprocesos.setNombresTramites(tramite.nombre_tramite) : null

    })
  }else{
    response.forEach((tramite: {nombre_tramite:string}) => {
      tramite.nombre_tramite.toLowerCase() === 'proyecto ejecutivo arquitectónico o licencia de construcción' ? useSubprocesos.setNombresTramites(tramite.nombre_tramite) : null
      tramite.nombre_tramite.toLowerCase() === 'permiso de desmonte y desyerbe' ? useSubprocesos.setNombresTramites(tramite.nombre_tramite) : null
      // tramite.nombre_tramite.toLowerCase() === 'numero oficial' ? useSubprocesos.setNombresTramites(tramite.nombre_tramite) : null
      tramite.nombre_tramite.toLowerCase() === 'licencia de uso de edificación' ? useSubprocesos.setNombresTramites(tramite.nombre_tramite) : null
    })
  }
  useComponenteArboles.setCompoenteLotificacion(true)
}

async function SubProcesoLotificacion() {
  if(useComponenteArboles.componentGravamen){
    useComponenteArboles.setComponenteGravamen(false)
  }
  const response = await PeticionCatalogoTramites()
  if(useSubprocesos.requiere_lotificacion){
    response.forEach((tramite:{nombre_tramite:string}) => {
      tramite.nombre_tramite.toLowerCase() === 'constancia de terminación de obra' ? useSubprocesos.setNombresTramites(tramite.nombre_tramite) : null
      // tramite.nombre_tramite.toLowerCase() === 'constancia de terminación de obras y liberación de garantías' ? useSubprocesos.setNombresTramites(tramite.nombre_tramite) : null
      tramite.nombre_tramite.toLowerCase() === 'proyecto de ventas en condominio, régimen en condominio, multifamiliar o usos mixtos' ? useSubprocesos.setNombresTramites(tramite.nombre_tramite) : null
    })
    useComponenteArboles.setComponenteGravamen(true)
  }else{
    useComponenteArboles.setComponenteMaquinariaPropiaConstruccion(true)
  }
}

async function SubProcesoGravamen() {
  if(useSubprocesos.gravamen){
    const personaliza = useSubprocesos.requisitos_personaliza.find(item => item.properties.encuentra_gravamen !== 'N/A')
    useSubprocesos.setRequisitosEspecificosPersonaliza({
      nombre_tramite: personaliza.properties.nombre_tramite,
      valor: personaliza.properties.encuentra_gravamen
    })
  }
  useComponenteArboles.setComponenteMaquinariaPropiaConstruccion(true)
}

async function SubProcesoDemolicionAmpliacion() {
  if(useComponenteArboles.componentDimensiones){
    await useComponenteArboles.setComponenteDimensiones(false)
  }
  if(useSubprocesos.requiere_demolicion_ampliacion){
    useComponenteArboles.setComponenteDimensiones(true)
    useComponentDialogUsers.setTipoInteraccion('input')
  }else{
    useComponenteArboles.setComponenteCardSuccess(true)
    useComponenteArboles.setComponenteDimensiones(true)
    useUserTree.setMensajesSuccessCard('Preguntas completadas')
    useComponenteArboles.setComponenteBtnContinuarStepper(true)
    useSubprocesos.setNombresTramites('Licencia de uso de edificación')
  }
}


// Dimensiones este sera el ultimo para activar el final ijijijijijij de la parte de amplificacion para pasar al final del stepper
async function SubProcesoDimensiones () {

  if(parseInt(useSubprocesos.medida_demolicion) > 200){
    useSubprocesos.setNombresTramites('Demolición parcial')
    useSubprocesos.setNombresTramites('Proyecto ejecutivo arquitectónico o Licencia de construcción')
    useSubprocesos.setNombresTramites('Licencia de uso de edificación')
  }else{

    useSubprocesos.setNombresTramites('Demolición parcial')
    useSubprocesos.setNombresTramites('Proyecto ejecutivo arquitectónico o Licencia de construcción')
    useSubprocesos.setNombresTramites('Licencia de uso de edificación')
  }
  useUserTree.setMensajesSuccessCard('Preguntas completadas')
  useComponenteArboles.setComponenteBtnContinuarStepper(true)
  useComponenteArboles.setComponenteCardSuccess(true)
}

async function SubProcesoMaquinariaInstalacion (){
  if(useSubprocesos.maquinaria_propia_instalacion){
    useComponenteArboles.setComponenteVehiculosPesados(true)
  }else{
    useComponenteArboles.setComponenteManiobraCargaDescarga(true)
  }
}

async function SubProcesoVehiculosPesados () {
  if(useSubprocesos.requiere_vehiculos_pesados){
    useSubprocesos.setNombresTramites('Registro de circulación de vehículo de transporte de carga pesada en vías limitadas y/o restringidas')
    useComponenteArboles.setComponenteManiobraCargaDescarga(true)
  }else{
    useComponenteArboles.setComponenteManiobraCargaDescarga(true)
  }
}

async function SubProcesoManiobrasCargaDescarga(){
  if(useSubprocesos.requiere_maniobra_carga_descarga){
    useSubprocesos.setNombresTramites('Permiso de carga y descarga')
    useComponenteArboles.setComponenteAderirseServicioPublicoInstalacion(true)
  }else{
    useComponenteArboles.setComponenteAderirseServicioPublicoInstalacion(true)
  }
}

async function SubProcesoAderirseServicioPublico(){
  if(useSubprocesos.requiere_aderirse_servicio_publico){
   useSubprocesos.setNombresTramites('Permiso especial para trabajos en la vía pública')
    useComponenteArboles.setComponenteObstruirViaPublica(true)
  }else{
    useComponenteArboles.setComponenteObstruirViaPublica(true)
  }
}

async function SubProcesoObstruccionViaPublica(){
  if(useSubprocesos.requiere_obstruir_via_publica){
    useSubprocesos.setNombresTramites('Obstrucción de carril')
    useComponenteArboles.setComponenteVentaAlcohol(true)
  }else{
    useComponenteArboles.setComponenteVentaAlcohol(true)
  }
}

async function SubProcesoVentaAlcohol(){
  if(useSubprocesos.requiere_venta_alcohol){
    useSubprocesos.setNombresTramites('Anuencia municipal')
    useComponenteArboles.setComponenteServiciosRecoleccion(true)
  }else{
    useComponenteArboles.setComponenteServiciosRecoleccion(true)
  }
}

async function SubProcesoServicioResiduos() {
  if(useSubprocesos.requiere_servicio_residuos){
    useSubprocesos.setNombresTramites('Solicitud de servicio de recolección de residuos sólidos no peligrosos a establecimientos tipo A, B y C')
    useComponenteArboles.setComponenteTipoSolicitante(true)
    useComponenteArboles.setComponenteBtnContinuarStepper(true)
    useUserTree.setMensajesSuccessCard('Preguntas completadas')
    useComponenteArboles.setComponenteCardSuccess(true)
  }else{
    useComponenteArboles.setComponenteTipoSolicitante(true)
    useComponenteArboles.setComponenteBtnContinuarStepper(true)
    useUserTree.setMensajesSuccessCard('Preguntas completadas')
    useComponenteArboles.setComponenteCardSuccess(true)
  }
}

async function SubProcesoInstalacion() {
  const response = await PeticionCatalogoTramites()
  response.forEach((tramite: { nombre_tramite: string; }) => {
    tramite.nombre_tramite.toLowerCase() === 'licencia de uso de edificación' ? useSubprocesos.setNombresTramites(tramite.nombre_tramite): null
  })
}


async function SubProcesoDesarrolloSuperiorMetrosAltura(){
  if(useUserTree.desarrolloSuperiorMetrosAltura){
    const personaliza = useSubprocesos.requisitos_personaliza.find(item => item.properties.desarrollo_superior_altura !== 'N/A')
    useSubprocesos.setRequisitosEspecificosPersonaliza({
      nombre_tramite: personaliza.properties.nombre_tramite,
      valor: personaliza.properties.desarrollo_superior_altura,
    })
    useComponenteArboles.setComponenteConcluidoLicenciaDeConstruccion(true)
  }else{
    useComponenteArboles.setComponenteConcluidoLicenciaDeConstruccion(true)
  }
}

// AQUI ES DONDE SE ROMPE Y SE DIVEDE LAS PREGUNTAS DEL PROCESO DE CADA MODALIDAD

async function SubProcesoConcluidoObrasLicenciaDeConstruccion(){
  if(useUserTree.concluidoLicenciaDeConstruccion){
    // Agregando tramite si si
    const personaliza = useSubprocesos.requisitos_personaliza.find(item =>
          item.properties.garantia_hipotecaria !== 'N/A')
    useSubprocesos.setRequisitosEspecificosPersonaliza({
      nombre_tramite: personaliza.properties.nombre_tramite,
      valor: personaliza.properties.garantia_hipotecaria
    })


    useUserTree.modalidad === 'obra nueva' ? useComponenteArboles.setComponentSupuestosConstruccion(true) : null
    if(useUserTree.modalidad === 'regularización'){
      useSubprocesos.setNombresTramites('Licencia de uso de edificación')
      useSubprocesos.setNombresTramites('Proyecto ejecutivo arquitectónico o Licencia de construcción')
      useComponenteArboles.setComponenteTramites(true)
      useComponenteArboles.setComponenteCardSuccess(true)
      useUserTree.setMensajesSuccessCard('Preguntas completadas')
      useComponenteArboles.setComponenteBtnContinuarStepper(true)
    }
  }else{

    // Agregando tramite si no
    const personaliza = useSubprocesos.requisitos_personaliza.find(item =>
          item.properties.presupuesto_obra !== 'N/A')

    useSubprocesos.setRequisitosEspecificosPersonaliza({
      nombre_tramite: personaliza.properties.nombre_tramite,
      valor: personaliza.properties.presupuesto_obra
    })
    useUserTree.modalidad === 'obra nueva' ? useComponenteArboles.setComponentSupuestosConstruccion(true) : null
    useUserTree.modalidad === 'ampliación' ? useComponenteArboles.setComponenteDemolicionAmpliacion(true) : null
    if(useUserTree.modalidad === 'regularización'){
      useComponenteArboles.setComponenteTramites(true)
      useComponenteArboles.setComponenteCardSuccess(true)
      useUserTree.setMensajesSuccessCard('Preguntas completadas')
      useComponenteArboles.setComponenteBtnContinuarStepper(true)
    }
  }
}

async function SubProcesoCortesMayoresMetros(){
  if(useUserTree.cortesMayoresMetros){
    const personaliza = useSubprocesos.requisitos_personaliza.find(item => item.properties.cortes_mayores_3_metros !== 'N/A')
    useSubprocesos.setRequisitosEspecificosPersonaliza({
      nombre_tramite: personaliza.properties.nombre_tramite,
      valor: personaliza.properties.cortes_mayores_3_metros,
    })
    useComponenteArboles.setComponenteMetrosAConstruir(true)
  }else{
    useComponenteArboles.setComponenteMetrosAConstruir(true)
  }
}


export {SubProcesoUsoSuelo,
  SubProcesoDemolicion,
  SubProcesoLotificacion,
  SubProcesoGravamen,
  SubProcesoDemolicionAmpliacion,
  SubProcesoDimensiones,
  SubProcesoMaquinariaInstalacion,
  SubProcesoVehiculosPesados,
  SubProcesoManiobrasCargaDescarga,
  SubProcesoAderirseServicioPublico,
  SubProcesoObstruccionViaPublica,
  SubProcesoVentaAlcohol,
  SubProcesoServicioResiduos,
  SubProcesoInstalacion,
  SubProcesoDesarrolloSuperiorMetrosAltura,
  SubProcesoConcluidoObrasLicenciaDeConstruccion,
  SubProcesoCortesMayoresMetros
}
