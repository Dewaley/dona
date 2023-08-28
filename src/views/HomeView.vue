<script setup>
import Sidebar from "../components/Sidebar.vue";
import { Bars3BottomLeftIcon } from "@heroicons/vue/24/solid";
import {
  SparklesIcon,
  CheckIcon,
  ChevronDownIcon,
} from "@heroicons/vue/24/outline";
import Popper from "vue3-popper";
import { onMounted, ref, reactive, provide, watch, computed } from "vue";
import { ref as firebaseRef, onValue, set } from "firebase/database";
import { auth, db } from "../main";
import { onAuthStateChanged } from "firebase/auth";
import { uid } from "uid";

const isActive = ref(false);
const inputField = ref(null);
const todos = ref([]);
const chosen = ref("");
const showList = ref(false);
const todo = ref("");
const priority = ref("none");
const filteredSortedTodos = computed(() => {
  const filtered = todos.value
    .filter((todo) => todo.category === priority.value)
    .sort((a, b) => b.id - a.id);
  console.log(filtered);
  console.log(todos.value);
  return filtered;
});

const daysOfWeek = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];

const monthNames = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

const updatePriority = (cat) => {
  priority.value = cat;
  console.log(priority.value);
};

provide("priority", { priority, updatePriority });

const toggleShowList = () => {
  showList.value = !showList.value;
};
const processString = (inputString) => {
  if (inputString.length <= 10) {
    return inputString;
  } else {
    return inputString.slice(0, 10) + "...";
  }
};

const toggleSidebar = () => {
  isActive.value = !isActive.value;
};
const disableSidebar = () => {
  isActive.value = false;
};
const setChosen = (category) => {
  chosen.value = category;
  showList.value = false;
};

const categories = ref([]);

onMounted(() => {
  onAuthStateChanged(auth, (user) => {
    if (user) {
      onValue(firebaseRef(db, `/${auth.currentUser.uid}/todos`), (snapshot) => {
        const data = snapshot.val();
        if (!data) {
          todos.value = [];
          console.log(data);
        } else {
          console.log(data);
          todos.value = data;
        }
      });
      onValue(
        firebaseRef(db, `/${auth.currentUser.uid}/categories`),
        (snapshot) => {
          const data = snapshot.val();
          // console.log(data);
          categories.value = data;
        }
      );
    }
  });
});

const addTodo = () => {
  const currentTimestamp = Date.now();
  console.log(todos.value);
  set(firebaseRef(db, `${auth.currentUser.uid}/todos`), [
    ...todos.value,
    {
      todo: todo.value,
      isCompleted: false,
      category: chosen.value === "" ? "none" : chosen.value,
      id: currentTimestamp,
    },
  ]);
  todo.value = "";
  chosen.value = "";
  isFocused.value = false;
  inputField.value.blur();
};

const isFocused = ref(false);

const getObjectLength = (obj) => {
  let count = 0;
  for (let key in obj) {
    if (obj.hasOwnProperty(key)) {
      count++;
    }
  }
  console.log("count", count);
  return count;
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
      <main>
        <div class="header">
          {{ priority }}
          <h3>Good night,</h3>
          <h3>
            <span v-if="filteredSortedTodos.length < 1"
              >No more tasks. Enjoy your day.
            </span>
            <span v-else
              >It's {{ daysOfWeek[new Date().getDay()] }},
              {{ monthNames[new Date().getMonth()] }}
              {{ new Date().getDate() }} - {{ filteredSortedTodos.length }}
              {{ filteredSortedTodos.length > 1 ? "tasks" : "task" }}</span
            >
          </h3>
        </div>
        <form
          class="addTodo"
          :class="{ focusing: isFocused }"
          @submit.prevent="addTodo"
        >
          <span class="box"></span>
          <input
            type="text"
            name=""
            id=""
            placeholder="Create new task"
            v-model="todo"
            @focus="isFocused = true"
            ref="inputField"
          />
          <span class="explicit">e</span>
          <span class="extras">
            <span class="list-name" @click="toggleShowList">
              <span class="list-style"></span>
              <span>{{
                chosen === ""
                  ? "No List"
                  : processString(modifyCategory(chosen))
              }}</span>
              <ChevronDownIcon class="drop" />
            </span>
          </span>
          <ul v-if="showList">
            <li
              v-for="category in categories"
              :key="category"
              @click="setChosen(category.category)"
            >
              <div>
                <span
                  class="ring"
                  :style="{ borderColor: category.color }"
                ></span>
                <span class="cat">{{ category.category }}</span>
              </div>
              <CheckIcon class="check" v-if="chosen === category" />
            </li>
          </ul>
        </form>
        <div class="no-todos" v-if="filteredSortedTodos.length < 1">
          <SparklesIcon class="sparkles" />
          <p>You're all done.</p>
        </div>
        <div class="todoList" v-else-if="filteredSortedTodos.length >= 1">
          <span v-for="todo in filteredSortedTodos">{{ todo.todo }}</span>
        </div>
      </main>
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
  margin-bottom: 2rem;
  position: relative;
  justify-content: space-between;
}

.no-todos {
  color: #dadde0;
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 15rem;
  font-weight: 500 !important;
}

.no-todos .sparkles {
  height: 10rem;
}

.addTodo input {
  background-color: transparent;
  outline: none;
  border: none;
  width: 100%;
  font-size: 0.8rem;
  padding-left: 1rem;
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
  width: 8rem;
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
  text-transform: capitalize;
}

.addTodo .list-name .drop {
  height: 1rem;
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

.addTodo ul {
  position: absolute;
  display: flex;
  flex-direction: column;
  right: 0;
  top: 4rem;
  background-color: #f9f9fa;
  width: 11rem;
  padding: 0.5rem;
  border-radius: 10px;
}

.addTodo ul li {
  list-style-type: none;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0.5rem 0.75rem;
  border-radius: 10px;
  cursor: pointer;
}

.addTodo ul li:hover {
  background-color: #eceff2;
}

.addTodo ul li div {
  display: flex;
  gap: 0.5rem;
  align-items: center;
  text-transform: capitalize;
}

.addTodo ul li div .ring {
  width: 0.9rem;
  height: 0.9rem;
  display: flex;
  border: 2px solid red;
  border-radius: 5px;
}

.addTodo ul li .check {
  height: 1rem;
  margin-bottom: -2.5px;
}

.todoList {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
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
