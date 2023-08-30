import { defineStore } from "pinia";
import { ref, computed, reactive } from "vue";
import { useRoute } from "vue-router";
import { ref as firebaseRef, onValue, set } from "firebase/database";
import { auth, db } from "../../main";

export const useMainStore = defineStore("mainStore", () => {
  const route = useRoute();
  const todos = ref([]);
  const categories = ref([]);
  const chosen = ref("");
  const todo = ref("");
  const isFocused = ref(false);
  const inputField = ref(null);
  const catField = ref(null);
  const editing = ref(false);
  const newCategory = reactive({
    category: "",
    color: "#0096FF",
  });

  const filteredSortedTodos = computed(() => {
    if (route?.params?.id === undefined) {
      const filtered = todos.value.sort((a, b) => b.id - a.id);
      return filtered;
    } else if (route?.params?.id === "completed") {
      const filtered = todos.value
        .filter((todo) => todo.isCompleted === true)
        .sort((a, b) => b.id - a.id);
      console.log(filtered);
      console.log(todos.value);
      return filtered;
    } else {
      const filtered = todos.value
        .filter((todo) => todo.category === route?.params?.id)
        .sort((a, b) => b.id - a.id);
      console.log(filtered);
      console.log(todos.value);
      return filtered;
    }
  });

  const getTodosAndCategories = () => {
    console.log(route?.params?.id);
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
  };
  const addTodo = () => {
    if (todo.value.length > 0 && typeof todo.value === "string") {
      const currentTimestamp = Date.now();
      const newTodo = {
        todo: todo.value,
        isCompleted: false,
        category: chosen.value === "" ? "none" : chosen.value,
        id: currentTimestamp,
      };
      set(firebaseRef(db, `${auth.currentUser.uid}/todos`), [
        ...todos.value,
        { ...newTodo },
      ]);
      chosen.value = "none";
      todo.value = "";
      isFocused.value = false;
      inputField.value.blur();
    } else {
      chosen.value = "none";
      todo.value = "";
      isFocused.value = false;
      inputField.value.blur();
    }
  };

  const addCategory = () => {
    if (
      catField.value.value.length > 0 &&
      typeof catField.value.value === "string"
    ) {
      alert(catField.value.value);
      const currentTimestamp = Date.now();
      set(firebaseRef(db, `${auth.currentUser.uid}/categories`), [
        ...categories.value,
        {
          color: newCategory.color,
          category: newCategory.category,
          id: currentTimestamp,
        },
      ]);
      newCategory.category = "";
      newCategory.color = "#0096FF";
      editing.value = false;
    }
  };

  return {
    todos,
    categories,
    chosen,
    todo,
    isFocused,
    editing,
    inputField,
    newCategory,
    catField,
    filteredSortedTodos,
    getTodosAndCategories,
    addTodo,
    addCategory,
  };
});
