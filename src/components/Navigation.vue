<template>
    <header class="bg-rose-600 text-white">
      <nav class="container py-5 px-4 flex flex-col gap-4 items-center sm:flex-row">
        <div class="flex items-center gap-x-4">
            <h1 class="text-white text-2xl font-bold">HotRidesExpo</h1>
        </div>
        <ul class="flex flex-1 justify-end gap-x-10">
          <router-link class="cursor-pointer" :to="{ name: 'Home' }">Home</router-link>
          <router-link v-if="user" class="cursor-pointer" :to="{ name: 'homePage' }">Main Page</router-link>
          <router-link v-if="!user" class="cursor-pointer" :to="{ name: 'Login' }"
            >Login</router-link
          >
          <li v-if="user" @click="logout" class="cursor-pointer">Logout</li>
        </ul>
      </nav>
    </header>
  </template>

<script>
import store from "../stores/index";
import { computed } from "vue";
import { supabase } from "../lib/supabaseClient";
import { useRouter } from "vue-router";
export default {
  setup() {
    // Get user from store
    const user = computed(() => store.state.user);
    console.log("User From Store : " + user.value)


    // Setup ref to router
    const router = useRouter();

    // Logout function
    const logout = async () => {
      await supabase.auth.signOut();
      router.push({ name: "Home" });
    };

    return { logout, user };
  },
};
</script>