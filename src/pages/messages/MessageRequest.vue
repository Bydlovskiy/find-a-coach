<template>
<!--  <el-button plain @click="open1"> Closes automatically </el-button>-->
  <el-card>
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
            v-model.trim="form.message"
            type="textarea"
            placeholder="Please input message"
            autosize
        ></el-input>
      </el-form-item>
      <el-button @click="submitMessage">Send message</el-button>
    </el-form>
  </el-card>

</template>

<script lang="ts">

import {defineComponent, reactive, ref} from "vue";

import {useFormConfig} from "@/composables/useFormConfig";
import  { messagesStore } from './MessagesStore'

import { ElNotification , ElButton } from 'element-plus'

export default defineComponent({

  props: {
    id: {
      type: String,
      required: true,
    },
  },

  setup(props) {

    // const open1 = () => {
    //   ElNotification.success({
    //     title: 'Success',
    //     message: 'This is a success message',
    //     type: 'success',
    //   })
    // }

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
      await messageForm.validate()
      messagesStore.setMessage({...form ,coachId : props.id} );
      messageForm.resetFields()
    };

    return {
      submitMessage,
      form,
      messageForm,
      // open1,
      // ElButton
    }

  }
})
</script>

    