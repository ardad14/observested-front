import { createRouter, createWebHistory} from 'vue-router'
import LoginComponent from "@/components/auth/LoginComponent";
import RegistrationComponent from "@/components/auth/RegistrationComponent";
import AnalyticsClients from "@/components/analytics/AnalyticsClients";
import AnalyticsGeneral from "@/components/analytics/AnalyticsGeneral";
import AnalyticsGoods from "@/components/analytics/AnalyticsGoods";
import AnalyticsMonth from "@/components/analytics/AnalyticsMonth";

export default  createRouter({
    history: createWebHistory(),
    routes: [
        { path: '/analytics/general', component: AnalyticsGeneral},
        { path: '/analytics/clients', component: AnalyticsClients },
        { path: '/analytics/goods', component: AnalyticsGoods },
        { path: '/analytics/month', component: AnalyticsMonth },
        { path: '/register', component: RegistrationComponent },
        { path: '/login', component: LoginComponent, alias: '/' }
    ]
})