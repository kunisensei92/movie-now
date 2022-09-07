<template>
  <div class="movies-item">
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
</template>

<script setup>
defineProps(["movie"]);

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
    // if duration can be spltted by slash
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
</script>

<style lang="scss" scoped></style>
