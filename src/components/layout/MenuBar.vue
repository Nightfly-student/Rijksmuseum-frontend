<template>
  <nav class="navbar navbar-expand-lg navbar-dark">
    <div class="container-xl">
      <router-link to="/" class="navbar-brand">Rijks</router-link>
      <button
        type="button"
        class="navbar-toggler"
        data-bs-toggle="collapse"
        data-bs-target="#navbarCollapse"
      >
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarCollapse">
        <div class="navbar-nav">
          <router-link class="nav-item nav-link active" to="/"
            >Home</router-link
          >
          <router-link class="nav-item nav-link active" to="/search"
            >Search</router-link
          >
        </div>
      </div>
    </div>
  </nav>
</template>

<script>
export default {
  name: "MenuBar",
  watch: {
    $route() {
      document.getElementById("navbarCollapse").classList.remove("show");
    },
  },
};
</script>

<style scoped>
nav {
  background-color: #323952;
}
</style>
