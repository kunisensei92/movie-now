<template>
  <div class="movies" v-if="movies">
    <h2 class="movies__title">Фильмы</h2>
    <div class="movies__sort">
      <div class="movies__sort-item">
        <input type="checkbox" id="checkbox" v-model="checkbox" />
        <label for="checkbox">Отсортировать по названию</label>
      </div>
      <div class="movies__sort-item">
        <input type="checkbox" id="checkbox2" v-model="checkbox2" />
        <label for="checkbox2">Отсортировать по году</label>
      </div>
    </div>
    <div v-if="loading">
      <LoadingItem />
    </div>
    <div v-if="error">
      <h3>{{ error }}</h3>
    </div>
    <div class="movies__list">
      <div class="movies-item" v-for="movie in movies" :key="movie.id">
        <div class="movies-item__image">
          <img src="@/assets/images/hamilton.webp" :alt="movie.title" />
        </div>
        <div class="movies-item__body">
          <div class="body-header">
            <h1>
              <RouterLink @click="saveMovie(movie)" :to="`/movie/${movie.id}`">
                {{ decodeEntity(movie.title) }}
              </RouterLink>
            </h1>
          </div>
          <div class="body-info">
            <div class="body-info__item">
              <span>{{ movie.year + ", " }}</span>
              <span>{{ movie.genres.join(", ") }}</span>
            </div>
            <div class="body-info__item" v-if="movie.directors !== null">
              <span>Режиссёр: </span>
              <span>{{ decodeEntity(movie.directors.join(", ")) }}</span>
            </div>
            <div class="body-info__item" v-if="movie.actors !== null">
              <span>Актёры: </span>
              <span class="actors">{{
                decodeEntity(movie.actors.join(", "))
              }}</span>
            </div>
            <div class="duration" v-if="formatDuration(movie)">
              <p>{{ formatDuration(movie) }}</p>
              <img src="@/assets/images/film.svg" alt="Film" />
            </div>
            <div class="description">{{ movie.description }}</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, watchEffect } from "vue";
import { storeToRefs } from "pinia";
import LoadingItem from "../components/LoadingItem.vue";
import { useMovieListStore } from "../stores/movieList";
const { movies, loading, error } = storeToRefs(useMovieListStore());
const store = useMovieListStore();
const { fetchMovies, sortMoviesByTitle, sortMoviesByYear } =
  useMovieListStore();

const saveMovie = (movie) => {
  store.movie = movie;
};

const checkbox = ref(false);
const checkbox2 = ref(false);
watchEffect(() => {
  if (checkbox.value) {
    checkbox2.value = false;
    sortMoviesByTitle();
  }
});
watchEffect(() => {
  if (checkbox2.value) {
    checkbox.value = false;
    sortMoviesByYear();
  }
});
watchEffect(() => {
  if (!checkbox2.value && !checkbox.value) {
    fetchMovies();
  }
});

const findDuration = (obj) => {
  if (obj.videocdn.duration) {
    return obj.videocdn.duration[0];
  } else if (obj.hdvb.duration) {
    return obj.hdvb.duration[0];
  } else if (obj.collapse.duration) {
    return obj.collapse.duration[0];
  } else if (obj.kodik.duration) {
    return obj.kodik.duration[0];
  }
};

const formatDuration = (obj) => {
  const duration = findDuration(obj);
  if (duration) {
    const durationWithoutDots = duration.replace(/\./g, "");
    if (durationWithoutDots.includes("/")) {
      const durationArray = durationWithoutDots.split("/");
      durationArray[1] = durationArray[1].concat(":00");
      return durationArray.join("/");
    } else {
      return durationWithoutDots;
    }
  }
};
const decodeEntity = (str) => {
  const textArea = document.createElement("textarea");
  textArea.innerHTML = str;
  return textArea.value;
};

fetchMovies();
</script>

<style lang="scss" scoped></style>
