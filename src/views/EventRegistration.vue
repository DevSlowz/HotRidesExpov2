<template>
    <div class="flex justify-center items-center h-screen">
      <div class="bg-white rounded-lg shadow-lg p-8 w-96">
        <h1 class="text-2xl font-bold mb-4 text-center">Event Registration</h1>
        <form @submit="submitRegistration">
          <div class="space-y-4">
            <div class="flex justify-center">
              <input v-model="firstName" type="text" placeholder="First Name" class="w-64 bg-gray-100 p-2 rounded" required>
            </div>
            <div class="flex justify-center">
              <input v-model="lastName" type="text" placeholder="Last Name" class="w-64 bg-gray-100 p-2 rounded" required>
            </div>
            <div class="flex justify-center">
                <label for="tshirt-size">T-Shirt Size:</label>
            </div>
            <div class="flex justify-center">
              <select v-model="tshirtSize" id="tshirt-size" class="w-64 bg-gray-100 p-2 rounded">
                <option value="small">Small</option>
                <option value="medium">Medium</option>
                <option value="large">Large</option>
              </select>
            </div>
            <div class="flex justify-center">
                <label for="club-membership">Club Membership:</label>
            </div>
            <div class="flex justify-center">
              <select v-model="clubMembership" id="club-membership" class="w-64 bg-gray-100 p-2 rounded">
                <option value="basic">Basic</option>
                <option value="premium">Premium</option>
                <option value="vip">VIP</option>
              </select>
            </div>
            <div class="flex justify-center">
                <label for="event-date">Event Date:</label>
            </div>
            <div class="flex justify-center">
              <Datepicker class="" v-model="date"> {{ date }}</Datepicker>
            </div>
            <div class="flex justify-center">
                <label for="event-dropdown">Available Events:</label>
            </div>
            <div class="flex justify-center">
              <select v-model="selectedEvent" id="event-dropdown" class="w-64 bg-gray-100 p-2 rounded">
                <option value="event1">Event 1</option>
                <option value="event2">Event 2</option>
                <option value="event3">Event 3</option>
                <!-- Add more events as needed -->
              </select>
            </div>
            <div class="flex justify-center">
              <button type="submit" class="w-64 bg-red-500 hover-bg-red-800 text-white font-bold py-4 px-6 rounded">
                Register
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref } from 'vue';
  import Datepicker from '@vuepic/vue-datepicker';
  import '@vuepic/vue-datepicker/dist/main.css';
  
  const firstName = ref('');
  const lastName = ref('');
  const tshirtSize = ref('small');
  const clubMembership = ref('basic');
  const selectedEvent = ref('event1');
  
  const submitRegistration = () => {
    // Your registration logic here
    // You can access all the form values as ref variables (e.g., firstName.value, lastName.value, etc.)
  };
  </script>
  
  <style>
  /* add any additional styles here */
  </style>
  