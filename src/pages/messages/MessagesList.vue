<template>
  <h1 class="text-4xl font-bold">Your messages</h1>
  <el-card class="text-2xl my-4 w-6/12 flex justify-center" v-if="messageList.length < 1">
    <p>List is empty</p>
  </el-card>
  <div v-else class="w-full flex flex-col items-center">
    <el-card class="my-4 w-6/12 flex  justify-center p-0.5" v-for="message in messageList" :key="message">
      <p class="my-2">
        <span class="font-bold">email : </span><span>{{ message.email }}</span>
      </p>
      <p class="my-2">
        <span class="font-bold">message : </span><span>{{ message.message }}</span>
      </p>
    </el-card>
  </div>
</template>

<script lang="ts">

import {computed, defineComponent, ref} from "vue";

import {messagesStore} from "@/pages/messages/MessagesStore";

import {authStore} from "@/pages/auth/AuthStore";

export default defineComponent({
  setup() {

    const messageList: any = ref([]);

    const getYouMessages = async () => {
      messagesStore.getMessages(authStore.userData.userId)
          .then(() => {
            const list = computed(() => messagesStore.messages);
            messageList.value = [...list.value]
          });
    };

    getYouMessages();

    return {
      messageList
    }
  }
})
</script>