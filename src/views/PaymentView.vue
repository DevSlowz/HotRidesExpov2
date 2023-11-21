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
        <button @click="purchase" class="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-700">
          Purchase
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue';
import store from "../stores/index";
import { supabase } from "../lib/supabaseClient";

let registrationInfo = store.state.registrations[0];

// Load data from LocalStorage on component mount
onMounted(() => {
  const savedData = localStorage.getItem('registrationInfo');
  if (savedData) {
    registrationInfo = JSON.parse(savedData);
  }
  fetchUserData(); // Call fetchData on mounted
  fetchEventData();
});

const fetchedUser = ref(null);
const fetchedEvent = ref(null);
const today = new Date();
const formattedDate = `${today.getFullYear()}-${String(today.getMonth() + 1).padStart(2, '0')}-${String(today.getDate()).padStart(2, '0')}`;

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

// Assuming 'userEmail' needs to be used as a filter value for a column 'Email' in the 'Events' table
const userEmail = store.state["user"]["email"]; // Corrected to obtain email without JSON.stringify

const fetchUserData = async () => {
  let { data, error } = await supabase
    .from('Users') // Corrected table name to 'Events'
    .select('UserID') // You may specify here the exact columns you need
    .eq('Email', userEmail); // Correct usage of eq() to compare 'Email' column with 'userEmail'
  if (error) {
    console.log('Error fetching events: ', error);
  } else {
    console.log('Fetched events: ', data[0].UserID)
    fetchedUser.value = data[0].UserID // Logs the fetched events to the console
    console.log(fetchedUser.value)
  }
};

const fetchEventData = async () => {
  let { data, error } = await supabase
    .from('Event') // Correct the table name to 'Events' (plural)
    .select('event_id') // Add the columns you want to retrieve
    .eq('event_name', selectedEvent.value)
  if (error) {
    console.log('Error fetching events 2: ', error)
  } else {
    // console.log('Fetched events 2: ', data[0].event_id) // This line logs the fetched events to the console
    // console.log(selectedEvent.value)
    fetchedEvent.value = data[0].event_id
  }
};

const purchase = async () => {
  // Ensure that both fetchedUser and fetchedEvent have valid values
  if (fetchedUser.value && fetchedEvent.value) {
    const paymentData = {
      payment_date: formattedDate,
      payment_type: 'eventRegistration',
      payment_method: 'Credit',
      payment_amount: '100',
    };
    // Insert the payment data into the 'Payment' table
    const { data: paymentResult, error: paymentError } = await supabase.from('Payment').insert([paymentData]);
    if (paymentError) {
      console.error('Error inserting payment: ', paymentError);
    } else if (paymentResult && paymentResult.length > 0) {
      const paymentId = paymentResult[0].id; // Replace 'id' with your actual payment ID column name
      // Prepare and insert the registration data
      const registrationData = {
        UserID: fetchedUser.value, // Replace 'UserID' with your actual User ID column name
        EventID: fetchedEvent.value, // Replace 'EventID' with your actual Event ID column name
        PaymentID: paymentId, // Replace 'PaymentID' with your actual Payment ID column name
        registration_date: formattedDate
      };
      const { data: registrationResult, error: registrationError } = await supabase.from('Registration').insert([registrationData]);
      if (registrationError) {
        console.error('Error inserting registration: ', registrationError);
      } else {
        console.log('Registration successful', registrationResult);
        // Handle successful registration here, such as redirecting to a confirmation page
      }
    }
  } else {
    console.error('User or Event data is not available for registration.');
  }
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