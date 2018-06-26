<template>
	<div class="admin-content">
		<h2 class="title-header">留言管理 <small> —— Note Manager</small></h2>
		<br>
		<Table border :columns="columns1" :data="navList1"></Table>
	</div>

</template>
<script>
	export default {
		data() {
			return {
				addNavForm: {
					
				},
				fixNavForm:{

				},
				modalFixNav:false,
				isHref: false,
				navList1: [],
				columns1: [],
				comfirmDel: false,
			}
		},
		mounted() {
			this.initColumn();

			this.$http.get("api/note/all").then((res) => {
				var result = res.body;
				if(result) {
					this.navList1 = result;
				} else {
					this.$Message.error("网络异常");
				}
			});
		},
		methods: {
			initColumn() {
				// 一级导航表格
				this.columns1 = [
					{
						type: 'index',
						width: 60,
						align: 'center'
					},
					{
						title: '姓名',
						key: 'name',
						width: 120,
						render: (h, params) => {
							return h('div', params.row.name);
						}
					},
					{
						title: '邮箱',
						key: 'email',
						align: 'center',
						width: 160,
						render: (h, params) => {
							return h('div', params.row.email);
						}
					},
					{
						title: '手机',
						key: 'phone',
						align: 'center',
						width: 160,
						render: (h, params) => {
							return h('div', params.row.phone);
						}
					},
					{
						title: '留言',
						key: 'note',
						render: (h, params) => {
							return h('div', params.row.note);
						}
					}
				];
			}
		}
	}
</script>