<template>
  <Form class="date-form" @submit="onSubmit" v-slot="{ meta }">
    <Field type="date" name="date" rules="date"></Field>
    <br />
    <button class="button" :disabled="!meta.valid">Добавить</button>
  </Form>
</template>

<script setup>
import router from "@/router";
import { Form, Field } from "vee-validate";

const onSubmit = ({ date }) => {
  router.push({ name: "date", params: { date } });
};

const convertDate = (date) => {};
</script>

<style lang="scss" scoped>
.date-form {
  button {
    margin-top: 30px;
  }
}
</style>
