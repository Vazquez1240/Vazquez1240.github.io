import { defineStore } from 'pinia';
import { RespuestaNominatim } from 'src/utils-arboles/interface';

const dialogoResultadosNominatim = defineStore({
  id: 'dialogoResultadosNominatim',
  state: () => ({
    dataNominatim: {
      status: 0,
      data: []
    } as RespuestaNominatim,
  }),
  actions: {
    setDataNominatim(response:any){
      this.dataNominatim = {
        status: response.status,
        data: response.data
      }
    }
  }
})

export {dialogoResultadosNominatim}
