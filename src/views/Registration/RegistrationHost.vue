<template>
  <div class="registration-container">
    
    <form class="registration-form">
        <img class="logo" src="/src/assets/images/logo.svg" alt="Logo" />
        <h1>Register Your Organization</h1>
      <div class="form-group">
        <label for="org-name">Organization Name</label>
        <input type="text" id="org-name" v-model="orgName" required>
      </div>
      <div class="form-group">
        <label for="name">Name</label>
        <input type="text" id="name" v-model="name" required>
      </div>
      <div class="form-group">
        <label for="email">Email</label>
        <input type="email" id="email" v-model="email" required>
      </div>
      <div class="form-group">
        <label for="password">Password</label>
        <input type="password" id="password" v-model="password" required>
      </div>
      <button class="next-button" @click.prevent="submitForm">Next</button>
    </form>
  </div>
  
</template>

<script>
export default {
  data() {
    return {
      orgName: '',
      name: '',
      email: '',
      password: ''
    }
  },
  methods: {
    submitForm() {
      // Handle form submission here
    }
  }
}
</script>

<style scoped>
.registration-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  background-color: #f2f2f2;
}

h1 {
  font-size: 2rem;
  margin-bottom: 2rem;
}

.registration-form {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-color: #fff;
  padding: 2rem;
  border-radius: 10px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
}

.form-group {
  display: flex;
  flex-direction: column;
  margin-bottom: 1rem;
  width: 100%;
}

label {
  font-size: 1.2rem;
  margin-bottom: 0.5rem;
}

input {
  padding: 0.5rem;
  font-size: 1rem;
  border-radius: 5px;
  border: 1px solid #ccc;
  width: 100%;
  box-sizing: border-box;
}

button.next-button {
  background-color: #007bff;
  color: #fff;
  padding: 0.5rem 1rem;
  border-radius: 5px;
  border: none;
  font-size: 1.2rem;
  margin-top: 1rem;
  cursor: pointer;
  transition: background-color 0.2s ease-in-out;
}

button.next-button:hover {
  background-color: #0062cc;
}
</style>
