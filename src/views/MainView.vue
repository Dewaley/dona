<script setup>
import Sidebar from "../components/Sidebar.vue";
import { Bars3BottomLeftIcon } from "@heroicons/vue/24/solid";
import Popper from "vue3-popper";
import { onMounted, ref } from "vue";
import { auth } from "../main";
import { onAuthStateChanged } from "firebase/auth";
import { RouterView } from "vue-router";
import { useMainStore } from "../components/stores/mainStore";

const isActive = ref(false);
const store = useMainStore();

const { getTodosAndCategories } = store;

const toggleSidebar = () => {
  isActive.value = !isActive.value;
};
const disableSidebar = () => {
  isActive.value = false;
};

onMounted(() => {
  onAuthStateChanged(auth, (user) => {
    if (user) {
      getTodosAndCategories();
    }
  });
});
</script>

<template>
  <div class="main">
    <div
      class="overlay"
      :class="{ active: isActive }"
      @click="disableSidebar"
    ></div>
    <div class="sidebar" :class="{ active: isActive }">
      <div class="mobile-sidebar"><Sidebar /></div>
      <div class="desktop-sidebar">
        <Sidebar :categories="categories" />
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
      <RouterView />
    </div>
  </div>
</template>

<style scoped>
.main {
  background-color: #eceeef;
  min-height: 100vh;
  overflow-y: scroll;
  display: flex;
}
.sidebar {
  margin: 0.5rem 0rem 0.5rem 0.5rem;
  background-color: #f9f9fb;
  height: calc(100vh - 1rem);
  overflow-y: scroll;
  width: 27vw;
  min-width: 280px;
  padding: 2.5rem;
  border-radius: 23px;
  z-index: 100;
  position: fixed;
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
  margin-left: 27vw;
  position: relative;
}
@media all and (max-width: 768px) {
  .sidebar {
    position: fixed;
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

  .container {
    margin-left: 0;
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

@media all and (max-width: 320px) {
  .sidebar {
    overflow: scroll;
  }
}
</style>
