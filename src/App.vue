<script setup>
import ShowUsers from "./components/api/ShowUsers.vue";
</script>

<template>
  <header>
    <nav class="navbar navbar-expand-lg navbar-main">
      <div class="container-fluid">
        <a class="navbar-brand" href="#">Vue RestAPI</a>
        <button
          class="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarNav">
          <ul class="navbar-nav">
          </ul>
        </div>
      </div>
    </nav>
  </header>

  <div class="container-fluid" id="main-content">
    <RouterView />
  </div>
</template>

<style scoped>
.navbar-main {

  background-color: rgb(86, 87, 158);
}

.navbar-brand {
  color: aliceblue;
}
</style>
