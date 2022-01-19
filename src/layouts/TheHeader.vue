<template>
  <el-menu
      :default-active="'activeIndex'"
      class="flex justify-around font-bold"
      mode="horizontal"
      :router="true"
      background-color="#6b25e6"
      text-color="white">
    <div class="flex justify-center items-center text-white font-bold">
      <router-link disabled :to="{name : globalRouteNames.coachesList}"
      ><p class="text-4xl">Find a coach</p></router-link
      >
    </div>
    <el-menu-item class="dock-right" :index="globalRouteNames.coachesList" :route="{name : globalRouteNames.coachesList}">Couches
    </el-menu-item>
    <el-menu-item class="dock-right" v-if="isLogin" :index="globalRouteNames.messageList" :route="{name : globalRouteNames.messageList}">
      Messages
    </el-menu-item>
    <el-menu-item class="dock-right" v-if="isLogin" :index="globalRouteNames.coachesList" :route="{name : globalRouteNames.coachesList}"
                  @click="logOut">Log Out
    </el-menu-item>
    <el-menu-item class="dock-right" v-else :index="globalRouteNames.auth" :route="{name : globalRouteNames.auth}">LogIn</el-menu-item>


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

    const globalRouteNames = routeNames

    return {
      isLogin,
      logOut,
      routeNames,
      globalRouteNames
    }
  }
})

</script>



