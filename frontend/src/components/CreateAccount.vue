<template>
    <div class="login-container">
        <h1>Create Account</h1>
        <form @submit.prevent="handleLogin">
            <div class="form-group">
                <label for="username">Username</label>
                <input
                    type="text"
                    id="username"
                    v-model="username"
                    placeholder="Enter your username"
                    required
                />
            </div>
            <div class="form-group">
                <label for="password">Password</label>
                <input
                    type="password"
                    id="password"
                    v-model="password"
                    placeholder="Enter your password"
                    required
                />
            </div>
            <div class="form-group">
                <label for="password">Confirm Password</label>
                <input
                    type="password"
                    id="confirmPassword"
                    v-model="password"
                    placeholder="Enter your password again"
                    required
                />
            </div>
            <button type="submit">Sign Up</button>
        </form>
    </div>
</template>

<script>
import axios from 'axios'
export default {
    name: "CreateAccountView",
    data() {
        return {
            username: "",
            password: "",
            confirmPassword: "",
            // snackbar: true,
            // snackbarColor: 'success',
            // snackbarText: '',
        };
    },
    methods: {
        async createAccount() {
            try {
            } catch (error) {
                console.error('Sign Up Failed:', Error)
            }
        },
    },
};
</script>

<style scoped>
.login-container {
    max-width: 400px;
    margin: 0 auto;
    padding: 20px;
    border: 1px solid #ccc;
    border-radius: 8px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

h1 {
    text-align: center;
    margin-bottom: 20px;
}

.form-group {
    margin-bottom: 15px;
}

label {
    display: block;
    margin-bottom: 5px;
    font-weight: bold;
}

input {
    width: 100%;
    padding: 8px;
    box-sizing: border-box;
    border: 1px solid #ccc;
    border-radius: 4px;
}

button {
    width: 100%;
    padding: 10px;
    background-color: #0003a8;
    color: #fff;
    border: none;
    border-radius: 4px;
    cursor: pointer;
}

button:hover {
    background-color: #0056b3;
}

.signup-link {
    text-align: center;
    margin-top: 15px;
}
</style>