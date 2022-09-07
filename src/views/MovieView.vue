<template>
  <div class="movie">
    <div class="movie__nav">
      <RouterLink to="/">Назад к списку</RouterLink>
    </div>
    <p v-if="loading">
      <LoadingItem />
    </p>
    <p class="movie__error" v-if="error">{{ error }}</p>
    <div class="movie__item" v-if="movie">
      <MovieItem :movie="movie" />
    </div>
  </div>
</template>

<script setup>
import { useRoute } from "vue-router";
import { storeToRefs } from "pinia";
import { useMovieListStore } from "../stores/movieList";

import MovieItem from "../components/MovieItem.vue";
import LoadingItem from "../components/LoadingItem.vue";

const route = useRoute();
const { movie, loading, error } = storeToRefs(useMovieListStore());
const store = useMovieListStore();
if (!store.getMovie) {
  store.fetchMovie(route.params.id);
}
</script>

<style lang="scss" scoped></style>
