<template>
    <div class="container mx-auto px-4">
      <h1 class="text-2xl font-bold mb-4">Payment History</h1>
      <table class="table-auto w-full">
        <thead>
          <tr>
            <th class="px-4 py-2">Transaction ID</th>
            <th class="px-4 py-2">Date</th>
            <th class="px-4 py-2">Amount</th>
            <th class="px-4 py-2">Status</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="payment in payments" :key="payment.id">
            <td class="border px-4 py-2">{{ payment.id }}</td>
            <td class="border px-4 py-2">{{ payment.date }}</td>
            <td class="border px-4 py-2">{{ payment.amount }}</td>
            <td class="border px-4 py-2">{{ payment.status }}</td>
          </tr>
        </tbody>
      </table>
    </div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        payments: [
          // Add your payment data here
        ],
      };
    },
  };
  </script>