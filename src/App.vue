<script setup>
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { onMounted } from "vue";
import { RouterView } from "vue-router";

let auth;
onMounted(() => {
  auth = getAuth();
  onAuthStateChanged(auth, (user) => {
    if (user) {
      console.log(user);
    } else {
      console.log("***", user);
    }
  });
});
</script>

<template>
  <RouterView />
</template>

<style scoped></style>
