<script setup>
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { onMounted } from "vue";
import { RouterView } from "vue-router";

let auth;
</script>

<template>
  <RouterView />
</template>

<style scoped></style>
