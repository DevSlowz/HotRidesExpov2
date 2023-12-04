<template>
  <div class="flex justify-center items-center h-screen">
    <div class="bg-white rounded-lg shadow-lg p-8 w-96">
      <h1 class="text-2xl font-bold mb-4 text-center">Welcome to HotRidesExpo</h1>
      <div class="space-y-4">
        <div class="flex justify-center">
          <button @click="eventDetails" class="w-64 bg-red-500 hover:bg-red-800 text-white font-bold py-4 px-6 rounded">
            Event Details
          </button>
        </div>
        <div class="flex justify-center">
          <button @click="paymentDetails" class="w-64 bg-red-500 hover:bg-red-800 text-white font-bold py-4 px-6 rounded">
            Payment Details
          </button>
        </div>
        <div class="flex justify-center">
          <button @click="vehicleList" class="w-64 bg-red-500 hover:bg-red-800 text-white font-bold py-4 px-6 rounded">
            View Rides
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import store from "../stores/index";
import { computed } from "vue";
import { useRouter } from "vue-router";

export default {
  setup() {
    const user = computed(() => store.state.user);
    const router = useRouter();

    // Redirect host user type to HostDashboard
    if (user.value && user.value.type === 'Host') {
      router.push({ name: "HostDashboard" });
    }

    const eventDetails = () => {
      router.push({ name: "eventDetails" });
    };

    const paymentDetails = () => {
      router.push({ name: "paymentDetails" });
    };

    const vehicleList = () => {
      router.push({ name: "vehicleList" });
    };

    return { vehicleList, eventDetails, user, paymentDetails };
  },
};
</script>

<style>
/* add any additional styles here */
</style>