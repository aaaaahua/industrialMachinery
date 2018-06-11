import Vue from 'vue'
import Router from 'vue-router'
import App from '@/App'
import Admin from '@/Admin'
import Article from '@/components/Article'
import Index from '@/components/Index'
import AdminArticle from '@/components/AdminArticle'
import AdminNavbar from '@/components/AdminNavbar'

Vue.use(Router)

export default new Router({
	routes: [{
			path: '/',
			//			path: '/Admin/',
			component: App,
			children: [{
					path: 'index/',
					component: Index
				},
				{
					path: 'article/',
					component: Article
				},
			]
		},
		{
			path: '/Admin/',
			//  	path: '/',
			component: Admin,
			children: [{
					path: 'adminArticle/',
					component: AdminArticle
				},
				{
					path: 'adminNavbar/',
					component: AdminNavbar
				},
			]
		},
	]
})