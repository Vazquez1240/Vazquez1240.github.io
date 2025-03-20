// router/index.ts
import { RouteRecordRaw } from 'vue-router';

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    redirect: '/mapa/96',
    children: [
      {
        path: '/mapa/:pk',
        component: () => import('components/Mira/VisualizadorMapas.vue'),
      },
      {
        path: '/todas-capas',
        component: () => import('components/Mira/VisualizadorMapas.vue'),
      },
      {
        path: '/arboles-decisiones',
        component: () => import('components/Arboles/ArbolesDeDecisiones.vue')
      }
    ],
  },
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/ErrorNotFound.vue'),
  },
];

export default routes;
