<template>
  <div class="col-12 col-md-6 col-lg-4 col-sm-12">
    <div class="box-size">
      <img
        class="img-size pointer"
        v-if="painting.hasImage"
        :src="painting.webImage.url"
        @click="
          $router.push({
            name: 'Collection',
            params: { id: painting.objectNumber },
          })
        "
      />
      <img class="img-size" v-else src="/images/noImage.png" />
    </div>
    <div class="mt-2 mb-4">
      <h2
        @click="
          $router.push({
            name: 'Collection',
            params: { id: painting.objectNumber },
          })
        "
        class="fs-5 text-light pointer"
      >
        {{ substrTheStr(painting.title) }}
      </h2>
    </div>
  </div>
</template>

<script>
export default {
  name: "PaintingCard",
  props: {
    painting: Object,
  },
  methods: {
    substrTheStr(title) {
      if (title.length > 40) {
        return title.substring(0, 40) + "...";
      } else {
        return title;
      }
    },
  },
};
</script>

<style scoped>
.img-size {
  object-fit: cover;
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  transition: 0.1s ease-in-out;
}
.box-size {
  max-height: 350px;
  max-width: 100%;
  min-width: 300px;
  min-height: 280px;
  display: block;
  position: relative;
}
.img-size:hover {
  transform: scale(1.03);
}
.pointer {
  cursor: pointer;
}
h2 {
  max-width: 400px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: clip;
}
h2:hover {
  color: #dc8e3b !important;
}
</style>
