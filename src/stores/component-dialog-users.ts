import { defineStore } from 'pinia';

const ComponentDialogUsers = defineStore({
  id: 'ComponentDialogUsers',
  state: () => ({
    tipoProceso: 'modalidad',
    preguntaUsuario: 'Modalidades disponibles',
    btns: ['Obra nueva', 'Ampliación', 'Regularización'],
    tipoInteraccion: 'seleccion',
    label: ''
  }),
  actions: {
    setTipoProceso (proceso:string){
      this.tipoProceso = proceso
    },
    setPreguntaUsuario (pregunta:string) {
      this.preguntaUsuario = pregunta
    },
    setBtns (btns:string[]) {
      this.btns = btns
    },
    setTipoInteraccion (interaccion:string) {
      this.tipoInteraccion = interaccion
    },
    setLabels (labels:string[]) {
      this.label = labels
    },
    reset() {
      this.$state = {
        tipoProceso: 'modalidad',
        preguntaUsuario: 'Modalidades disponibles',
        btns: ['Obra nueva', 'Ampliación', 'Regularización'],
        tipoInteraccion: 'seleccion',
        label: ''
      };
    }
  }
})

export {ComponentDialogUsers}
