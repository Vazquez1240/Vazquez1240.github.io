import { Feature } from 'ol';
import { Polygon } from 'ol/geom';
import { Vector as VectorLayer } from 'ol/layer';
import { Vector as VectorSource } from 'ol/source';
import { ComponentesArboles } from 'stores/componentes-arboles';
import { Fill, Stroke, Style } from 'ol/style';


export function Predios(map:any, capaResaltadaActual:any,  showDialog: any, coordenadas:any, modelValue:any, tipoProceso:any, preguntaUsuario:any) {
  const useComponenteArboles = ComponentesArboles()
  if (capaResaltadaActual.value) {
    map.removeLayer(capaResaltadaActual.value);
  }
  const coordenadasPoligono = [coordenadas];
  const highlightedFeature = new Feature({
    geometry: new Polygon(coordenadasPoligono),
  });
  const resaltadoCaracterística = new VectorSource({
    features: [highlightedFeature],
  });
  capaResaltadaActual.value = new VectorLayer({
    source: resaltadoCaracterística,
    style: new Style({
      stroke: new Stroke({
        color: 'black', // Usa un color brillante para probar
        width: 1,
      }),
      fill: new Fill({
        color: 'rgba(255, 255, 255, .80)', // Relleno transparente para ver el borde
      }),
    }),
    zIndex: 234
  });
  if(useComponenteArboles.componentLoading){
    map.addLayer(capaResaltadaActual.value);
    const view = map.getView();
    view.fit(resaltadoCaracterística.getExtent(), {
      padding: [50, 50, 50, 50],
      duration: 1000,
      maxZoom: 20,
    });
    useComponenteArboles.setComponenteTipoProceso(true)
    preguntaUsuario.value = 'Seleccione un proceso'
    useComponenteArboles.setComponenteLoading(false)
    useComponenteArboles.setComponenteDialogoUsuario(true)
  }
}
