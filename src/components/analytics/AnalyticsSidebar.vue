<template>
    <nav id="sidebarMenu" class="col-md-3 col-lg-2 d-md-block sidebar collapse">
        <div class="title">
            <img alt="Vue logo" src="../../assets/icons/image_2022-05-19_16-23-21.png">
            <h2>Observested</h2>
        </div>
        <hr>
        <div class="analytics">
            <img alt="Vue logo" src="../../assets/icons/icons8-chart-bar-96.png">
            <div class="dropdown">
                <button class="btnAnalytics dropdown-toggle" type="button" id="dropdownMenuButton1"
                        data-bs-toggle="dropdown" aria-expanded="false">
                    {{ $t("navbar.analytics") }}
                </button>
                <ul class="dropdown-menu" aria-labelledby="dropdownMenuButton1">
                    <li :class="[currentTab === 'general' ? 'analytics' : '', 'nav-item']">
                        <a :class="[currentTab === 'general' ? '' : '', 'nav-link']"
                           aria-current="page"
                           href="/analytics/general">
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"
                                 fill="none"
                                 stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
                                 class="feather feather-home" aria-hidden="true">
                                <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path>
                                <polyline points="9 22 9 12 15 12 15 22"></polyline>
                            </svg>
                            {{ $t("analytics.sidebar.general") }}
                        </a>
                    </li>
                    <li :class="[currentTab === 'month' ? 'analytics' : '', 'nav-item']">
                        <a :class="[currentTab === 'month' ? '' : '', 'nav-link']"
                           href="/analytics/month">
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor"
                                 class="bi bi-calendar-date" viewBox="0 0 16 16">
                                <path
                                    d="M6.445 11.688V6.354h-.633A12.6 12.6 0 0 0 4.5 7.16v.695c.375-.257.969-.62 1.258-.777h.012v4.61h.675zm1.188-1.305c.047.64.594 1.406 1.703 1.406 1.258 0 2-1.066 2-2.871 0-1.934-.781-2.668-1.953-2.668-.926 0-1.797.672-1.797 1.809 0 1.16.824 1.77 1.676 1.77.746 0 1.23-.376 1.383-.79h.027c-.004 1.316-.461 2.164-1.305 2.164-.664 0-1.008-.45-1.05-.82h-.684zm2.953-2.317c0 .696-.559 1.18-1.184 1.18-.601 0-1.144-.383-1.144-1.2 0-.823.582-1.21 1.168-1.21.633 0 1.16.398 1.16 1.23z"/>
                                <path
                                    d="M3.5 0a.5.5 0 0 1 .5.5V1h8V.5a.5.5 0 0 1 1 0V1h1a2 2 0 0 1 2 2v11a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V3a2 2 0 0 1 2-2h1V.5a.5.5 0 0 1 .5-.5zM1 4v10a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V4H1z"/>
                            </svg>
                            {{ $t("analytics.sidebar.month") }}
                        </a>
                    </li>
                    <li :class="[currentTab === 'clients' ? 'analytics' : '', 'nav-item']">
                        <a :class="[currentTab === 'clients' ? '' : '', 'nav-link']"
                           href="/analytics/clients">
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"
                                 fill="none"
                                 stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
                                 class="feather feather-users" aria-hidden="true">
                                <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
                                <circle cx="9" cy="7" r="4"></circle>
                                <path d="M23 21v-2a4 4 0 0 0-3-3.87"></path>
                                <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
                            </svg>
                            {{ $t("analytics.sidebar.clients") }}
                        </a>
                    </li>
                    <li :class="[currentTab === 'goods' ? 'analytics' : '', 'nav-item']">
                        <a :class="[currentTab === 'goods' ? '' : '', 'nav-link']"
                           href="/analytics/goods">
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor"
                                 class="bi bi-shop" viewBox="0 0 16 16">
                                <path
                                    d="M2.97 1.35A1 1 0 0 1 3.73 1h8.54a1 1 0 0 1 .76.35l2.609 3.044A1.5 1.5 0 0 1 16 5.37v.255a2.375 2.375 0 0 1-4.25 1.458A2.371 2.371 0 0 1 9.875 8 2.37 2.37 0 0 1 8 7.083 2.37 2.37 0 0 1 6.125 8a2.37 2.37 0 0 1-1.875-.917A2.375 2.375 0 0 1 0 5.625V5.37a1.5 1.5 0 0 1 .361-.976l2.61-3.045zm1.78 4.275a1.375 1.375 0 0 0 2.75 0 .5.5 0 0 1 1 0 1.375 1.375 0 0 0 2.75 0 .5.5 0 0 1 1 0 1.375 1.375 0 1 0 2.75 0V5.37a.5.5 0 0 0-.12-.325L12.27 2H3.73L1.12 5.045A.5.5 0 0 0 1 5.37v.255a1.375 1.375 0 0 0 2.75 0 .5.5 0 0 1 1 0zM1.5 8.5A.5.5 0 0 1 2 9v6h1v-5a1 1 0 0 1 1-1h3a1 1 0 0 1 1 1v5h6V9a.5.5 0 0 1 1 0v6h.5a.5.5 0 0 1 0 1H.5a.5.5 0 0 1 0-1H1V9a.5.5 0 0 1 .5-.5zM4 15h3v-5H4v5zm5-5a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v3a1 1 0 0 1-1 1h-2a1 1 0 0 1-1-1v-3zm3 0h-2v3h2v-3z"/>
                            </svg>
                            {{ $t("analytics.sidebar.goods") }}
                        </a>
                    </li>
                </ul>
            </div>
        </div>
        <div :class="[currentTab === 'workers' ? 'current' : 'list', 'nav-item']">
            <img alt="Vue logo" src="../../assets/icons/icons8-популярный-человек-100.png" >
            <a href="/workers">{{ $t("navbar.workers") }}</a>
        </div>
        <div :class="[currentTab === 'customers' ? 'current' : 'list', 'nav-item']">
            <img alt="Vue logo" src="../../assets/icons/icons8_мужчины_возрастной_группы_5_100_1.png">
            <a href="/customers">{{ $t("navbar.customers") }}</a>
        </div>
        <div :class="[currentTab === 'products' ? 'current' : 'list', 'nav-item']">
            <img alt="Vue logo" src="../../assets/icons/icons8-товар-100.png">
            <a href="/products">{{ $t("navbar.products") }}</a>
        </div>
        <hr>
        <div :class="[currentTab === 'places' ? 'current' : 'list', 'nav-item']">
            <img alt="Vue logo" src="../../assets/icons/icons8-здание-ресторана-100.png">
            <a href="/places">{{ $t("navbar.places") }}</a>
        </div>
        <div class="language">
            <img alt="Vue logo" src="../../assets/icons/icons8-география.png">
            <div class="dropdown">
                <button class="btn dropdown-toggle" type="button" id="dropdownMenuButton1"
                        data-bs-toggle="dropdown" aria-expanded="false">
                    {{ $t("navbar.language") }}
                </button>
                <ul class="dropdown-menu" aria-labelledby="dropdownMenuButton1">
                    <li><a class="drop dropdown-item" href="#" @click="setLocale('uk')">ua</a></li>
                    <li><a class="drop dropdown-item" href="#" @click="setLocale('en-gb')">en</a></li>
                </ul>
            </div>
        </div>
        <div class="exit">
            <img alt="Vue logo" src="../../assets/icons/icons8-выход.png">
            <a @click="logout"> {{ $t("navbar.exit") }}</a>
        </div>
    </nav>
</template>

<script>
import {logout} from "@/api";

export default {
    name: "AnalyticsSidebar",
    props: {
        currentTab: String
    },
    methods: {
        setLocale: function (locale) {
            localStorage.setItem('locale', locale);
            window.location.reload();
        },
        logout: () => {
            logout(localStorage.getItem('authToken'))
                .then(() => {
                    localStorage.removeItem("authToken");
                    localStorage.removeItem("authTokenDate");
                    window.location.replace('/login');
                })
        }
    }
}
</script>

<style scoped>
.title {
    display: flex;
    justify-content: space-evenly;
}

.title img {
    width: 50px;
    margin-top: 30px;
}

.title h2 {
    position: relative;
    top: 13px;
    margin-top: 30px;

}

.current {
    background-color: #0052CC;
    padding: 10px 10px 10px 20px;
    color: white;
    margin-top: 30px;
    border-radius: 56px;
}

.analytics a:hover {
    color: black;
}

.current a {
    color: white;
    position: relative;
    font-size: 28px;
    top: 6px;
    left: 18px;
}


.current img {
    color: black;
    width: 50px;
    filter: brightness(5);
}


.current a:hover {
    color: white;
    text-decoration: none;
}

ul a {
    font-family: 'Montserrat', sans-serif;
    font-size: 18px;
    color: #000;
}

a:hover {
    text-decoration: underline;
    color: blue;
}

.analytics {
    display: flex;
    cursor: pointer;
}

.analytics img {
    color: black;
    width: 50px;
}

.language {
    margin-top: 40px;
    display: flex;
}

.language img {
    color: black;
    width: 50px;
}

.btnAnalytics {
    background-color: transparent;
    font-size: 26px;
    position: relative;
    top: 10px;
    left: 10px;
    border: none;
}


.btn {
    background-color: transparent;
    font-size: 24px;
    position: relative;
    top: 10px;
    left: 10px;
    border: none;
}

.dropdown-item {
    background-color: transparent;
    border: none;
}

.drop {
    background-color: transparent;
    border: none;
}

ul li {
    background-color: transparent;
    border: none;
}

.clients img {
    color: black;
    width: 50px;
}

.clients a {
    color: black;
    position: relative;
    font-size: 24px;
    top: 15px;
    left: 18px;

}

.list img {
    color: black;
    width: 50px;
}

.list a {
    color: black;
    position: relative;
    font-size: 24px;
    top: 6px;
    left: 18px;
}

.list {
    margin-top: 40px;
}

.clients {
    margin-top: 25px;
}

.exit {
    margin-top: 25px;
    cursor: pointer;
}

.exit img {
    color: black;
    width: 50px;
}

.exit a {
    color: black;
    position: relative;
    font-size: 24px;
    top: 6px;
    left: 18px;
}

</style>
