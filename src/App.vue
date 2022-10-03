<template>
  <h1 class="app-name">yourweight</h1>
  <router-view></router-view>
</template>

<script setup>
import router from "./router";
import { useStore } from "vuex";

const store = useStore();

store.dispatch("userDataModule/initStorage");
const userData = store.getters["userDataModule/getUserData"];

Object.entries(userData).forEach(([, value]) => {
  if (value === null) {
    router.replace({ name: "input" });
  }
});
</script>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

body {
  $bg-size: 370px;
  background-color: #fff;
  background-image: url("./assets/background.jpeg");
  background-repeat: repeat;
  background-size: $bg-size;
}

.button {
  background-color: rgb(82, 176, 249);
  border: none;
  padding: 10px;
  color: white;
  transition: transform 0.25s;

  &:hover {
    transform: scale(1.1);
  }

  &:active {
    filter: contrast(0.7);
  }

  &[disabled] {
    background-color: gray;
    cursor: auto;

    &:hover {
      transform: none;
    }

    &:active {
      filter: none;
    }
  }
}

nav {
  padding: 30px;

  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}

button {
  cursor: pointer;
}
</style>
