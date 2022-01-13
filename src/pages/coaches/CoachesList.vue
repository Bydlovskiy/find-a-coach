<template>
  <el-button @click="refreshList">TEST</el-button>
  <coach-filter @changeFilter="setFilters"></coach-filter>
  <ul v-if="coachesList.length > 0">
    <coach-item
      v-for="coach in coachesList"
      :key="coach.id"
      :coach="coach"
    ></coach-item>
  </ul>
  <div v-else>Emty List</div>
</template>

<script>
import { computed, ref } from "vue";
import { store } from "@/store/MainStore";
import CoachItem from "@/components/coaches/CoachItem.vue";
import CoachFilter from "@/components/coaches/CoachFilter.vue";
export default {
  components: {
    CoachItem,
    CoachFilter,
  },
  setup() {
    let filters = ref(["frontend", "backend", "career"]);
    const coachesList = computed(() => {
      const list = [...Object.values(store.getters.coaches)];
      return list.filter((coach) => {
        if (
          filters.value.includes("frontend") &&
          coach.areas.includes("frontend")
        ) {
          return true;
        } else if (
          filters.value.includes("backend") &&
          coach.areas.includes("backend")
        ) {
          return true;
        } else if (
          filters.value.includes("career") &&
          coach.areas.includes("career")
        ) {
          return true;
        }
        return false;
      });
    });
    const refreshList = () => {
      store.dispatch("getCoaches");
    };
    const setFilters = (newFilter) => {
      filters.value = [...Object.values(newFilter)];
    };
    refreshList();
    return {
      coachesList,
      refreshList,
      setFilters,
    };
  },
};
</script>