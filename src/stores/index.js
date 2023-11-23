import { reactive } from "vue";
import { supabase } from "../lib/supabaseClient";

const state = reactive({
  user: null,
  registrations: [],
  userEmail: null,
  realUser:null
});

const methods = {
	setUser(payload) {
		state.user = payload ? payload.user : null;
		console.log("state user : " + JSON.stringify(state.user, null, 2));
		if (state.user) {
			this.userEmail = (JSON.stringify(state.user.email, null, 2));
      console.log("User Email" , this.userEmail)
		}
	},
  storeRegistration(payload) {
    if (payload) {
      state.registrations.push(payload);
    } else {
      console.log("Invalid registration data");
    }
    console.log("Stored registrations: " + JSON.stringify(state.registrations, null, 2));
  },
  getUserDetails() {
    if (state.user) {
      console.log("User details: " + JSON.stringify(state.user, null, 2));
      return state.user;
    } else {
      console.log("User details not available");
      return null;
    }
  },
  async setRealUser(email) {
		if (!email) {
			console.error("Email must be provided to fetch user data.");
			return;
		}
		let { data, error } = await supabase
			.from('Users')
			.select('*')
			.eq('Email', email);
		if (error) {
			console.error('Error fetching user data: ', error);
		} else if (data && data.length > 0) {
			// state.realUser = data[0].UserID;
      state.realUser = data[0];
      console.log("real user id: ",state.realUser)
      return state.realUser
			// Assuming you might want to call another method after setting realUser
			// methods.fetchRegisteredEvents(); // You can add fetchRegisteredEvents if needed
		} else {
			console.error('No user data found for the provided email.', this.realUser);
		}
	},
};

export default {
  state,
  methods,
};