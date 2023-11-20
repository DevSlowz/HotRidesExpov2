<template>
    <div class="min-h-screen flex flex-col">
      <div class="flex justify-between p-4">
        <button @click="goBack" class="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">Back</button>
      </div>
      <div class="flex  justify-center flex-grow">
        <div class="bg-white shadow-md rounded-lg w-full max-w-screen-xl">
          <table class="min-w-full">
            <thead>
              <tr>
                <th class="px-4 py-2">Make</th>
                <th class="px-4 py-2">Model</th>
                <th class="px-4 py-2">Year</th>
                <th class="px-4 py-2">License Plate</th>
              </tr>
            </thead>
            <tbody>
              <!-- Table rows go here -->
            </tbody>
          </table>
        </div>
      </div>
      <div class="flex justify-end p-4">
        <button @click="showModal = true" class="bg-green-500 text-white px-4 py-2 rounded mr-2 hover:bg-green-600">Add</button>
        <button class="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600">Remove</button>
      </div>
      <div v-if="showModal" class="modal-overlay">
      <div class="modal">
        <button @click="closeModal" class="exit-button">&times;</button>
        <form @submit.prevent="addVehicle">
          <input v-model="newVehicle.make" type="text" placeholder="Make">
          <input v-model="newVehicle.model" type="text" placeholder="Model">
          <input v-model="newVehicle.year" type="text" placeholder="Year">
          <input v-model="newVehicle.license" type="text" placeholder="License">
          <button class="submit-button" type="submit">Submit</button>
        </form>
      </div>
    </div>
  </div>
</template>
  
  
<script>
import store from "../stores/index";
import { computed, ref } from "vue";
import { supabase } from "../lib/supabaseClient";
import { useRouter } from "vue-router";

export default {
  setup() {
    const user = computed(() => store.state.user);
    const showModal = ref(false);
    const newVehicle = ref({ make: "", model: "", year: "", license: "" });
    const router = useRouter();

    const vehicleList = () => {
      router.push({ name: "vehicleList" });
    };

    const addVehicle = async () => {
      // Add your logic to add the vehicle
      showModal.value = false;
    };

    const closeModal = () => {
      showModal.value = false;
    };

    return { vehicleList, user, newVehicle, addVehicle, showModal, closeModal };
  },
  methods: {
    goBack() {
      this.$router.go(-1);
    },
  },
};
</script>

<style scoped>
/* Add any additional styling here if needed */

.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000; /* Ensure it appears above everything else */
}

.modal {
  background: white;
  padding: 25px;
  border-radius: 10px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  position: relative;
}

.exit-button {
  position: absolute;
  top: 5px;
  right: 10px;
  font-size: 20px;
  background: none;
  border: none;
  cursor: pointer;
  color: #e30b0b;
}

.submit-button {
  margin-left: 10px; /* Adjust the left margin as needed */
}

</style>
  