import Vue from 'vue'
import App from './App.vue'
import axios from 'axios'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap/dist/js/bootstrap.js'


Vue.config.productionTip = false
Vue.prototype.$http = axios

new Vue({
  render: h => h(App),
}).$mount('#app')
