<template>
  <el-card class="w-6/12">
    <el-form
        class="demo-ruleForm w-full"
        :ref="messageForm.ref"
        :model="form"
        label-position="top"
        label-width="500px"
        :rules="messageForm.rules">
      <el-form-item label="email" :prop="messageForm.data.email.prop">
        <el-input
            v-model.trim="form.email"
            type="email"
            placeholder="Please input email"
        ></el-input>
      </el-form-item>
      <el-form-item label="message" :prop="messageForm.data.message.prop">
        <el-input
            v-model="form.message"
            type="textarea"
            placeholder="Please input message"
            autosize
        ></el-input>
      </el-form-item>
      <el-button color="#626aef" plain size="large" @click="submitMessage">Send message</el-button>
    </el-form>
  </el-card>
</template>

<script lang="ts">

import {defineComponent, reactive} from "vue";

import {useFormConfig} from "@/composables/useFormConfig";

import {messagesStore} from '../messages/MessagesStore'

import {ElNotification} from "element-plus";

export default defineComponent({

  props: {
    id: {
      type: String,
      required: true,
    },
  },

  setup(props) {

    const messageForm = useFormConfig({
      email: {
        label: "Email",
        message: "email error",
        required: true,
        type: "email",
      },
      message: {
        label: "Message",
        message: "message error",
        required: true,
        type: "string",
      },
    });

    const form = reactive({
      email: "",
      message: "",
    });

    const submitMessage = async () => {
      try {
        await messageForm.validate()
        messagesStore.setMessage({...form, coachId: props.id});
        messageForm.resetFields();
        ElNotification.success({
          title: 'Success',
          message: 'Message was sent',
          position: 'bottom-right'
        })
      } catch (err) {
        ElNotification.error({
              title: 'Error',
              message: "Message wasn't sent",
              position: 'bottom-right'
            }
        )
      }
    };

    return {
      submitMessage,
      form,
      messageForm
    }

  }
})
</script>

    