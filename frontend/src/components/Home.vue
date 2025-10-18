<template>
  <div class="home-container">
    <div class="status-bar">
      <div v-if="isLoggedIn" class="user-status">
        Welcome, {{ username }}!
        <button @click="logOut" class="status-btn">Logout</button>
      </div>
      <div v-else>
        <button @click="checkLoginStatus" class="status-btn">Check login status</button>
      </div>
    </div>
    <section class="feature-section feature1">
      <h2>Track Your Expenses</h2>
      <p>Easily log and categorize your daily spending to stay on top of your finances.</p>
    </section>
    <section class="feature-section feature2">
      <h2>Visualize Your Budget</h2>
      <p>Get clear charts and insights to help you save and plan for the future.</p>
    </section>
    <section class="feature-section feature3">
      <h2>Get Started</h2>
      <div class="button-group">
        <router-link to="/login">
          <button class="action-btn">Login</button>
        </router-link>
        <router-link to="/create">
          <button class="action-btn">Sign Up</button>
        </router-link>
      </div>
    </section>
  </div>
</template>



<script>
import api from '../api';
export default {
    name: "HomeView",
    data() {
        return {
            isLoggedIn: false,
            username: null
        }
    },
    mounted() {
        // Check login status when component is mounted
        this.checkLoginStatus();
    },
    methods: {
        async logOut() {
            try {
                await api.post('/accounts/logout');
                this.isLoggedIn = false;
                this.username = null;
                console.log('logged out');
            } catch (error) {
                console.error('Logout failed:', error);
            }
        },
        async checkLoginStatus() {
            try {
                const response = await api.get('/accounts/session');
                this.isLoggedIn = true;
                this.username = response.data.user.username;
                console.log('Logged in as:', this.username);
            } catch (error) {
                if (error.response && error.response.status === 401) {
                    this.isLoggedIn = false;
                    this.username = null;
                    console.log('Not logged in');
                } else {
                    console.error('Error checking login status:', error);
                }
            }
        }
    }
}
</script>

<style scoped>
.home-container {
  display: flex;
  flex-direction: column;
  align-items: stretch;
  width: 100vw;
  margin-left: calc(50% - 50vw);
  margin-right: calc(50% - 50vw);
}
.feature-section {
  min-height: 60vh;
  width: 100vw;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 3rem 1rem;
  border-bottom: 1px solid #eee;
  background: #fff;
  box-sizing: border-box;
}
.status-bar {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  padding: 1rem;
  background: rgba(255, 255, 255, 0.9);
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  display: flex;
  justify-content: flex-end;
  z-index: 100;
}

.user-status {
  display: flex;
  align-items: center;
  gap: 1rem;
}

.status-btn {
  padding: 0.5rem 1rem;
  border: none;
  border-radius: 4px;
  background: #1976d2;
  color: white;
  cursor: pointer;
  transition: background 0.2s;
}

.status-btn:hover {
  background: #1565c0;
}

.feature1 {
  background: linear-gradient(90deg, #e0eafc 0%, #cfdef3 100%);
}
.feature2 {
  background: linear-gradient(90deg, #fbc2eb 0%, #a6c1ee 100%);
}
.feature3 {
  background: linear-gradient(90deg, #f5f7fa 0%, #c3cfe2 100%);
}
.button-group {
  margin-top: 2rem;
  display: flex;
  gap: 2rem;
}
.action-btn {
  padding: 0.75rem 2rem;
  font-size: 1.1rem;
  border: none;
  border-radius: 6px;
  background: #1976d2;
  color: #fff;
  cursor: pointer;
  transition: background 0.2s;
}
.action-btn:hover {
  background: #1565c0;
}
</style>