import { defineStore } from 'pinia';
import { apiMapDatasets } from 'boot/axios';

const LoadingLayersStore = defineStore({
  id: 'loadingmaps',
  state: () => ({
    mouseBehavior: ['normal', 'arbol-decisiones'],
    data: [],
    currentPage: 1,
    showOverlay: false,
    showOverlayBusqueda: false,
    loading: false,
    maximoCapas: false,
    nuevasCapas: [],
    inicioCapas: 5,
  }),
  actions: {
    setShowOverlayBusqueda(status:boolean) {
      this.showOverlayBusqueda = status
    },
    async obtenerCapasInicial() {
      try {
        this.loading = true;
        while (this.currentPage <= 4) {
          const response = await apiMapDatasets.get(
            `?page=${this.currentPage}`
          );
          this.data = this.data.concat(...response.data.datasets);
          this.currentPage++;
        }
        this.loading = false;
      } catch (error) {
        console.log(error);
      }
    },
    async obtenerMasCapas() {
      const maxPage: number = this.inicioCapas + 2;
      this.loading = true;
      while (this.inicioCapas < maxPage) {
        try {
          const response = await apiMapDatasets.get(
            `?page=${this.inicioCapas}`
          );
          this.nuevasCapas = this.data.concat(response.data.datasets);
          this.inicioCapas++;
          this.currentPage = maxPage
        } catch (error) {
          this.maximoCapas = true;
          break;
        }
      }
      this.loading = false;
    }
  },
});

export { LoadingLayersStore };
