<template>
  <div>
    <header class="text-light">
      <div class="container-xl">
        <div class="row">
          <div class="col-xl-6 col-sm-12 col-12 pb-3">
            <h1 class="pt-3">Online Museum Rijks</h1>
            <p>Check out the collection of the Rijksmuseum.</p>
          </div>
          <div class="col-sm-6 col-0 d-none d-xl-block text-center">
            <transition name="slide-fade">
              <div v-if="show">
                <img
                  v-if="mounted && show"
                  class="img-size img-fluid shadow pointer"
                  @click="
                    $router.push({
                      name: 'Collection',
                      params: { id: piece.objectNumber },
                    })
                  "
                  :src="piece.webImage.url"
                  :alt="piece.title"
                />
                <p class="text-info" v-if="mounted">{{ piece.title }}</p>
              </div>
            </transition>
            <div v-if="!mounted">
              <div class="spinner-border mt-4" role="status">
                <span class="sr-only"></span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
    <div class="text-light divider">
      <h2 class="text-center">Search through the Rijksmuseum</h2>
      <SearchBar />
    </div>
    <div class="text-light bg-dark divider">
      <div class="container-xl">
        <h2 class="text-center pb-3">Popular Artists</h2>
        <div
          class="row g-5 gy-5 justify-content-center"
          v-animate-css="'fadeIn'"
        >
          <ArtistCard
            :artist="artist"
            v-for="artist in artists"
            :key="artist"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import SearchBar from "../components/Search-Components/SearchBar.vue";
import ArtistCard from "../components/Artist-Components/ArtistCard.vue";
export default {
  name: "Home",
  data() {
    return {
      pieces: [],
      mounted: false,
      show: true,
      artists: [
        "Rembrandt van Rijn",
        "Johannes Vermeer",
        "Frans Hals",
        "Hendrick Goltzius",
        "Hendrick Avercamp",
        "Jan Havicksz. Steen",
      ],
    };
  },
  components: {
    SearchBar,
    ArtistCard,
  },
  methods: {
    getPieces() {
      var randomArtist =
        this.artists[Math.floor(Math.random() * this.artists.length)];
      axios
        .get(`/api/paintings/painter?involvedMaker=${randomArtist}`)
        .then((res) => {
          this.pieces = res.data.artObjects;
          this.mounted = true;
          this.getRandomPiece();
        });
    },
    getRandomPiece() {
      this.show = false;
      var holdOld = this.piece;
      this.piece = this.pieces[Math.floor(Math.random() * this.pieces.length)];
      if (this.piece === holdOld) {
        this.getRandomPiece();
      }
      setTimeout(() => {
        this.show = true;
      }, 1000);
    },
  },
  mounted() {
    setInterval(() => {
      this.getRandomPiece();
    }, 5000);
  },
  created() {
    this.getPieces();
  },
};
</script>

<style scoped>
header {
  background-color: #323952;
  padding-top: 100px;
  padding-bottom: 150px;
  height: 650px;
}
header h1 {
  font-size: 50px;
}
header p {
  color: gainsboro;
}
.header-absolute {
  position: absolute;
  top: 0;
  height: 400px;
}
.img-size {
  object-fit: cover;
  max-height: 400px;
  border: rgb(34, 33, 33) solid 3px;
}
.divider {
  padding-top: 100px;
  padding-bottom: 100px;
}
.slide-fade-enter-active {
  transition: all 0.4s ease;
}
.slide-fade-leave-active {
  transition: all 0.8s cubic-bezier(1, 0.5, 0.8, 1);
}
.slide-fade-enter, .slide-fade-leave-to
/* .slide-fade-leave-active below version 2.1.8 */ {
  transform: translateX(400px);
  opacity: 0;
}
.pointer {
  cursor: pointer;
}
@media (max-width: 1199px) {
  header {
    padding-top: 50px;
    padding-bottom: 50px;
    height: 250px;
    text-align: center;
  }
  header h1 {
    font-size: 35px;
  }
}
</style>
