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
export default {
  props: {
    coach: {
      type: Object,
    },
  },

  setup(props) {
    console.log(props.coach);
  },
};
</script>

