<template>
    <div class="container">
        <div class="card p-4">
            <img class="logo" src="/src/assets/images/logo.svg" alt="Logo" />
            <div class="form-group">
                <label for="userType">Select User Type:</label>
                <select id="userType" v-model="selectedUserType" class="form-control">
                    <option value="host">Host</option>
                    <option value="sponsor">Sponsor</option>
                    <option value="participant">Participant</option>
                </select>
            </div>
            <button class="btn btn-primary" @click="next">Next</button>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            selectedUserType: "host"
        };
    },
    methods: {
        next() {
            // navigate to next page
        }
    }
};
</script>

<style scoped>

.container {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height: 100vh;
}

.card {
    background-color: #f2f2f2;
    width: 50%;
    max-width: 500px;
    margin: auto;
    border-radius: 0.25rem;
    box-shadow: 0 0.5rem 1rem rgba(0, 0, 0, 0.15);
    
}

.form-group {
    margin-bottom: 1rem;
}

select.form-control {
    width: 100%;
    padding: 0.375rem 0.75rem;
    font-size: 1rem;
    font-weight: 400;
    line-height: 1.5;
    color: #495057;
    background-color: #fff;
    background-clip: padding-box;
    border: 1px solid #ced4da;
    border-radius: 0.25rem;
    transition: border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out;
}

button.btn-primary {
    color: #fff;
    background-color: #007bff;
    border-color: #007bff;
    display: inline-block;
    font-weight: 400;
    text-align: center;
    vertical-align: middle;
    -webkit-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    user-select: none;
    border: 1px solid transparent;
    padding: 0.375rem 0.75rem;
    font-size: 1rem;
    line-height: 1.5;
    border-radius: 0.25rem;
    transition: all 0.15s ease-in-out;
}
</style>
.logo {
    display: block;
    margin: auto;
}
