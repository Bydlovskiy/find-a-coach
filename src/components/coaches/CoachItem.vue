<template>
  <el-card class="my-5">
    <li>{{ coach.firstName }} {{ coach.lastName }}</li>
    <li>${{ coach.hourlyRate }}</li>
    <div class="flex my-4 text-white">
      <div
        v-for="area in coach.areas"
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
    <div>
      <el-button>
        <router-link :to="`/coaches/${coach.id}/contact`"
          >Contact with coach</router-link
        >
      </el-button>
      <el-button>
        <router-link :to="`/coaches/${coach.id}`">Coach detail</router-link>
      </el-button>
    </div>
  </el-card>
</template>

<script>
// import { store } from "@/store/MainStore";
export default {
  props: {
    coach: {
      type: Object,
    },
  },

  // setup(props) {
  //   const send = () => {
  //     store.dispatch("setCoach", {
  //       id: "c2",
  //       firstName: "Julie",
  //       lastName: "Jones",
  //       areas: ["frontend", "career"],
  //       description:
  //         "I am Julie and as a senior developer in a big tech company, I can help you get your first job or progress in your current role.",
  //       hourlyRate: 30,
  //     });
  //   };
  //   return {
  //     send,
  //   };
  // },
};
</script>

