<template>
  <div class="weight-input">
    <div class="weight-input__image">
      <img src="../assets/blue-scale.png" alt="scale-weight" />
    </div>
    <Form @submit="onSubmit" class="weight-input__form form" v-slot="{ meta }">
      <Field
        v-model="inputedWeight"
        class="form__input"
        name="text"
        type="text"
        rules="number"
        placeholder="Введите новый вес"
      ></Field>
      <ErrorMessage name="text" v-slot="{ message }">
        <div class="error-message">{{ message }}</div>
      </ErrorMessage>
      <button class="button" :disabled="!meta.valid">Сохранить</button>
    </Form>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { Form, Field, ErrorMessage } from "vee-validate";
import { useStore } from "vuex";

const store = useStore();

const inputedWeight = ref("");
const onSubmit = () => {
  inputedWeight.value = "";
};
</script>

<style lang="scss" scoped>
@import "../styles/mixins";
.weight-input {
  &__image {
    @include sizeImgContainer($size: 300px);
    margin: 0 auto;
  }
}

.form {
  margin-top: 20px;
  &__input {
    text-align: center;
    height: 30px;
    display: block;
    margin: 0 auto;

    &:focus::placeholder {
      color: transparent;
    }
  }

  :not(:last-child) {
    margin-bottom: 15px;
  }
}

.error-message {
  color: red;
}
</style>
