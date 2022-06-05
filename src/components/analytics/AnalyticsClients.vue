<template>
    <div class="container-fluid">
        <div class="row">
            <AnalyticsSidebar currentTab="clients"/>
            <div class="wrapper col-md-9 ms-sm-auto col-lg-10 px-md-4">
                <div class="chartjs-size-monitor">
                    <div class="chartjs-size-monitor-expand">
                        <div class=""></div>
                    </div>
                    <div class="chartjs-size-monitor-shrink">
                        <div class=""></div>
                    </div>
                </div>
                <div class="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom">
                    <h1>{{ $t("analytics.clients.title") }}</h1>
                    <h2>{{ place.name }}</h2>
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
                            <td>{{ convertData(action.pivot.created_at) }}</td>
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
    name: "AnalyticsClients",
    components: {
        AnalyticsSidebar,
        Bar,
    },
    data: () => ({
        generalAnalyticsData: [],
        chartData: Object,
        chartOptions: Object,
    }),
    computed: {
        place() {
            return this.$store.state.place
        }
    },
    beforeMount() {
        if (localStorage.getItem('authToken') === null) {
            this.$router.push('/login');
            return;
        }
        getGeneralAnalytics(localStorage.getItem('authToken'), localStorage.getItem('actualPlaceId'))
            .then(response => {
                this.generalAnalyticsData = response.data.actions.customers;
                this.render();
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
    },
    methods: {
        render: function () {
            let actionsData = this.generalAnalyticsData;

            let children = actionsData.filter(data => data.age >= 10 && data.age <= 14);
            let teenagers = actionsData.filter(data => data.age >= 15 && data.age <= 24);
            let young = actionsData.filter(data => data.age >= 25 && data.age <= 44);
            let mid = actionsData.filter(data => data.age >= 45 && data.age <= 64);
            let old = actionsData.filter(data => data.age >= 65);

            let childrenMoney = 0;
            let teenagersMoney = 0;
            let youngMoney = 0;
            let midMoney = 0;
            let oldMoney = 0;

            children.forEach(data => {
                childrenMoney += data.pivot.spend_money
            });
            teenagers.forEach(data => {
                teenagersMoney += data.pivot.spend_money
            });
            young.forEach(data => {
                youngMoney += data.pivot.spend_money
            });
            mid.forEach(data => {
                midMoney += data.pivot.spend_money
            });
            old.forEach(data => {
                oldMoney += data.pivot.spend_money
            });

            let labels = ['10-14', '15-24', '25-44', '45-64', '65+']
            let data = [childrenMoney, teenagersMoney, youngMoney, midMoney, oldMoney];
            let colors = this.generateRGBA();

            this.chartData = {
                labels: labels,
                datasets: [{
                    label: 'Money',
                    data: data,
                    backgroundColor: colors.map(color => color + '0.5)'),
                    borderColor: colors.map(color => color + '1)'),
                    borderWidth: 2,
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
        randRGBNumber: function () {
            return Math.floor(Math.random() * 255);
        },
        generateRGBA: function () {
            let COLORS = [];
            while (COLORS.length < 100) {
                COLORS.push(`rgba(${this.randRGBNumber()}, ${this.randRGBNumber()}, ${this.randRGBNumber()}, `);
            }
            return COLORS;
        },
        calculateMedian: function (array) {
            let half = Math.floor(array.length / 2);
            array.sort(function (a, b) {
                return a - b;
            });

            if (array.length % 2) {
                return array[half];
            } else {
                return (array[half] + array[half] + 1) / 2.0;
            }
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
    font-size: 28px;
    font-weight: 700;
    margin-top: 50px;
    position:relative;
    right: 50px;
    color: #808191;
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
