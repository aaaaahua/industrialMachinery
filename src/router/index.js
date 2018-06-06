import Vue from 'vue'
import Router from 'vue-router'

import App from '@/App'
import User from '@/User'
import Index from '@/components/Index'
// import AdminLogin from '@/components/AdminLogin'
import ArticleDetail from '@/components/ArticleDetail'
// import UserCMD_Index from '@/components/user/Index'
import UserCMD_Profile from '@/components/user/Profile'
// import UserCMD_EditProfile from '@/components/user/EditProfile'
// import UserCMD_NewArticle from '@/components/user/NewArticle'
import UserCMD_ArticleList from '@/components/user/ArticleList'

Vue.use(Router)

export default new Router({
	routes: [
		{
			path: '/',
			component: App,
			children: [
				{ path: '', component: Index },
				//{ path: 'adminLogin', component: AdminLogin },
				{ path: 'article/:id', component: ArticleDetail },
			]
		},
		{
			path: '/user/console/',
			name: 'UserCMD',
			component: User,
			children: [
		// 		{ path: 'index', component: UserCMD_Index },
				{ path: 'profile', component: UserCMD_Profile },
		// 		{ path: 'newArticle', component: UserCMD_NewArticle },
				{ path: 'articleList', component: UserCMD_ArticleList },
		// 		{ path: 'editProfile', component: UserCMD_EditProfile },
			]
		}
	]
})
