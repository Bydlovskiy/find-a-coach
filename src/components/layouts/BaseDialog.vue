<template>
  <el-dialog v-model="dialogVisible" :title="props.title" width="30%" center>
    <span>{{ props.message }}</span>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="dialogVisible = false" type="warning" round>{{
          props.buttonText
        }}</el-button>
      </span>
    </template>
  </el-dialog>
</template>

<script>
import { ref } from "vue";
export default {
  props: {
    show: {
      type: Function,
      required: true,
    },
    message: {
      type: String,
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    buttonText: {
      type: String,
      required: true,
    },
  },
  setup(props) {
     const showDialog = () => {
          dialogVisible.value = true
      }
    const dialogVisible = ref(true); 
    return {
      dialogVisible,
      props,
      showDialog
      //   dialogMessage,
      //   dialogTittle,
      //   dialogButtonText,
    };
  },
};
</script>