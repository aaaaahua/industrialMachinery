import Vue from 'vue'
import Router from 'vue-router'
import App from '@/App'
import Admin from '@/Admin'
import SiderIndex from '@/SiderIndex'
import Article from '@/components/Article'
import ArticleDetail from '@/components/ArticleDetail'
import Index from '@/components/Index'
import UserSuggestions from '@/components/UserSuggestions'
import AdminArticle from '@/components/AdminArticle'
import AdminNavbar from '@/components/AdminNavbar'
import AdminNote from '@/components/AdminNote'
import AdminConfig from '@/components/AdminConfig'

Vue.use(Router)

export default new Router({
	routes: [{
			path: '/',
			component: App,
			children: [{
					path: '',
					component: Index
				},
				{
					path: 'article/:id',
					component: Article
				},
				{
					path: 'articleDetail/:id',
					component: ArticleDetail
				},
				{
					path: 'UserSuggestions',
					component: UserSuggestions
				},
			]
		},
		{
			path: '/Admin/',
			component: Admin,
			children: [{
					path: 'adminArticle',
					component: AdminArticle
				},
				{
					path: 'adminNavbar',
					component: AdminNavbar
				},
				{
					path: 'adminNote',
					component: AdminNote
				},
				{
					path: 'adminConfig',
					component: AdminConfig
				},
			]
		},
		
	]
})