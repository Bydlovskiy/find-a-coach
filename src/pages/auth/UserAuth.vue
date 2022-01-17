<template>

  <h1 class="text-4xl font-bold">
    {{ submitButton }}
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
        <el-button size="small"  @click="changeMode">{{ changeModeButton }}</el-button>
        <el-button type="primary" @click="submitUser">{{ submitButton }}</el-button>

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

      await loginForm.validate().then(() => {
        if (mode.value === "login") {
          authStore.logIn(authForm)
              .then(response => {
                authStore.setUser({
                  token: response.data.idToken,
                  expiresIn: response.data.expiresIn,
                  userId: response.data.localId
                });
                loginForm.resetFields();
                ElNotification.success({
                  title: 'Success',
                  message: 'You logined successfully!',
                  position: 'bottom-right'
                });
                router.push('/coaches')
              }).catch(() => {
            loginForm.resetFields();
            ElNotification.error(
                {
                  title: 'Error',
                  message: 'Something was wrong.Try again.',
                  position: 'bottom-right'
                }
            )
          });

        } else {

          authStore.signUp(authForm)
              .then(response => {
                // authStore.setUser({
                //   token: response.data.idToken,
                //   expiresIn: response.data.expiresIn,
                //   userId: response.data.localId
                // });
                console.log(authStore.userData)
                loginForm.resetFields();
                ElNotification.success({
                  title: 'Success',
                  message: 'You registered successfully!',
                  position: 'bottom-right'
                });
                mode.value = 'login';
              }).catch(() => {
            loginForm.resetFields();
            ElNotification.error(
                {
                  title: 'Error',
                  message: 'Something was wrong.Try again.',
                  position: 'bottom-right'
                }
            )
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
