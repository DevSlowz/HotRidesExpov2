import { reactive } from "vue";

const state = reactive({
  user: null,
});

const methods = {
  setUser(payload) {
    
    state.user = payload ? payload.user : null;
    console.log("state user : " + JSON.stringify(state.user, null, 2))
    
  },
};

export default {
  state,
  methods,
};