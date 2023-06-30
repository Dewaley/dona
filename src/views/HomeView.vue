<script setup>
import Sidebar from "../components/Sidebar.vue";
import { Bars3BottomLeftIcon } from "@heroicons/vue/24/solid";
import Popper from "vue3-popper";
import { ref } from "vue";

const isActive = ref(false);
const toggleSidebar = () => {
  isActive.value = !isActive.value;
};
const disableSidebar = () => {
  isActive.value = false;
};
</script>

<template>
  <!-- <h2>HomeView &#127968;</h2> -->
  <div class="main">
    <div
      class="overlay"
      :class="{ active: isActive }"
      @click="disableSidebar"
    ></div>
    <div class="sidebar" :class="{ active: isActive }">
      <div class="mobile-sidebar"><Sidebar /></div>
      <div class="desktop-sidebar">
        <Sidebar />
      </div>
    </div>
    <div class="container">
      <div class="menu-container">
        <Popper
          class="pop"
          hover
          content="Category List"
          placement="right"
          offsetDistance="10"
          disableClickAway="true"
          zIndex="99"
        >
          <Bars3BottomLeftIcon class="menu" @click="toggleSidebar"
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
  z-index: 100;
}
.mobile-sidebar {
  display: none;
}
.desktop-sidebar {
  display: initial;
}
.overlay {
  display: none;
}
.container {
  display: flex;
  justify-content: center;
  width: 100%;
  position: relative;
}
main {
  width: 65%;
  /* background-color: brown; */
}
.header {
  margin: 3rem 0 2rem;
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
}
.header h3 {
  font-weight: 500;
  font-size: 1.3rem;
}
.header h3 span {
  color: rgb(160, 165, 171);
  font-weight: 400;
  font-size: 1.2rem;
}
.menu-container {
  position: absolute;
  top: 1rem;
  left: 1rem;
  width: calc(100% - 1rem);
  display: none;
  /* overflow: hidden; */
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
    left: -320px;
    transition: left 350ms ease;
    /* display: none; */
  }
  .desktop-sidebar {
    display: none;
  }
  .mobile-sidebar {
    display: initial;
  }
  .active.sidebar {
    left: 0;
    transition: left 350ms ease;
  }
  .overlay {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100vh;
    /* background-color: black; */
    z-index: 99;
    display: none;
  }
  .active.overlay {
    display: initial;
  }
  main {
    width: 85vw;
  }
  .menu-container {
    display: block;
  }
}
</style>
