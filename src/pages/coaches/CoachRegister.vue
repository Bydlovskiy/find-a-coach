<template>
  <el-card>
    <el-form ref="formRef" :model="coachForm" :rules="rules">
      <el-form-item label="First name" prop="firstName">
        <el-input v-model="coachForm.firstName"></el-input>
      </el-form-item>
      <el-form-item label="Last name" prop="lastName">
        <el-input v-model="coachForm.lastName"></el-input>
      </el-form-item>
      <el-form-item label="Areas" prop="areas">
        <el-checkbox-group v-model="coachForm.areas">
          <el-checkbox label="frontend" size="large" />
          <el-checkbox label="backend" size="large" />
          <el-checkbox label="career" size="large" />
        </el-checkbox-group>
      </el-form-item>
      <el-form-item label="Description" prop="description">
        <el-input
          v-model="coachForm.description"
          autosize
          type="textarea"
        ></el-input>
      </el-form-item>
      <el-button @click="submit">rewerwer</el-button>
    </el-form>
  </el-card>
</template>

<script>
import { reactive } from "vue";

export default {
  setup() {
    const coachForm = reactive({
      firstName: "",
      lastName: "",
      areas: [],
      description: "",
    });

    // const checkName = (rules ,coachForm.firstName ,   ) => {

    // }
    const rules = {
        // firstName : [{validator : checkName , trigger : 'blur'}],

      firstName: [
        {
          type: "string",
          required: true,
          pattern: /^[A-Za-z]{2,20}$/,
          message: "Length should be 2 to 20 ",
          trigger: "blur",
        },
      ],
      lastName: [
        {
          type: "string",
          required: true,
          pattern: /^[A-Za-z]{2,20}$/,
          message: "Length should be 2 to 20 ",
          trigger: "blur",
        },
      ],
      areas: [
        {
          type: "array",
          required: true,
          message: "Please select at least one area",
          trigger: "change",
        },
      ],
      description: [
        {
          type: "string",
          required: true,
          message: "Write something about you",
          trigger: "blur",
        },
      ],
    };
    const submit = () => {
        console.log(coachForm);
    }
  

    return {
      coachForm,
      rules,
      submit
    };
  },
};
</script>