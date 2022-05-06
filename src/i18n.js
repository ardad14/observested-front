import en from "./assets/i18n/en.json";
import ua from "./assets/i18n/ua.json";
import { createI18n } from "vue-i18n";

export default new createI18n ({
    locale: localStorage.getItem('locale') || 'ua',
    messages: {
        en: en,
        ua: ua
    }
})
