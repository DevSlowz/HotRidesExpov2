<template>
  <div class="max-w-screen-sm mx-auto px-4 py-10">
    <!-- Error Handling -->
    <div v-if="errorMsg" class="mb-10 p-4 rounded-md bg-light-grey shadow-lg">
      <p class="text-red-500">{{ errorMsg }}</p>
    </div>

    <!-- Login -->
    <form
      @submit.prevent="login"
      class="p-8 flex flex-col bg-light-grey rounded-md shadow-lg"
    >
      <h1 class="text-3xl text-at-light-black mb-4">Login</h1>

      <div class="flex flex-col mb-2">
        <label for="email" class="mb-1 ttext-at-light-black">Email</label>
        <input
          type="text"
          required
          class="p-2 text-gray-500 focus:outline-none"
          id="email"
          v-model="email"
        />
      </div>

      <div class="flex flex-col mb-2">
        <label for="password" class="mb-1 text-at-light-black">Password</label>
        <input
          type="password"
          required
          class="p-2 text-gray-500 focus:outline-none"
          id="password"
          v-model="password"
        />
      </div>

      <button
        type="submit"
        class="mt-6 py-2 px-6 rounded-sm self-start text-sm
      text-white bg-red-600 duration-200 border-solid
      border-2 border-transparent hover:border-at-light-green hover:bg-white
      hover:text-at-light-green"
      >
        Login
      </button>

      <router-link class="text-sm mt-6 text-center" :to="{ name: 'Register' }">
        Don't have an account? <span class="text-at-light-green">Register</span>
      </router-link>
    </form>
  </div>
</template>

<script>
import { ref } from "vue";
import { supabase } from "../lib/supabaseClient";
import { useRouter } from "vue-router";

export default {
  name: "login",
  setup() {
    // Create data / vars
    const router = useRouter();
    const email = ref(null);
    const password = ref(null);
    const errorMsg = ref(null);

    // Login function
    const login = async () => {
      try {
        const { error } = await supabase.auth.signInWithPassword({
          email: email.value,
          password: password.value,
        });
        if (error) throw error;
        router.push({ name: "Home" });
      } catch (error) {
        errorMsg.value = `Error: ${error.message}`;
        setTimeout(() => {
          errorMsg.value = null;
        }, 5000);
      }
    };

    return { email, password, errorMsg, login };
  },
};
</script>

<style scoped>
  .body {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100vh;
    background-image: url('/src/assets/images/loginBackground.png');
    background-size: cover;
    background-repeat: no-repeat;
    background-position: center;
  }
</style>