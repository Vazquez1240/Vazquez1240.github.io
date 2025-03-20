import { defineStore } from 'pinia';


const dialogoBuscadorLugar = defineStore({
  id: 'dialogoBuscadorLugar',
  state: () => ({
    showDialogo: false,
    direccion: '',
  }),
  actions: {
    setShowDialogo(status:boolean){
      this.showDialogo = status
    },
    setDireccion(direccion:string){
      this.direccion = direccion
    }
  }
})

export {dialogoBuscadorLugar}
