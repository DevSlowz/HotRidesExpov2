<template>
  <div class="min-h-screen flex flex-col">
    <div class="flex justify-between p-4">
      <button @click="goBack" class="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-700">Back</button>
    </div>
    <div class="flex justify-center flex-grow">
      <div class="bg-white shadow-md rounded-lg w-full max-w-4xl p-4">
        <table class="min-w-full">
          <thead class="bg-gray-100">
            <tr>
              <th class="text-left px-4 py-2">Make</th>
              <th class="text-left px-4 py-2">Model</th>
              <th class="text-left px-4 py-2">License Plate</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="vehicle in vehicles" :key="vehicle.vechicle_id" class="border-t">
              <td class="px-4 py-2">{{ vehicle.vechicle_make }}</td>
              <td class="px-4 py-2">{{ vehicle.vechicle_model }}</td>
              <td class="px-4 py-2">{{ vehicle.license_plate }}</td>
            </tr>
          </tbody>
        </table>
        <div v-if="vehicles.length === 0" class="text-center py-4">
          No vehicles found.
        </div>
      </div>
    </div>
    <div class="flex justify-end p-4">
      <button @click="showModal = true" class="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-700">Add Vehicle</button>
    </div>
    <div v-if="showModal" class="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
      <div class="bg-white rounded-lg p-8">
        <h2 class="text-lg mb-4">Add a New Vehicle</h2>
        <form @submit.prevent="addVehicle">
          <input v-model="newVehicle.make" type="text" placeholder="Make" class="p-2 border rounded mb-2 w-full">
          <input v-model="newVehicle.model" type="text" placeholder="Model" class="p-2 border rounded mb-2 w-full">
          <input v-model="newVehicle.license" type="text" placeholder="License Plate" class="p-2 border rounded mb-4 w-full">
          <button type="submit" class="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-700">Submit</button>
          <button @click="closeModal" type="button" class="ml-2 bg-gray-300 text-black px-4 py-2 rounded hover:bg-gray-400">Cancel</button>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import store from "../stores/index";
import { computed, ref, reactive, onMounted } from "vue";
import { supabase } from "../lib/supabaseClient";
import { useRouter } from "vue-router";
export default {
  setup() {
    const user = computed(() => store.state.user);
    const vehicles = ref([]);
    const showModal = ref(false);
    const newVehicle = reactive({ make: "", model: "", year: "", license: "" });
    const router = useRouter();
    console.log("User on Vehicle List: ", user.value);
    // Fetch the vehicles associated with the current user
    const fetchVehicles = async () => {
      if (user.value) {
        const userEmail = user.value.email;
        const currentUser = await store.methods.setRealUser(userEmail)
        console.log("Current User From Vehicle: ", currentUser.UserID)
        const { data, error } = await supabase
          .from("Vehicle")
          .select("*")
          .eq("user_id", currentUser.UserID);
        if (error) {
          console.error('Error fetching vehicles:', error);
        } else {
          vehicles.value = data;
        }
      }
    };
    onMounted(() => {
      fetchVehicles();
    });
    // Add a new vehicle to the database
    const addVehicle = async () => {
      if (user.value) {
        const userEmail = user.value.email;
        const { data: currentUser, error: userError } = await store.methods.setRealUser(userEmail);
        if (userError) {
          console.error('Error getting current user:', userError);
          return;
        }
        const { data, error } = await supabase
          .from("Vehicle")
          .insert([{
            user_id: currentUser.UserID,
            vechicle_make: newVehicle.make, // Fixed the spelling
            vechicle_model: newVehicle.model,
            license_plate: newVehicle.license,
          }]);
        if (error) {
          console.error('Error adding vehicle:', error);
        } else {
          console.log('Vehicle added:', data);
          vehicles.value.push(data[0]); // Add the new vehicle to the vehicles array
          showModal.value = false; // Close the modal
        }
      }
    };
    const closeModal = () => {
      showModal.value = false;
    };
    const goBack = () => {
      router.go(-1);
    };
    return {
      user,
      vehicles,
      showModal,
      newVehicle,
      addVehicle,
      closeModal,
      fetchVehicles,
      goBack
    };
  },
};
</script>

