<template>
    <div class=" bg-gray-300 flex items-center h-full text-center">
        <button @click="goBack" class="bg-red-500 hover:bg-red-700 text-white font-bold p-2 rounded-full">
            Back
        </button>
        <h2 class="text-2xl font-semibold mb-4 mx-auto">Registered Events</h2>
    </div>
    <div>
      <div class="bg-white p-6 rounded-lg">
        <table class="min-w-full">
          <thead>
            <tr>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Event Name</th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Payment Amount</th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Payment Type</th>
            </tr>
          </thead>
          <tbody>
            <!-- Use v-for to loop through your registered events data -->
            <tr v-for="(event, index) in registeredEvents" :key="index">
              <td class="px-6 py-4 whitespace-nowrap">{{ event.name }}</td>
              <td class="px-6 py-4 whitespace-nowrap">{{ event.date }}</td>
              <td class="px-6 py-4 whitespace-nowrap">{{ event.paymentAmount }}</td>
              <td class="px-6 py-4 whitespace-nowrap">{{ event.paymentType }}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </template>
  
  
  
  <script>
  export default {
    data() {
      return {
        registeredEvents: [
          // Replace with your actual registered events data
          { name: 'Event 1', date: '2023-01-15', paymentAmount: 50, paymentType: 'Credit Card' },
          { name: 'Event 2', date: '2023-02-20', paymentAmount: 30, paymentType: 'PayPal' },
          // Add more event objects as needed
        ],
      };
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
  