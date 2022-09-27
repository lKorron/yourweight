<template>
  <div class="search-wrapper">
    <div class="search-field">
      <div class="search-field__input">
        <input
          type="text"
          v-model="searchText"
          placeholder="Введите название еды"
        />
      </div>

      <div class="search-field__icon-box">
        <div class="search-field__icon">
          <img src="../assets/loupe.png" alt="loupe" />
        </div>
      </div>
      <div class="dropdown">
        <ul class="dropdown__list">
          <li class="dropdown__item item">Элемент</li>
          <li class="dropdown__item item">Элемент</li>
          <li class="dropdown__item item">Элемент</li>
          <li class="dropdown__item item">Элемент</li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script setup>
import { onMounted, inject, ref, watch } from "vue";

const api = inject("api");

const searchText = ref("");

watch(searchText, (textValue) => {
  api.nutritionix.search(textValue).then((val) => console.log(val));
});

onMounted(() => {
  //api.nutritionix.search("milk").then((response) => console.log(response));
  //api.nutritionix.nutriens("milk").then((res) => console.log(res));
});
</script>

<style lang="scss" scoped>
@import "../styles/mixins";
@import "../styles/variables";
.search-field {
  display: flex;
  margin: 0 auto;
  min-height: 25px;
  position: relative;

  .dropdown {
    position: absolute;
    top: 40px;
    left: 0;
    width: 319px;
    border: 1px solid gray;
    background-color: #fff;
    border-bottom-left-radius: 5px;
    border-bottom-right-radius: 5px;

    &__list {
      list-style: none;
      margin: 0;
      padding: 0;
    }

    &__item {
      padding: 20px;
      &:not(:first-child) {
        border-top: 1px solid gray;
      }
    }
  }

  &__input {
    input {
      width: 280px;
      height: 35px;
    }
    min-width: 282px;
  }

  &__icon-box {
    display: flex;
    flex-direction: column;
    justify-content: center;
    border: 1px solid gray;
    border-top-right-radius: 5px;
    border-left: 0;
    margin-left: -2px;
    padding: 5px;
  }

  &__icon {
    @include sizeImgContainer($size: 24px);
  }
}

.search-wrapper {
  display: flex;
}
</style>
