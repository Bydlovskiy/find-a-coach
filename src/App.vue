<template>
  <the-header/>

  <el-card class="flex flex-col items-center min-h-4/5 m-10">
    <router-view></router-view>
  </el-card>
</template>

<script>
import TheHeader from "./components/layouts/TheHeader.vue";
export default {
  components: {
    TheHeader,
  },
};
</script>


