<template>
  <el-card class="w-6/12">
    <h3 class="text-2xl font-bold mb-4">Find you couch</h3>
    <div>
      <el-checkbox-group  v-model="filterList">
        <el-checkbox
            :border="true"
            label="frontend"
            size="large"
            checked
            @change="cangeFilters"
        />
        <el-checkbox
            :border="true"
            label="backend"
            size="large"
            checked
            @change="cangeFilters"
        />
        <el-checkbox
            :border="true"
            label="career"
            size="large"
            checked
            @change="cangeFilters"
        />
      </el-checkbox-group>
    </div>
  </el-card>
</template>

<script lang="ts">

import {ref, defineComponent} from "vue";

export default defineComponent({

  setup(props, context) {

    const filterList = ref(["frontend", "backend", "career"]);

    const cangeFilters = () => {
      context.emit("changeFilter", filterList.value);
    };

    return {
      filterList,
      cangeFilters,
    };

  },
});
</script>