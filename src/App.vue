<script setup>
import { RouterView } from "vue-router";
import HeaderItem from "./components/HeaderItem.vue";
</script>

<template>
  <HeaderItem />
  <div class="container">
    <RouterView />
  </div>
</template>

<style scoped></style>
