import { defineStore } from 'pinia';
import { Map } from 'ol';


const contextMap = defineStore({
  id: 'contextMap',
  state: () => ({
    context: typeof Map,
  }),
  actions: {
    setContextMap(context:Map){
      this.context = context
    }
  }
})

export {contextMap}
