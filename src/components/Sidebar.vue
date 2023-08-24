<script setup>
import Popper from "vue3-popper";
import { ref, reactive } from "vue";
import { signOut, getAuth } from "firebase/auth";
import { useRouter } from "vue-router";
import { ChevronDownIcon, PlusIcon } from "@heroicons/vue/24/outline";
import { colorNames, colorList } from "../components/ColorNames";
import { onClickOutside } from "@vueuse/core";

const router = useRouter();

const isFocused = ref(false);
const customColor = ref("#0096FF");
const mainBoxColor = ref(customColor.value);
const showColors = ref(false);
const inputField = ref(null);
const colorBox = ref(null);
const newList = ref(null);

const newCategory = reactive({
  category: "",
  color: customColor.value,
});

onClickOutside(colorBox, (e) => {
  if (showColors) {
    showColors.value = false;
  }
});

const toggleShowColors = () => {
  showColors.value = true;
};

const toggleInput = () => {
  isFocused.value = true;
  if (inputField.value) {
    inputField.value.focus();
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

const addCategory = () => {
  console.log(newCategory);
  inputField.value.value = "";
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
      <form
        class="new-list-container"
        :class="{ focusing: isFocused }"
        @submit.prevent="addCategory"
        ref="newList"
      >
        <span class="addIcons">
          <PlusIcon class="plus" @click="toggleInput" />
          <div class="dropdown-container" @click="toggleShowColors">
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
            ref="inputField"
            type="text"
            placeholder="List name"
            v-model="newCategory.category"
          />
        </div>
        <span class="extra">D</span>
        <div class="color-options" :class="{ show: showColors }" ref="colorBox">
          <h4>Colors</h4>
          <div class="colors">
            <span
              v-for="color in colorList"
              :key="color"
              :style="{ backgroundColor: color }"
              @click="categoryColor(color)"
            ></span>
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
  position: relative;
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
  top: 3rem;
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
  margin: 0 1rem;
}

.new-list-container .color-options .colors {
  display: grid;
  grid-template-columns: repeat(8, 1fr);
  gap: 1.5rem;
  justify-items: center;
  align-items: center;
  padding: 1rem 1.5rem 1.75rem;
  border-bottom: 1px solid #f2f4f7;
}

.new-list-container .color-options .colors span {
  aspect-ratio: 1/1;
  height: 1rem;
  border-radius: 5px;
  cursor: pointer;
}

.new-list-container .color-options .custom {
  padding: 0rem 1rem;
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
</style>
