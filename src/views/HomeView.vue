<script setup>
import Sidebar from "../components/Sidebar.vue";
import { Bars3BottomLeftIcon } from "@heroicons/vue/24/solid";
import { CalendarIcon } from "@heroicons/vue/24/outline";
import Popper from "vue3-popper";
import { ref } from "vue";

const isActive = ref(false);
const toggleSidebar = () => {
  isActive.value = !isActive.value;
};
const disableSidebar = () => {
  isActive.value = false;
};

const isFocused = ref(false);
const todo = ref("");
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
          <h3>Good night,</h3>
          <h3><span>It's Tuesday, Jun 20 - 7 tasks</span></h3>
        </div>
        <form class="addTodo" :class="{ focusing: isFocused }">
          <span class="box"></span>
          <input
            type="text"
            name=""
            id=""
            placeholder="Create new task"
            @focus="isFocused = true"
            @blur="isFocused = false"
          />
          <span class="explicit">e</span>
          <span class="extras">
            <span class="calend-container">
              <CalendarIcon class="calend" />
            </span>
            <span class="list-name">
              <span class="list-style"></span>
              <span>No List</span>
              <span>&#8964;</span>
            </span>
          </span>
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
  background-color: #f9f9fb;
  height: calc(100vh - 1rem);
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

.addTodo {
  display: flex;
  align-items: center;
  background-color: #e0e3e6;
  padding: 0.75rem;
  border-radius: 10px;
}

.addTodo input {
  background-color: transparent;
  outline: none;
  border: none;
  width: 100%;
  font-size: 0.8rem;
  padding-left: 0.5rem;
}

.focusing.addTodo input {
  width: calc(100% - 9rem);
}

.addTodo input::placeholder {
  color: #92979e;
}

.addTodo .box {
  width: 1.5rem;
  height: 1.5rem;
  max-width: 0px;
  max-height: 0px;
  display: flex;
  background-color: #e9ecef;
  border-radius: 5px;
  transition: max-width 0.25s linear, max-height 0.25s linear;
}

.focusing.addTodo .box {
  max-width: 1.5rem;
  max-height: 1.5rem;
  transition: max-width 0.25s linear, max-height 0.25s linear;
}

.addTodo .explicit {
  width: 1rem;
  height: 1rem;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #d4d7da;
  border-radius: 5px;
  text-transform: capitalize;
  color: #616870;
  font-size: 0.7rem;
}

.focusing.addTodo .explicit {
  display: none;
}

.addTodo .extras {
  display: flex;
  max-width: 0px;
  overflow: hidden;
  gap: 0.5rem;
  white-space: nowrap;
}

.addTodo .calend-container {
  display: flex;
  height: 2rem;
  width: 2rem;
  background-color: #e9ecef;
  padding: 0.4rem;
  border-radius: 5px;
}

.addTodo .calend {
}

.addTodo .list-name {
  height: 2rem;
  width: 5rem;
  overflow: hidden;
  background-color: #e9ecef;
  padding: 0.4rem;
  border-radius: 5px;
  font-size: 0.7rem;
  font-weight: 600;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.3rem;
}

.addTodo .list-name .list-style {
  width: 0.75rem;
  height: 0.75rem;
  display: flex;
  border: 2px solid #bfc3c7;
  border-radius: 5px;
}

.focusing.addTodo .extras {
  max-width: 8rem;
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
</style>
