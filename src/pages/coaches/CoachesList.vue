<template>
  <el-button @click="refreshList">TEST</el-button>

  <el-button>
    <router-link to="/register"> Register new Coach </router-link>
  </el-button>

  <coach-filter @changeFilter="setFilters"></coach-filter>

  <ul v-if="coachesList.length > 0">
    <coach-item
      v-for="coach in coachesList"
      :key="coach.id"
      :coach="coach"
    ></coach-item>
  </ul>
  <div v-else>Empty List</div>
</template>

<script lang="ts">
import { computed, ref, defineComponent } from "vue";
import { coachStore } from "@/store";

import CoachItem from "@/components/coaches/CoachItem.vue";
import CoachFilter from "@/components/coaches/CoachFilter.vue";

export default defineComponent({
  components: {
    CoachItem,
    CoachFilter,
  },

  setup() {
    let filters = ref(["frontend", "backend", "career"]);

    const coachesList = computed(() => {
      return [...Object.values(coachStore.coaches)]
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
    });

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
    };
  },
});
</script>
