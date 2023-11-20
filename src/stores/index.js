import { reactive } from "vue";

const state = reactive({
  user: null,
  registrations: []
});

const methods = {
  setUser(payload) {
    
    state.user = payload ? payload.user : null;
    console.log("state user : " + JSON.stringify(state.user, null, 2))
    
  },
  storeRegistration(payload) {
    if (payload) {
      state.registrations.push(payload);
    } else {
      console.log("Invalid registration data");
    }
    console.log("Stored registrations: " + JSON.stringify(state.registrations, null, 2));
  },
};

export default {
  state,
  methods,
};