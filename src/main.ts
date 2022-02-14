import { createApp } from 'vue';
import './assets/css/bootstrap.min.css';
import './assets/fonts/fontawesome-all.min.css';
import './assets/fonts/font-awesome.min.css';
import './assets/fonts/fontawesome5-overrides.min.css';
import './assets/js/bootstrap.min.js';
import App from './App.vue';
import AppAuth from './views/AppAuth.vue';
import router from './router';
import store from './store';
import UtilisateurService from './services/UtilisateurService';
import ObjectUtils from './utils/ObjectUtils';

const { isObjectEmpty } = ObjectUtils();
const { utilisateur } = UtilisateurService();

const app = createApp(App);
app.use(store);
app.use(router);
app.mount('#app');
