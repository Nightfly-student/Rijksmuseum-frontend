<template>
  <div class="pb-4">
    <div class="card text-light" v-animate-css="'fadeIn'">
      <div class="row no-gutters">
        <div class="col-lg-4 col-md-4 col-sm-12 col-12">
          <img
            v-if="result.hasImage"
            :src="result.webImage.url"
            class="img-fluid img-size"
            alt=""
          />
          <img v-else src="/images/noImage.png" class="img-fluid img-size" />
        </div>
        <div class="col-lg-6 col-md-6 col-sm-12 col-12">
          <div class="card-block px-2 pt-4">
            <a
              @click="
                $router.push({
                  name: 'Collection',
                  params: { id: result.objectNumber },
                })
              "
              class="card-title fs-4 pointer"
              >{{ result.longTitle }}</a
            >
            <div class="card-body p-0">
              <p>
                Principal or First maker: {{ result.principalOrFirstMaker }}
              </p>
              <p>Object Number: {{ result.objectNumber }}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "SearchResultCard",
  props: {
    result: Object,
  },
};
</script>

<style scoped>
.img-size {
  width: 350px;
  object-fit: cover;
  height: 350px;
  transition: 0.2s ease-in-out;
}
.img-size:hover {
  transform: scale(1.05);
}
.card {
  border: none;
  background: #24293c;
}
.pointer {
  cursor: pointer;
}
@media (max-width: 776px) {
  .img-size {
    width: 100%;
  }
}
</style>
