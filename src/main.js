import {createApp} from 'vue'
import {createStore} from "vuex";
import App from './App.vue'
import i18n from "@/i18n"
import 'bootstrap/dist/css/bootstrap.min.css'
import 'jquery/src/jquery.js'
import 'popper.js'
import router from './router'
import VueSweetalert2 from 'vue-sweetalert2';
import 'sweetalert2/dist/sweetalert2.min.css';
// Create a new store instance.
const store = createStore({
    state () {
        return {
            place: {}
        }
    },
    mutations: {
        setPlace (state, payload) {
            state.place = payload
        }
    }
})

const app = createApp(App, {});
app.use(VueSweetalert2);
app.use(router);
app.use(i18n);
app.use(store);
app.mount('#app');
