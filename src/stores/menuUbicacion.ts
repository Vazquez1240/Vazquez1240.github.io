import { defineStore } from 'pinia';


const menuUbicacion = defineStore({
  id: 'menuUbicacion',
  state: () => ({
    features: [],
    showLoader: false
  }),
  actions: {
    setFeatures(features:any){
      this.features = features
    },
    setShowLoader(showLoader:boolean){
      this.showLoader = showLoader
    }
  }
})

export {menuUbicacion}
