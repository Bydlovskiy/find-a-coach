<template>

  <el-button @click="refreshList">TEST</el-button>
  <ul v-if="coachesList">
    <coach-item
      v-for="coach in coachesList"
      :key="coach.id"
      :coach="coach"
    ></coach-item>
  </ul>
  <div v-else>Emty List</div>
</template>

<script>
import { computed } from "vue";
import { store } from "@/store/MainStore";
import CoachItem from "@/components/coaches/CoachItem.vue";
export default {
  components: {
    CoachItem,
  },
  setup() {
    const coachesList = computed(() => {
      return store.getters.coaches;
    });
    const refreshList = () => {
      store.dispatch("getCoaches");
    };
    refreshList()
    return {
      coachesList,
      refreshList,
    };
  },
};
</script>