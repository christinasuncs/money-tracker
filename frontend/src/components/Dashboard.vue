<template>
  <v-app class="dashboard-bg">
    <sidebar :username="user?.username || 'User'" :signOut="logOut" :avatar="userAvatar" />
    <v-main>
      <v-container fluid class="py-8 fill-bg">
        <v-row align="center" justify="center" class="fill-row">
          <v-col cols="12" md="8">
            <v-card class="pa-6 mb-6 summary-card" elevation="8">
              <v-row align="center" justify="space-between">
                <v-col cols="auto">
                  <v-avatar size="56" class="mr-4">
                    <v-icon size="56">mdi-account-circle</v-icon>
                  </v-avatar>
                </v-col>
                <v-col>
                  <h2 class="mb-2">Hello, {{ user?.username || 'User' }}!</h2>
                  <div class="greeting-date">{{ today }}</div>
                </v-col>
              </v-row>
            </v-card>
            <v-row class="mb-6" align="center" justify="space-between">
              <v-col cols="12" md="4">
                <v-card class="pa-6 summary-card" elevation="8">
                  <div class="d-flex align-center">
                    <v-icon color="#1976d2" class="mr-2">mdi-cash</v-icon>
                    <div class="summary-label">Total Spend</div>
                  </div>
                  <div class="summary-value">{{ totalSpendFormatted }}</div>
                </v-card>
              </v-col>
              <v-col cols="12" md="4">
                <v-card class="pa-6 summary-card" elevation="8">
                  <div class="d-flex align-center">
                    <v-icon color="#1976d2" class="mr-2">mdi-format-list-numbered</v-icon>
                    <div class="summary-label">Transactions</div>                    
                  </div>
                  <div class="summary-value">{{ transactions.length }}</div>
                </v-card>
              </v-col>
            </v-row>
            <v-row>
              <v-col cols="12" md="12">
                <v-card class="pa-6 mb-4 rounded-card" elevation="8">
                  <v-row align="center">
                    <v-icon color="#1976d2" class="mr-2">mdi-table</v-icon>
                    <h3 class="mb-2">All Transactions</h3>
                  </v-row>
                  <v-row class="mb-3" align="center">
                    <v-col cols="12" md="6">
                      <v-text-field v-model="search" label="Search notes" dense clearable prepend-inner-icon="mdi-magnify" />
                    </v-col>
                    <v-col cols="12" md="4">
                      <v-select
                        :items="categories"
                        v-model="selectedCategory"
                        label="Category"
                        dense
                        clearable
                        prepend-inner-icon="mdi-tag"
                      />
                    </v-col>
                  </v-row>
                  <!-- <transactions-table :transactions="filteredTransactions" @delete-transaction="handleDelete" /> -->
                  <!-- <div v-if="!filteredTransactions.length" class="empty-state">No transactions found.</div> -->
                </v-card>
              </v-col>
            </v-row>
            <v-row>
              <v-col cols="12" md="12">
                <v-card class="pa-6 mb-4 rounded-card" elevation="8">
                  <v-row align="center">
                    <v-icon color="#1976d2" class="mr-2">mdi-chart-pie</v-icon>
                    <h3 class="mb-2">Category Distribution</h3>
                  </v-row>
                  <!-- <transactions-pie :transactions="filteredTransactions" /> -->
                  <!-- <div v-if="!filteredTransactions.length" class="empty-state">No data to display.</div> -->
                </v-card>
              </v-col>
            </v-row>
          </v-col>
        </v-row>
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
import api from '../api';
import Sidebar from './Sidebar.vue';

export default {
  name: "DashboardView",
  components: { Sidebar },
  data() {
    return {
      user: null,
      transactions: [],
      search: "",
      selectedCategory: null,
      today: new Date().toLocaleDateString(undefined, { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })
    }
  },
  computed: {
    totalSpend() {
      const sum = this.transactions.reduce((accumulator, currentValue) => accumulator + currentValue.amount, 0);
      return sum
    },
    totalSpendFormatted() {
      return this.totalSpend.toLocaleString(undefined, { style: 'currency', currency: 'CAD' })
    }
  },
  async mounted() {
    await this.fetchSession()
    await this.fetchTransactions()
  },
  methods: {
    async fetchSession() {
      try {
        const response = await api.get('/accounts/session')
        this.user = response.data.user
      } catch (error) {
        console.error('No active session', error)
        this.$router.push('/login')
      }
    },
    async fetchTransactions() {
      try {
        const response = await api.get('/transactions')
        this.transactions = response.data.data
        console.log(this.transactions)
      } catch (error) {
        console.error('Failed to fetch transactions', error)
      }
    },
    async logOut() {
      try {
        await api.post('/accounts/logout')
        this.user = null
        this.userAvatar = ""
        this.$router.push('/')
      } catch (error) {
        
      }
    }
  }
}
</script>

<style scoped>
.dashboard-bg {
  background: linear-gradient(120deg, #f5f7fa 0%, #e0eafc 100%);
  min-height: 100vh;
}
.fill-bg {
  min-height: 100vh;
}
.fill-row {
  min-height: 100vh;
}
.summary-card {
  background: #fff;
  border-radius: 18px;
  box-shadow: 0 4px 24px rgba(33, 150, 243, 0.08);
}
.mb-2 { margin-bottom: 0.5rem; }
.mb-4 { margin-bottom: 1.5rem; }
.mb-6 { margin-bottom: 2.5rem; }
.summary-label {
  font-size: 1rem;
  color: #888;
}
.summary-value {
  font-size: 2rem;
  font-weight: bold;
  color: #1976d2;
}
.greeting-date {
  font-size: 1.1rem;
  color: #1976d2;
  font-weight: 500;
}
.empty-state {
  text-align: center;
  color: #aaa;
  margin-top: 1rem;
  font-size: 1.1rem;
}
.rounded-card {
  background: #fff;
  border-radius: 18px;
  box-shadow: 0 4px 24px rgba(33, 150, 243, 0.08);
}
</style>