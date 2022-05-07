import {createApp} from 'vue'
import App from './App.vue'
import i18n from "@/i18n"
import 'bootstrap/dist/css/bootstrap.min.css'
import 'jquery/src/jquery.js'
import 'bootstrap/dist/js/bootstrap.min.js';
import router from './router'

const app = createApp(App,{
    data: () => ({
        user: {},
    }),
    beforeMount() {
        let deleteTokenDate = Date.parse(localStorage.getItem('authTokenDate'));
        deleteTokenDate.setHours(deleteTokenDate.getHours + 24);
        if (deleteTokenDate <= new Date()) {
            localStorage.removeItem("authToken");
            localStorage.removeItem("authTokenDate");
        }
    }
})
app.use(router);
app.use(i18n);
app.mount('#app');
