<template>
  <div class="weight-input">
    <div class="weight-input__image">
      <img src="../assets/blue-scale.png" alt="scale-weight" />
    </div>
    <Form @submit="onSubmit" class="weight-input__form form" v-slot="{ meta }">
      <Field
        class="form__input"
        name="weight"
        type="text"
        rules="number"
        placeholder="Введите новый вес"
      ></Field>
      <ErrorMessage name="weight" v-slot="{ message }">
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
import router from "@/router";

const store = useStore();

const onSubmit = (values, { resetForm }) => {
  const weight = parseInt(values.weight);

  store.dispatch("userDataModule/setWeight", weight);

  //   document.activeElement.blur();
  //   resetForm();

  router.push({ name: "home" });
};
</script>

<style lang="scss" scoped>
@import "../styles/mixins";
@import "../styles/variables";
.weight-input {
  &__image {
    @include sizeImgContainer($size: 300px);
    margin: 0 auto;

    @media (max-width: $md3) {
      @include sizeImgContainer($size: 200px);
    }
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
