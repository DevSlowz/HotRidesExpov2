<template>
    <div class="login-container">
        <div class="login-form">
            <h1>Registration for Sponsors</h1>
            <form @submit.prevent="submitForm">
                <img class="logo" src="/src/assets/images/logo.svg" alt="Logo" />
                <div class="form-group">
                    <label for="companyName">Company Name:</label>
                    <input type="text" id="companyName" v-model="companyName" required>
                </div>
                <div class="form-group">
                    <label for="personalName">Personal Name:</label>
                    <input type="text" id="personalName" v-model="personalName" required>
                </div>
                <div class="form-group">
                    <label for="email">Email:</label>
                    <input type="email" id="email" v-model="email" required>
                </div>
                <div class="form-group">
                    <label for="password">Password:</label>
                    <input type="password" id="password" v-model="password" required>
                </div>
                <button type="submit">Next</button>
            </form>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            companyName: '',
            personalName: '',
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
.login-container {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100vh;
    background-color: #f2f2f2;
}

.login-form {
    background-color: #fff;
    padding: 30px;
    border-radius: 5px;
    box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.2);
    width: 400px;
}

.form-group {
    margin-bottom: 20px;
}

label {
    display: block;
    margin-bottom: 5px;
    font-weight: bold;
}

input[type="text"],
input[type="email"],
input[type="password"] {
    width: 100%;
    padding: 10px;
    border-radius: 5px;
    border: none;
    box-shadow: 0px 0px 5px rgba(0, 0, 0, 0.1);
    font-size: 16px;
    margin-top: 5px;
}

button[type="submit"] {
    background-color: #007bff;
    color: #fff;
    border: none;
    padding: 10px 20px;
    border-radius: 5px;
    font-size: 16px;
    cursor: pointer;
    margin-top: 20px;
}

button[type="submit"]:hover {
    background-color: #0069d9;
}
</style>
