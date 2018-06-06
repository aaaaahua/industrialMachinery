<template>
	<div id="app" class="layout">
		<Menu mode="horizontal" :theme="theme" active-name="1">

			<div style="float: left;width: 48px;" pc>
				&emsp;
			</div>
			<div class="layout-logo" @click.prevent="toggleTheme">
				<img src="static/images/logo.png" alt="">
			</div>

			<div style="float: right; width: 32px;" pc>
				&emsp;
			</div>
			<div class="layout-nav">
				<Submenu name="btnMenu">
                    <template slot="title">
                        <Avatar :src="user.iconPath" />
                        &nbsp;<a href="javascript:;">{{user.nickName}}</a>
                    </template>
                    <MenuItem name="btnMenu_Logout">
						<a href="" @click.prevent="logout">注销登录</a>
					</MenuItem>
                </Submenu>
			</div>
		</Menu>
		<Row :style="{backgroundColor: (theme === 'dark'? '#495060':'') }">
			<Col ref="sidebar" :lg="4" :md="6" :sm="0" :xs="0" :style="{height: sidebarHeight + 'px'}" >
				<Menu width="auto" :theme="theme" :style="{height: sidebarHeight + 'px'}">
					<Submenu name="sidebarMenu_1">
						<template slot="title">
							<Icon type="ionic"></Icon>
							快捷功能
						</template>
						<MenuItem name="sidebarMenu_1_1">
							<Icon type="edit"></Icon> 编辑资料
						</MenuItem>
						<MenuItem name="sidebarMenu_1_2">
							<Icon type="edit"></Icon> 撰写文章
						</MenuItem>
					</Submenu>
					<Submenu name="sidebarMenu_2">
						<template slot="title">
							<Icon type="ios-paper"></Icon>
							内容管理
						</template>
						<MenuItem name="sidebarMenu_2_1">
							<router-link to="/user/console/profile">个人资料</router-link>
						</MenuItem>
						<MenuItem name="sidebarMenu_2_2">
							<router-link to="/user/console/articleList">文章管理</router-link>
						</MenuItem>
						<MenuItem name="sidebarMenu_2_3">评论管理</MenuItem>
						<MenuItem name="sidebarMenu_2_4">举报管理</MenuItem>
					</Submenu>
					<Submenu name="sidebarMenu_3">
						<template slot="title">
							<Icon type="stats-bars"></Icon>
							统计分析
						</template>
						<MenuGroup title="使用">
							<MenuItem name="3-1">新增和启动</MenuItem>
							<MenuItem name="3-2">活跃分析</MenuItem>
							<MenuItem name="3-3">时段分析</MenuItem>
						</MenuGroup>
						<MenuGroup title="留存">
							<MenuItem name="3-4">用户留存</MenuItem>
							<MenuItem name="3-5">流失用户</MenuItem>
						</MenuGroup>
					</Submenu>
				</Menu>
			</Col>

			<!-- 主体 -->
			<Col ref="content" :lg="20" :md="18" :sm="24" :xs="24">

				<div class="main-content">
					<router-view/>
				</div>
				

				<div class="footer">
					<!-- 底部固定区域 -->
					© 2017-2018 blog.noobug.org 闽ICP备17017285
				</div>
			</Col>
		</Row>
		<Row>
			
		</Row>
	</div>
</template>

<script>
export default {
	name: 'User',
	data(){
		return {
			theme: "light",
			login: false,
			user: {
				iconPath: "static/images/default_icon.png",
				nickName: "游客"
			},
			sidebarHeight: 1000
		}
	},
	mounted(){
		var token = this.$localStorage.get("token");
		var user = this.$localStorage.get("user");
		if(token){
			this.login = true;
			this.user = this.fixUserInfo(JSON.parse(user));
		}else{
			this.$router.push("/");
		}

		setInterval(()=>{
			this.fixSidebarHeight();
		}, 500);
		
	},
	methods:{
		logout() {
			this.$localStorage.remove("user");
			this.$localStorage.remove("token");

			this.$router.go();
		},
		toggleTheme() {
			this.theme = this.theme === 'light' ? "dark" : "light";
		},
		fixSidebarHeight(){
			this.sidebarHeight = this.$refs.content.$el.offsetHeight
		}
	}
}
</script>

<style>
#app {
	-webkit-font-smoothing: antialiased;
	-moz-osx-font-smoothing: grayscale;
}

.layout-logo{
    width: 160px;
    height: 42px;
    float: left;
    position: relative;
    top: 8px;
    left: 12px;
}

.layout-logo img{
	width: 160px;
	height: 42px;
	cursor: pointer;
}

.layout-nav{
	float: right;
	margin: 0 auto;
}

.layout-nav a{
	font-size: 14px;
}

.ivu-menu-item-group-title{
	font-weight: bold;
	font-size: 16px !important;
}

.ivu-menu-dark .ivu-menu-submenu-title a {
	color: lightseagreen;
}

.ivu-menu-dark:not(.ivu-menu-vertical) .ivu-menu-item a{
	color: lightseagreen;
}

.ivu-menu-dark.ivu-menu-vertical .ivu-menu-item a{
	color: lightgray;
}

.ivu-menu-dark .ivu-menu-item-group-title{
	color: lightseagreen !important;
}

.main-content{
	min-height: 720px;
	background-color: white;
}

</style>
