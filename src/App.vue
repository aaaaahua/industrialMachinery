<template>
	<div id="app" class="common">
		<nav>
			<span class="config" v-html="logo.data" @click="modalLogin = true"></span>
			
			<ul style="float: right;list-style:none;margin-top:24px;margin-right:72px;">
				<li style="float: right;padding-left:12px;font-size:20px;line-height:20px;"><router-link to="">ᠮᠣᠩᠭᠣᠯ ᠤᠢᠰᠦᠭ</router-link></li>
				<li style="float: right;padding-right:12px;border-right:1px solid gray;"><router-link to="">English</router-link></li>
			</ul>
			<Menu mode="horizontal" class="navMenu" active-name="nav_1">
				<div v-for="item in navList" :key="'nav_' + item.id">
					<router-link v-if="!item.subNavs" :to="item.needJump ? item.jumpUrl : '/article/'+ item.id" >
						<MenuItem  :name="'nav_' + item.id"> {{item.title}}
						</MenuItem>
					</router-link>
					<Submenu v-else :name="'nav_' + item.id">
						<template slot="title">
							{{item.title}}
						</template>

						<router-link v-for="childNav in item.subNavs" :key="'childrenNav_' + childNav.title" :to="childNav.needJump ? childNav.jumpUrl : '/article/'+ childNav.id" >
							<MenuItem  :name="'childrenNav_' + childNav.title" >{{childNav.title}}</MenuItem>
						</router-link>
					</Submenu>
					
				</div>
			</Menu>
		</nav>
		<div style="width: 100%;padding-top: 6px;">
			<router-view/>
		</div>
		<footer>
			<div class="footer">
				<span v-html="copyright.data"></span>
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
				copyright:{

				},
				logo:{}
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

			this.$http.get("api/config/info?key=copyright").then((res) => {
				var result = res.body;
				if(result) {
					this.copyright = result.data;
				} else {
					this.$Message.error("网络异常");
				}
			});

			this.$http.get("api/config/info?key=logo").then((res) => {
				var result = res.body;
				if(result) {
					this.logo = result.data;
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
							
							let url = this.$router.push({
								path: '/Admin/adminNavbar/'
							});
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

<style>
.config p{
	display: inline !important;
	margin-left: 128px;
}
</style>


<style scoped>


	.common {
		width: 100%;
		margin-top: 16px;
		height: 100%;
	}
	
	.navMenu {
		background: linear-gradient( rgb(37, 137, 189), rgb(6, 109, 168));
		height: 64px;
		line-height: 64px;	
		padding-left: 72px;
		font-size: 14px;
	}
	
	.navMenu div>a>li {
		color: #FFFFFF!important;
		margin-left:20px;
		width: 144px;
		text-align: center;
	}

	.ivu-menu-light.ivu-menu-horizontal .ivu-menu-item-active, .ivu-menu-light.ivu-menu-horizontal .ivu-menu-item:hover, .ivu-menu-light.ivu-menu-horizontal .ivu-menu-submenu-active, .ivu-menu-light.ivu-menu-horizontal .ivu-menu-submenu:hover {
		border-bottom: 2px solid rgb(37, 137, 189);
		
	}

	.ivu-menu-submenu{
		color: #FFFFFF!important;
		margin-left:20px;
		width: 144px;
		text-align: center;
	}
	
	.footer {
		height: 64px;
		width: 100%;
		margin: 0 auto;
		line-height: 64px;
		text-align: center;
		background:linear-gradient( rgb(37, 137, 189), rgb(6, 109, 168));
		color: #FFF;
		font-weight: 300;
		font-size: 15px;
		box-shadow: 2px 2px 4px rgb(37, 137, 189);
	}
</style>