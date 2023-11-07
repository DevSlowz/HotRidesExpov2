<script>
export default {
  data() {
    return {
      username: '',
      password: ''
    }
  },
  methods: {
    submitForm() {
      console.log('Username:', this.username);
      console.log('Password:', this.password);
    }
  }
}
</script>

<template>
  <div class="body">
    <div class="login-container">
      <div class="card">
        <h2>Login</h2>
        <form @submit.prevent="submitForm">
          <img class="logo" src="/src/assets/images/logo.svg" alt="Logo" />
          <div class="form-group">
            <label for="username">Username</label>
            <input type="text" id="username" v-model="username" required>
          </div>
          <div class="form-group">
            <label for="password">Password</label>
            <input type="password" id="password" v-model="password" required>
          </div>
          <button type="submit" class="btn btn-primary">Login</button>
                  <div class="register-link">
          <p>Not registered yet? <a href="#">Register here</a></p>
        </div>
        </form>
      </div>
    </div>
  </div>
</template>

<style scoped>
.body {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background-image: url('/src/assets/images/loginBackground.png');
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center;
}

.login-container {
  display: flex;
  justify-content: center;
  align-items: center;
  max-width: 500px; /* Adjust as needed */
  margin: auto;
  height: 100vh;
}

.card {
  padding: 25px;
  border-radius: 5px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.3);
  width: 400px;
  background: #ffffff;
  text-align: center;
}

.form-group {
  margin-bottom: 20px;
}

label {
  display: block;
  margin-bottom: 5px;
}

input[type="text"],
input[type="password"] {
  width: 80%;
  padding: 10px;
  border-radius: 15px;
  border:#050505;
  box-shadow: 0 px 4px rgba(0, 0, 0, 0.1);
}

.btn {
  background-color: #007bff;
  color: #fff;
  padding: 10px 20px;
  border-radius: 5px;
  border: none;
  cursor: pointer;
  
}

.btn-primary {
  background-color: #007bff;
}

.btn-primary:hover {
  background-color: #0069d9;
}

.register-link {
  margin-top: 20px;
  text-align: center;
}

.register-link a {
  color: #007bff;
  text-decoration: none;
}
</style>
