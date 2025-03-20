<template>
  <q-header
    class="bg-white"
    :style="$q.screen.lt.md ? 'height: 60px;' : 'height: 65px;'"
  >
    <q-toolbar
      class="q-py-none justify-between "
      :style="$q.screen.lt.md ? 'height: 60px;' : 'height: 65px;'"
    >
      <q-toolbar-title
        class="col-auto flex justify-start items-center"
        :style="$q.screen.lt.md ? 'height: 60px;' : 'height: 65px;'"
      >
        <transition
          appear
          enter-active-class="animated fadeInLeft"
          leave-active-class="animated fadeOutLeft"
        >
          <a
            href="https://www.monterrey.gob.mx"
            target="_blank"
            title="Gobierno de Monterrey"
          >
            <q-avatar square :size="$q.screen.xs ? '3rem' : '3.5rem'" class="q-mr-sm">
              <img
                src="https://micro.appsmty.gob.mx/img/gdm/mty_gdm_logo_iso.svg"
                alt="isotipo gobierno de monterrey"
              />
            </q-avatar>
            <q-avatar v-show="$q.screen.gt.xs" square size="4rem">
              <img
                src="https://micro.appsmty.gob.mx/img/gdm/mty_gdm_logo_tipo.svg"
                alt="logotipo gobierno de monterrey"
              />
            </q-avatar>
            <q-avatar v-show="$q.screen.gt.xs" square :size="$q.screen.xs ? '3rem' : '2.5rem'" style="width: auto; margin-left: 18px; margin-top: 6px">
              <img
                src="https://mty-imagenes-respaldo.web.app/images/mide/mide_logo_mty.png"
                alt="logotipo Mira"
              />
            </q-avatar>
          </a>
        </transition>
        <transition
          appear
          enter-active-class="animated fadeInLeft"
          leave-active-class="animated fadeOutLeft"
        >

          <router-link to="/" title="Mira">
            <!-- <q-avatar square size="3.5rem" class="">-->
            <!-- <img src="/img/logos/iso_sanamente.png" alt="isotipo mira"/>-->
            <!--  </q-avatar>-->
            <q-avatar square :size="$q.screen.xs ? '3rem' : '3.3rem'" style="width: auto">
              <img
                src="https://mty-microwebapps.web.app/img/sig/sig-god/datosmty/mty_sig_mira_comp_200.png"
                alt="logotipo Mira"
              />
            </q-avatar>
          </router-link>
        </transition>
      </q-toolbar-title>

      <div v-if="router.fullPath !== '/arboles-decisiones'" class="flex justify-end full-width">
        <ComponenteSearch/>
      </div>

      <BotonApps />

      <!--<BotonCuenta /> -->
    </q-toolbar>
  </q-header>
</template>

<script setup lang="ts">
import BotonApps from 'components/BotonApps.vue';
import ComponenteSearch from 'components/ComponenteSearch.vue';
import { useRoute } from 'vue-router';

const router = useRoute();
console.log(router.fullPath)
</script>
<style>
p {
  font-size: 1rem;
}

span {
  margin: 0 !important;
}
</style>
