<template>
  <div class="p-8 bg-gray-100 min-h-screen">
	<h1 class="text-4xl font-bold text-center mb-10">Your Hosted Events</h1>
	<div class="max-w-4xl mx-auto">
	  <ul class="space-y-4">
		<li v-for="event in events" :key="event.id" class="bg-white p-6 rounded-lg shadow-lg hover:shadow-2xl transition-shadow">
		  <h2 class="text-2xl font-semibold">{{ event.event_name }}</h2>
		  <p>Date: {{ event.event_date }}</p>
		  <p>Location: {{ event.event_location }}</p>
		  <button @click="showParticipants(event)" class="mt-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
			View Participants
		  </button>
		</li>
	  </ul>
	</div>

	<transition name="fade">
	  <div v-if="showModal" class="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
		<div class="bg-white p-8 rounded-lg shadow-2xl">
		  <h3 class="font-bold text-lg">Total Registered Users: {{ participantCount }}</h3>
		  <button @click="showModal = false" class="mt-4 bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded">
			Close
		  </button>
		</div>
	  </div>
	</transition>
  </div>
</template>

<script>
import { ref } from 'vue';
import { supabase } from '../../lib/supabaseClient';
import store from "./../../stores/index";
export default {
  data() {
	return {
	  events: [],
	  participantCount: 0,
	  showModal: false,
	};
  },
  async created() {
	await this.fetchHostedEvents();
  },
  methods: {
	async fetchHostedEvents() {
	  try {
		let { data: users, error } = await supabase
		  .from('Users')
		  .select('UserID')
		  .eq('Email', store.state.user.email);
		if (error) throw error;
		if (users.length === 0) {
		  console.error('User not found');
		  return;
		}
		const userId = users[0].UserID;
		let { data: events, error: eventsError } = await supabase
		  .from('Event')
		  .select('*')
		  .eq('event_host', userId);
		if (eventsError) throw eventsError;
		this.events = events;
	  } catch (error) {
		console.error('Error fetching hosted events or user ID:', error);
	  }
	},
	async showParticipants(event) {
	  await this.fetchParticipantCount(event.event_id);
	  this.showModal = true;
	},
	async fetchParticipantCount(eventId) {
	  try {
		let { data, error, count } = await supabase
		  .from('Registration')
		  .select('*', { count: 'exact' })
		  .eq('event_id', eventId);

		if (error) throw error;

		// Log to debug the received data
		console.log(data);

		// Assign the participant count if the `count` is available in the response
		this.participantCount = count;
		console.log("Participant Count: ", this.participantCount);
	  } catch (error) {
		console.error('Error fetching participant count:', error);
	  }
	},
  },
};
</script>


<style>
.fade-enter-active, .fade-leave-active {
  transition: opacity 0.5s ease;
}
.fade-enter-from, .fade-leave-to {
  opacity: 0;
}
</style>
