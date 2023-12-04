<template>
  <div class="flex justify-center items-center h-screen">
	<div class="bg-white rounded-lg shadow-lg p-8 w-96">
	  <h1 class="text-2xl font-bold mb-4 text-center">Welcome to HotRidesExpo</h1>
	  <div class="space-y-4">
		<div class="flex justify-center">
		  <button @click="hostEvent" class="w-64 bg-red-500 hover:bg-red-800 text-white font-bold py-4 px-6 rounded">
			Host Event
		  </button>
		</div>
		<div class="flex justify-center">
		  <button @click="viewEventDetails" class="w-64 bg-red-500 hover:bg-red-800 text-white font-bold py-4 px-6 rounded">
			Event Details
		  </button>
		</div>
		<div class="flex justify-center">
		  <button @click="viewFinancials" class="w-64 bg-red-500 hover:bg-red-800 text-white font-bold py-4 px-6 rounded">
			View Financials
		  </button>
		</div>
	  </div>
	</div>
  </div>
</template>

<script>
import { useRouter } from 'vue-router';

export default {
  name: 'HostDashboard',

  setup() {
    const router = useRouter();

    const hostEvent = () => {
      router.push({ name: 'EventCreate' });
    };

    const viewEventDetails = () => {
      router.push({ name: 'EventList' }); // name of your event list route
    };

    const viewFinancials = () => {
      router.push({ name: 'Financials' }); // name of your financials route
    };

    return {
      hostEvent,
      viewEventDetails,
      viewFinancials,
    };
  },
};
</script>

<style scoped>
/* Any additional scoped styles if required */
</style>