<template>
    <div class="d-flex flex-column col-10 container justify-content-center align-content-center ">
        <input type="hidden" name="_token" :value="this.csrfToken">
        <div class="mt-3 p-4">
            <h3 class="text-center text-decoration-underline">{{ $t("clients.title") }}</h3>
            <table class="table mt-4">
                <thead>
                <tr>
                    <th scope="col">#</th>
                    <th scope="col">{{ $t("clients.table.name") }}</th>
                    <th scope="col">{{ $t("clients.table.surname") }}</th>
                    <th scope="col">{{ $t("clients.table.age") }}</th>
                    <th scope="col">{{ $t("clients.table.spendMoney") }}</th>
                    <th scope="col">.</th>
                </tr>
                </thead>
                <tbody>
                <tr v-for="(cutomer, index) in this.customers" :key="index">
                    <th scope="row">{{ cutomer.id }}</th>
                    <td>{{ cutomer.name }}</td>
                    <td>{{ cutomer.surname }}</td>
                    <td>{{ cutomer.age }}</td>
                    <td>{{ cutomer.spend_money }} грн</td>
                    <td><a class="btn btn-primary" >{{ $t("clients.table.change") }}</a></td>
                </tr>
                </tbody>
            </table>
        </div>
    </div>
</template>

<script>
import {getCustomersForPlace} from "@/api";

export default {
    name: "CustomersForPlace",
    data: () => ({
        customers: []
    }),
    beforeMount() {
        if (localStorage.getItem('authToken') === null) {
            this.$router.push('/login');
            return;
        }
        getCustomersForPlace(localStorage.getItem('authToken'))
            .then(response => {
                this.customers = response.data.customers;
                console.log(this.customers);
            })
            .catch(response => console.log(response.data))
    }
}
</script>

<style scoped>

</style>