// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import Resource from "vue-resource"
import iview from "iview"
import VueLocalStorage from 'vue-localstorage'
import 'iview/dist/styles/iview.css'

Vue.use(Resource)
Vue.use(iview)
Vue.use(VueLocalStorage)
Vue.config.productionTip = false

Vue.http.options.root = process.env.BASE_URL;
var token = Vue.localStorage.get("token");
if (token) {
	Vue.http.headers.common['Authorization'] = 'Bearer ' + token;
}
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<router-view />'
})
