<script setup>
import IconDetailed from "../components/icons/IconDetailed.vue";
import { reactive, ref } from "vue";
import { EyeIcon, EyeSlashIcon } from "@heroicons/vue/20/solid";

const data = reactive({
  email: "Bastard",
  password: "",
});

const alertMessage = () => {
  console.log(data.email);
};

const showPassword = ref(false);
</script>

<template>
  <main>
    <IconDetailed />
    <form>
      <div class="header">
        <h1>Log in</h1>
        <p>Sign in if you already have an account.</p>
      </div>
      <div class="fields">
        <input
          type="email"
          name="email"
          id="email"
          placeholder="Email"
          v-model="data.email"
        />
        <div class="passwordContainer">
          <input
            :type="showPassword ? 'text' : 'password'"
            name="password"
            id="password"
            placeholder="Password"
            v-model="data.password"
          />
          <EyeIcon
            class="eyeIcon"
            v-if="showPassword"
            @click="showPassword = false"
          />
          <EyeSlashIcon class="eyeIcon" v-else @click="showPassword = true" />
        </div>
        <button>Sign in</button>
      </div>
      <div class="help">
        <p class="special">Forgot your password?</p>
        <p>
          Don't have an account? <span class="special">Sign up for free</span>
        </p>
      </div>
    </form>
  </main>
</template>

<style scoped>
/* Mobile-first design*/
main {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 4rem;
  background-color: rgb(236, 238, 239);
  padding: 4rem 0;
}

form {
  background-color: white;
  width: 85vw;
  max-width: 24rem;
  border-radius: 20px;
  padding: 2rem;
  display: flex;
  flex-direction: column;
  gap: 3rem;
}

.header,
.help {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  width: 100%;
}

.header h1 {
  font-size: 2rem;
  font-weight: 500;
  color: rgb(39, 39, 43);
}

.header p {
  font-size: 1rem;
  color: rgb(97, 104, 112);
}

.fields {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  width: 100%;
}

.fields input,
.fields button {
  border: 1px solid rgb(97, 104, 112, 0.9);
  border-radius: 5px;
  font-size: 1rem;
  padding: 0.5rem;
  outline: 2px solid transparent;
}

.passwordContainer {
  border: 1px solid rgb(97, 104, 112, 0.9);
  border-radius: 5px;
  display: flex;
  align-items: center;
  position: relative;
  overflow: hidden;
}

.passwordContainer:focus-within {
  outline: 2px solid #008ffd;
  border: 1px solid transparent;
}

.passwordContainer input {
  width: calc(100% - 2rem);
  border: 1px solid transparent;
}

.passwordContainer input:focus {
  outline: 2px solid transparent;
  border: transparent;
  width: calc(100% - 2rem);
}

.eyeIcon {
  height: 2rem;
  width: 2rem;
  padding: 0.5rem;
  cursor: pointer;
}

.fields input:focus {
  outline: 2px solid #008ffd;
  border: transparent;
}

.fields button {
  background-color: #27272b;
  color: white;
  font-size: 1rem;
  font-weight: 500;
  cursor: pointer;
}

.help {
  font-size: 1rem;
  width: 100%;
}

.help p {
  font-weight: 300;
}

.special {
  color: #008ffd;
  font-weight: 300;
}
</style>
