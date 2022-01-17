<template>


    <div v-for="message in messageList" :key="message">
      <p>{{ message.message }}</p>
      <p>{{ message.email }}</p>
    </div>


</template>

<script lang="ts">

import {computed, defineComponent} from "vue";

import {messagesStore} from "@/pages/messages/MessagesStore";

import {authStore} from "@/pages/auth/AuthStore";

export default defineComponent({
  setup() {
    let messageList;
      const getYouMessages = async () => {
       messagesStore.getMessages(authStore.userData.userId);
        console.log(messagesStore.messages);
         messageList = computed(() => [...messagesStore.messages]) ;
    }
    getYouMessages();

    return{
      messageList
    }
  }
})
</script>