<script setup>
import { ref, watch, computed } from "vue";
import {
  SparklesIcon,
  CheckIcon,
  ChevronDownIcon,
  CalendarIcon,
} from "@heroicons/vue/24/outline";
import { useMainStore } from "../components/stores/mainStore";
import { storeToRefs } from "pinia";
import { daysOfWeek, monthNames, abbrMonthNames } from "../components/date";
import { onClickOutside } from "@vueuse/core";
import { DatePicker } from "v-calendar";

const showList = ref(false);
const categoryList = ref(null);
const calendar = ref(false);
const calendarBox = ref(null);

const store = useMainStore();
const {
  categories,
  filteredSortedTodos,
  todo,
  date,
  chosen,
  isFocused,
  inputField,
} = storeToRefs(store);
const { addTodo } = store;

const toggleShowList = () => {
  showList.value = !showList.value;
};

const toggleCalendar = () => {
  calendar.value = true;
};

onClickOutside(categoryList, (e) => {
  if (showList) {
    showList.value = false;
  }
});

onClickOutside(calendarBox, (e) => {
  if (calendar) {
    calendar.value = false;
  }
});

watch(date, () => {
  calendar.value = false;
});

const processString = (inputString) => {
  if (inputString.length <= 10) {
    return inputString;
  } else {
    return inputString.slice(0, 10) + "...";
  }
};

const setChosen = (category) => {
  chosen.value = category;
  showList.value = false;
};
</script>

<template>
  <main>
    <div class="header">
      {{ isFocused }} {{ chosen }} {{ todo }} {{ date }}
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
      @submit.prevent="addTodo()"
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
        <span class="calend-container" @click="toggleCalendar">
          <!-- {{
            date && `${abbrMonthNames[date.getMonth() + 1]} ${date.getDate()}`
          }} -->
          <span v-if="date" class="dot"></span>
          <CalendarIcon />
        </span>
        <span class="list-name" @click="toggleShowList">
          <span class="list-style"></span>
          <span>{{ chosen === "" ? "No List" : processString(chosen) }}</span>
          <ChevronDownIcon class="drop" />
        </span>
      </span>
      <ul v-if="showList" ref="categoryList">
        <li
          v-for="category in categories"
          :key="category"
          @click="setChosen(category.category)"
        >
          <div>
            <span class="ring" :style="{ borderColor: category.color }"></span>
            <span class="cat">{{ category.category }}</span>
          </div>
          <CheckIcon class="check" v-if="chosen === category.category" />
        </li>
      </ul>
      <div class="calendar-container" ref="calendarBox">
        <DatePicker
          v-if="calendar"
          mode="date"
          :min-date="new Date()"
          v-model="date"
          class="calendar"
        />
      </div>
    </form>
    <div class="no-todos" v-if="filteredSortedTodos.length < 1">
      <SparklesIcon class="sparkles" />
      <p>You're all done.</p>
    </div>
    <div class="todoList" v-else-if="filteredSortedTodos.length >= 1">
      <span v-for="todo in filteredSortedTodos">{{ todo.todo }}</span>
    </div>
  </main>
</template>

<style scoped>
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
  height: 3.5rem;
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
  width: 1.2rem;
  height: 1.2rem;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #d4d7da;
  border-radius: 5px;
  text-transform: capitalize;
  color: #616870;
  font-size: 0.8rem;
}

.focusing.addTodo .explicit {
  display: none;
}

.addTodo .extras {
  max-width: 0px;
  overflow-y: visible;
  display: none;
  gap: 0.5rem;
  white-space: nowrap;
}

.addTodo .calendar-container {
  position: absolute;
  top: 4rem;
  right: 0;
}

.addTodo .calend-container {
  display: flex;
  height: 2rem;
  background-color: #e9ecef;
  padding: 0.4rem;
  border-radius: 5px;
  position: relative;
}

.addTodo .calend-container .dot {
  display: flex;
  height: 0.5rem;
  aspect-ratio: 1/1;
  border-radius: 50%;
  background-color: blue;
  position: absolute;
  right: -0.25rem;
  top: -0.25rem;
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
  cursor: pointer;
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
  display: flex;
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
  main {
    width: 85vw;
  }
}
</style>
