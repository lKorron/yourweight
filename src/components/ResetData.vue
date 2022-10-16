<template>
  <Form @submit="onSubmit" v-slot="{ meta }" class="reset-form">
    <label for="input">Чтобы сбросить данные, введите: "Сбросить данные"</label>
    <Field type="input" name="input" rules="danger:Сбросить данные"></Field>
    <Field
      type="submit"
      name="button"
      value="Сбросить"
      class="reset-form__button button"
      :disabled="!meta.valid"
    ></Field>
    <ErrorMessage name="input" v-slot="{ message }"
      ><div class="error-message">{{ message }}</div></ErrorMessage
    >
  </Form>
</template>

<script setup>
import { Form, Field, ErrorMessage, defineRule } from "vee-validate";

const onSubmit = () => {
  console.log("submitted");
};

defineRule("danger", (value, [sentance]) => {
  if (value !== sentance) {
    return "Значения должны совпадать";
  }

  return true;
});
</script>

<style lang="scss" scoped>
.reset-form {
  &__button {
    cursor: pointer;
  }
}

.error-message {
  color: red;
}
</style>
