<template>
  <div class="text-dark">
    <div
      class="modal fade"
      id="UploadImage"
      aria-hidden="true"
      aria-labelledby="UploadImage"
      tabindex="-1"
    >
      <div class="modal-dialog modal-dialog-centered">
        <div class="modal-content">
          <h2 class="text-center text-light">Upload Image</h2>
          <input class="btn btn-primary" accept="image/*" @change="readUrl" type="file"/>
          <img id="image" :src="src" />
          <canvas id="canvas" />
          <button
            data-bs-dismiss="modal"
            :disabled="disabled"
            class="btn btn-primary"
            @click="$emit('color', color)"
          >
            Upload
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "UploadImage",
  components: {},
  data() {
    return {
      src: "",
      disabled: true,
      color: "",
    };
  },
  methods: {
    readUrl(input) {
      const file = input.target.files[0];
      const reader = new FileReader();
      reader.onload = (e) => (this.src = e.target.result);
      reader.readAsDataURL(file);
      this.getPrimaryColor();
    },
    getPrimaryColor() {
      setTimeout(() => {
        var img = document.getElementById("image");
        var canvas = document.getElementById("canvas");
        var c = canvas.getContext("2d");
        c.width = canvas.width = img.width;
        c.height = canvas.height = img.height;
        c.clearRect(0, 0, c.width, c.height);
        c.drawImage(img, 0, 0, img.width, img.height);
        this.getColor(c);
      }, 500);
    },
    getColor(c) {
      var col,
        colors = {};
      var pixels, r, g, b, a;
      r = g = b = a = 0;
      pixels = c.getImageData(0, 0, c.width, c.height);
      for (var i = 0, data = pixels.data; i < data.length; i += 4) {
        r = data[i];
        g = data[i + 1];
        b = data[i + 2];
        a = data[i + 3];
        if (a < 255 / 2) continue;
        col = this.rgbToHex(r, g, b);
        if (!colors[col]) colors[col] = 0;
        colors[col]++;
      }
      var primary = Object.keys(colors).reduce((a, b) =>
        colors[a] > colors[b] ? a : b
      );
      this.disabled = false;
      this.color = primary;
    },
    rgbToHex(r, g, b) {
      if (r > 255 || g > 255 || b > 255) throw "Invalid color component";
      return ((r << 16) | (g << 8) | b).toString(16);
    },
  },
};
</script>

<style scoped>
#image {
  display: none;
}
.modal-content {
    background: #323952;
}
</style>
