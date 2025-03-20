import { defineStore } from 'pinia';
import { useRouter } from 'vue-router';

export const useRouterStore = defineStore('router', {
  state: () => ({
    currentRoute: useRouter().options.history.location,
    pk: '96'
  }),
  actions: {
    setRoute(route: string, pk: string) {
      this.currentRoute = route;
      if(pk != 'null'){
        this.pk = pk
      }
    },
  },
});
