<template>
  <div class="container-xl mt-1">
    <div class="row d-flex justify-content-center">
      <div class="col-md-9">
        <div class="card mb-4">
          <Form @submit="onSubmit" :validation-schema="schema">
            <div class="text-center">
              <p class="form-label text-warning" id="searchErr"></p>
            </div>
            <div class="row g-3 mt-2 justify-content-center">
              <div class="col-md-2= col-1"></div>
              <div class="col-md-7 col-7">
                <Field
                  type="text"
                  name="search"
                  v-model="search"
                  :value="search"
                  class="form-control"
                  placeholder="Search for art"
                />
              </div>
              <div class="col-md-3 col-4">
                <button
                  role="submit"
                  class="btn btn-primary text-dark btn-block"
                >
                  Search Results
                </button>
              </div>
            </div>
            <div class="mt-3 text-center">
              <a
                data-toggle="collapse"
                data-bs-toggle="collapse"
                data-bs-target="#advanceCollapse"
                role="button"
                aria-expanded="false"
                aria-controls="advanceCollapse"
                class="text-info text-decoration-none"
              >
                Advanced Search <i class="fa fa-angle-down"></i>
              </a>
              <div class="collapse" id="advanceCollapse">
                <div class="card card-body">
                  <div class="row g-2">
                    <div class="col-md-4">
                      <Field
                        type="text"
                        v-model="artist"
                        :value="artist"
                        name="artist"
                        placeholder="Artist Name"
                        class="form-control"
                      />
                    </div>
                    <div class="col-md-4">
                      <Field
                        v-model="material"
                        :value="material"
                        type="text"
                        name="material"
                        class="form-control"
                        placeholder="Material"
                      />
                    </div>
                    <div class="col-md-4">
                      <Field
                        v-model="technique"
                        :value="technique"
                        type="text"
                        name="technique"
                        class="form-control"
                        placeholder="Technique"
                      />
                    </div>
                    <div class="col-md-8 mt-3">
                      <a
                        data-bs-target="#UploadImage"
                        data-bs-toggle="modal"
                        id="imageAdder"
                        role="button"
                        class="btn btn-primary text-dark w-100"
                      >
                        Search on image colors
                      </a>
                    </div>
                    <div class="col-md-4 mt-3">
                      <div>
                        <Field
                          v-model="toppieces"
                          name="toppieces"
                          type="checkbox"
                          :value="toppieces"
                        >
                          <input
                            type="checkbox"
                            name="toppieces"
                            class="form-check-input me-1"
                          />
                        </Field>
                        <label>Top Pieces Only</label>
                      </div>
                      <div>
                        <Field
                          v-model="imgonly"
                          name="imgonly"
                          type="checkbox"
                          :value="imgonly"
                        >
                          <input
                            type="checkbox"
                            name="onlyimage"
                            class="form-check-input me-1"
                          />
                        </Field>
                        <label>Only with Image</label>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </Form>
        </div>
      </div>
    </div>
    <UploadImage @color="checkImageColors" />
  </div>
</template>

<script>
import { Field, Form, ErrorMessage } from "vee-validate";
import UploadImage from "./UploadImage.vue";
import * as yup from "yup";
export default {
  name: "SearchBar",
  components: {
    Field,
    Form,
    ErrorMessage,
    UploadImage,
  },
  data() {
    const schema = yup.object({
      search: yup.string(),
    });
    return {
      schema,
      search: "",
      material: "",
      technique: "",
      artist: "",
      imgonly: false,
      toppieces: false,
      normalized32Colors: "",
    };
  },
  methods: {
    onSubmit(value) {
      console.log(value);
      if (
        value.material === "" &&
        value.technique === "" &&
        value.artist === "" &&
        value.search === "" &&
        this.normalized32Colors === ""
      ) {
        document.getElementById("searchErr").innerHTML =
          "Please fill in atleast 1 field";
      } else {
        this.$router.push({
          path: `search`,
          query: {
            q: value.search,
            material: value.material,
            technique: value.technique,
            involvedMaker: value.artist,
            imgonly: value.imgonly,
            toppieces: value.toppieces,
            normalized32Colors: this.normalized32Colors,
          },
          scrollTo: 0,
        });
      }
    },
    checkImageColors(e) {
      var btn = document.getElementById("imageAdder");
      btn.innerHTML = "Image Color Selected #" + e;
      this.normalized32Colors = encodeURIComponent(`#${e}`);
    },
  },
};
</script>

<style scoped>
.card {
  background: none;
  border: 0px none;
}
.advanced {
  text-decoration: none;
  font-size: 15px;
  font-weight: 500;
}
.form-control:focus {
  box-shadow: none;
  border: 1px solid #00838f;
}
</style>
