 <template>
	<div id="app" class="common">
		<nav>
			<img src="./logo.gif" class="logoPos">
			<Menu mode="horizontal" class="navMenu" active-name="nav_1">
				<div v-for="item in navList" :key="'nav_' + item.id">
					<MenuItem v-if="!item.subNavs" :name="'nav_' + item.id"> {{item.title}}
					</MenuItem>
					<Submenu v-else :name="'nav_' + item.id">
						<template slot="title">
							{{item.title}}
						</template>
						<MenuItem v-for="childNav in item.subNavs" :name="'childrenNav_' + childNav.title" :key="'childrenNav_' + childNav.title">{{childNav.title}}</MenuItem>
					</Submenu>
				</div>
			</Menu>
		</nav>
		<div style="height: 400px;width: 100%;"></div>
		<footer>
			<div class="footer">
				Copyright © Walsn Enterprises Ltd. All rights reserved. 京ICP备12041454号. 京公网安备11010802014942
			</div>
		</footer>
	</div>
</template>
<script>
	export default {
		name: 'App',
		data() {
			return {

				navList: [{
					id: "",
					jumpUrl: "",
					needJump: false,
					title: "",
					subNavs: [{
						id: "",
						jumpUrl: "",
						needJump: false,
						title: null,
					}],
				}],
			}
		},
		mounted() {
			this.$http.get("api/nav/all").then((res) => {
				var result = res.body;
				if(result) {
					this.navList = result;
				} else {
					this.$Message.error("网络异常");
				}
			})
		},
		methods: {

		},
	}
</script>
<style scoped>
	.common {
		width: 960px;
		margin: 12px auto;
		height: 100%;
	}
	
	.navMenu {
		background-color: #5C6375;
	}
	
	.navMenu div>li {
		color: #FFFFFF!important;
	}
	
	.footer {
		height: 42px;
		width: 100%;
		margin: 0 auto;
		padding: 10px 0;
		line-height: 24px;
		text-align: center;
		background-color: #eee;
		color: #666;
		font-weight: 300;
	}
</style>