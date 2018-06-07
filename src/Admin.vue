<template>
	<div id='Admin'>
		<div class="adminHeader">
			<p>管理员系统</p>
		</div>
		<Menu :theme="theme3" active-name="1" class="adminNavbar">
			<MenuGroup title="网站管理">
				<MenuItem name="1">
				<Icon type="navicon-round"></Icon>
				<router-link to="/Admin/adminArticle/">导航栏管理</router-link>
				</MenuItem>
			</MenuGroup>
			<MenuGroup title="内容管理">
				<MenuItem name="2">
				<Icon type="document-text"></Icon>
				文章管理
				</MenuItem>
			</MenuGroup>
			<MenuGroup title="评价管理">
				<MenuItem name="3">
				<Icon type="heart"></Icon>
				意见反馈
				</MenuItem>
			</MenuGroup>
		</Menu>
		<div class="adminContent">
			<router-view/>
		</div>
	</div>
</template>

<script>
	export default {
		name: 'Admin',
		data() {
			return {
				theme3: 'dark'
			}
		},
		methods: {

		},
		mounted() {

		},
		created() {

		}
	}
</script>

<style scoped>
	#Admin {
		height: 100vh;
	}
	
	.adminHeader {
		width: 100%;
		background-color: #23262E;
	}
	
	.adminHeader p {
		padding: 10px 20px;
		color: #FFFFFF;
		font-size: 24px;
	}
	
	.adminNavbar {
		height: 95%;
		float: left;
	}
	
	.adminContent {
		float: left;

		width: 80%;
	}
</style>