<template>
    <div class="container-fluid">
        <div class="row">
            <AnalyticsSidebar currentTab="month" />
            <main class="col-md-9 ms-sm-auto col-lg-10 px-md-4"><div class="chartjs-size-monitor"><div class="chartjs-size-monitor-expand"><div class=""></div></div><div class="chartjs-size-monitor-shrink"><div class=""></div></div></div>
                <div class="d-flex flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom">
                    <h1 class="col-5 h2">{{ $t("analytics.month.title") }}</h1>
                    <h2 class="h3">{{ this.month }}</h2>
                </div>
                <Bar
                    :chart-options="this.chartOptions"
                    :chart-data="this.chartData"
                    :width="1479"
                    :height="624"
                />
                <h2>{{ $t("analytics.dataTitle") }}</h2>
                <div class="table-responsive">
                    <table class="table table-striped table-sm">
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
            </main>
        </div>
    </div>
</template>

<script>
import AnalyticsSidebar from "@/components/analytics/AnalyticsSidebar";
import moment from 'moment/moment';
import { Bar } from 'vue-chartjs'
import {getGeneralAnalytics} from "@/api";
import { Chart as ChartJS, Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale } from 'chart.js'
ChartJS.register(Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale)
require(`moment/locale/${localStorage.getItem('locale')}`);

export default {
    name: "AnalyticsMonth",
    components: {
        AnalyticsSidebar,
        Bar,
    },
    data: () =>  ({
        allMonth: [
            'Лютий',
            'Січень',
            'Березень',
            'Квітень',
            'Травень',
            'Червень',
            'Липень',
            'Серпень',
            'Вересень',
            'Жовтень',
            'Листопад',
            'Грудень',
        ],
        month: Number,
        generalAnalyticsData: [],
        chartData: Object,
        chartOptions: Object,

    }),
    beforeMount() {
        this.month = this.allMonth[moment().get('month')];
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
            let actionsData = this.generalAnalyticsData.filter(data => moment(data.created_at).month() === moment().get('month'));

            let labels = [...Array(actionsData.length)].map((v, i) => i + 1);
            let data = actionsData.map(data => data.pivot.spend_money);
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
    },
}
</script>

<style scoped>
    h1{
        font-family: 'Montserrat', sans-serif;
        font-size: 30px;
        font-weight: 500;
    }
    h2{
        font-family: 'Montserrat', sans-serif;
        font-size: 30px;
        font-weight: 500;
        margin: 30px 0;
    }

    table th{
        font-family: 'Montserrat', sans-serif;
        background: #A0A0A0;
        margin-right: 5px;
        color: white;
        padding: 10px 5px;
    }
    td:first-child {
        background:#A0A0A0;
        font-family: 'Montserrat', sans-serif;
        color: white;
        padding: 10px 5px;
    }
    th, td {
        border-style: solid;
        border-width: 0 1px 1px 0;
        border-color: white;
        font-size: 18px;
    }
    td {
        background: #E8E8E8;
    }
    th:first-child, td:first-child {
        text-align: center;
    }
</style>
