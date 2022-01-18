<template>
  <div class="flex ">
    <el-button @click="refreshList">Refresh list</el-button>
    <el-button v-if="isLogin && !isRegistered">
      <router-link :to="routeNames.coachRegister"> Register new Coach </router-link>
    </el-button>

  </div>
  <coach-filter class="mt-4" @changeFilter="setFilters"></coach-filter>
  <ul class="w-6/12" v-if="coachesList.length > 0">
    <coach-item
      v-for="coach in coachesList"
      :key="coach.id"
      :coach="coach"
    ></coach-item>
  </ul>
  <el-card v-else class="w-6/12 mt-4 flex justify-center text-2xl font-bold" >
    <p>Empty List</p>
  </el-card>

</template>

<script lang="ts">

import { computed, ref, defineComponent } from "vue";

import { coachStore } from "@/store";

import { authStore } from "@/store";

import CoachItem from "@/components/coaches/CoachItem.vue";

import CoachFilter from "@/components/coaches/CoachFilter.vue";

import {routeNames} from "@/router/Route.names";

export default defineComponent({
  components: {
    CoachItem,
    CoachFilter,
  },

  setup() {

    let filters = ref(["frontend", "backend", "career"]);

    const isLogin = computed(() => !!authStore.userData.token);

    const isRegistered = computed(() => coachesList.value.some(coach => coach.id === authStore.userData.userId))

    const coachesList = ref(computed(() => {
      return coachStore.coaches
        .filter((coach) => {
          if (filters.value.includes("frontend") && coach.areas.includes("frontend")) {
            return true;
          } else if (filters.value.includes("backend") && coach.areas.includes("backend")) {
            return true;
          } else if (filters.value.includes("career") && coach.areas.includes("career")) {
            return true;
          }
          return false;
        });
    }));

    const refreshList = async () => {
      await coachStore.getCoaches()
    };

    const setFilters = (newFilter: string[]) => {
      filters.value = [...Object.values(newFilter)];
    };

    refreshList();

    return {
      coachesList,
      refreshList,
      setFilters,
      isLogin ,
      isRegistered,
      routeNames
    };
  },
});
</script>
