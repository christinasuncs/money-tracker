<template>
  <div class="home-container">
    <button @click="logOut">Logout</button>
    <button @click="checkLoginStatus">Check login status</button>
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
import axios from 'axios'
export default {
    name: "Home",
    data() {
        return{

        }
    },
    methods: {
        async logOut(){
            try {
                await axios.post ('http://localhost:5000/api/accounts/logout', {}, {withCredentials: true})
                console.log('logged out')
            } catch (error) {
                console.error('Logout failed:', error)
            }
        },
        async checkLoginStatus(){
            try {
                const status = await axios.get('http://localhost:5000/api/accounts/session', {}, {withCredentials: true})
                console.log(status)
            } catch (error) {
                console.error('Status check failed:', error)
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