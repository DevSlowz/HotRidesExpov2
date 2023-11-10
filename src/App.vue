<template>
  <div v-if="appReady" class="min-h-full font-Poppins box-border">
    <Navigation />
    <router-view />
  </div>
</template>

<script>
import Navigation from "./components/Navigation.vue";
import { ref } from "vue";
import { supabase } from "./lib/supabaseClient";

import store from "./stores/index";

export default {
  components: {
    Navigation,
  },
  setup() {
    // Create data / vars
    const appReady = ref(null);

    // Check to see if user is already logged in
    const user = supabase.auth.getUser();

    // Runs when there is an auth state change
    // if user is logged in, this will fire
    supabase.auth.onAuthStateChange((_, session) => {
      if (!user) {
        console.log("Logged In");
      }
      store.methods.setUser(session);
      appReady.value = true;
    });

    return { appReady };
  },
};
</script>
