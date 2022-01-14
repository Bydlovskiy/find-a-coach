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
        <el-input v-model.trim="authForm.email" type="email"></el-input>
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
import { computed, reactive, ref , defineComponent } from "vue";
import { store } from "@/store/MainStore";
import { useFormConfig } from "@/composables/useFormConfig";

export default defineComponent( {
  setup() {
    const loginForm = useFormConfig({
      email: {
        label: "email error",
        message: "email error",
        required: true,
        type: "email",
      },
      password: {
        label: "password error",
        message: "password error",
        required: true,
        type: "string",
      },
    });
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
    // const rules = reactive({
    //   email: {
    //     type: "string",
    //     required: true,
    //   },

    //   password: {
    //     type: "string",
    //     required: true,
    //   },
    // });
     const submitUser = async () => {
      if (mode.value === "login") {
        await loginForm.validate()
        store.dispatch("logIn", authForm);
      } else {
        await loginForm.validate()
        store.dispatch("signUp", authForm);
      }
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
    