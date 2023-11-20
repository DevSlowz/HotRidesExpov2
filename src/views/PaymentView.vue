<template>
  <div class="container mx-auto p-8">
    <div class="bg-white p-8 rounded shadow-md">
      <h2 class="text-2xl font-bold mb-4">Receipt</h2>
      <div class="grid grid-cols-2 gap-4">
        <div class="receipt-item">
          <span class="font-bold">First Name:</span> {{ firstName }}
        </div>
        <div class="receipt-item">
          <span class="font-bold">Last Name:</span> {{ lastName }}
        </div>
        <div class="receipt-item">
          <span class="font-bold">T-Shirt Size:</span> {{ tshirtSize }}
        </div>
        <div class="receipt-item">
          <span class="font-bold">Club Membership:</span> {{ clubMembership }}
        </div>
        <div class="receipt-item">
          <span class="font-bold">Selected Event:</span> {{ selectedEvent }}
        </div>
        <div class="receipt-item">
          <span class="font-bold">Event Date:</span> {{ eventDate }}
        </div>
      </div>
      <div class="mt-8">
        <button class="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-700">
          Purchase
        </button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      firstName: "Matthew",
      lastName: "Vieira",
      tshirtSize: "small",
      clubMembership: "basic",
      selectedEvent: "event1",
      eventDate: "2023-11-09T15:13:00.000Z",
    };
  },
};
</script>

<style scoped>
.receipt {
  /* Add any additional styling for the receipt container if needed */
}

.receipt-item {
  border-bottom: 1px solid #ccc;
  padding: 2px 0;
}

/* Add any additional styling as needed */
</style>

  
  <script setup>
  import { ref, onMounted, onUnmounted } from 'vue';
  import store from "../stores/index";
  
  let registrationInfo = store.state.registrations[0];
  
  // Load data from LocalStorage on component mount
  onMounted(() => {
    const savedData = localStorage.getItem('registrationInfo');
    if (savedData) {
      registrationInfo = JSON.parse(savedData);
    }
  });
  
  // Save data to LocalStorage on component unmount
  onUnmounted(() => {
    localStorage.setItem('registrationInfo', JSON.stringify(registrationInfo));
  });
  
  const firstName = ref(registrationInfo.firstName);
  const lastName = ref(registrationInfo.lastName);
  const tshirtSize = ref(registrationInfo.tshirtSize);
  const clubMembership = ref(registrationInfo.clubMembership);
  const selectedEvent = ref(registrationInfo.selectedEvent);
  const eventDate = ref(registrationInfo.eventDate);
  
  console.log('Print out test : ' + JSON.stringify(registrationInfo));
  </script>
  
  <style>
  /* Add your styles here */
  </style>