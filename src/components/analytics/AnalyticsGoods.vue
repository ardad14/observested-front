<template>
    <div class="container-fluid">
        <div class="row">
            <AnalyticsSidebar currentTab="goods"/>
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
                    <h1 class="col-5 h2">{{ $t("analytics.goods.title") }}</h1>
                    <h2>{{ this.place.name }}</h2>
                </div>
                <Bar
                    :chart-options="this.chartOptions"
                    :chart-data="this.chartData"
                    :width="1200"
                    :height="500"
                    class="bar"
                />
                <h3>{{ $t("analytics.dataTitle") }}</h3>
                <div class="table-responsive">
                    <table>
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
            </div>
        </div>
    </div>
</template>

<script>
import AnalyticsSidebar from "@/components/analytics/AnalyticsSidebar";
import {Bar} from 'vue-chartjs'
import {getProductAnalytics} from "@/api";
import {Chart as ChartJS, Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale} from 'chart.js'

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
        getProductAnalytics(localStorage.getItem('authToken'), localStorage.getItem('actualPlaceId'))
            .then(response => {
                this.generalProductsData = response.data;
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
h3{
    margin-left: 210px;
    font-family: 'Martel Sans', sans-serif;
    font-size: 30px;
    font-weight: 700;
    margin-top: 50px;
    margin-bottom: 50px;

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

table{
    width: 60%;
    margin-left: 210px;
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

th:last-child, td:last-child {
    width: 10%;
}
</style>
