<template>
  <the-header/>

  <div class="flex flex-col items-center min-h-4/5 m-10">
    <router-view></router-view>
  </div>
</template>

<script lang="ts">

import { defineComponent } from "vue";

import TheHeader from "./layouts/TheHeader.vue";

import {coachStore} from "@/pages/coaches/CoachStore";

export default defineComponent ({
  components: {
    TheHeader,
  },
  setup(){

    const refreshList =  () => {
      coachStore.getCoaches();
    };

    refreshList()

  }
});
</script>


