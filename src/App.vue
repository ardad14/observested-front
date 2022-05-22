<template>
    <!--    <MainHeader />-->
    <router-view></router-view>
</template>

<script>
// import MainHeader from "@/components/headers/MainHeader";

export default {
    name: 'App',
    components: {
        // MainHeader,
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
