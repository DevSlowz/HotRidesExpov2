<template>
  <div class="container mx-auto p-8">
    <div class="bg-white p-6 rounded-lg shadow-lg">
      <h2 class="text-2xl font-bold mb-8 text-gray-700">Sponsor an Event</h2>
      <form @submit.prevent="submitSponsorship">
        <div>
          <label for="event" class="block text-gray-700 text-sm font-bold mb-2">
            Select Event
          </label>
          <select
            id="event"
            v-model="sponsorshipForm.event_id"
            required
            class="block w-full border rounded py-2 px-3 shadow leading-tight focus:outline-none focus:shadow-outline"
          >
            <option v-for="event in events" :key="event.event_id" :value="event.event_id">
              {{ event.event_name }}
            </option>
          </select>
        </div>
		  <div class="mt-4">
			<label for="contact_phone" class="block text-gray-700 text-sm font-bold mb-2">
			  Contact Phone
			</label>
			<input
			  type="tel"
			  id="contact_phone"
			  v-model="sponsorshipForm.phone_number"
			  required
			  class="w-full border rounded py-2 px-3 text-gray-700 shadow leading-tight focus:outline-none focus:shadow-outline"
			  placeholder="Contact person's phone number"
			/>
		  </div>
		  <div class="mt-4">
			<label for="package_option" class="block text-gray-700 text-sm font-bold mb-2">
			  Sponsorship Package
			</label>
			<select
			  id="package_option"
			  v-model="sponsorshipForm.package_option"
			  required
			  class="block w-full border rounded py-2 px-3 shadow leading-tight focus:outline-none focus:shadow-outline"
			>
			  <option value="">Select a package</option>
			  <option value="Basic">Basic</option>
			  <option value="Standard">Standard</option>
			  <option value="Premium">Premium</option>
			  <option value="Ultimate">Ultimate</option>
			</select>
		  </div>
			<div class="mt-4">
			  <label for="org_name" class="block text-gray-700 text-sm font-bold mb-2">
				Organization Name
			  </label>
			  <input
				type="text"
				id="org_name"
				v-model="sponsorshipForm.sponsor_organization"
				required
				class="w-full border rounded py-2 px-3 text-gray-700 shadow leading-tight focus:outline-none focus:shadow-outline"
				placeholder="Your organization's name"
			  />
			</div>
        <div class="mt-4">
          <label for="contact_name" class="block text-gray-700 text-sm font-bold mb-2">
            Contact Name
          </label>
          <input
            type="text"
            id="contact_name"
            v-model="sponsorshipForm.contact_name"
            required
            class="w-full border rounded py-2 px-3 text-gray-700 shadow leading-tight focus:outline-none focus:shadow-outline"
            placeholder="Contact person's name"
          />
        </div>
        <button
          type="submit"
          class="mt-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
          Submit Sponsorship
        </button>
      </form>
    </div>
  </div>
</template>


<script>
import { ref } from 'vue';
import { supabase } from '@/lib/supabaseClient';

export default {
  setup() {
    const events = ref([]);
    const sponsorshipForm = ref({
      event_id: '',
      sponsor_organization: '',
      contact_name: '',
		phone_number: '',
		package_option: '',
    });

    const fetchEvents = async () => {
      const { data, error } = await supabase.from('Event').select('*');
      if (error) {
        alert('Error loading events: ' + error.message);
      } else {
        events.value = data;
      }
    };

	  const submitSponsorship = async () => {
		// Validate the form
		if (!sponsorshipForm.value.event_id) {
		  alert('Please select an event to sponsor.');
		  return;
		}
		if (!sponsorshipForm.value.package_option) {
		  alert('Please select a sponsorship package.');
		  return;
		}
		// Existing submission logic
		const { data: sponsorData, error: sponsorError } = await supabase.from('Sponsor').insert([
		  {
			sponsor_organization: sponsorshipForm.value.sponsor_organization,
			contact_name: sponsorshipForm.value.contact_name,
			phone_number: sponsorshipForm.value.phone_number,
			package_option: sponsorshipForm.value.package_option,

		  },
		]);
		  if (sponsorError) {
			alert('Error submitting sponsorship: ' + sponsorError.message);
			console.log("error ", sponsorError);
		  } else {
			if (sponsorData && Array.isArray(sponsorData) && sponsorData.length > 0) {
			  alert('Successfully submitted sponsorship for ' + sponsorData[0].sponsor_organization);
			  console.log("data ", sponsorData);
			  // Reset the form fields here if successful
			  sponsorshipForm.value.event_id = '';
			  sponsorshipForm.value.sponsor_organization = '';
			  sponsorshipForm.value.contact_name = '';
			} else {
			  console.error('SponsorData is not available.', sponsorData);
			  return; // We return early if sponsorData isn't as expected to avoid further errors.
			}
			// Process the update to the Event using new variable names
			const { data: eventData, error: eventError } = await supabase
			  .from('Event')
			  .update([{ event_sponsor: sponsorshipForm.value.sponsor_organization }])
			  .eq('event_id', sponsorshipForm.value.event_id);
			if (eventError) {
			  alert('Error updating event sponsorship: ' + eventError.message);
			  console.log("error ", eventError);
			} else if (eventData && Array.isArray(eventData) && eventData.length > 0) {
			  alert('Successfully updated sponsorship for event.');
			  console.log("data ", eventData);
			} else {
			  console.error('EventData is not available or not as expected.', eventData);
			}
		  }
	  };

    fetchEvents();

    return {
      events,
      sponsorshipForm,
      submitSponsorship,
    };
  },
};
</script>
