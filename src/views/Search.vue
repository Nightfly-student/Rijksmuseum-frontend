<template>
  <div class="container-xl p-0">
    <h1 v-if="!noQuery" class="text-center pt-5 pb-5 text-light">Search Results</h1>
    <h1 v-else class="text-center pt-5 pb-5 text-light">Search</h1>
    <div v-if="mounted && !noResult">
      <p class="text-info">{{ results.count }} results</p>
      <div class="pb-5">
        <SearchResultCard
          v-for="result in art"
          :key="result.id"
          :result="result"
        />
      </div>
      <Observer @intersect="getPaintings" />
    </div>
    <div v-if="err">
      <p class="text-center m-0 text-info fs-5 pb-3">End Of Results</p>
    </div>
    <div v-if="noResult">
      <h2 class="text-center">No Results Found</h2>
      <p class="text-center">Try Again</p>
      <SearchBar />
    </div>
    <div v-if="noQuery">
      <SearchBar />
    </div>
  </div>
</template>

<script>
import axios from "axios";
import SearchBar from "../components/Search-Components/SearchBar.vue";
import SearchResultCard from "../components/Search-Components/SearchResultCard.vue";
import Observer from "../helpers/Observer.vue";
export default {
  name: "Search",
  components: {
    SearchResultCard,
    SearchBar,
    Observer,
  },
  data() {
    return {
      results: {},
      art: [],
      mounted: false,
      pages: 0,
      currentPage: 1,
      noResult: false,
      noQuery: false,
      err: false,
    };
  },
  methods: {
    async getPaintings() {
      var value = this.$route.query;
      if (Object.keys(value).length != 0) {
        if (this.currentPage != this.pages) {
          await axios
            .get(
              `/api/paintings/search?q=${value.q}&material=${value.material}&technique=${value.technique}&involvedMaker=${value.involvedMaker}&imgonly=${value.imgonly}&toppieces=${value.toppieces}&p=${this.currentPage}&normalized32Colors=${value.normalized32Colors}`
            )
            .then((res) => {
              console.log(res.data);
              if (!this.results.count) {
                this.results = res.data;
              }
              res.data.artObjects.forEach((a) => {
                this.art.push(a);
              });
              this.pages = (res.data.count / 10).toFixed(0);
              this.mounted = true;
              this.noResult = false;
              this.noQuery = false;
              this.currentPage++;
              console.log(this.art);
            })
            .catch((err) => {
              this.mounted = true;
              this.noResult = true;
            });
        } else {
          this.err = true;
        }
      } else {
        this.noQuery = true;
      }
    },
  },
  mounted() {
    window.scrollTo(0, 0);
    this.getPaintings();
  },
  watch: {
    $route(to, from) {
      if (
        to.fullPath != from.fullPath &&
        to.name === "Search" &&
        from.name === "Search"
      ) {
        this.mounted = false;
        this.noResult = false;
        this.results = {};
        this.art = [];
        this.currentPage = 1;
        this.getPaintings();
      }
    },
  },
};
</script>

<style></style>
