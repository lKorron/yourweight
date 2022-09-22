<template>
  <div class="user-input">
    <form>
      <div class="user-input__height">
        <label for="height">Ваш рост</label>
        <input type="text" id="height" name="height" />
        м
      </div>
      <div class="user-input__weight">
        <label for="weight">Ваш вес</label>
        <input type="text" id="weight" name="weight" />
        кг
      </div>

      <div class="user-input__sex sex">
        <div class="sex__name">Пол</div>
        <input type="radio" name="sex" id="male" />
        <label for="male">Мужской</label>

        <input type="radio" name="sex" id="female" />
        <label for="female">Женский</label>
      </div>

      <button @click="click">Готово</button>
    </form>
  </div>
</template>

<script>
export default {
  name: "UserInput",
};
</script>

<script setup>
let click = (evt) => {
  evt.preventDefault();
  console.log("clicked");
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
