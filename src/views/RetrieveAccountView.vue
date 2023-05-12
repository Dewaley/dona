<script setup>
import IconDetailed from "../components/icons/IconDetailed.vue";
</script>

<template>
  <main>
    <IconDetailed />
    <form>
      <div class="header">
        <h1>Request new password</h1>
        <p>
          To reset your password, please enter the email address of your Dona
          account.
        </p>
      </div>
      <div class="fields">
        <input type="email" name="email" id="email" placeholder="Email" />
        <button>Reset password</button>
      </div>
      <span class="special">Log in</span>
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
  font-size: 1.75rem;
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
  font-weight: 400;
  cursor: pointer;
}

.special {
  color: #008ffd;
  font-weight: 300;
  font-size: 1rem;
}
</style>
