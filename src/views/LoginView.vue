<script setup>
import IconDetailed from "../components/icons/IconDetailed.vue";
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
        <input type="email" name="email" id="email" placeholder="Email" />
        <input
          type="password"
          name="password"
          id="password"
          placeholder="Password"
        />
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
/* Mobile first design*/
main {
  width: 100vw;
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
  max-width: 35rem;
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
  gap: 0.75rem;
}

.header h1 {
  font-size: 2.5rem;
  color: rgb(39, 39, 43);
}

.header p {
  font-size: 1.25rem;
  color: rgb(97, 104, 112);
}

.fields {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.fields input,
.fields button {
  border: 1px solid rgb(97, 104, 112, 0.7);
  border-radius: 5px;
  font-size: 1.5rem;
  padding: 1rem;
}

.fields input:focus {
  outline: 2px solid #008ffd;
}

.fields button {
  background-color: #27272b;
  color: white;
  font-size: 1.25rem;
  font-weight: 700;
}

.help {
  font-size: 1.5rem;
}

.help p {
  font-weight: 300;
}

.special {
  color: #008ffd;
  font-weight: 300;
}
</style>
