import Vue from 'vue'
import Router from 'vue-router'
import App from '@/App'
import Admin from '@/Admin'
import SiderIndex from '@/SiderIndex'
import Article from '@/components/Article'
import Index from '@/components/Index'
import UserSuggestions from '@/components/UserSuggestions'
import AdminArticle from '@/components/AdminArticle'
import AdminNavbar from '@/components/AdminNavbar'
import AdminNote from '@/components/AdminNote'

Vue.use(Router)

export default new Router({
	routes: [{
			path: '/',
			component: App,
			children: [{
					path: '/',
					component: Index
				},
				{
					path: 'article/:id',
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
			component: Admin,
			children: [{
					path: 'adminArticle/',
					component: AdminArticle
				},
				{
					path: 'adminNavbar/',
					component: AdminNavbar
				},
				{
					path: 'adminNote/',
					component: AdminNote
				},
			]
		},
		
	]
})