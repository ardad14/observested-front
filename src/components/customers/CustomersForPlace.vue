<template>
    <div class="container-fluid">
        <div class="row">
            <AnalyticsSidebar current-tab="customers"/>
            <div class="wrapper col-md-9 ms-sm-auto col-lg-10 px-md-4">
                <h1>{{ $t("clients.title") }}</h1>
                <div class="customTable">
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
                            <th scope="row">{{ index+1 }}</th>
                            <td>{{ cutomer.name }}</td>
                            <td>{{ cutomer.surname }}</td>
                            <td>{{ cutomer.age }}</td>
                            <td>{{ cutomer.spend_money }} грн</td>
                            <td><button class="btn"><a>{{ $t("clients.table.change") }}</a></button></td>
                        </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import {getCustomersForPlace} from "@/api";
import AnalyticsSidebar from "@/components/analytics/AnalyticsSidebar";

export default {
    name: "CustomersForPlace",
    components: {
        AnalyticsSidebar
    },
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
.wrapper {
    margin-top: 50px;
}

.wrapper h1 {
    margin-bottom: 90px;
    margin-left: 50px;
}

.customTable {
    background-color: #fff;
    width: 90%;
    margin-left: 50px;
    padding: 40px;
    border-radius: 90px;
    margin-bottom: 50px;
    border-bottom: 30px solid #0052CC;
    border-right: 20px solid #0052CC;

}

table thead th {
    border-top: none;
    color: #0052CC;
    font-family: 'Martel Sans', sans-serif;
    font-style: normal;
    font-weight: 700;
    font-size: 21px;
}

table tbody td {
    font-family: 'Martel Sans', sans-serif;
    font-style: normal;
    font-size: 18px;
    padding: 18px;
}

.btn{
    padding: 10px;
    width: 200px;
    font-size: 22px;
    background-color: #0052CC;
    border-radius: 30px;
    color: white;
}

.btn a{
    color: white;
    text-decoration: none;
}

.btn a:hover{
    text-decoration: underline;
}

table tbody th {
    font-family: 'Martel Sans', sans-serif;
    font-style: normal;
    font-size: 18px;
    padding: 18px;
}
</style>