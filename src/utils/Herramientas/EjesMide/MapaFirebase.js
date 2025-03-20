import { Dialog } from 'quasar';
export function MapaFirebase() {
  // let titulo = ''
  Dialog.create({
    title: 'Guardar Mapa',
    message: 'Titulo del Mapa',
    prompt: {
      model: '',
      type: 'text',
    },
    cancel: true,
  }).onOk((data) => {
    let mapa = {
      titulo: data,
      capas: [],
    };
    return mapa;
  });
}
