import Vue from 'vue'
import App from './App'
import Resource from "vue-resource"
import router from './router'
import VueLocalStorage from 'vue-localstorage'

import EditorMDPreview from '@/components/EditorMDPreview'

import iview from "iview"
import 'iview/dist/styles/iview.css'

import LazyLoad from "vue-lazyload"

Vue.use(Resource)
Vue.use(LazyLoad)
Vue.use(iview)
Vue.use(VueLocalStorage)
Vue.component("EditorMDPreview", EditorMDPreview)


Vue.config.productionTip = false
Vue.http.options.emulateJSON = false;

Vue.http.options.root = process.env.BASE_URL;

var token = Vue.localStorage.get("token");
if (token) {
	Vue.http.headers.common['Authorization'] = 'Bearer ' + token;
}

Vue.prototype.fixUserInfo = function(u){
	if(u.iconPath){
		u.iconPath = Vue.http.options.root + u.iconPath;
	}else{
		u.iconPath = "static/images/default_icon.png";
	}
	return u;
}

new Vue({
	el: '#app',
	router: router,
	components: {
		App
	},
	template: '<router-view />'
})
