import {createRouter, createWebHistory} from 'vue-router'
import LoginComponent from "@/components/auth/LoginComponent";
import RegistrationComponent from "@/components/auth/RegistrationComponent";
import AnalyticsClients from "@/components/analytics/AnalyticsClients";
import AnalyticsGeneral from "@/components/analytics/AnalyticsGeneral";
import AnalyticsGoods from "@/components/analytics/AnalyticsGoods";
import AnalyticsMonth from "@/components/analytics/AnalyticsMonth";
import UserForPlace from "@/components/users/UserForPlace";
import CustomersForPlace from "@/components/customers/CustomersForPlace";
import PlacesForUser from "@/components/places/PlacesForUser";
import CreatePlace from "@/components/places/CreatePlace";
import EditPlace from "@/components/places/EditPlace";

export default createRouter({
    history: createWebHistory(),
    routes: [
        {
            path: '/analytics/general',
            component: AnalyticsGeneral,
            alias: '/'
        },
        {
            path: '/analytics/clients',
            component: AnalyticsClients
        },
        {
            path: '/analytics/goods',
            component: AnalyticsGoods
        },
        {
            path: '/analytics/month',
            component: AnalyticsMonth
        },
        {
            path: '/workers',
            component: UserForPlace
        },
        {
            path: '/customers',
            component: CustomersForPlace
        },
        {
            path: '/register',
            component: RegistrationComponent
        },
        {
            path: '/login',
            component: LoginComponent
        },
        {
            path: '/places',
            component: PlacesForUser
        },
        {
            path: '/place/create',
            component: CreatePlace
        },
        {
            name: 'edit_place',
            path: '/place/edit/:placeId',
            component: EditPlace,
            props: {

            }
        },
    ]
})