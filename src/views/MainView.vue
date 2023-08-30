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
import { RouterView, useRoute } from "vue-router";

const isActive = ref(false);
const route = useRoute();
const inputField = ref(null);
const todos = ref([]);
const chosen = ref("");
const showList = ref(false);
const todo = ref("");
const priority = ref("none");
const filteredSortedTodos = computed(() => {
  if (priority.value === "none") {
    const filtered = todos.value.sort((a, b) => b.id - a.id);
    return filtered;
  } else if (priority.value === "isCompleted") {
    const filtered = todos.value
      .filter((todo) => todo.isCompleted === true)
      .sort((a, b) => b.id - a.id);
    console.log(filtered);
    console.log(todos.value);
    return filtered;
  } else {
    const filtered = todos.value
      .filter((todo) => todo.category === priority.value)
      .sort((a, b) => b.id - a.id);
    console.log(filtered);
    console.log(todos.value);
    return filtered;
  }
});

const updatePriority = (cat) => {
  priority.value = cat;
  console.log(priority.value);
};

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
          console.log("data", route.params.id);
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

provide("priority", {
  priority,
  updatePriority,
  filteredSortedTodos,
  isFocused,
  showList,
  toggleShowList,
  processString,
  categories,
  chosen,
  setChosen,
});
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
      {{ route.params.id === undefined ? 2222 : route.params.id }}
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
