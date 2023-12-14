<template>
  <div class="container mx-auto p-8">
	<div class="flex flex-col items-center justify-center">
	  <h2 class="text-4xl font-bold mb-8">Make a Donation</h2>

	  <form @submit.prevent="submitDonation" class="w-full max-w-lg">
		<!-- Donor Information -->
		<div class="mb-6">
		  <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="donor-name">
			Donor's Name
		  </label>
		  <input
			class="appearance-none block w-full bg-gray-200 text-gray-700 border rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
			id="donor-name"
			type="text"
			placeholder="Enter your name"
			v-model="donorName"
			required
		  />
		</div>

		<div class="mb-6">
		  <!-- Other donor fields like contact information and affiliations would go here -->
		</div>

		<!-- Donation Details -->
		<div class="mb-6">
		  <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
			Type of Donation
		  </label>
		  <select
			class="appearance-none block w-full bg-gray-200 text-gray-700 border rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white"
			v-model="donationType"
			required
		  >
			<option value="">Select a donation type</option>
			<option value="cash">Cash</option>
			<option value="goods">Material Goods</option>
		  </select>
		</div>

		<div class="flex flex-wrap -mx-3 mb-6">
		  <div class="w-full px-3">
			<label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="donation-amount">
			  Donation Amount/Value ($)
			</label>
			<input
			  class="appearance-none block w-full bg-gray-200 text-gray-700 border rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
			  id="donation-amount"
			  type="number"
			  placeholder="Enter amount or value"
			  v-model="donationValue"
			/>
		  </div>
		</div>

		<div class="mb-6">
		  <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="use-of-donation">
			Use of Donation
		  </label>
		  <textarea
			class="appearance-none block w-full bg-gray-200 text-gray-700 border rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white"
			id="use-of-donation"
			placeholder="Describe how the donation will be used"
			v-model="donationUse"
		  ></textarea>
		</div>

		<div class="mb-6">
		  <label class="checkbox">
			<input type="checkbox" v-model="acknowledgement" />
			<span class="ml-2">I wish to be acknowledged publicly for my donation.</span>
		  </label>
		</div>

		<div class="flex items-center justify-between">
		  <button
			class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
			type="submit"
		  >
			Donate Now
		  </button>
		</div>
	  </form>
	</div>
  </div>
</template>


<script>
import { ref } from 'vue';
export default {
  setup() {
	const donorName = ref('');
	const donationType = ref('');
	const donationValue = ref('');
	const donationUse = ref('');
	const acknowledgement = ref(false);
	const submitDonation = () => {
	  // You can perform here any client-side validation if necessary
	  // Reset field values after pretended successful submission
	  donorName.value = '';
	  donationType.value = '';
	  donationValue.value = '';
	  donationUse.value = '';
	  acknowledgement.value = false;
	  // Alert the user of successful submission
	  alert(`Donation attempt was successful. Thank you for your support!`);
	};
	return {
	  donorName,
	  donationType,
	  donationValue,
	  donationUse,
	  acknowledgement,
	  submitDonation
	};
  }
};
</script>
<style>
/* Your custom styles here */
</style>
