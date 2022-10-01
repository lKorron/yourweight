<template>
  <ul class="eated-list">
    <li
      v-for="foodItem in foodList"
      :key="foodItem.name"
      class="eated-list__item item"
    >
      <div class="item__number">{{ foodItem.servingCount }}</div>
      <div class="item__image">
        <img :src="foodItem.imageUrl" alt="food image" />
      </div>
      <div class="item__name">{{ foodItem.name }}</div>
      <div class="item__calories">{{ foodItem.calories }} Ккал</div>
      <button @click="deleteItem(foodItem.name)" class="item__delete__button">
        x
      </button>
    </li>
  </ul>
</template>

<script setup>
import { defineProps, defineEmits, toRefs } from "vue";

const props = defineProps({
  foodList: {
    type: Array,
    required: true,
  },
});

const emit = defineEmits({
  "delete-item": (value) => typeof value === "string",
});

const { foodList } = toRefs(props);

const deleteItem = (name) => {
  emit("delete-item", name);
};
</script>

<style lang="scss" scoped>
.eated-list {
  list-style: none;
  margin: 0;
  padding: 0;
  border: 1px solid black;
  max-width: 500px;
  margin: 0 auto;

  &__item {
    display: flex;
    justify-content: space-around;
    align-items: center;

    &:not(:last-child) {
      border-bottom: 1px solid #000;
    }
  }
}

.item {
  &__image {
    padding: 5px;
    height: 50px;
    img {
      height: 50px;
    }
  }
}
</style>
