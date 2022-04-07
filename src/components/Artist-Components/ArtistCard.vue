<template>
  <div class="col-12 col-md-6 col-lg-6 col-xl-4">
    <div class="card">
      <div class="box-size">
        <div class="row g-2">
          <img
            v-if="mounted"
            class="col-9 img-fluid big pointer"
            :src="art[0].webImage.url"
            @click="
              $router.push({
                name: 'Collection',
                params: { id: art[0].objectNumber },
              })
            "
          />
          <div v-else class="bigBox col-9"></div>
          <div class="col-3">
            <img
              v-if="mounted"
              class="small img-fluid pb-1 pointer"
              :src="art[1].webImage.url"
              @click="
                $router.push({
                  name: 'Collection',
                  params: { id: art[1].objectNumber },
                })
              "
            />
            <div v-else class="smallBox pb-1"></div>
            <img
              v-if="mounted"
              class="small img-fluid pt-1 pointer"
              :src="art[2].webImage.url"
              @click="
                $router.push({
                  name: 'Collection',
                  params: { id: art[2].objectNumber },
                })
              "
            />
            <div v-else class="smallBox pt-1"></div>
          </div>
        </div>
      </div>
      <h2
        class="ps-1 fs-4 pointer"
        @click="
          $router.push({
            name: 'Artist',
            params: { id: artist.replaceAll(' ', '+') },
            scrollTo: 0,
          })
        "
      >
        {{ artist }}
      </h2>
    </div>
  </div>
</template>

<script>
import axios from "axios";
export default {
  name: "ArtistCard",
  data() {
    return {
      mounted: false,
      art: [],
    };
  },
  props: {
    artist: String,
  },
  methods: {
    getArtistPaintings() {
      axios
        .get(`/api/paintings/painter?involvedMaker=${this.artist}&ps=3`)
        .then((res) => {
          console.log(res.data);
          this.art = res.data.artObjects;
          this.mounted = true;
        });
    },
  },
  mounted() {
    this.getArtistPaintings();
  },
};
</script>

<style scoped>
.card {
  background: none;
  border: none;
  max-width: 420px;
}
.box-size {
  max-height: 350px;
  max-width: 450px;
}
.small {
  object-fit: cover;
  height: 140px;
  width: 140px;
  transition: 0.1s ease-in-out;
}
.big {
  object-fit: cover;
  max-height: 280px;
  min-height: 280px;
  transition: 0.1s ease-in-out;
}
.big:hover,
.small:hover {
  transform: scale(1.03);
}
.bigBox {
  max-height: 280px;
  width: 280px;
  background: #1c202e;
}
.smallBox {
  height: 140px;
  width: 140px;
  background: #1c202e;
}
.pointer {
  cursor: pointer;
}
h2:hover {
  color: #dc8e3b !important;
}
</style>
