<template>
    <div class="container-fluid">
        <div class="row">
            <AnalyticsSidebar current-tab="workers"/>
            <hr>
            <div class="wrapper col-md-9 ms-sm-auto col-lg-10 px-md-4">
                <h1 class="col-5 h2">{{ $t("workers.title") }}</h1>
                <div class="customTable">
                    <table class="table">
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
                            <th scope="row">{{ index+1 }}</th>
                            <td>{{ worker.name }}</td>
                            <td>{{ worker.surname }}</td>
                            <td>{{ worker.email }}</td>
                            <td>{{ worker.role }}</td>
                            <!--                    <td><a class="btn btn-primary" :href=editClient(client.id) >Змінити</a></td>-->
                        </tr>
                        </tbody>
                    </table>
                </div>
                <div class="btn">
                    <a href="/addWorker">{{ $t("workers.addNewWorker") }}</a>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import {getUsersForPlace} from "@/api";
import AnalyticsSidebar from "@/components/analytics/AnalyticsSidebar";

export default {
    name: "UserForPlace",
    components: {
        AnalyticsSidebar
    },
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
                this.users = response.data;
                console.log(this.users);
            })
            .catch(() => {
                this.$swal({
                    position: 'top-end',
                    icon: 'error',
                    title: this.$t('something_went_wrong.title'),
                    text: this.$t('something_went_wrong.text'),
                    toast: true,
                    showConfirmButton: false,
                    timer: 4000,
                    timerProgressBar: true,
                });
            })
    }
}
</script>

<style scoped>
.wrapper{
    margin-top: 50px;
}

.wrapper h1{
    margin-bottom: 90px;
    margin-left: 50px;
}

.customTable{
    background-color: #fff;
    width: 90%;
    margin-left: 50px;
    padding: 40px;
    border-radius: 90px;
    border-bottom: 30px solid #0052CC;
    border-right: 20px solid #0052CC;

}

.btn{
    margin-top: 50px;
    margin-left: 550px;
    padding: 15px;
    font-size: 22px;
    background-color: #0052CC;
    border-radius: 30px;
    width: 300px;
}

hr{
    transform: rotate(90deg);
    position: relative;
    left: -650px;
    margin-top: 0;
}
.btn a{
    text-decoration: none;
    color:white;
}

table thead th{
    border-top: none;
    color: #0052CC;
    font-family: 'Martel Sans', sans-serif;
    font-style: normal;
    font-weight: 700;
    font-size: 21px;
}

table tbody td{
    font-family: 'Martel Sans', sans-serif;
    font-style: normal;
    font-size: 18px;
    padding: 18px;
}

table tbody th{
    font-family: 'Martel Sans', sans-serif;
    font-style: normal;
    font-size: 18px;
    padding: 18px;
}

</style>