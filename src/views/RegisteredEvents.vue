<template>
  <div class="flex flex-col h-full bg-gray-100">
    <div class="p-6 shadow-md bg-white">
      <div class="flex items-center justify-between">
        <button @click="goBack" class="text-white bg-blue-500 hover:bg-blue-600 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-3 md:mr-0">
          Back
        </button>
        <h2 class="text-xl font-semibold text-gray-800">Registered Events</h2>
        <span></span> <!-- Empty spacer element to help center the title -->
      </div>
    </div>
    <div class="flex-grow p-6 overflow-auto">
      <div class="container mx-auto">
        <table class="w-full bg-white rounded-lg shadow-lg table-auto">
          <thead class="bg-gray-50 border-b-2 border-gray-200">
            <tr>
              <th class="px-6 py-3 text-sm font-semibold text-gray-600 uppercase tracking-wider whitespace-nowrap">Event Name</th>
              <th class="px-6 py-3 text-sm font-semibold text-gray-600 uppercase tracking-wider whitespace-nowrap">Date</th>
              <th class="px-6 py-3 text-sm font-semibold text-gray-600 uppercase tracking-wider whitespace-nowrap">Location</th>
              <th class="px-6 py-3 text-sm font-semibold text-gray-600 uppercase tracking-wider whitespace-nowrap">Description</th>
            </tr>
          </thead>
          <tbody class="divide-y divide-gray-200">
            <tr v-for="(event, index) in registeredEvents" :key="index">
              <td class="px-6 py-4 whitespace-nowrap text-gray-700">{{ event.name }}</td>
              <td class="px-6 py-4 whitespace-nowrap text-gray-700">{{ event.date }}</td>
              <td class="px-6 py-4 whitespace-nowrap text-gray-700">{{ event.location }}</td>
              <td class="px-6 py-4 whitespace-nowrap text-gray-700">{{ event.description }}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>
  
<script>
import { ref } from 'vue';
import store from "../stores/index";
import { supabase } from "../lib/supabaseClient"; // Use the correct path to your Supabase client
export default {
  data() {
    return {
      userEmail: store.state["user"]["email"], // You should set this appropriately
      registeredEvents: [],
      fetchedUser: null, // Initialize as null instead of ref
    };
  },
  methods: {
    goBack() {
      this.$router.go(-1);
    },
    async fetchUserData() {
      let { data, error } = await supabase
        .from('Users')
        .select('UserID')
        .eq('Email', this.userEmail);
      if (error) {
        console.error('Error fetching user data: ', error);
      } else if (data && data.length > 0) {
        this.fetchedUser = data[0].UserID; // Use `this` to set data properties
        this.fetchRegisteredEvents(); // Fetch events after fetching user data
      } else {
        console.error('No user data found for the provided email.');
      }
    },
    async fetchRegisteredEvents() {
      if (this.fetchedUser) {
        try {
          const { data, error } = await supabase
            .from('Registration')
            .select(`
              event_id (
                event_name,
                event_date,
                event_location,
                event_desc
              )
            `)
            .eq('UserID', this.fetchedUser);
          if (error) {
            throw error;
          }
          this.registeredEvents = data.map(registration => ({
            name: registration.event_id.event_name,
            date: registration.event_id.event_date,
            location: registration.event_id.event_location,
            description: registration.event_id.event_desc,
          }));
        } catch (error) {
          console.error('Error fetching registered events:', error);
        }
      } else {
        console.error('User ID not available');
      }
    }
  },
  created() {
    this.fetchUserData(); // Fetch user data when the component is created
  }
};
</script>