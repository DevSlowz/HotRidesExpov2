<template>
  <div class="container mx-auto p-8">
    <div class="bg-white p-8 rounded-lg shadow-lg">
      <h2 class="text-3xl font-bold mb-6 text-center">Complete Your Purchase</h2>
      
      <div class="mb-6">
        <h3 class="text-xl font-semibold mb-4">Receipt Summary</h3>
        <div class="grid grid-cols-2 gap-4 mb-6">
          <!-- Existing receipt items here -->
          <div class="receipt-item">
          <span class="font-bold">First Name:</span> {{ firstName }}
        </div>
        <div class="receipt-item">
          <span class="font-bold">Last Name:</span> {{ lastName }}
        </div>
			<div class="receipt-item">
			  <span class="font-bold">Price:</span> {{ eventPrice }}
			</div>
        <div class="receipt-item">
          <span class="font-bold">T-Shirt Size:</span> {{ tshirtSize }}
        </div>
        <div class="receipt-item">
          <span class="font-bold">Club Membership:</span> {{ clubMembership }}
        </div>
			<div class="receipt-item">
			  <span class="font-bold">Vehicle:</span> {{ selectedVehicle }}
			</div>
        <div class="receipt-item">
          <span class="font-bold">Selected Event:</span> {{ selectedEvent }}
        </div>
        <div class="receipt-item">
          <span class="font-bold">Event Date:</span> {{ eventDate }}
        </div>
      </div>
      </div>
      <div class="mb-6">
        <h3 class="text-xl font-semibold mb-4">Payment Details</h3>
        <form id="payment-form">
          <div class="grid grid-cols-2 gap-4 mb-4">
            <div class="form-control">
              <label class="label">
                <span class="label-text">Card Number</span>
              </label>
              <input type="text" placeholder="1234 5678 9012 3456" class="input input-bordered" />
            </div>
            <div class="form-control">
              <label class="label">
                <span class="label-text">Cardholder Name</span>
              </label>
              <input type="text" placeholder="Name on the card" class="input input-bordered" />
            </div>
            <div class="form-control">
              <label class="label">
                <span class="label-text">Expiry Date</span>
              </label>
              <input type="text" placeholder="MM/YY" class="input input-bordered" />
            </div>
            <div class="form-control">
              <label class="label">
                <span class="label-text">CVV</span>
              </label>
              <input type="text" placeholder="CVV" class="input input-bordered" />
            </div>
          </div>
          
          <button type="button" @click="purchase" class="btn bg-blue-500 text-white px-6 py-2 rounded-md hover:bg-blue-600 w-full">
            Pay with Credit Card
          </button>
        </form>
      </div>
      <div class="flex justify-center items-center mt-8">
        <span class="text-gray-500 mr-3">Or pay with</span>
        <button @click="redirectToPaypal" class="btn bg-blue-500 text-white px-6 py-2 rounded-md hover:bg-yellow-600">
          PayPal
        </button>
		  
      </div>
		<div class="receipt" ref="receiptSection">
		  <!-- Receipt content goes here... -->
		  <!-- For example, it can encompass the .bg-white div which includes receipt items -->
		</div>
		<div class="flex justify-center items-center mt-8">
		  <!-- ... existing buttons ... -->
		  <button class="btn bg-green-500 text-white px-6 py-2 rounded-md hover:bg-green-600" @click="printReceipt">
			Print Receipt
		  </button>
		</div>
    </div>
	  
  </div>
	
</template>


<script setup>
import { ref, onMounted, onUnmounted } from 'vue';
import store from "../stores/index";
import { supabase } from "../lib/supabaseClient";

let registrationInfo = store.state.registrations[0];
	

// Load data from LocalStorage on component mount
onMounted(() => {
  const savedData = localStorage.getItem('registrationInfo');
  if (savedData) {
    registrationInfo = JSON.parse(savedData);
  }
  fetchUserData(); // Call fetchData on mounted
  fetchEventData();
});

const fetchedUser = ref(null);
const fetchedEvent = ref(null);
const today = new Date();
const formattedDate = `${today.getFullYear()}-${String(today.getMonth() + 1).padStart(2, '0')}-${String(today.getDate()).padStart(2, '0')}`;
const eventPrice = ref(0);

// Save data to LocalStorage on component unmount
onUnmounted(() => {
  localStorage.setItem('registrationInfo', JSON.stringify(registrationInfo));
});

const firstName = ref(registrationInfo.firstName);
const lastName = ref(registrationInfo.lastName);
const tshirtSize = ref(registrationInfo.tshirtSize);
const clubMembership = ref(registrationInfo.clubMembership);
const selectedEvent = ref(registrationInfo.selectedEvent);
const eventDate = ref(registrationInfo.eventDate);
const selectedVehicle = ref(registrationInfo.selectedVehicle);

// Assuming 'userEmail' needs to be used as a filter value for a column 'Email' in the 'Events' table
const userEmail = store.state["user"]["email"]; // Corrected to obtain email without JSON.stringify
	const receiptSection = ref(null);
	const printReceipt = () => {
	  if (receiptSection.value) {
		const printContent = receiptSection.value.innerHTML;
		const WinPrint = window.open('', '', 'left=0,top=0,width=800,height=900,toolbar=0,scrollbars=0,status=0');
		WinPrint.document.write(printContent);
		WinPrint.document.close();
		WinPrint.focus();
		WinPrint.print();
		WinPrint.close();
		alert('Receipt printed successfully!');
	  }
	};
const fetchUserData = async () => {
  let { data, error } = await supabase
    .from('Users') // Corrected table name to 'Events'
    .select('UserID') // You may specify here the exact columns you need
    .eq('Email', userEmail); // Correct usage of eq() to compare 'Email' column with 'userEmail'
  if (error) {
    console.log('Error fetching events: ', error);
  } else {
    console.log('Fetched events: ', data[0].UserID)
    fetchedUser.value = data[0].UserID // Logs the fetched events to the console
    console.log(fetchedUser.value)
  }
};

	const fetchEventData = async () => {
	  let { data, error } = await supabase
		.from('Event') // Corrected table name
		.select('event_id, event_price') // Fetch event_price along with event_id
		.eq('event_name', selectedEvent.value)
	  if (error) {
		console.log('Error fetching event data: ', error);
	  } else {
		fetchedEvent.value = data[0].event_id;
		eventPrice.value = data[0].event_price; // Store the fetched event price
	  }
	};

	const purchase = async () => {
	  if (fetchedUser.value && fetchedEvent.value) {
		const paymentData = {
		  payment_date: formattedDate,
		  payment_type: 'eventRegistration',
		  payment_method: 'Credit',
		  payment_amount: eventPrice.value, // Use the fetched event price
		};
    const { data: paymentResult, error: paymentError } = await supabase.from('Payment').insert([paymentData]).select();
    if (paymentError) {
      console.error('Error inserting payment: ', paymentError);
      return;  // Stop the function if there is an error
    }
    console.log("Test 1")
    const paymentId = paymentResult[0].payment_id;  // Ensure this is the correct field containing the payment ID
    console.log("Test 1.1 : ", paymentResult[0].payment_id)
    if (!paymentId) {
      console.error('Payment ID was not returned by Supabase:', paymentResult);
      return;  // Stop the function if no payment ID is returned
    }
    console.log("Test 2")
    const registrationData = {
      UserID: fetchedUser.value, // Ensure these fields match your actual column names
      event_id: fetchedEvent.value,
      payment_id: paymentId,
      registration_date: formattedDate
    };
    console.log("Test 3")
    const { data: registrationResult, error: registrationError } = await supabase.from('Registration').insert([registrationData]).select();
    if (registrationError) {
      console.error('Error inserting registration:', registrationError);
    } else if (registrationResult) {
      console.log('Registration successful', registrationResult);
    } else {
      console.error('Registration did not return a result or error. This is unexpected behavior.', registrationResult);
    }
  } else {
    console.error('User or Event data is not available for registration.');
  }
};

const redirectToPaypal = () => {
  // Implement the actual redirection to PayPal here
  console.log('Redirect to PayPal initiated.');
}
</script>

<style scoped>
/* Add or update style as needed, keeping existing styles */
.btn {
  transition: background-color 150ms ease;
}
.form-control {
  display: flex;
  flex-direction: column;
}
.label {
  margin-bottom: 0.5rem;
}
.input {
  padding: 0.5rem;
  border-radius: 0.25rem;
  border: 1px solid #d1d5db;
}
.input::placeholder {
  color: #9ca3af;
}
.input:focus {
  outline: none;
  border-color: #2563eb;
  box-shadow: 0 0 0 2px rgba(37, 99, 235, 0.2);
}
</style>