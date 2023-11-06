<template>
    <div class="registration-form">
        <img class="logo" src="/src/assets/images/logo.svg" alt="Logo" />
        <h1>Registration Page for New Users</h1>
        <form>
            <div class="form-group">
                <label for="firstName">First Name:</label>
                <input type="text" id="firstName" name="firstName" v-model="firstName" required>
            </div>

            <div class="form-group">
                <label for="lastName">Last Name:</label>
                <input type="text" id="lastName" name="lastName" v-model="lastName" required>
            </div>

            <div class="form-group">
                <label for="email">Email:</label>
                <input type="email" id="email" name="email" v-model="email" required>
            </div>

            <div class="form-group">
                <label for="password">Password:</label>
                <input type="password" id="password" name="password" v-model="password" required>
            </div>

            <div class="form-group">
                <label for="tshirtSize">Tshirt Size:</label>
                <select id="tshirtSize" name="tshirtSize" v-model="tshirtSize" required>
                    <option value="">Please select</option>
                    <option value="S">Small</option>
                    <option value="M">Medium</option>
                    <option value="L">Large</option>
                    <option value="XL">Extra Large</option>
                </select>
            </div>

            <div class="form-group">
                <label for="clubMembership">Club Membership:</label>
                <select id="clubMembership" name="clubMembership" v-model="clubMembership" required>
                    <option value="">Please select</option>
                    <option value="yes">Yes</option>
                    <option value="no">No</option>
                </select>
            </div>

            <button type="submit" @click.prevent="next">Next</button>
        </form>
    </div>
</template>

<script>
export default {
    data() {
        return {
            firstName: '',
            lastName: '',
            email: '',
            password: '',
            tshirtSize: '',
            clubMembership: ''
        }
    },
    methods: {
        next() {
            // Perform validation and submit data to the server
            console.log('Form submitted');
        }
    }
}
</script>

<style scoped>
.registration-form {
    max-width: 500px;
    margin: 0 auto;
    padding: 20px;
    border: 1px solid #ccc;
    border-radius: 5px;
}

.form-group {
    margin-bottom: 10px;
}

label {
    display: block;
    margin-bottom: 5px;
}

input[type="text"],
input[type="email"],
input[type="password"],
select {
    width: 100%;
    padding: 10px;
    border: 1px solid #ccc;
    border-radius: 5px;
    box-sizing: border-box;
    font-size: 16px;
    margin-bottom: 10px;
}

button[type="submit"] {
    background-color: #4CAF50;
    color: white;
    padding: 10px 20px;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    font-size: 16px;
}

button[type="submit"]:hover {
    background-color: #45a049;
}
</style>
