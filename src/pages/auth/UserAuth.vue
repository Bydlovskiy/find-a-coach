<template>
    <el-card class="w-full flex box-card">
  <el-form
    class="demo-ruleForm w-full"
    ref="form"
    :model="authForm"
    label-position="top"
    :rules="rules"
  >
      <el-form-item label="email" prop="email">
        <el-input v-model.trim="authForm.email" type="email"></el-input>
      </el-form-item>
      <el-form-item label="password" prop="password">
        <el-input
          v-model.trim="authForm.password"
          type="password"
          placeholder="Please input password"
          show-password
        ></el-input>
      </el-form-item>
      <el-button @click="submitUser">{{ submitButton }}</el-button>
      <el-button @click="changeMode">{{ changeModeButton }}</el-button>
  </el-form>
    </el-card>
</template>

<script>
import { computed, reactive, ref } from "vue";
import { store } from "@/store/MainStore";
export default {
  setup() {
    const mode = ref("login");
    const authForm = reactive({
      email: "",
      password: "",
    });
    const submitButton = computed(() => {
      if (mode.value === "login") {
        return "LogIn";
      } else {
        return "Register";
      }
    });
    const changeModeButton = computed(() => {
      if (mode.value === "login") {
        return "SignUn";
      } else {
        return "Login";
      }
    });
    const changeMode = () => {
      mode.value === "login" ? (mode.value = "sigUp") : (mode.value = "login");
    };
    const rules = reactive({
      email: {
        type: "string",
        required: true,
      },

      password: {
        type: "string",
        required: true,
      },
    });
    const submitUser = () => {
      if (mode.value === "login") {
        store.dispatch("logIn", authForm);
      } else {
        store.dispatch("signUp", authForm);
      }
    };

    return {
      authForm,
      submitUser,
      rules,
      changeMode,
      mode,
      submitButton,
      changeModeButton,
    };
  },
};
</script>
    