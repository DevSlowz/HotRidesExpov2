<template>
  <div class="flex justify-center items-center h-screen">
    <div class="bg-white rounded-lg shadow-lg p-8 w-96">
      <img class="logo" src="/src/assets/images/logo.svg" alt="Logo" />
      <h1 class="text-2xl font-bold mb-4 text-center">Event Registration</h1>
      <form @submit.prevent="submitForm">
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
            <Datepicker format="dd MMMM yyyy" class="" v-model="eventDate"> {{ eventDate.value }}</Datepicker>
          </div>
          <div class="flex justify-center" v-if="eventData && eventData.length > 0">
        <label for="event-dropdown">Available Events:</label>
      </div>
      <div class="flex justify-center" v-if="eventData && eventData.length > 0">
        <select v-model="selectedEvent" id="event-dropdown" class="w-64 bg-gray-100 p-2 rounded">
          <option v-for="event in eventData" :key="event.event_name" :value="event.event_name">
            {{ event.event_name }}
          </option>
        </select>
      </div>
      <div class="flex justify-center" v-if="!eventData || eventData.length === 0">
        No events available.
      </div>
          <div class="flex justify-center">
            <button type="submit" class="w-64 bg-red-500 hover-bg-red-800 text-white font-bold py-4 px-6 rounded">
              Pay
            </button>
          </div>
        </div>
      </form>
    </div>
  </div>
</template>

<!-- TODO: When a date is selected call database to view events and use v-for to loop through them and populate event section-->

<script setup>
import store from "../stores/index";
import { ref, watchEffect } from 'vue';
import { useRouter } from 'vue-router';
import Datepicker from '@vuepic/vue-datepicker';
import '@vuepic/vue-datepicker/dist/main.css';
import { supabase } from "../lib/supabaseClient";

const router = useRouter();
const firstName = ref('');
const lastName = ref('');
const tshirtSize = ref('small');
const clubMembership = ref('basic');
const selectedEvent = ref('event1');
const eventDate = ref('');
const eventData = ref(null);

const submitForm = () => {
const params = {
  firstName: firstName.value,
  lastName: lastName.value,
  tshirtSize: tshirtSize.value,
  clubMembership: clubMembership.value,
  selectedEvent: selectedEvent.value,
  eventDate: eventDate.value
};
store.methods.storeRegistration(params);


router.push({
  name: 'Payment',
  params: params
});
};

const fetchData = async () => {
  if (!eventDate.value) return; // Don't fetch data if eventDate is not set
  let eventDateFormatted = new Date(eventDate.value).toISOString().split('T')[0];
  console.log(eventDateFormatted)
  let { data, error } = await supabase
    .from('Event') // Correct the table name to 'Events' (plural)
    .select('event_name, event_date') // Add the columns you want to retrieve
    .eq('event_date', eventDateFormatted)
    console.log('Test 1 Fetched events: ', data)
  if (error) {
    console.log('Error fetching events: ', error)
  } else {
    console.log('Fetched events: ', data) // This line logs the fetched events to the console
    eventData.value = data
  }
    let eventNames = [];
    if (data[0]) {
        for (let key in data[0]) {
          if (key.startsWith('event_name')) {
            eventNames.push(data[0][key]);
          }
        }
    }
    console.log('Fetched events: ', data)
}

// Watch for changes in eventDate and fetch data accordingly
watchEffect(() => {
  fetchData();
});

</script>

<style>
/* add any additional styles here */
</style>
