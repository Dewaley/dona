<script setup>
import Popper from "vue3-popper";
</script>

<template>
  <div class="sidebar">
    <ul>
      <li class="active">
        <span class="fragment">
          <span class="logo"></span>
          <span class="list">Home</span>
        </span>
        <span class="fragment">
          <Popper
            class="pop"
            hover
            content="List actions"
            offset-distance="10"
            placement="top"
          >
            <span class="options">&#8942;</span>
          </Popper>
          <span class="count">7</span>
        </span>
      </li>
      <li>
        <span class="fragment">
          <span class="logo"></span>
          <span class="list">Completed</span>
        </span>
        <span class="fragment">
          <Popper
            class="pop"
            hover
            content="List actions"
            offset-distance="10"
            placement="top"
          >
            <span class="options">&#8942;</span>
          </Popper>
          <span class="count">7</span>
        </span>
      </li>
      <li>
        <span class="fragment">
          <span class="logo"></span>
          <span class="list">Today</span>
        </span>
        <span class="fragment">
          <Popper
            class="pop"
            hover
            content="List actions"
            offset-distance="10"
            placement="top"
          >
            <span class="options">&#8942;</span>
          </Popper>
          <span class="count">7</span>
        </span>
      </li>
      <li>
        <span class="fragment">
          <span class="logo"></span>
          <span class="list">Personal</span>
        </span>
        <span class="fragment">
          <Popper
            class="pop"
            hover
            content="List actions"
            offset-distance="10"
            placement="top"
          >
            <span class="options">&#8942;</span>
          </Popper>
          <span class="count">7</span>
        </span>
      </li>
      <li>
        <span class="fragment">
          <span class="logo"></span>
          <span class="list">Work</span>
        </span>
        <span class="fragment">
          <Popper
            class="pop"
            hover
            content="List actions"
            offset-distance="10"
            placement="top"
          >
            <span class="options">&#8942;</span>
          </Popper>
          <span class="count">7</span>
        </span>
      </li>
      <li>
        <span class="fragment">
          <span class="logo"></span>
          <span class="list">Errand</span>
        </span>
        <span class="fragment">
          <Popper
            class="pop"
            hover
            content="List actions"
            offset-distance="10"
            placement="top"
          >
            <span class="options">&#8942;</span>
          </Popper>
          <span class="count">7</span>
        </span>
      </li>
    </ul>
  </div>
</template>

<style scoped>
.sidebar {
  position: absolute;
  margin: 0.5rem 0rem 0.5rem 0.5rem;
  background-color: white;
  height: calc(100vh - 1rem);
  min-width: 21.5rem;
  padding: 2.5rem;
  border-radius: 23px;
}
ul {
  list-style-type: none;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}
li {
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 0.85rem;
  padding: 0.75rem;
  border-radius: 10px;
  height: 2.5rem;
  cursor: pointer;
}
.active {
  background-color: #f5f7fa;
}
.list {
  font-weight: 500;
}
.fragment {
  display: flex;
  gap: 1rem;
  align-items: center;
}
.options,
.count {
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 1rem;
  width: 1.2rem;
  height: 1.2rem;
  border-radius: 5px;
  font-weight: bold;
}
.options {
  padding: 0.75rem;
  display: none;
}
.options:hover {
  background-color: #e7e9ec;
}
li:hover .options {
  display: flex;
}
.active .count {
  color: #616870;
}
.count {
  background-color: #e7e9ec;
  font-size: 0.7rem;
  color: #8f949b;
}
.logo {
  width: 0.9rem;
  height: 0.9rem;
  display: flex;
  border: 2px solid red;
  border-radius: 5px;
}
</style>
