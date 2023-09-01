import { defineStore } from "pinia";
import { ref, computed, reactive } from "vue";
import { useRoute } from "vue-router";
import { ref as firebaseRef, onValue, set, remove } from "firebase/database";
import { auth, db } from "../../main";

export const useMainStore = defineStore("mainStore", () => {
  const route = useRoute();
  const todos = ref([]);
  const date = ref(null);
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
    onValue(
      firebaseRef(db, `/${auth.currentUser.uid}/categories`),
      (snapshot) => {
        const data = snapshot.val();
        // console.log(data);
        categories.value = data;
      }
    );
    onValue(
      firebaseRef(db, `/${auth.currentUser.uid}/categories/2`),
      (snapshot) => {
        const data = snapshot.val();
        console.log(data);
      }
    );
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
  };
  const addTodo = () => {
    // console.log(new Date(date.value.toString()));
    if (todo.value.length > 0 && typeof todo.value === "string") {
      const currentTimestamp = Date.now();
      const newTodo = {
        todo: todo.value,
        isCompleted: false,
        category: chosen.value === "" ? "none" : chosen.value,
        deadline: date.value === null ? "none" : date.value.toString(),
        id: currentTimestamp,
      };
      console.log(newTodo);
      set(firebaseRef(db, `${auth.currentUser.uid}/todos`), [
        ...todos.value,
        { ...newTodo },
      ]);
      chosen.value = "none";
      todo.value = "";
      isFocused.value = false;
      inputField.value.blur();
      date.value = null;
    } else {
      chosen.value = "none";
      todo.value = "";
      isFocused.value = false;
      inputField.value.blur();
      date.value = null;
    }
  };

  const addCategory = () => {
    if (
      catField.value.value.length > 0 &&
      typeof catField.value.value === "string"
    ) {
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
  const findIndexOfCategory = (id) => {
    for (let i = 0; i <= categories.value.length; i++) {
      if (id === categories.value[i].id) {
        console.log(i);
        return i;
      }
    }
    return -1;
  };
  const deleteCategory = async (id) => {
    alert("clicked now");
    const fakeData = [];
    remove(
      firebaseRef(
        db,
        `${auth.currentUser.uid}/categories/${findIndexOfCategory(id)}`
      )
    );
    for (let i = 0; i <= categories.value.length; i++) {
      if (id !== categories.value[i].id) {
        fakeData.push(categories.value[i]);
      }
    }
    categories.value = [...fakeData];
  };

  return {
    todos,
    categories,
    chosen,
    todo,
    date,
    isFocused,
    editing,
    inputField,
    newCategory,
    catField,
    filteredSortedTodos,
    getTodosAndCategories,
    addTodo,
    addCategory,
    deleteCategory,
  };
});
