<template>
  <el-menu
      :default-active="'activeIndex'"
      class="el-menu-demo justify-between h"
      mode="horizontal"
      :router="true"
      background-color="#6b25e6">
    <div class="flex justify-center items-center ml-10">
      <router-link disabled to="/coaches"
      ><p class="text-4xl">Find a coach</p></router-link
      >
    </div>
    <el-menu-item index="/coaches">Couches</el-menu-item>
    <el-menu-item v-if="isLogin" index="/messages">Messages</el-menu-item>
    <el-menu-item v-if="isLogin">Log Out</el-menu-item>
    <el-menu-item v-else index="/user-auth">LogIn</el-menu-item>

  </el-menu>
</template>

<script lang="ts">

import {computed, defineComponent} from "vue";

import {authStore} from "@/pages/auth/AuthStore";

import router from "@/router";

export default defineComponent ({
  setup(){
    let isLogin = computed(() => !!authStore.userData.userId )

    return {
      isLogin,

    }
  }
})

</script>


