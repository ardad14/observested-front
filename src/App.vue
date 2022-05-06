<template>
    <MainHeader />
    <router-view></router-view>
</template>

<script>
import MainHeader from "@/components/headers/MainHeader";

export default {
    name: 'App',
    components: {
        MainHeader,
    }
}
</script>

<style>

</style>
