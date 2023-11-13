<template>
    <div class="min-h-screen flex flex-col">
      <div class="flex justify-between p-4">
        <button @click="goBack" class="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">Back</button>
      </div>
      <div class="flex  justify-center flex-grow">
        <div class="bg-white shadow-md rounded-lg w-full max-w-screen-xl">
          <table class="min-w-full">
            <thead>
              <tr>
                <th class="px-4 py-2">Make</th>
                <th class="px-4 py-2">Model</th>
                <th class="px-4 py-2">Year</th>
                <th class="px-4 py-2">License Plate</th>
              </tr>
            </thead>
            <tbody>
              <!-- Table rows go here -->
            </tbody>
          </table>
        </div>
      </div>
      <div class="flex justify-end p-4">
        <button class="bg-green-500 text-white px-4 py-2 rounded mr-2 hover:bg-green-600">Add</button>
        <button class="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600">Remove</button>
      </div>
    </div>
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
      const vehicleList = () => {
        router.push({ name: "vehicleList" });
      };
      return { vehicleList, user };
    },
    methods: {
        goBack() {
      // You can use Vue Router's $router to navigate back
        this.$router.go(-1);
      // Or if you're not using Vue Router, you can use window.history.back()
      // window.history.back();
        }   
    }
  };
  </script>
  
  <style scoped>
  /* Add any additional styling here if needed */
  </style>
  