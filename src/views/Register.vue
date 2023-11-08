<template>
    <div>
      <h1>Register</h1>
    </div>
  </template>
  
  <script>
  import {ref} from 'vue';
  export default {
    name: 'Register',
    // Your component's logic here
    setup() {
      const email = ref(null);
      const password = ref(null);
      const confirmPassowrd = ref(null);
      return {};
    }
  }
  </script>
  
  <style>
  /* Your component's styles here */
  </style>
  