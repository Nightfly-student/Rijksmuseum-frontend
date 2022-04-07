<template>
  <div>
    <div v-if="mounted">
      <header class="text-light">
        <div class="container-xxl">
          <div class="row justify-content-center">
            <div class="col-sm-6 col-0 text-center">
              <img
                v-if="collection.artObject.webImage"
                :src="collection.artObject.webImage.url"
                class="img-fluid img-size"
              />
              <img
                v-else
                src="/images/noImage.png"
                class="img-fluid img-size"
              />
            </div>
            <div class="col-xl-6 col-sm-12 col-12 pb-3">
              <h1 class="pt-3">{{ collection.artObject.title }}</h1>
              <p>
                {{ collection.artObject.label.description }}
              </p>
              <p>
                {{ collection.artObject.longTitle }}
              </p>
            </div>
          </div>
        </div>
      </header>
      <div class="divider-top container-xl">
        <div class="row pb-5">
          <div class="col-12 col-md-4">
            <h2>Additional Information</h2>
            <p>
              Acquisition on
              {{ formatDate(collection.artObject.acquisition.date) }}
              {{ collection.artObject.acquisition.creditLine }}
            </p>
          </div>
          <div class="col-md-4 col-0"></div>
          <div class="col-12 col-md-4">
            <h2>Specifications</h2>
            <p class="mb-0">Materials:</p>
            <ul>
              <li
                v-for="material in collection.artObject.materials"
                :key="material"
              >
                {{ material }}
              </li>
            </ul>
            <div v-if="collection.artObject.colors.length != 0">
              <p class="mb-0">Colors:</p>
              <div v-for="color in collection.artObject.colors" :key="color">
                <div
                  class="circle float-start m-1"
                  :style="{ background: color.hex }"
                ></div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="divider-top bg-dark" v-if="more.length != 0">
        <div class="container-xl">
          <h2 class="m-0 text-light text-center mb-4">
            Related to {{ collection.artObject.principalOrFirstMaker }}
          </h2>
          <div class="row justify-content-center">
            <PaintingCard
              :painting="painting"
              v-for="painting in more"
              :key="painting.objectNumber"
            />
          </div>
          <div v-if="more.length !== count - 1" class="text-center pb-4">
            <button @click="getMoreFromArtist" class="btn btn-primary">
              Load More
            </button>
          </div>
          <div v-else>
            <p class="m-0 text-center text-light pb-5">End Of Results</p>
          </div>
        </div>
      </div>
    </div>
    <div v-else class="text-center pt-5">
      <div class="spinner-border" role="status">
        <span class="visually-hidden"></span>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import moment from "moment";
import PaintingCard from "../components/Artist-Components/PaintingCard.vue";
export default {
  name: "Collection",
  data() {
    return {
      collection: [],
      mounted: false,
      more: [],
      pages: 0,
      currentPage: 1,
      count: 0,
    };
  },
  components: {
    PaintingCard,
  },
  methods: {
    getCollection() {
      axios.get(`/api/collections/${this.$route.params.id}`).then((res) => {
        this.collection = res.data;
        console.log(res.data);
        this.getMoreFromArtist();
        this.mounted = true;
      });
    },
    getMoreFromArtist() {
      axios
        .get(
          `/api/paintings/painter?involvedMaker=${this.collection.artObject.principalOrFirstMaker}&p=${this.currentPage}&ps=7`
        )
        .then((res) => {
          this.count = res.data.count;
          this.pages = (res.data.count / 10).toFixed(0);
          res.data.artObjects.forEach((artObject) => {
            if (
              artObject.objectNumber != this.collection.artObject.objectNumber
            ) {
              this.more.push(artObject);
            }
          });
          this.currentPage++;
        });
    },
    formatDate(date) {
      return moment(date).format("MMMM Do YYYY");
    },
  },
  mounted() {
    window.scrollTo(0, 0);
    this.getCollection();
  },
  watch: {
    $route(to, from) {
      if (
        to.fullPath != from.fullPath &&
        to.name === "Collection" &&
        from.name === "Collection"
      ) {
        this.collection = [];
        this.more = [];
        this.currentPage = 1;
        this.getCollection();
      }
    },
  },
};
</script>

<style scoped>
header {
  background-color: #323952;
  padding-top: 100px;
  padding-bottom: 150px;
}
header h1 {
  font-size: 50px;
}
header p {
  color: gainsboro;
}
.img-size {
  height: auto;
  max-width: auto;
  object-fit: contain;
  border: rgb(34, 33, 33) solid 3px;
}
.divider-top {
  padding-top: 50px;
}
.circle {
  width: 25px;
  height: 25px;
  border-radius: 50%;
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
