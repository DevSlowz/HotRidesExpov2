<template>
    <div class="flex justify-center items-center h-screen">
      <div class="bg-white rounded-lg shadow-lg p-8 w-96"> <!-- Adjust the width as per your requirement -->
        <h1 class="text-2xl font-bold mb-4 text-center">Welcome to HotRidesExpo</h1>
        <div v-if="role === 'partcipant'" class="space-y-4">
          <div class="flex justify-center"> <!-- Center the button -->
            <button class="w-64 bg-red-500 hover:bg-red-800 text-white font-bold py-4 px-6 rounded"> <!-- Set a fixed width for all buttons -->
              Manage Users
            </button>
          </div>
          <div class="flex justify-center"> <!-- Center the button -->
            <button class="w-64 bg-red-500 hover:bg-red-800 text-white font-bold py-4 px-6 rounded"> <!-- Set a fixed width for all buttons -->
              Manage Rides
            </button>
          </div>
          <div class="flex justify-center"> <!-- Center the button -->
            <button class="w-64 bg-red-500 hover:bg-red-800 text-white font-bold py-4 px-6 rounded"> <!-- Set a fixed width for all buttons -->
              View Rides
            </button>
          </div>
          <div class="flex justify-center"> <!-- Center the button -->
            <button class="w-64 bg-red-500 hover:bg-red-800 text-white font-bold py-4 px-6 rounded"> <!-- Set a fixed width for all buttons -->
              Book a Ride
            </button>
          </div>
        </div>
      </div>
    </div>
  </template>
  
  
  <script>
  export default {
    data() {
      return {
        userType: 'admin' // replace with actual user type
      }
    }
  }
  </script>
  
  <style>
  /* add any additional styles here */
  </style>
  