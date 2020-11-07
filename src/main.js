import Vue from 'vue';
import BootstrapVue from 'bootstrap-vue/dist/bootstrap-vue.esm';
import App from './App.vue';

import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap-vue/dist/bootstrap-vue.css';

import VueRouter  from 'vue-router';
import Home from './components/Home.vue';
import Teams from './components/Teams.vue';
import Players from './components/Players.vue';
import AvgStrikerate from './components/Strikerate.vue';
import Teamwise from './components/Teamwise.vue';

Vue.use(BootstrapVue);
Vue.use(VueRouter);

const routes = [
  {path:'/home', component: Home},
  {path:'/teams', component: Teams},
  {path:'/players', component: Players},
  {path:'/strikerate', component: AvgStrikerate},
  {path:'/teamwise', component: Teamwise}
]

const router = new VueRouter({
  routes
})

Vue.config.productionTip = false

new Vue({
  router: router,
  render: h => h(App),
}).$mount('#app')
