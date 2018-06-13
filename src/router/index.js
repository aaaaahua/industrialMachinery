import Vue from 'vue'
import Router from 'vue-router'
import App from '@/App'
import Admin from '@/Admin'
import Article from '@/components/Article'
import Index from '@/components/Index'
import UserSuggestions from '@/components/UserSuggestions'
import AdminArticle from '@/components/AdminArticle'
import AdminNavbar from '@/components/AdminNavbar'

Vue.use(Router)

export default new Router({
	routes: [{
			path: '/',
			//			path: '/Admin/',
			component: App,
			children: [{
					path: '/',
					component: Index
				},
				{
					path: 'article/',
					component: Article
				},
				{
					path: 'UserSuggestions/',
					component: UserSuggestions
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