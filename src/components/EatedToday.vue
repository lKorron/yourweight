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
      <div class="dropdown" v-show="isDropdownActive">
        <ul class="dropdown__list">
          <li
            class="dropdown__item item"
            v-for="item in searchedItems"
            :key="item.foodName"
          >
            <div class="item__image">
              <img @load="onImageLoad" :src="item.photoUrl" alt="image" />
            </div>
            <div class="item__name">{{ item.foodName }}</div>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script setup>
import { onMounted, inject, ref, watch, computed } from "vue";

const api = inject("api");
const loadApi = inject("load");

let searchedItems = ref([
  {
    foodName: "Еда1",
    photoUrl: "https://nix-tag-images.s3.amazonaws.com/530_thumb.jpg",
  },
  {
    foodName: "Еда2",
    photoUrl: "https://nix-tag-images.s3.amazonaws.com/530_thumb.jpg",
  },
]);
const searchedItemsCount = 5;

const searchText = ref("");

const isDropdownActive = computed(() => {
  if (searchedItems.value.length > 0 && searchText.value !== "") {
    return true;
  }

  return false;
});

let timer = ref(undefined);

watch(searchText, (textValue) => {
  clearTimeout(timer);
  const timeoutBeforeSearch = 300;

  timer = setTimeout(() => {
    loadSearchedItems(textValue);
  }, timeoutBeforeSearch);
});

const loadSearchedItems = (name) => {
  searchedItems.value = [];

  if (name === "") {
    return;
  }

  loadApi(async () => {
    const response = await api.nutritionix.search(name);

    const valuesArray = Object.values(response.data.common);

    if (valuesArray.length <= 0) {
      return;
    }

    searchedItems.value = [];
    for (let i = 0; i < searchedItemsCount; i++) {
      const { food_name, photo } = valuesArray[i];

      searchedItems.value.push({
        foodName: food_name,
        photoUrl: photo.thumb,
      });
    }
  });
};

const onImageLoad = () => {
  console.log("loaded");
};
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

.item {
  cursor: pointer;
  display: flex;

  :first-child {
    margin-right: 10px;
  }

  &:hover {
    background-color: rgb(238, 238, 238);
  }

  &__image {
    height: 50px;
    img {
      height: 50px;
    }
  }

  &__name {
    display: flex;
    flex-direction: column;
    justify-content: center;
  }
}
</style>
