<script setup>
import Sidebar from "../components/Sidebar.vue";
import { Bars3BottomLeftIcon } from "@heroicons/vue/24/solid";
import Popper from "vue3-popper";
</script>

<template>
  <!-- <h2>HomeView &#127968;</h2> -->
  <div class="main">
    <div class="sidebar">
      <Sidebar />
    </div>
    <div class="container">
      <div class="menu-container">
        <Popper
          class="pop"
          hover
          content="Category List"
          placement="right"
          offsetDistance="10"
        >
          <Bars3BottomLeftIcon class="menu"
        /></Popper>
      </div>
      <main>
        <div class="header">
          <h3>Good night Dewaley,</h3>
          <h3><span>It's Tuesday, Jun 20 - 7 tasks</span></h3>
        </div>
        <form>
          <input type="text" name="" id="" />
        </form>
      </main>
    </div>
  </div>
</template>

<style scoped>
.main {
  background-color: #eceeef;
  min-height: 100vh;
  display: flex;
}
.sidebar {
  margin: 0.5rem 0rem 0.5rem 0.5rem;
  background-color: white;
  height: calc(100vh - 1rem);
  width: 30vw;
  min-width: 280px;
  padding: 2.5rem;
  border-radius: 23px;
}
.container {
  display: flex;
  justify-content: center;
  width: 100%;
  position: relative;
}
main {
  /* width: 600px; */
}
.header {
  margin: 6rem 0 2rem;
}
.header h2 {
  font-weight: 500;
}
.header span {
  color: rgb(160, 165, 171);
  font-weight: 500;
}
.menu-container {
  position: absolute;
  top: 1rem;
  left: 1rem;
  width: 100%;
  display: none;
}
/* .popper {
  white-space: nowrap;
} */
.menu {
  width: 2.5rem;
  padding: 0.5rem;
  background-color: rgb(227, 224, 230);
  border-radius: 10px;
  cursor: pointer;
}
.menu:hover {
  background-color: rgba(227, 224, 230, 0.7);
}

@media all and (max-width: 768px) {
  .sidebar {
    position: absolute;
    width: 250px;
    display: none;
  }
  main {
    width: 85vw;
  }
  .menu-container {
    display: block;
  }
}
</style>
