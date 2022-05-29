<template>
    <router-view></router-view>
</template>

<script>
import { getFirstPlaceForUser, getPlaceById } from "@/api";

export default {
    name: 'App',
    beforeMount() {
        //this.dateRemoveAuthToken();
        if (localStorage.getItem('authToken') === null) {
            return;
        }
        if (localStorage.getItem('actualPlaceId') === null) {
            getFirstPlaceForUser(localStorage.getItem('authTokenDate'))
                .then(response => this.$store.commit('setPlace', response.data.place));
        } else {
            getPlaceById(localStorage.getItem('authToken'), localStorage.getItem('actualPlaceId'))
                .then(response => this.$store.commit('setPlace', response.data.place));
        }
    },
    methods: {
        dateRemoveAuthToken: () => {
            let deleteTokenDate = Date.parse(localStorage.getItem('authTokenDate'));
            deleteTokenDate.setHours(deleteTokenDate.getHours + 24);
            if (deleteTokenDate <= new Date()) {
                localStorage.removeItem("authToken");
                localStorage.removeItem("authTokenDate");
            }
        }
    }
}
</script>

<style>

#app {
  font-family: 'Martel Sans', sans-serif;
  margin: 0;
  background-color: #F2F6FC;
  min-height: 100vh;
  padding: 0;
}
</style>
