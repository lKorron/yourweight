<template>
  <div class="wrapper">
    <h1 class="app-name">yourweight</h1>
    <router-view></router-view>
  </div>
</template>

<script setup>
import router from "./router";
import { useStore } from "vuex";

const store = useStore();

const userData = store.getters["userDataModule/getUserData"];

Object.entries(userData).forEach(([, value]) => {
  if (value === null) {
    router.replace({ name: "input" });
  }
});
</script>

<style lang="scss">
@import "./styles/variables";

@import "https://fonts.googleapis.com/css?family=Kelly+Slab:regular";
@import "https://fonts.googleapis.com/css?family=Bellota:300,300italic,regular,italic,700,700italic";
@import "https://fonts.googleapis.com/css?family=Montserrat:100,200,300,regular,500,600,700,800,900";
#app {
  font-family: Montserrat, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: $mainColor;
}

select {
  font-family: Montserrat;
}

.app-name {
  display: inline-block;
  font-family: Kelly Slab;
  color: black;
  position: relative;

  &::before {
    width: 80px;
    height: 80px;
    content: " ";
    background-image: url("./assets/logo.png");
    background-size: 80px;
    position: absolute;
    left: -75px;
    top: -22px;
  }
}

h2 {
  font-family: Kelly Slab;
  font-style: normal;
  font-weight: 400;
  font-size: 36px;
  line-height: 44px;

  color: #000000;
}

h3 {
  font-family: Bellota;
}

.wrapper {
  margin-right: auto; /* 1 */
  margin-left: auto; /* 1 */

  max-width: 960px; /* 2 */

  padding-right: 10px; /* 3 */
  padding-left: 10px; /* 3 */
}

body {
  $bg-size: 950px;
  //background-size: $bg-size;
  background: linear-gradient(
      120.1deg,
      #62a1ff 15.75%,
      rgba(240, 159, 133, 0.723958) 38.68%,
      rgba(239, 185, 141, 0.479167) 55.98%,
      rgba(220, 156, 82, 0.34375) 74.08%,
      #ffccc9 92.99%
    )
    fixed;
}

.button {
  font-family: Montserrat;
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
