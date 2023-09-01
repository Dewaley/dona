<script setup>
import Popper from "vue3-popper";
import { ref } from "vue";
import { signOut, getAuth } from "firebase/auth";
import { useRouter, useRoute } from "vue-router";
import {
  ChevronDownIcon,
  PlusIcon,
  BackspaceIcon,
  TrashIcon,
} from "@heroicons/vue/24/outline";
import { colorNames, colorList } from "../components/ColorNames";
import { onClickOutside } from "@vueuse/core";
import { useMainStore } from "./stores/mainStore";
import { storeToRefs } from "pinia";

const router = useRouter();
const route = useRoute();
const store = useMainStore();

const { categories, newCategory, catField, editing } = storeToRefs(store);
const { addCategory, deleteCategory } = store;

const customColor = ref("#0096FF");
const mainBoxColor = ref(customColor.value);
const showColors = ref(false);
const showOptions = ref("");
const colorBox = ref(null);
const newList = ref(null);
const optionBox = ref(null);

onClickOutside(colorBox, (e) => {
  if (showColors) {
    showColors.value = false;
  }
});
onClickOutside(optionBox, (e) => {
  if (showOptions.value !== "") {
    showOptions.value = "";
  }
});

const toggleShowColors = () => {
  showColors.value = true;
};

const toggleOptions = (val) => {
  showOptions.value = val;
};

const toggleInput = () => {
  editing.value = true;
  if (catField.value) {
    catField.value.focus();
  }
};

// const generateColors = () => {
//   const count = 16;
//   const letters = "0123456789ABCDEF";

//   for (let index = 0; index < count; index++) {
//     let color = "#";
//     for (let j = 0; j < 6; j++) {
//       color += letters[Math.floor(Math.random() * 16)];
//     }
//     colorList.value.push(color);
//   }
//   console.log(colorList.value);
// };

const modifyString = (string) => {
  return string.toLowerCase().replace(" ", "_");
};

const changeBoxColor = () => {
  if (isValidColor(customColor.value)) {
    mainBoxColor.value = customColor.value;
  }
};

const isValidColor = (value) => {
  const colorRegex = /^#([0-9A-F]{3}){1,2}$/i;
  const result =
    colorRegex.test(value) || colorNames.includes(value.toLowerCase());
  // console.log(result);
  return result;
};

// generateColors();

const categoryColor = (color) => {
  color
    ? (newCategory.color = color)
    : (newCategory.color = mainBoxColor.value);

  customColor.value = "#000000";
  showColors.value = false;

  console.log(newCategory);
};

const logout = () => {
  const auth = getAuth();
  signOut(auth).then(() => {
    // console.log("signed out!");
    router.push("/login");
  });
};
</script>

<template>
  <div class="side-container">
    <ul>
      <li
        class="category-container home"
        :class="{ active: route?.params?.id === undefined }"
      >
        <span class="cat-icon" @click="router.push('/app')"></span>
        <span class="list" @click="router.push('/app')">home</span>
        <span class="fragment">
          <Popper
            class="pop"
            hover
            content="List actions"
            offset-distance="10"
            placement="top"
          >
            <span class="options" @click="toggleOptions('home')">&#8942;</span>
          </Popper>
          <span class="count">7</span>
        </span>
        <ul v-if="showOptions === 'home'" class="showOptions" ref="optionBox">
          <li>
            <BackspaceIcon class="option-icon" />
            <span>Remove all tasks</span>
          </li>
          <li>
            <TrashIcon class="option-icon" />
            <span>Delete</span>
          </li>
        </ul>
      </li>
      <li
        class="category-container completed"
        :class="{ active: route?.params?.id === 'completed' }"
      >
        <span class="cat-icon" @click="router.push('/app/completed')"></span>
        <span class="list" @click="router.push('/app/completed')"
          >completed</span
        >
        <span class="fragment">
          <Popper
            class="pop"
            hover
            content="List actions"
            offset-distance="10"
            placement="top"
          >
            <span class="options" @click="toggleOptions('completed')"
              >&#8942;</span
            >
          </Popper>
          <span class="count">7</span>
        </span>
        <ul
          v-if="showOptions === 'completed'"
          class="showOptions"
          ref="optionBox"
        >
          <li>
            <BackspaceIcon class="option-icon" />
            <span>Remove all tasks</span>
          </li>
          <li>
            <TrashIcon class="option-icon" />
            <span>Delete</span>
          </li>
        </ul>
      </li>
      <li
        v-for="category in categories"
        :class="{
          active: route?.params?.id === modifyString(category.category),
        }"
        class="category-container"
      >
        <span
          class="cat-icon"
          :style="{ borderColor: category.color }"
          @click="router.push(`/app/${modifyString(category.category)}`)"
        ></span>
        <span
          class="list"
          @click="router.push(`/app/${modifyString(category.category)}`)"
          >{{ category.category }}</span
        >
        <span class="fragment">
          <Popper
            class="pop"
            hover
            content="List actions"
            offset-distance="10"
            placement="top"
          >
            <span class="options" @click="toggleOptions(category.category)"
              >&#8942;</span
            >
          </Popper>
          <span class="count">7</span>
        </span>
        <ul
          v-if="showOptions === category.category"
          class="showOptions"
          ref="optionBox"
        >
          <li>
            <BackspaceIcon class="option-icon" />
            <span>Remove all tasks</span>
          </li>
          <li>
            <TrashIcon
              class="option-icon"
              @click="deleteCategory(category.id)"
            />
            <span>Delete</span>
          </li>
        </ul>
      </li>
      <!-- <li
        class="home"
        :class="{ active: route?.params?.id === undefined }"
        @click="router.push('/app')"
      >
        <span class="fragment">
          <span class="logo"></span>
          <input type="text" name="" id="" class="list" value="Home" />
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
      <li
        class="completed"
        :class="{ active: route?.params?.id === 'completed' }"
        @click="router.push('/app/completed')"
      >
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
      <li class="active today">
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
      <li
        v-for="category in categories"
        :class="{
          active: route?.params?.id === modifyString(category.category),
        }"
        @click="router.push(`/app/${modifyString(category.category)}`)"
      >
        <span class="fragment">
          <span class="logo" :style="{ borderColor: category.color }"></span>
          <span class="list">{{ category.category }}</span>
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
      </li> -->

      <form
        class="new-list-container"
        :class="{ focusing: editing }"
        @submit.prevent="addCategory"
        ref="newList"
      >
        <span class="addIcons">
          <PlusIcon class="plus" @click="toggleInput" />
          <div
            class="dropdown-container"
            :class="{ working: showColors }"
            @click="toggleShowColors"
          >
            <span
              class="logo"
              :style="{ borderColor: newCategory.color }"
            ></span>
            <ChevronDownIcon class="dropdown" />
          </div>
        </span>
        <div class="fields">
          <button @click="toggleInput">Create new list</button>
          <input
            ref="catField"
            type="text"
            placeholder="List name"
            v-model="newCategory.category"
          />
        </div>
        <span class="extra">D</span>
        <div class="color-options" :class="{ show: showColors }" ref="colorBox">
          <h4>Colors</h4>
          <div class="colors">
            <div
              v-for="color in colorList"
              :key="color"
              @click="categoryColor(color)"
            >
              <span :style="{ backgroundColor: color }"></span>
            </div>
          </div>
          <div class="custom">
            <p>Custom color</p>
            <form action="" @submit.prevent="categoryColor()">
              <div
                class="sample"
                :style="{ backgroundColor: mainBoxColor }"
              ></div>
              <input
                type="text"
                v-model="customColor"
                @input="changeBoxColor"
              />
            </form>
          </div>
        </div>
      </form>
    </ul>
    <button class="logout" @click="logout">Sign out</button>
  </div>
</template>

<style scoped>
.side-container {
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  gap: 4rem;
}

ul {
  list-style-type: none;
  display: flex;
  flex-direction: column;
  gap: 0.2rem;
}

.category-container {
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 0.85rem;
  padding: 0.75rem;
  border-radius: 10px;
  height: 2.5rem;
  cursor: pointer;
  gap: 0.5rem;
  position: relative;
}

.active {
  background-color: #f5f7fa;
}

.category-container .cat-icon {
  min-width: 0.9rem;
  height: 0.9rem;
  display: flex;
  border: 2px solid red;
  border-radius: 5px;
}

.showOptions {
  position: absolute;
  top: 3rem;
  left: calc(100% - 4.5rem);
  min-width: 12rem;
  background-color: red;
  display: flex;
  gap: 0.5rem;
  flex-direction: column;
  background-color: #f9f9fa;
  border: 1px solid #e7e9ec;
  padding: 0.5rem;
  border-radius: 10px;
  z-index: 100;
}

.showOptions li {
  display: flex;
  gap: 0.5rem;
  align-items: center;
  padding: 0.5rem 0.75rem;
  border-radius: 10px;
  cursor: pointer;
}

.showOptions li:hover {
  background-color: #eceff2;
}

.showOptions li .option-icon {
  height: 1rem;
}

.list {
  width: 100%;
  font-weight: 500;
  text-transform: capitalize;
  background-color: transparent;
}
.home .cat-icon {
  border-color: #ae2783;
}

.today .cat-icon {
  border-color: #5dc015;
}

.completed .cat-icon {
  border-color: #acc1fa;
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
  opacity: 0;
}

.working {
  border: 2px solid;
}
.options:hover {
  background-color: #e7e9ec;
}
li:hover .options {
  opacity: 1;
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

.logout {
  display: flex;
  justify-content: center;
  width: 100%;
  padding: 0.5rem;
  border-radius: 5px;
  border: none;
  background-color: red;
  color: white;
  cursor: pointer;
}

.new-list-container {
  display: flex;
  align-items: center;
  padding: 0.75rem;
  /* gap: 2rem; */
}

.new-list-container .addIcons {
  display: flex;
  align-items: center;
  height: 1rem;
}

.new-list-container .fields {
  display: flex;
  margin-left: 0.5rem;
  width: 100%;
}

.new-list-container .fields button {
  width: 100%;
  text-align: left;
  border: none;
  background-color: transparent;
  color: #616870;
  cursor: pointer;
}

.new-list-container:hover .fields button {
  color: #000;
}

.new-list-container .fields input {
  width: 100%;
  max-width: 0px;
  border: none;
  outline: none;
  font-size: 0.9rem;
  cursor: pointer !important;
  background-color: transparent;
}

.new-list-container .fields input::placeholder {
  color: #616870;
}

.new-list-container .fields input:focus {
  cursor: text !important;
}
.new-list-container .fields input:focus::placeholder {
  color: #000;
}

.new-list-container .plus {
  width: 1.5rem;
  height: 1.5rem;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 0.3rem;
  border-radius: 5px;
  cursor: pointer;
}

.new-list-container:hover .plus {
  background-color: #f2f4f7;
}

.new-list-container:hover .fields input::placeholder {
  color: #000;
}

.new-list-container .extra {
  background-color: #e7e9ec;
  font-size: 0.75rem;
  width: 0.8rem;
  height: 0.8rem;
  border-radius: 5px;
  padding: 0.6rem;
  color: #8f949b;
  display: flex;
  justify-content: center;
  align-items: center;
}

.new-list-container .dropdown-container {
  align-items: center;
  gap: 0.25rem;
  background-color: #f2f4f7;
  max-width: 0px;
  height: 1.5rem;
  width: 2.5rem;
  border-radius: 5px;
  display: flex;
  justify-content: center;
  opacity: 0;
  overflow: hidden;
  transition: max-width 0.1s linear;
}

.new-list-container .dropdown-container .logo {
  width: 0.8rem;
  height: 0.8rem;
  display: flex;
  border: 2px solid;
  border-radius: 4px;
}

.new-list-container .dropdown {
  height: 0.8rem;
}

.focusing.new-list-container .fields button {
  display: none;
}

.focusing.new-list-container .fields input {
  max-width: fit-content;
}

.focusing.new-list-container .addIcons .plus,
.focusing.new-list-container .extra {
  display: none;
}

.focusing.new-list-container .addIcons .dropdown-container {
  max-width: 4rem;
  opacity: 1;
}

.new-list-container .color-options {
  position: absolute;
  top: 21rem;
  /* width: 20rem; */
  padding: 1rem 0;
  border-radius: 10px;
  display: none;
  opacity: 0;
  flex-direction: column;
  gap: 1rem;
  background-color: #fefefe;
}

.new-list-container .show.color-options {
  display: flex;
  opacity: 1;
}

.new-list-container .color-options h4 {
  background-color: #eff2f4;
  padding: 0.25rem;
  border-radius: 5px;
  width: fit-content;
  font-size: 0.9rem;
  box-shadow: -0.5px 0.5px 2.6px #d2d5d7, 0.5px -0.5px 2.6px #ffffff;
  margin: 0 0.75rem;
}

.new-list-container .color-options .colors {
  display: grid;
  grid-template-columns: repeat(8, 1fr);
  gap: 0.35rem;
  justify-items: center;
  align-items: center;
  padding: 0.75rem;
  border-bottom: 1px solid #f2f4f7;
}

.new-list-container .color-options .colors div {
  aspect-ratio: 1/1;
  height: 1.5rem;
  border-radius: 5px;
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
}

.new-list-container .color-options .colors div span {
  aspect-ratio: 1/1;
  height: 0.75rem;
  border-radius: 5px;
  cursor: pointer;
}

.new-list-container .color-options .custom {
  padding: 0rem 0.75rem;
  display: flex;
  justify-content: space-between;
  width: 100%;
  font-size: 0.8rem;
  white-space: nowrap;
  align-items: center;
}

.new-list-container .color-options .custom form {
  border: 1px solid #e7e9ec;
  width: 7rem;
  display: flex;
  align-items: center;
  padding: 0.5rem;
  gap: 0.5rem;
  border-radius: 10px;
}

.new-list-container .color-options .custom form .sample {
  aspect-ratio: 1/1;
  height: 1rem;
  border-radius: 5px;
}

.new-list-container .color-options .custom form input {
  padding: 0;
  width: 100%;
  outline: 0;
  border: 0;
  background-color: transparent;
}

@media all and (max-width: 768px) {
  .new-list-container .color-options .colors div {
    height: 1.5rem;
  }

  .new-list-container .color-options .colors div span {
    height: 0.75rem;
  }
}
</style>
