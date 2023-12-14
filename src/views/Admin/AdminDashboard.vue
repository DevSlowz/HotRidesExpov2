<template>
	  <div class="p-6 bg-gray-100 min-h-screen">
		<h1 class="text-4xl font-bold text-center mb-10">Admin Dashboard</h1>
		<div class="grid grid-cols-2 gap-4">
		  <!-- User Management Section -->
		  <div class="col-span-2 bg-white p-4 rounded-lg shadow-lg">
			<h2 class="text-2xl font-semibold mb-4">User Management</h2>
			<div class="overflow-x-auto">
			  <table class="min-w-full">
				<thead>
				  <tr>
					<th class="border px-4 py-2">Name</th>
					<th class="border px-4 py-2">Role</th>
					<th class="border px-4 py-2">Permissions</th>
				  </tr>
				</thead>
				<tbody>
				  <tr v-for="user in users" :key="user.id">
					<td class="border px-4 py-2">{{ user.name }}</td>
					<td class="border px-4 py-2">{{ user.role }}</td>
					<td class="border px-4 py-2">{{ user.permissions }}</td>
				  </tr>
				</tbody>
			  </table>
			</div>
		  </div>
		  <!-- Event Registration Section -->
		  <div class="bg-white p-4 rounded-lg shadow-lg">
			<h2 class="text-2xl font-semibold mb-4">Event Registration</h2>
			<div class="overflow-x-auto">
			  <table class="min-w-full">
				<thead>
				  <tr>
					<th class="border px-4 py-2">Event Name</th>
					<th class="border px-4 py-2">Registrant</th>
					<th class="border px-4 py-2">Status</th>
				  </tr>
				</thead>
				<tbody>
				  <tr v-for="registration in eventRegistrations" :key="registration.id">
					<td class="border px-4 py-2">{{ registration.name }}</td>
					<td class="border px-4 py-2">{{ registration.registrant }}</td>
					<td class="border px-4 py-2">{{ registration.status }}</td>
				  </tr>
				</tbody>
			  </table>
			</div>
		  </div>
		  <!-- Financial Overview Section -->
		  <div class="bg-white p-4 rounded-lg shadow-lg">
			<h2 class="text-2xl font-semibold mb-4">Financial Overview</h2>
			<!-- Financial details and summaries here -->
			<div class="flex flex-col space-y-2">
			  <div>
				<strong>Total Funds Raised:</strong> ${{ financialOverview.totalRaised }}
			  </div>
			  <div>
				<strong>Donations Total:</strong> ${{ financialOverview.donationTotal }}
			  </div>
			  <div>
				<strong>Sponsorship Total:</strong> ${{ financialOverview.sponsorshipTotal }}
			  </div>
			  <!-- Display additional financial details here -->
			</div>
		  </div>

	<!-- Donation Management Section -->
	<div class="col-span-2 bg-white p-4 rounded-lg shadow-lg">
	  <h2 class="text-2xl font-semibold mb-4">Donation Management</h2>
	  <div class="overflow-x-auto">
		<table class="min-w-full">
		  <thead>
			<tr>
			  <th class="border px-4 py-2">Donor Name</th>
			  <th class="border px-4 py-2">Amount</th>
			  <th class="border px-4 py-2">Acknowledgement</th>
			</tr>
		  </thead>
		  <tbody>
			<tr v-for="donation in donations" :key="donation.donorName">
			  <td class="border px-4 py-2">{{ donation.donorName }}</td>
			  <td class="border px-4 py-2">${{ donation.amount }}</td>
			  <td class="border px-4 py-2">{{ donation.acknowledgement ? 'Yes' : 'No' }}</td>
			</tr>
		  </tbody>
		</table>
	  </div>
	</div>

	<!-- Sponsorship and Vendor Management Section -->
	<div class="col-span-2 bg-white p-4 rounded-lg shadow-lg">
	  <h2 class="text-2xl font-semibold mb-4">Sponsorship & Vendor Management</h2>
	  <div class="overflow-x-auto">
		<table class="min-w-full">
		  <thead>
			<tr>
			  <th class="border px-4 py-2">Company</th>
			  <th class="border px-4 py-2">Package Chosen</th>
			  <th class="border px-4 py-2">Payment Status</th>
			</tr>
		  </thead>
		  <tbody>
			<tr v-for="sponsorship in sponsorships" :key="sponsorship.company">
			  <td class="border px-4 py-2">{{ sponsorship.company }}</td>
			  <td class="border px-4 py-2">{{ sponsorship.packageChosen }}</td>
			  <td class="border px-4 py-2">{{ sponsorship.paymentStatus }}</td>
			</tr>
		  </tbody>
		</table>
	  </div>
	</div>

	<!-- Event Statistics Section -->
	<div class="bg-white p-4 rounded-lg shadow-lg">
	  <h2 class="text-2xl font-semibold mb-4">Event Statistics</h2>
	  <div class="flex flex-col space-y-2">
		<div>
		  <strong>Number of Participants:</strong> {{ eventStats.numberOfParticipants }}
		</div>
		<div>
		  <strong>Funds Raised:</strong> ${{ eventStats.fundsRaised }}
		</div>
		<div>
		  <strong>Donations Made:</strong> {{ eventStats.donationsMade }}
		</div>
		<!-- Add more event statistics here -->
	  </div>
	</div>

	<!-- Audit Logs Section -->
	<div class="bg-white p-4 rounded-lg shadow-lg">
	  <h2 class="text-2xl font-semibold mb-4">Audit Logs</h2>
	  <div class="overflow-x-auto">
		<table class="min-w-full">
		  <thead>
			<tr>
			  <th class="border px-4 py-2">Action</th>
			  <th class="border px-4 py-2">User</th>
			  <th class="border px-4 py-2">Timestamp</th>
			</tr>
		  </thead>
		  <tbody>
			<tr v-for="log in auditLogs" :key="log.timestamp">
			  <td class="border px-4 py-2">{{ log.action }}</td>
			  <td class="border px-4 py-2">{{ log.user }}</td>
			  <td class="border px-4 py-2">{{ log.timestamp }}</td>
			</tr>
		  </tbody>
		</table>
	  </div>
	</div>

	<!-- Notifications and Alerts Section -->
	<div class="col-span-2 bg-white p-4 rounded-lg shadow-lg">
	  <h2 class="text-2xl font-semibold mb-4">Notifications & Alerts</h2>
	  <div class="flex flex-col space-y-2">
		<div v-for="notification in notifications" :key="notification">
		  {{ notification }}
		</div>
	  </div>
	</div>
		</div>
	  </div>
</template>

<script>
export default {
  name: 'AdminDashboard',
  data() {
	return {
	  // Fake data and structures for demonstration
	  users: [
		{ id: 1, name: 'Alice Smith', role: 'Administrator', permissions: 'Full Access' },
		{ id: 2, name: 'Bob Johnson', role: 'Editor', permissions: 'Limited Access' },
		// ... more users
	  ],
	  eventRegistrations: [
		{ id: 1, name: 'Annual Gala', registrant: 'Charlie Brown', status: 'Paid' },
		{ id: 2, name: 'Charity Run', registrant: 'Dana Scully', status: 'Pending' },
		// ... more events
	  ],
	  financialOverview: {
		totalRaised: 50000,
		donationTotal: 15000,
		sponsorshipTotal: 20000,
		// ... other financial details
	  },
	  donations: [
		{ donorName: 'Ethan Hunt', amount: 500, acknowledgement: true },
		{ donorName: 'Felicity Shagwell', amount: 1000, acknowledgement: false },
		// ... more donations
	  ],
	  sponsorships: [
		{ company: 'Globex Corporation', packageChosen: 'Basic', paymentStatus: 'Paid' },
		{ company: 'Soylent Corp', packageChosen: 'Standard', paymentStatus: 'Pending' },
		// ... more sponsorships
	  ],
	  eventStats: {
		numberOfParticipants: 150,
		fundsRaised: 20000,
		donationsMade: 50,
		// ... more stats
	  },
	  auditLogs: [
		{ action: 'User Login', user: 'Alice Smith', timestamp: '2023-04-01T12:34:56' },
		{ action: 'Edit Event', user: 'Bob Johnson', timestamp: '2023-04-02T08:22:10' },
		// ... more logs
	  ],
	  notifications: [
		'Pending Payment for Charity Run',
		'Upcoming Deadline for Gala Event Sponsorship',
		// ... more notifications
	  ]
	};
  },
  methods: {
	// Add your methods for managing the sections here
  },
};
</script>


<style>
/* Add any additional styles here */
</style>
