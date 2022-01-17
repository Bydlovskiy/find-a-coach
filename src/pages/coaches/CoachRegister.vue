<template>
  <span class="text-4xl font-bold">Register a coach</span>
  <el-card class="w-6/12 mt-4">
    <el-form
        :ref="registerForm.ref"
        :model="coachForm"
        :rules="registerForm.rules">
      <el-form-item label="First name" :prop="registerForm.data.firstName.prop">
        <el-input type="string" v-model.trim="coachForm.firstName"></el-input>
      </el-form-item>
      <el-form-item label="Last name" :prop="registerForm.data.lastName.prop">
        <el-input type="string" v-model.trim="coachForm.lastName"></el-input>
      </el-form-item>
      <el-form-item label="Areas" :prop="registerForm.data.areas.prop">
        <el-checkbox-group v-model="coachForm.areas">
          <el-checkbox label="frontend" size="large"/>
          <el-checkbox label="backend" size="large"/>
          <el-checkbox label="career" size="large"/>
        </el-checkbox-group>
      </el-form-item>
      <el-form-item label="Hourly rate" :prop="registerForm.data.hourlyRate.prop">
        <el-input-number :controls="false" :min="0" type="number" v-model="coachForm.hourlyRate"></el-input-number>
      </el-form-item>
      <el-form-item label="Description" :prop="registerForm.data.description.prop">
        <el-input
            v-model.trim="coachForm.description"
            autosize
            type="textarea"
        ></el-input>
      </el-form-item>
      <el-button size="large" type="primary" @click="submit">Regsiter</el-button>
    </el-form>
  </el-card>
</template>

<script lang="ts">

import {reactive, defineComponent} from "vue";

import {useFormConfig} from "@/composables/useFormConfig";

import {coachStore} from "@/store";

import router from "@/router";

import {ElNotification} from "element-plus";

export default defineComponent({
  setup() {

    const registerForm = useFormConfig({
      firstName: {
        label: "First name",
        message: "Write your name",
        required: true,
        type: "string"
      },
      lastName: {
        label: "Last name",
        message: "Write your last name",
        required: true,
        type: "string"
      },
      areas: {
        label: "Areas",
        message: "Choose at least one area",
        required: true,
        type: "array",
        trigger: "change"
      },
      hourlyRate: {
        label: "Hourly rate",
        message: "Write you hourly rate",
        required: true,
        type: 'number',
      },
      description: {
        label: "Description",
        message: "Write about your",
        required: true,
        type: "string"
      }
    })

    const coachForm = reactive({
      firstName: "",
      lastName: "",
      hourlyRate: undefined,
      areas: [],
      description: "",
    });

    const submit = async () => {
      await registerForm.validate().then(() => {
        coachStore.setCoach(coachForm);
        ElNotification.success({
          title: 'Success',
          message: 'You added proposition!',
          position: 'bottom-right'
        })
      }).then(() => {
        router.push('/coaches')
      }).catch(() => {
        ElNotification.error({
              title: 'Error',
              message: 'Something is wrong, please check your form.',
          position: 'bottom-right'
            }
        )
      });
    }

    return {
      coachForm,
      registerForm,
      submit,
    };
  },
});
</script>