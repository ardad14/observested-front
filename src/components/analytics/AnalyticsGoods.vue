<template>
    <div class="container-fluid">
        <div class="row">
            <AnalyticsSidebar currentTab="goods" />
            <main class="col-md-9 ms-sm-auto col-lg-10 px-md-4"><div class="chartjs-size-monitor"><div class="chartjs-size-monitor-expand"><div class=""></div></div><div class="chartjs-size-monitor-shrink"><div class=""></div></div></div>
                <div class="d-flex flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom">
                    <h1 class="col-5 h2">{{ $t("analytics.goods.title") }}</h1>
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
                            <th scope="col">{{ $t("analytics.goods.good") }}</th>
                            <th scope="col">{{ $t("analytics.goods.price") }}</th>
                        </tr>
                        </thead>
                        <tbody>
                        <tr v-for="(action, index) in this.generalProductsData" :key="index">
                            <td>{{ index }}</td>
                            <td>{{ action.name }}</td>
                            <td>{{ action.price }}</td>
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
import { Bar } from 'vue-chartjs'
import {getProductAnalytics} from "@/api";
import { Chart as ChartJS, Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale } from 'chart.js'
ChartJS.register(Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale)

require(`moment/locale/${localStorage.getItem('locale')}`);

export default {
    name: "AnalyticsGoods",
    components: {
        AnalyticsSidebar,
        Bar
    },
    data: () => ({
        generalProductsData: [],
        chartData: Object,
        chartOptions: Object,
    }),
    beforeMount() {
        if (localStorage.getItem('authToken') === null) {
            this.$router.push('/login');
            return;
        }
        getProductAnalytics(localStorage.getItem('authToken'))
            .then(response => {
                this.generalProductsData = response.data.products;
                this.render();
            })
            .catch(response => console.log(response.data))
    },
    methods: {
        render: function () {
            let actionsData = this.generalProductsData;

            let labels = actionsData.map(data => data.name);
            let data = actionsData.map(data => data.sold * data.price);
            let colors = this.generateRGBA();

            this.chartData = {
                labels: labels,
                datasets: [{
                    label: 'Amount',
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
    }
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
