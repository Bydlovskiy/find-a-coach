<template>
  <the-header/>
  <div class="flex flex-col items-center min-h-4/5 m-10">
    <router-view></router-view>
  </div>
</template>

<script lang="ts">

import {defineComponent, watch, computed} from "vue";

import TheHeader from "./layouts/TheHeader.vue";

import {coachStore} from "@/pages/coaches/CoachStore";

import {authStore} from "@/pages/auth/AuthStore";
import router from "@/router";
import {routeNames} from "@/router/Route.names";

export default defineComponent ({
  components: {
    TheHeader,
  },
  setup(){
    const autoLogout = computed(() => authStore.isAutoLogout)
    watch(autoLogout ,(newValue , oldValue) => {
      if(newValue && newValue != oldValue){
        router.replace(routeNames.coachesList)
      }
    } )
    const tryLogin = () => {
      authStore.trylogin()
    }
    const refreshList =  () => {
      coachStore.getCoaches();
    };
    refreshList();
    tryLogin();


  }
});
</script>


