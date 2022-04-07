<template>
  <div>
    <div v-if="!notFound && mounted">
      <header class="text-light">
        <div class="container-xl">
          <div class="row justify-content-center">
            <div class="col-md-12 col-lg-6 col-12 text-center">
              <div class="img-box">
                <img
                  class="img-fluid img-size shadow pointer"
                  @click="
                    $router.push({
                      name: 'Collection',
                      params: { id: headPiece.objectNumber },
                    })
                  "
                  :src="headPiece.webImage.url"
                  :alt="headPiece.title"
                />
              </div>
            </div>
            <div class="col-xl-6 col-sm-12 col-12 pb-3">
              <h1 class="pt-3">{{ headPiece.principalOrFirstMaker }}</h1>
              <div v-if="artist.description" v-html="artist.description"></div>
            </div>
          </div>
        </div>
      </header>
      <div class="bg-dark text-light divider-top">
        <div class="container-xl">
          <h2 class="text-center pb-3">
            Art of {{ headPiece.principalOrFirstMaker }}
          </h2>

          <div class="row justify-content-center">
            <PaintingCard
              :painting="painting"
              v-for="painting in more"
              :key="painting.objectNumber"
            />
            <Observer v-if="ready" @intersect="getMoreFromArtist" />
          </div>
        </div>
      </div>
    </div>
    <div v-if="mounted && notFound">
      <h2 class="text-center pt-5">Artist Not Found</h2>
      <p class="text-center return-hover pointer" @click="$router.push('/')">
        Return to home
      </p>
    </div>
    <div v-if="!mounted">
      <div class="text-center pt-5">
        <div class="spinner-border mt-4" role="status">
          <span class="sr-only"></span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import PaintingCard from "../components/Artist-Components/PaintingCard.vue";
import Observer from "../helpers/Observer.vue";
export default {
  name: "Artist",
  data() {
    return {
      mounted: false,
      notFound: false,
      headPiece: {},
      artist: {},
      more: [],
      pages: 0,
      currentPage: 1,
      count: 0,
      ready: false,
    };
  },
  components: {
    PaintingCard,
    Observer,
  },
  methods: {
    getPaintings() {
      axios
        .get(
          `/api/paintings/painter?involvedMaker=${this.$route.params.id}&ps=1`
        )
        .then((res) => {
          if (res.data.count != 0) {
            this.headPiece = res.data.artObjects[0];
            this.getMoreFromArtist();
            this.mounted = true;
            axios
              .get(`/api/artists/${this.$route.params.id.replaceAll("+", " ")}`)
              .then((res) => {
                this.artist = res.data;
              });
          } else {
            this.notFound = true;
          }
        });
    },
    async getMoreFromArtist() {
      await axios
        .get(
          `/api/paintings/painter?involvedMaker=${this.$route.params.id}&p=${this.currentPage}&ps=15`
        )
        .then((res) => {
          console.log(res.data);
          this.count = res.data.count;
          this.pages = (res.data.count / 10).toFixed(0);
          res.data.artObjects.forEach((artObject) => {
            if (artObject.objectNumber != this.headPiece.objectNumber) {
              this.more.push(artObject);
            }
          });
          this.currentPage++;
          this.ready = true;
        });
    },
  },
  mounted() {
    window.scrollTo(0, 0);
    this.getPaintings();
  },
};
</script>

<style scoped>
header {
  background-color: #323952;
  padding-top: 100px;
  padding-bottom: 100px;
  min-height: 650px;
}
header h1 {
  font-size: 50px;
}
header p {
  color: gainsboro;
}
.divider-top {
  padding-top: 50px;
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
.img-box {
  max-height: 400px;
  max-width: 550px;
}
.return-hover:hover {
  color: #dc8e3b !important;
}
.pointer {
  cursor: pointer;
}
@media (max-width: 1199px) {
  header {
    padding-top: 25px;
    padding-bottom: 0px;
  }
  h1 {
    font-size: 35px !important;
  }
}
</style>
