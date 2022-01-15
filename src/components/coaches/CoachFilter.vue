<template>
  <el-card>
    <h3>Find you couch</h3>
    <div>
      <el-checkbox-group v-model="filterList">
        <el-checkbox
          label="frontend"
          size="large"
          checked
          @change="cangeFilters"
        />
        <el-checkbox
          label="backend"
          size="large"
          checked
          @change="cangeFilters"
        />
        <el-checkbox
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
import { ref, defineComponent } from "vue";
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