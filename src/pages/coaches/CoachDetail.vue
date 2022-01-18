<template>
  <router-view></router-view>

  <el-card class="w-6/12 my-4">
    <h1>{{ selectedFullName }}</h1>
    <h3>${{ selectedHourlyRate }}/hour</h3>
  </el-card>

  <el-card class="w-6/12 my-4">
    <p>Interested? Rich out now</p>
    <el-button v-if="!isYour">
      <router-link :to="`/coaches/${id}/contact`">Contact</router-link>
    </el-button>
  </el-card>

  <el-card class="w-6/12 my-4 min-h-min">
    <div class="flex">
      <div
          v-for="area in selectedAreas"
          :key="area"
          class="bg-blue-600 rounded-2xl w-20 flex justify-center items-center mx-4"
      >
        <span class="font-serif font-normal">{{ area }}</span>
      </div>
    </div>
    <div>{{ selectedDescription }}</div>
  </el-card>
</template>

<script lang="ts">

import {computed, defineComponent, reactive, ref} from "vue";

import {coachStore} from "@/store";

import {authStore} from "@/store";

export default defineComponent({
  props: {
    id: {
      type: String,
      required: true,
    },
  },

  setup(props) {

    const isYour = computed(() => props.id === authStore.userData.userId);

    const getCoach = async () => {
      await coachStore.getCoaches();
      selectedCoach = computed(() => coachStore.hashedCoaches[props.id]);
      const {firstName,lastName,hourlyRate,areas,description} = selectedCoach.value
      selectedFullName.value = firstName + ' ' + lastName;
      selectedHourlyRate.value = hourlyRate;
      selectedAreas.value = [...areas];
      selectedDescription.value = description;
    };
    getCoach();
    let selectedCoach : any;
    let selectedFullName = ref('');
    let selectedHourlyRate = ref('');
    let selectedAreas : any = ref([]);
    let selectedDescription = ref('');

    return {
      selectedFullName,
      selectedHourlyRate,
      selectedAreas,
      selectedDescription,
      isYour
    };
  },
});
</script>
