<template>
	<div id="app" class="common">
		<nav>
			<img src="../static/logo1.png" class="logoPos">
			<img src="../static/logo2.png" class="logoPos">
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
		<div style="height: 400px;width: 100%;">
			<router-view/>
		</div>
		<footer>
			<div class="footer">
				Copyright © Walsn Enterprises Ltd. All rights reserved. 京ICP备12041454号. 京公网安备11010802014942
				<img border="0" hspace="0" vspace="0" src="http://icon.cnzz.com/img/pic.gif" @click="modalLogin = true">
			</div>
		</footer>

		<!-- 登录模态框 -->
		<Modal v-model="modalLogin" title="管理员登录" @on-ok="formLoginSubmit" width="25">
			<Form ref="formInline" :model="formLogin" :rules="ruleInline">
				<FormItem prop="user">
					<Input type="text" v-model="formLogin.account" placeholder="请输入账号">
					<Icon type="ios-person-outline" slot="prepend"></Icon>
					</Input>
				</FormItem>
				<FormItem prop="password">
					<Input type="password" v-model="formLogin.password" placeholder="请输入密码">
					<Icon type="ios-locked-outline" slot="prepend"></Icon>
					</Input>
				</FormItem>
			</Form>
		</Modal>
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
				formInline: {
					user: '',
					password: ''
				},
				ruleInline: {
					user: [{
						trigger: 'blur'
					}],
					password: [{
						trigger: 'blur'
					}, ]
				},
				modalLogin: false,
				formLogin: {
					account: "",
					password: ""
				},
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
			});
		},
		methods: {
			handleSubmit(name) {
				this.$refs[name].validate((valid) => {
					if(valid) {
						this.$Message.success('Success!');
					} else {
						this.$Message.error('Fail!');
					}
				})
			},
			formLoginSubmit() {
				new Promise((resolve, reject) => {
						// 请求登录接口
						this.$http.post("api/user/login", this.formLogin)
							.then((res) => {
								let result = res.body;

								if(result.success) {
									resolve(result);
								} else {
									reject(result.msg);
								}
							}, (err) => {
								reject("网络异常");
							});
					}).then((result) => {
						return new Promise((resolve, reject) => {
							// 储存token
							this.$localStorage.set("token", result.data);
							this.$Message.info("登录成功");
							this.$router.push({
								path: '/Admin/adminNavbar/'
							});
							let header = {
								"Authorization": "Bearer " + result.data
							};
							// 请求用户个人信息
							//							this.$http.get("api/user/own/info", {
							//									headers: header
							//								})
							//								.then((res) => {
							//										let result = res.body;
							//										if(result.success) {
							//											this.$localStorage.set("user", JSON.stringify(result.data));
							//											this.modalLogin = false;
							//											this.user = this.fixUserInfo(result.data);
							//											this.login = true;
							//											this.$Message.info("登录成功");
							//										} else {
							//											reject(result.msg);
							//										}
							//									},
							//									(err) => {
							//										reject("网络异常");
							//									});
						});
					})
					.catch((err) => {
						this.$Message.error(err);
						this.loadingLogin = false;
						this.$nextTick(() => {
							this.modalLogin = true;
						});
					});
			},
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
		background: linear-gradient(rgb(168, 71, 14), rgb(156, 36, 6));
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