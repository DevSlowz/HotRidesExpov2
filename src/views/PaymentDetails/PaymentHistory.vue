<template>
  <div class="container mx-auto p-4">
	<h1 class="text-3xl font-semibold mb-6 text-gray-800">Payment History</h1>
	<button 
	  @click="goBack"
	  class="mb-6 bg-gray-100 text-gray-800 font-semibold py-2 px-4 border border-gray-400 rounded shadow"
	>
	  ← Back
	</button>
	<div class="overflow-x-auto bg-white rounded-lg shadow overflow-y-auto relative">
	  <table class="border-collapse table-auto w-full whitespace-no-wrap bg-white table-striped relative">
		<thead>
		  <tr class="text-left">
			<th class="bg-gray-800 text-white border-b border-gray-200 px-6 py-4 text-sm uppercase font-bold">
			  Event Name
			</th>
			<th class="bg-gray-800 text-white border-b border-gray-200 px-6 py-4 text-sm uppercase font-bold">
			  Event Date
			</th>
			<th class="bg-gray-800 text-white border-b border-gray-200 px-6 py-4 text-sm uppercase font-bold">
			  Amount
			</th>
			<th class="bg-gray-800 text-white border-b border-gray-200 px-6 py-4 text-sm uppercase font-bold">
			  Payment Date
			</th>
			<th class="bg-gray-800 text-white border-b border-gray-200 px-6 py-4 text-sm uppercase font-bold">
			  Payment Type
			</th>
			<th class="bg-gray-800 text-white border-b border-gray-200 px-6 py-4 text-sm uppercase font-bold">
			  Payment Method
			</th>
		  </tr>
		</thead>
		<tbody>
		  <tr v-for="payment in payments" :key="payment.payment_id" class="hover:bg-gray-100">
			<td class="border-dashed border-t border-gray-200 px-6 py-3">
			  <span class="text-gray-700 text-sm">{{ payment.event_name }}</span>
			</td>
			<td class="border-dashed border-t border-gray-200 px-6 py-3">
			  <span class="text-gray-700 text-sm">{{ payment.event_date }}</span>
			</td>
			<td class="border-dashed border-t border-gray-200 px-6 py-3">
			  <span class="text-gray-700 text-sm">{{ payment.payment_amount | currency }}</span>
			</td>
			<td class="border-dashed border-t border-gray-200 px-6 py-3">
			  <span class="text-gray-700 text-sm">{{ payment.payment_date }}</span>
			</td>
			<td class="border-dashed border-t border-gray-200 px-6 py-3">
			  <span class="text-gray-700 text-sm">{{ payment.payment_type }}</span>
			</td>
			<td class="border-dashed border-t border-gray-200 px-6 py-3">
			  <span class="text-gray-700 text-sm">{{ payment.payment_method }}</span>
			</td>
		  </tr>
		</tbody>
	  </table>
	</div>
  </div>
</template>

<script>
import { supabase } from "./../../lib/supabaseClient"; // Use the correct path to your Supabase client
import store from "./../../stores/index";
export default {
  data() {
	return {
	  payments: []
	};
  },
  methods: {
	async fetchUserPayments() {
	  const userEmail = store.state.user.email;
	  try {
		const currentUser = await store.methods.setRealUser(userEmail);
		if (!currentUser) {
		  throw new Error('User object not found.');
		}
		const currentUserID = currentUser.UserID;
		let { data, error } = await supabase
		  .from('Registration')
		  .select(`
			Payment:payment_id (
			  payment_date,
			  payment_type,
			  payment_method,
			  payment_amount
			),
			Event:event_id (
			  event_name,
			  event_date
			)
		  `)
		  .eq('UserID', currentUserID);
		if (error) throw new Error('Error fetching payments: ' + error.message);

		this.payments = data.map(reg => ({
		  event_name: reg.Event.event_name,
		  event_date: reg.Event.event_date,
		  payment_amount: reg.Payment.payment_amount,
		  payment_date: reg.Payment.payment_date,
		  payment_type: reg.Payment.payment_type,
		  payment_method: reg.Payment.payment_method,
		  payment_id: reg.Payment.payment_id // Include payment_id to satisfy key requirements for v-for
		}));
	  } catch (e) {
		console.error(e);
	  }
	},
	goBack() {
	  this.$router.go(-1); // Use Vue Router's go method to navigate back
	}
  },
  created() {
	this.fetchUserPayments();
  }
};
</script>