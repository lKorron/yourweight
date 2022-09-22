<template>
  <div class="user-input">
    <form @submit="submit" @keydown.enter="submit">
      <div class="user-input__height">
        <label for="height">Ваш рост</label>
        <input v-model="height" type="text" id="height" name="height" />
        см
      </div>
      <div class="user-input__weight">
        <label for="weight">Ваш вес</label>
        <input v-model="weight" type="text" id="weight" name="weight" />
        кг
      </div>

      <div class="user-input__sex sex">
        <div class="sex__name">Пол</div>
        <input v-model="sex" type="radio" name="sex" id="male" value="male" />
        <label for="male">Мужской</label>

        <input
          v-model="sex"
          type="radio"
          name="sex"
          id="female"
          value="female"
        />
        <label for="female">Женский</label>
      </div>

      <button>Готово</button>
    </form>
  </div>
</template>

<script>
export default {
  name: "UserInput",
};
</script>

<script setup>
import { ref, defineEmits } from "vue";

const emit = defineEmits({
  submit: (userInfo) => {
    if (userInfo.height && userInfo.weight && userInfo.sex) {
      return true;
    }
    return false;
  },
});

const height = ref("");
const weight = ref("");
const sex = ref("");

const reset = (message) => {
  alert(message);
  height.value = "";
  weight.value = "";
};

const submit = (evt) => {
  evt.preventDefault();

  if (
    height.value.trim() === "" ||
    weight.value.trim() === "" ||
    sex.value.trim() === ""
  ) {
    reset("Заполните все пропуски");
    return;
  }

  const parsedHeight = parseInt(height.value);
  const parsedWeight = parseInt(weight.value);

  if (isNaN(parsedHeight) || isNaN(parsedWeight)) {
    reset("Введите числа");
    return;
  }

  const userInfo = {
    height: parsedHeight,
    weight: parsedWeight,
    sex: sex.value,
  };

  // Object.entries(userInfo).forEach(([key, value]) => {
  //   if (value === "") {
  //     alert("Заполните все пропуски");
  //     height.value = "";
  //     weight.value = "";
  //     sex.value = "";
  //     return;
  //   }
  // });

  emit("submit", userInfo);
};
</script>

<style lang="scss" scoped>
@import "@/styles/_variables.scss";

.user-input {
  background-color: #fff;
  max-width: 800px;
  margin: 0 auto;
  border: 1px solid $mainColor;
  border-radius: 10px;
  padding: 10px;

  form {
    > :first-child {
      margin-bottom: 5px;
    }
  }

  &__height,
  &__weight {
    display: flex;
    justify-content: center;

    :first-child {
      margin-right: 10px;
    }

    input {
      width: 30px;
      margin-right: 10px;
    }
  }

  &__sex {
    margin-top: 30px;
  }
}
</style>
