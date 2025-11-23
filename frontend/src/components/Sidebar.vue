<template>
  <v-navigation-drawer app permanent width="220" color="#f5f7fa">
    <v-list class="d-flex flex-column justify-center align-center" style="height: 100%">
      <v-list-item>
        <v-avatar size="56" class="mb-2">
          <v-icon size="56">mdi-account-circle</v-icon>
        </v-avatar>
        <div class="user-info">
          <div class="user-name">{{ username }}</div>
        </div>
      </v-list-item>
      <v-divider class="my-2" />
      <v-list-item to="/dashboard" prepend-icon="mdi-view-dashboard">Dashboard</v-list-item>
      <v-spacer />
      <v-list-item @click="signOut" prepend-icon="mdi-logout">Sign Out</v-list-item>
    </v-list>
  </v-navigation-drawer>
</template>

<script>
export default {
  name: 'SidebarNav',
  props: {
    username: {
      type: String,
      default: 'User'
    },
    signOut: {
      type: Function,
      default: () => {}
    },
    avatar: {
      type: String,
      default: ''
    }
  }
}
</script>

<style scoped>
.user-info {
  margin-left: 8px;
}
.user-name {
  font-weight: bold;
  font-size: 1.1rem;
}
.user-role {
  font-size: 0.9rem;
  color: #888;
}
</style>