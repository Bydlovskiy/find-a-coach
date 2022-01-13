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
          class="
            bg-blue-600
            rounded-2xl
            w-20
            flex
            justify-center
            items-center
            mx-4
          "
        >
          <span class="font-serif font-normal">{{ area }}</span>
        </div>
      </div>
      <p>{{ description }}</p>
    </el-card>

</template>
<script>
import { store } from "@/store/MainStore";
import { computed } from "vue";
export default {
  props: {
    id: {
      type: String,
      required: true,
    },
  },
  setup(props) {
    const coachesList = Object.entries(store.getters.coaches);
    const selectedCoach = coachesList.find(
      (coach) => coach[1].id === props.id
    )[1];
    const fullName = computed(
      () => selectedCoach.firstName + " " + selectedCoach.lastName
    );
    const hourlyRate = computed(() => selectedCoach.hourlyRate);
    const areas = computed(() => selectedCoach.areas);
    const  description = computed(() => selectedCoach.description)
    return {
      selectedCoach,
      fullName,
      hourlyRate,
      areas,
      description
    };
  },
};
</script>