<template>
  <router-view></router-view>

  <el-card class="w-full my-4">
    <h1>{{ fullName }}</h1>
    <h3>${{ hourlyRate }}/hour</h3>
  </el-card>

  <el-card class="w-full my-4">
    <p>Interested? Rich out now</p>
    <el-button>
      <router-link :to="`/coaches/${id}/contact`">Contact</router-link>
    </el-button>
  </el-card>

  <el-card class="w-full my-4">
    <div class="flex">
      <div
        v-for="area in areas"
        :key="area"
        class="bg-blue-600 rounded-2xl w-20 flex justify-center items-center mx-4"
      >
        <span class="font-serif font-normal">{{ area }}</span>
      </div>
    </div>

    <p>{{ description }}</p>
  </el-card>
</template>

<script lang="ts">
import { computed, defineComponent , ref } from "vue";
import { coachStore} from "./CoachStore";
import { ICoach } from "@/pages/coaches/CoachType";

export default defineComponent({
  props: {
    id: {
      type: String,
      required: true,
    },
  },

  setup(props) {
    const refreshList = async () => {
      await coachStore.getCoaches();

    };

    const selectedCoach : any = computed(() => coachStore.hashedCoaches[props.id]) ;

    const fullName = computed(() =>  selectedCoach.value.firstName + ' ' + selectedCoach.value.lastName );

    const hourlyRate = computed(() => selectedCoach.value.hourlyRate);

    const areas = computed(() => selectedCoach.value.areas);

    const description = computed(() => selectedCoach.value.description);

    refreshList();

    return {
      selectedCoach,
      fullName,
      hourlyRate,
      areas,
      description,
    };
  },
});
</script>
