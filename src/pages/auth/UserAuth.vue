<template>

  <h1 class="text-4xl font-bold">
    {{ submitButtonText }}
  </h1>

  <el-card class="w-6/12 mt-4 flex justify-center  ">
    <el-form
        class="demo-ruleForm w-full"
        :ref="loginForm.ref"
        :model="authForm"
        label-position="top"
        label-width="500px"
        :rules="loginForm.rules"
    >
      <el-form-item class="w-96" label="email" :prop="loginForm.data.email.prop">
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
      <div class="flex justify-between">
        <el-button size="small" @click="changeMode">{{ changeModeButton }}</el-button>
        <el-button type="primary" @click="submitUser">{{ submitButtonText }}</el-button>

      </div>
    </el-form>
  </el-card>
</template>

<script lang="ts">

import {computed, reactive, ref, defineComponent} from "vue";

import {authStore} from "./AuthStore";

import {useFormConfig} from "@/composables/useFormConfig";

import {ElNotification} from "element-plus";

import router from "@/router";

import {routeNames} from "@/router/Route.names";

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
          .then(() => {
            if (mode.value === "login") {
              authStore.logIn(authForm)
                  .then(() => {
                    loginForm.resetFields();
                    router.push(routeNames.coachesList)
                  }).catch(() => {
                loginForm.resetFields();
              });
            } else {
              authStore.signUp(authForm)
                  .then(() => {
                    loginForm.resetFields();
                    mode.value = 'login';
                  }).catch(() => {
                loginForm.resetFields();
              })
            }
          }).catch(() => {
            loginForm.resetFields();
            ElNotification.error(
                {
                  title: 'Error',
                  message: 'You form is invalid!',
                  position: 'bottom-right'
                }
            )
          });
    };


    const mode = ref("login");

    const submitButtonText = computed(() => {
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
      submitButtonText,
      changeModeButton,

    };
  },
});
</script>
