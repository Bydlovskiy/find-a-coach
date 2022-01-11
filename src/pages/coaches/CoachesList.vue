<template>
  <el-button @click="test">TEST</el-button>
  <ul v-if="coachesList.length > 0">
    <li v-for="coach in coachesList" :key="coach.id">
       {{ coach.firstName }}
    </li>
  </ul>
  <div v-else >
    Emty List
  </div>

</template>

<script>
export default {
  data() {
    return {};
  },
  methods: {
    test() {
      this.$store.dispatch('coaches/getCoaches');
    },
  },
  computed: {
    coachesList() {
      return this.$store.getters['coaches/coachesList'];
    },
  },
};
</script>