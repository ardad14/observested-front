<template>
    <div class="container-fluid">
        <div class="row">
            <AnalyticsSidebar currentTab="general"/>
            <div class="wrapper col-md-9 ms-sm-auto col-lg-10 px-md-4">
                <div class="chartjs-size-monitor">
                    <div class="chartjs-size-monitor-expand">
                        <div class=""></div>
                    </div>
                    <div class="chartjs-size-monitor-shrink">
                        <div class=""></div>
                    </div>
                </div>
                <div
                    class="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom">
                    <h1 class="h2">{{ $t("analytics.general.title") }}</h1>
                </div>
                <Bar
                    :chart-options="this.chartOptions"
                    :chart-data="this.chartData"
                    :width="1200"
                    :height="500"
                    class="bar"
                />
                <h2>{{ $t("analytics.dataTitle") }}</h2>
                <div class="table-responsive">
                    <table>
                        <thead>
                        <tr>
                            <th scope="col">#</th>
                            <th scope="col">{{ $t("analytics.table.clients") }}</th>
                            <th scope="col">{{ $t("analytics.table.money") }}</th>
                            <th scope="col">{{ $t("analytics.table.date") }}</th>
                        </tr>
                        </thead>
                        <tbody>
                        <tr v-for="(action, index) in this.generalAnalyticsData" :key="index">
                            <td>{{ index }}</td>
                            <td>{{ action.id }}</td>
                            <td>{{ action.pivot.spend_money }}</td>
                            <td>{{ convertData(action.created_at) }}</td>
                        </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import AnalyticsSidebar from "@/components/analytics/AnalyticsSidebar";
import moment from 'moment/moment';
import {Bar} from 'vue-chartjs'
import {getGeneralAnalytics} from "@/api";
import {Chart as ChartJS, Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale} from 'chart.js'

ChartJS.register(Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale)
require(`moment/locale/${localStorage.getItem('locale')}`);

export default {
    name: "AnalyticsGeneral",
    components: {
        AnalyticsSidebar,
        Bar
    },
    data: () => ({
        generalAnalyticsData: [],
        chartData: Object,
        chartOptions: Object,
    }),
    beforeMount() {
        if (localStorage.getItem('authToken') === null) {
            this.$router.push('/login');
            return;
        }
        getGeneralAnalytics(localStorage.getItem('authToken'))
            .then(response => {
                this.generalAnalyticsData = response.data.actions.customers;
                this.render();
            })
            .catch(response => console.log(response.data))
    },
    methods: {
        render: function () {
            let actionsData = this.generalAnalyticsData;
            let monthMoney = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
            console.log(actionsData);
            actionsData.forEach(data => {
                monthMoney[moment(data.created_at).month()] += data.pivot.spend_money
            })

            this.chartData = {
                labels: moment.months(),
                datasets: [{
                    label: 'Money',
                    data: monthMoney,
                    backgroundColor: [
                        'rgba(255, 99, 132, 0.5)',
                        'rgba(54, 162, 235, 0.5)',
                        'rgba(255, 206, 86, 0.5)',
                        'rgba(75, 192, 192, 0.5)',
                        'rgba(153, 102, 255, 0.5)',
                        'rgba(255, 159, 64, 0.5)',
                        'rgba(39, 174, 96, 0.5)',
                        'rgba(72, 52, 212, 0.5)',
                        'rgba(253, 121, 168, 0.5)',
                        'rgba(162, 155, 254, 0.5)',
                        'rgba(83, 92, 104, 0.5)',
                        'rgba(186, 220, 88, 0.5)'
                    ],
                    borderColor: [
                        'rgba(255, 99, 132, 1)',
                        'rgba(54, 162, 235, 1)',
                        'rgba(255, 206, 86, 1)',
                        'rgba(75, 192, 192, 1)',
                        'rgba(153, 102, 255, 1)',
                        'rgba(255, 159, 64, 1)',
                        'rgba(39, 174, 96, 1.0)',
                        'rgba(72, 52, 212, 1.0)',
                        'rgba(253, 121, 168, 1.0)',
                        'rgba(162, 155, 254, 1.0)',
                        'rgba(83, 92, 104, 1.0)',
                        'rgba(186, 220, 88, 1.0)'
                    ],
                    borderWidth: 2
                }]
            };

            this.chartOptions = {
                legend: {
                    display: false
                }
            }
        },
        convertData: function (date) {
            return moment(date).format("LL")
        },
    },
}
</script>

<style scoped>

h1 {
    font-family: 'Martel Sans', sans-serif;
    font-size: 30px;
    font-weight: 700;
    margin-top: 40px;
}

h2 {
    font-family: 'Martel Sans', sans-serif;
    font-size: 30px;
    font-weight: 700;
    margin: 50px 0;
}

hr {
    transform: rotate(90deg);
    position: relative;

    margin-top: 0;
}

.bar {
    border-radius: 100px;
    border: 1px solid #808191;
    padding: 40px;
    width: 90%;
}

table th {
    font-family: 'Martel Sans', sans-serif;
    background: #0052CC;
    margin-right: 5px;
    color: white;
    border-color: white;
    padding: 10px 5px;
}

td:first-child {
    background: #0052CC;
    font-family: 'Martel Sans', sans-serif;
    color: white;
    padding: 10px 5px;
}

th, td:first-child {
    border-style: solid;
    border-width: 0 1px 1px 0;
    border-color: #FFFFFF;
    font-size: 18px;
}

th, td {
    border-style: solid;
    border-width: 0 1px 1px 0;
    border-color: #0052CC;
    font-size: 18px;
    color: #0052CC;
    font-weight: 700;
    padding-top: 10px;
    padding-bottom: 10px;
    padding-left: 21px;
    font-family: 'Martel Sans', sans-serif;

}

td {
    background: #fff;
}

th:first-child, td:first-child {
    text-align: center;
    font-weight: 400;
    font-family: 'Martel Sans', sans-serif;
    width: 5%;
}

th:nth-child(2), td:nth-child(2) {
    width: 10%;
}

th:nth-child(3), td:nth-child(3) {
    width: 10%;
}

th:last-child, td:last-child {
    width: 15%;
}
</style>
