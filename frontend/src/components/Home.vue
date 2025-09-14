<template>
    <div>
        <button @click="logOut">Logout</button>
        <button @click="checkLoginStatus">Check login status</button>
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