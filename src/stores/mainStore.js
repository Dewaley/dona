import { defineStore } from "pinia";
import { ref } from "vue";

export const useMainStore = defineStore("mainStore", () => {
  const todos = ref([]);
  const categories = ref([]);

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
});
