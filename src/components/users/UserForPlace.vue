<template>
    <div class="d-flex flex-column col-10 container justify-content-center align-content-center mt-5">
        <div class="mt-3 p-4">
            <h3 class="text-center text-decoration-underline">{{ $t("workers.title") }}</h3>
            <table class="table mt-4">
                <thead>
                <tr>
                    <th scope="col">#</th>
                    <th scope="col">{{ $t("workers.table.name") }}</th>
                    <th scope="col">{{ $t("workers.table.surname") }}</th>
                    <th scope="col">{{ $t("workers.table.email") }}</th>
                    <th scope="col">{{ $t("workers.table.position") }}</th>
                </tr>
                </thead>
                <tbody>
                <tr v-for="(worker, index) in this.users" :key="index">
                    <th scope="row">{{ worker.index }}</th>
                    <td>{{ worker.name }}</td>
                    <td>{{ worker.surname }}</td>
                    <td>{{ worker.email }}</td>
                    <td>{{ worker.role }}</td>
                    <!--                    <td><a class="btn btn-primary" :href=editClient(client.id) >Змінити</a></td>-->
                </tr>
                </tbody>
            </table>
        </div>
        <a class="btn btn-primary" href="/addWorker">{{ $t("workers.addNewWorker") }}</a>
    </div>
</template>

<script>
import {getUsersForPlace} from "@/api";

export default {
    name: "UserForPlace",
    data: () => ({
        users: []
    }),
    beforeMount() {
        if (localStorage.getItem('authToken') === null) {
            this.$router.push('/login');
            return;
        }
        getUsersForPlace(localStorage.getItem('authToken'))
            .then(response => {
                this.users = response.data.users;
                console.log(this.users);
            })
            .catch(response => console.log(response.data))
    }
}
</script>

<style scoped>

</style>