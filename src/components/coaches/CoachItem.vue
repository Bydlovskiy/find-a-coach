<template>
  <el-card class="my-5">
    <li>{{ coach.firstName }} {{ coach.lastName }}</li>
    <li>${{ coach.hourlyRate }}</li>
    <div class="flex my-4 text-white">
      <div
          v-for="area in coach.areas"
          :key="area"
          class="bg-blue-600 rounded-2xl w-20 flex justify-center items-center mx-4 ">
        <span class="font-serif font-normal">{{ area }}</span>
      </div>
    </div>
    <div class="flex">
      <el-button v-if="!isYour">
        <router-link :to="{name : globalRouteNames.coachContact, params : {id : coach.id}}"
        >Contact with coach
        </router-link
        >
      </el-button>
      <div v-else>
        <el-button type="danger"  @click="deleteOffer">
          Delete offer
        </el-button>
      </div>
      <el-button class="ml-3">
        <router-link :to="{name : globalRouteNames.coachDetail , params : {id: coach.id}}">Coach detail</router-link>
      </el-button>
    </div>
  </el-card>
</template>

<script lang="ts">

import {computed, defineComponent } from "vue";

import {authStore} from "@/store";

import {routeNames} from "@/router/Route.names";

import {coachStore} from "@/store";

export default defineComponent({

  props: {
    coach: {
      type: Object,
      required: true
    },
  },

  setup(props){

    let isYour = computed(() => props.coach.id === authStore.userData.userId);

    const deleteOffer = () => {
      coachStore.deleteCoach()
    }

    const globalRouteNames = routeNames

    return {
      isYour,
      deleteOffer,
      globalRouteNames
    }
  }
});

</script>

