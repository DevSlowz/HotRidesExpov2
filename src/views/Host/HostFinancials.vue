<template>
  <div class="p-8 bg-gray-100 min-h-screen">
    <h1 class="text-4xl font-bold text-center mb-10">Financial Insights</h1>

    <!-- Earnings Overview -->
    <div class="max-w-6xl mx-auto">
      <div class="bg-white p-6 rounded-lg shadow-lg mb-6">
        <h2 class="text-2xl font-semibold">Earnings Overview</h2>
        <div class="mt-4">
          <canvas id="earningsChart"></canvas>
        </div>
        <div class="mt-6 flex justify-between items-center">
          <div>Total Earnings: {{ totalEarnings }}</div>
          <div>Average Earnings: {{ averageEarnings.toFixed(2) }}</div>
        </div>
      </div>

      <!-- Registrations Overview -->
      <div class="bg-white p-6 rounded-lg shadow-lg mb-6">
        <h2 class="text-2xl font-semibold">Registrations Overview</h2>
        <div class="mt-4">
          <canvas id="registrationsChart"></canvas>
        </div>
      </div>

      <!-- Financial Report Section -->
      <div class="bg-white p-6 rounded-lg shadow-lg my-6">
        <h2 class="text-2xl font-semibold">Financial Report</h2>
        <p class="financial-detail">Total Earnings: {{ totalEarnings }}</p>
        <p class="financial-detail">Average Earnings: {{ averageEarnings.toFixed(2) }}</p>
        <!-- Additional financial details -->
        <p class="financial-detail">Total Expenses: {{ totalExpenses }}</p>
        <p class="financial-detail">Net Profit: {{ netProfit.toFixed(2) }}</p>
      </div>

      <!-- Event Report Section -->
      <div class="bg-white p-6 rounded-lg shadow-lg my-6">
        <h2 class="text-2xl font-semibold">Event Report</h2>
        <p class="event-detail">Total Events: {{ totalEvents }}</p>
        <p class="event-detail">Upcoming Events: {{ upcomingEvents }}</p>
        <!-- Additional event details -->
        <p class="event-detail">Past Events: {{ pastEvents }}</p>
        <p class="event-detail">Average Attendance: {{ averageAttendance }}</p>
      </div>
		<!-- Charity Donations Overview -->
		<div class="bg-white p-6 rounded-lg shadow-lg mb-6">
		  <h2 class="text-2xl font-semibold">Charity Donations Overview</h2>
		  <ul class="list-disc pl-6 mt-4">
			<li v-for="(charity, index) in charityDonations" :key="index">
			  {{ charity.name }}: {{ charity.amount }}
			</li>
		  </ul>
		</div>
		<!-- Sponsors Overview -->
		<div class="bg-white p-6 rounded-lg shadow-lg mb-6">
		  <h2 class="text-2xl font-semibold">Sponsors Overview</h2>
		  <ul class="list-disc pl-6 mt-4">
			<li v-for="(sponsor, index) in sponsors" :key="index">
			  {{ sponsor.name }}: {{ sponsor.contribution }}
			</li>
		  </ul>
		</div>
    </div>
  </div>
</template>

<script>
import { onMounted, ref } from 'vue';
import { Chart, registerables } from 'chart.js';

Chart.register(...registerables);

export default {
  setup() {
    const earningsChartRef = ref(null);
    const registrationsChartRef = ref(null);

    const earningsData = [
      { month: 'Jan', amount: 2400 },
      { month: 'Feb', amount: 2200 },
      { month: 'Mar', amount: 3500 },
      // ...more months
    ];
		const charityDonations = ref([
		  { name: 'Charity A', amount: 1000 },
		  { name: 'Charity B', amount: 1500 },
		  // You can add more charities here
		]);
		const sponsors = ref([
		  { name: 'Sponsor X', contribution: 5000 },
		  { name: 'Sponsor Y', contribution: 7500 },
		  // You can add more sponsors here
		]);

    const registrationsData = [
      { month: 'Jan', count: 25 },
      { month: 'Feb', count: 45 },
      { month: 'Mar', count: 70 },
      // ...more months
    ];

    const totalEarnings = earningsData.reduce((acc, data) => acc + data.amount, 0);
    const averageEarnings = totalEarnings / earningsData.length;

    const financialReportData = {
      totalEarnings: 12000,
      averageEarnings: 3000,
      // Additional financial data
      totalExpenses: 7000,
      netProfit: 5000,
      // ... more financial data if needed
    };

    const eventReportData = {
      totalEvents: 4,
      upcomingEvents: 2,
      // Additional event data
      pastEvents: 15,
      averageAttendance: 50,
      // ... more event data if needed
    };

    const renderEarningsChart = () => {
      const ctx = document.getElementById('earningsChart').getContext('2d');
      earningsChartRef.value = new Chart(ctx, {
        type: 'line',
        data: {
          labels: earningsData.map((data) => data.month),
          datasets: [
            {
              label: 'Earnings',
              backgroundColor: 'rgba(75, 192, 192, 0.2)',
              borderColor: 'rgba(75, 192, 192, 1)',
              data: earningsData.map((data) => data.amount),
              fill: true,
            },
          ],
        },
        options: {
          responsive: true,
          scales: {
            y: {
              beginAtZero: true,
            },
          },
        },
      });
    };

    const renderRegistrationsChart = () => {
      const ctx = document.getElementById('registrationsChart').getContext('2d');
      registrationsChartRef.value = new Chart(ctx, {
        type: 'bar',
        data: {
          labels: registrationsData.map((data) => data.month),
          datasets: [
            {
              label: 'Registrations',
              backgroundColor: 'rgba(255, 99, 132, 0.2)',
              borderColor: 'rgba(255, 99, 132, 1)',
              data: registrationsData.map((data) => data.count),
              fill: true,
            },
          ],
        },
        options: {
          responsive: true,
          scales: {
            y: {
              beginAtZero: true,
            },
          },
        },
      });
    };

    onMounted(() => {
      renderEarningsChart();
      renderRegistrationsChart();
    });

    return {
      earningsChartRef,
      registrationsChartRef,
      totalEarnings,
      averageEarnings,
      totalExpenses: financialReportData.totalExpenses,
      netProfit: financialReportData.netProfit,
      totalEvents: eventReportData.totalEvents,
      upcomingEvents: eventReportData.upcomingEvents,
      pastEvents: eventReportData.pastEvents,
      averageAttendance: eventReportData.averageAttendance,
		   charityDonations,
			sponsors,
    };
  },
};
</script>

<style scoped>
.financial-detail, .event-detail {
  background-color: #f1f5f9; /* Light gray background */
  padding: 0.5rem 1rem; /* Padding for some space around the text */
  margin: 0.25rem 0; /* Margin for spacing between details */
  border-left: 4px solid #3b82f6; /* Blue bar on the left for emphasis */
  border-radius: 4px; /* Rounded corners */
}

.financial-detail:not(:last-child), .event-detail:not(:last-child) {
  border-bottom: 1px solid #e5e7eb; /* Light border for separation, not on the last item */
}

/* You may also want to differentiate the two sections a bit, for example: */
.financial-detail {
  border-left-color: #10b981; /* Green for finance */
}
.event-detail {
  border-left-color: #ec4899; /* Pink for events */
}

/* Continue with existing styles... */
</style>
