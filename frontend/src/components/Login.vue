<template>
    <div class="login-container">
        <h1>Login</h1>
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
            <button type="submit">Login</button>
            <div class="signup-link">
                <p>Don't have an account? <a href="#">Sign up</a></p>
            </div>
            <v-snackbar v-model="snackbar" timeout="3000" :color="snackbarColor">
                {{ snackbarText }}
            </v-snackbar>
        </form>
    </div>
</template>

<script>
import api from '../api'
export default {
    name: "LoginView",
    data() {
        return {
            username: "",
            password: "",
            snackbar: false,
            snackbarColor: 'success',
            snackbarText: '',
        };
    },
    methods: {
        async handleLogin() {
            // Handle login logic here
            console.log("Username:", this.username);
            console.log("Password:", this.password);
            try {
                const response = await api.post('/accounts/login', {
                    username: this.username,
                    password: this.password
                })

                if (response.data && response.data.message === 'Login successful') {
                    this.showSnackbar('Login successful!', 'success');
                    // ...handle successful login (e.g., redirect)...
                } else {
                    this.showSnackbar(response.data.error || 'Login failed.', 'error');
                }  
                setTimeout(() => {
                    this.$router.push('/dashboard')
                }, 1000)          
            } catch (error) {
                console.error('Login Failed:', error)
                let msg = 'Login failed.';
                if (error.response && error.response.data && error.response.data.error) {
                    msg = error.response.data.error;
                }
                this.showSnackbar(msg, 'error');
            }
        },
        showSnackbar(message, color) {
            this.snackbarText = message;
            this.snackbarColor = color;
            this.snackbar = true;
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
    background-color: #007bff;
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