<template>
	<button @click="goBack" class="mb-4 text-sm font-semibold text-blue-700 hover:text-blue-800">← Back</button>
  <div class="flex items-center justify-center min-h-screen bg-gray-100">
    <div class="w-full max-w-md bg-white rounded-xl shadow-lg p-6 space-y-8">
      <h2 class="text-3xl font-bold text-center text-gray-900">Host an Event</h2>
		
      <form @submit.prevent="submitEvent" class="space-y-6">
        <div class="text-center">
          <label for="event_name" class="block text-gray-700 font-medium">Event Name</label>
          <input type="text" id="event_name" v-model="eventForm.event_name" placeholder="Your event name" class="w-full px-4 py-2 mt-1 border rounded-lg focus:ring-blue-500 focus:border-blue-500" required>
        </div>
        <div class="text-center">
          <label for="event_date" class="block text-gray-700 font-medium">Event Date</label>
          <input type="date" id="event_date" v-model="eventForm.event_date" class="w-full px-4 py-2 mt-1 border rounded-lg focus:ring-blue-500 focus:border-blue-500" required>
        </div>
        <div class="text-center">
          <label for="event_location" class="block text-gray-700 font-medium">Event Location</label>
          <input type="text" id="event_location" v-model="eventForm.event_location" placeholder="City, Country" class="w-full px-4 py-2 mt-1 border rounded-lg focus:ring-blue-500 focus:border-blue-500" required>
        </div>
		  <div class="text-center">
			<label for="event_location" class="block text-gray-700 font-medium">Event Price</label>
			<input type="text" id="event_location" v-model="eventForm.event_price" placeholder="$$$" class="w-full px-4 py-2 mt-1 border rounded-lg focus:ring-blue-500 focus:border-blue-500" required>
		  </div>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div class="text-center">
            <label for="event_start_time" class="block text-gray-700 font-medium">Start Time</label>
            <input type="time" id="event_start_time" v-model="eventForm.event_start_time" class="w-full px-4 py-2 mt-1 border rounded-lg focus:ring-blue-500 focus:border-blue-500" required>
          </div>
          <div class="text-center">
            <label for="event_end_time" class="block text-gray-700 font-medium">End Time</label>
            <input type="time" id="event_end_time" v-model="eventForm.event_end_time" class="w-full px-4 py-2 mt-1 border rounded-lg focus:ring-blue-500 focus:border-blue-500" required>
          </div>
        </div>
        <div class="text-center">
          <label for="event_desc" class="block text-gray-700 font-medium">Event Description</label>
          <textarea id="event_desc" v-model="eventForm.event_desc" class="w-full px-4 py-2 mt-1 border rounded-lg focus:ring-blue-500 focus:border-blue-500 h-28 resize-none" placeholder="Write a few lines about the event..."></textarea>
        </div>
        <div class="text-center">
          <button type="submit" class="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded">
            Create Event
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import { supabase } from '../../lib/supabaseClient';
import store from "./../../stores/index";
export default {
  setup() {
	const router = useRouter();
	const eventForm = ref({
	  event_name: '',
	  event_date: '',
	  event_location: '',
	  event_start_time: '',
	  event_end_time: '',
	  event_desc: '',
	  event_price: ''
	});
	const user = ref(null);
	const fetchUser = async () => {
	  try {
		const fetchedUser = await store.methods.setRealUser(store.state.user.email);
		return fetchedUser;
	  } catch (error) {
		console.error("An error occurred while fetching the user:", error);
	  }
	};
	const goBack = () => {
	  router.back();
	};
	const submitEvent = async () => {
	  if (!user.value) {
		user.value = await fetchUser();
	  }
	  if (user.value) {
		const { data, error } = await supabase
		  .from('Event')
		  .insert([{
			event_name: eventForm.value.event_name,
			event_date: eventForm.value.event_date,
			event_location: eventForm.value.event_location,
			event_start_time: eventForm.value.event_start_time,
			event_end_time: eventForm.value.event_end_time,
			event_desc: eventForm.value.event_desc,
			event_price: eventForm.value.event_price,
			event_host: user.value.UserID,
		  }]);
		if (error) {
		  alert("An error occurred while creating the event: " + error.message);
		} else {
		  alert("Event created successfully!");
		  // Redirect or do something upon success, e.g., router.push('/events');
		}
	  }
	};
	onMounted(async () => {
	  user.value = await fetchUser();
	});
	return { eventForm, user, submitEvent, goBack };
  }
};
</script>


<style scoped>
/* Scoped style for this component (if necessary) */
/* Existing styles... */
.submit-event-btn {
  @apply bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded;
  transition: background-color 200ms ease-in-out;
}

.submit-event-btn:hover {
  @apply bg-red-600;
}
</style>
