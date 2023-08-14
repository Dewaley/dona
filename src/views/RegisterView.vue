<script setup>
import IconDetailed from "../components/icons/IconDetailed.vue";
import { auth } from "../firebaseConfig";
import { ref } from "vue";
import { onAuthStateChanged } from "firebase/auth";
import { useRouter } from "vue-router";
import axios from "axios";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";

const name = ref("");
const email = ref("");
const password = ref("");
const passwordError = ref("");

const error = ref(null);

const Router = useRouter();

const isValidPassword = (password) => {
  const trimmedPassword = password.trim();
  return trimmedPassword.length >= 6;
};

const Register = () => {
  console.log(email.value, password.value);
  if (!isValidPassword(password.value)) {
    passwordError.value = "Password should be at least 6 characters long";
    console.log(passwordError.value);
    setTimeout(() => {
      passwordError.value = "";
    }, 5000);
  } else {
    createUserWithEmailAndPassword(getAuth(), email.value, password.value)
      .then(() => {
        console.log("Successfuly registered!");
        Router.push("/login");
      })
      .catch((err) => {
        error.value = err.message;
      });
  }
};
</script>

<template>
  <main>
    <IconDetailed />
    <form @submit.prevent="Register">
      <div class="header">
        <h1>Sign up</h1>
        <p>Create an account and start using Dona.</p>
      </div>
      <div class="fields">
        <p class="error" v-if="passwordError !== ''">{{ passwordError }}</p>
        <input
          type="email"
          name="email"
          id="email"
          placeholder="Email"
          v-model="email"
          required
        />
        <input
          type="password"
          name="password"
          id="password"
          placeholder="Password"
          v-model="password"
        />
        <button type="submit">Sign up</button>
      </div>
      <div class="help">
        <p class="special">Forgot your password?</p>
        <p>Do you have an account? <span class="special">Log in</span></p>
      </div>
    </form>
  </main>
</template>

<style scoped>
/* Mobile first design*/
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
  outline: transparent;
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

.error {
  color: red;
  text-align: center;
}

.special {
  color: #008ffd;
  font-weight: 300;
}
</style>
