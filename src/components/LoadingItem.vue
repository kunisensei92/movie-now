<template>
  <div>
    <img
      class="loading-spinner"
      src="@/assets/images/Loader.svg"
      alt="Loader"
    />
  </div>
</template>

<script setup></script>

<style lang="scss" scoped>
.loading-spinner {
  animation: spin 1s linear infinite;
  width: 100px;
  height: 100px;
  margin: 248px auto;
  display: block;
}

@keyframes spin {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}
</style>
