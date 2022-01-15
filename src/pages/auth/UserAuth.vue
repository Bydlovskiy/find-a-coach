<template>
  <el-card class="w-full flex box-card">
    <el-form
        class="demo-ruleForm w-full"
        :ref="loginForm.ref"
        :model="authForm"
        label-position="top"
        label-width="500px"
        :rules="loginForm.rules"
    >
      <el-form-item label="email" :prop="loginForm.data.email.prop">
        <el-input
            v-model.trim="authForm.email"
            type="email"
            placeholder="Please input email"
        ></el-input>
      </el-form-item>

      <el-form-item label="password" :prop="loginForm.data.password.prop">
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

<script lang="ts">
import { computed, reactive, ref, defineComponent } from "vue";
import { authStore } from "./AuthStore";
import { useFormConfig } from "@/composables/useFormConfig";

export default defineComponent({
  setup() {

    const loginForm = useFormConfig({
      email: {
        label: "Email",
        message: "email error",
        required: true,
        type: "email",
      },
      password: {
        label: "Password",
        message: "password error",
        required: true,
        type: "string",
      },
    });

    const authForm = reactive({
      email: "",
      password: "",
    });

    const submitUser = async () => {
      await loginForm.validate()
      if (mode.value === "login") {
        authStore.logIn(authForm);
        loginForm.resetFields()
      } else {
        authStore.signUp(authForm);
        loginForm.resetFields();
      }
    };


    const mode = ref("login");

    const submitButton = computed(() => {
      return mode.value === "login" ? "LogIn" : "Register"
    });

    const changeModeButton = computed(() => {
      return mode.value === "login" ? "SignUn" : "Login"
    });

    const changeMode = () => {
      mode.value === "login" ? (mode.value = "sigUp") : (mode.value = "login");
    };

    return {
      authForm,
      submitUser,
      loginForm,
      changeMode,
      mode,
      submitButton,
      changeModeButton,
    };
  },
});
</script>
