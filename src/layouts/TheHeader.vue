<template>
  <el-menu
      :default-active="'activeIndex'"
      class="el-menu-demo justify-between h"
      mode="horizontal"
      :router="true"
      background-color="#6b25e6">
    <div class="flex justify-center items-center ml-10">
      <router-link disabled :to="routeNames.coachesList"
      ><p class="text-4xl">Find a coach</p></router-link
      >
    </div>
    <el-menu-item :index="routeNames.coachesList">Couches</el-menu-item>
    <el-menu-item v-if="isLogin" :index="routeNames.messageList">Messages</el-menu-item>
    <el-menu-item v-if="isLogin" :index="routeNames.coachesList" @click="logOut">Log Out</el-menu-item>
    <el-menu-item v-else :index="routeNames.auth">LogIn</el-menu-item>

  </el-menu>
</template>

<script lang="ts">

import {computed, defineComponent} from "vue";

import {authStore} from "@/store";

import {routeNames} from "@/router/Route.names";

export default defineComponent({
  setup() {
    let isLogin = computed(() => !!authStore.userData.userId);
    const logOut = () => {
      authStore.logOut();
    };

    return {
      isLogin,
      logOut,
      routeNames
    }
  }
})

</script>


