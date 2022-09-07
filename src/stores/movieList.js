import { defineStore } from "pinia";
import axios from "axios";

export const useMovieListStore = defineStore({
  id: "movie",
  state: () => ({
    movies: [],
    movie: null,
    loading: false,
    error: null,
  }),
  actions: {
    async fetchMovies() {
      this.movies = [];
      this.loading = true;
      this.error = null;
      try {
        const { data } = await axios.get(
          "https://floating-sierra-20135.herokuapp.com/api/movies"
        );
        this.movies = data.data;
      } catch (error) {
        this.error = error;
      } finally {
        this.loading = false;
      }
    },
    async fetchMovie(id) {
      this.movie = null;
      this.loading = true;
      this.error = null;
      try {
        const { data } = await axios.get(
          `https://floating-sierra-20135.herokuapp.com/api/movie/${id}`
        );
        this.movie = data.data;
      } catch (error) {
        this.error = error;
      } finally {
        this.loading = false;
        if (!this.movie) {
          this.error = "К сожалению, по вашему запросу ничего не найдено...";
        }
      }
    },
    sortMoviesByTitle() {
      this.movies.sort((a, b) => {
        if (a.title < b.title) {
          return -1;
        }
        if (a.title > b.title) {
          return 1;
        }
        return 0;
      });
    },
    sortMoviesByYear() {
      this.movies.sort((a, b) => {
        if (a.year < b.year) {
          return -1;
        }
        if (a.year > b.year) {
          return 1;
        }
        return 0;
      });
    },
  },
  getters: {
    getMovies: (state) => state.movies,
    getMovie: (state) => state.movie,
  },
});
