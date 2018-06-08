<template>
	<div class="admin-content">
		<h2 class="title-header">导航栏管理 <small> —— Navigation Manager</small></h2>
		<br>
		<Table border :columns="columns1" :data="navList1"></Table>

		<br><br><br>

		<div v-if="activeNav">
			<b> "{{activeNav.title}}" 下的二级导航栏菜单: </b>
		
			<Table border :columns="columns2" :data="navList2"></Table>
		</div>
	</div>
</template>
<script>
	export default {
		data() {
			return {
				navList1: [],
				navList2: [],
				columns1: [],
				columns2: [],
				activeNav : null,		// 当前激活的一级菜单
			}
		},
		mounted() {
			this.initColumn();

			this.$http.get("api/nav/all").then((res) => {

				var result = res.body;
				if(result) {
					this.navList1 = result;
				} else {
					this.$Message.error("网络异常");
				}
			});
		},
		methods: {
			show(index) {
				this.$Modal.info({
					title: 'User Info',
					content: `Name：${this.data6[index].name}<br>Age：${this.data6[index].age}<br>Address：${this.data6[index].address}`
				})
			},
			remove(index) {
				this.data6.splice(index, 1);
			},
			initColumn(){
				// 一级导航表格
				this.columns1 = [
					{
                        type: 'index',
                        width: 60,
                        align: 'center'
                    },
					{
						title: '名称',
						key: 'title',
						render: (h, params) => {
							return h('div', params.row.title);
						}
					},
					{
						title: '子菜单数',
						key: 'subNavNumber',
						width: 90,
						align: 'center',
						render: (h, params) => {
							return h('div', params.row.subNavs ? params.row.subNavs.length : "无");
						}
					},
					{
						title: '是否跳转',
						key: 'needJump',
						width: 90,
						align: 'center',
						render: (h, params) => {
							return h('div', params.row.needJump ? "是" : "否");
						}
					},
					{
						title: '跳转URL',
						key: 'jumpUrl',
						render: (h, params) => {
							return h('div', params.row.jumpUrl);
						}
					},
					{
						title: '操作',
						key: 'action',
						width: 250,
						align: 'center',
						render: (h, params) => {
							
							let btns = [
								h('Button', {
									props: {
										type: params.row.subNavs ? 'primary' : 'ghost',
										size: 'small',
										disabled : params.row.subNavs === null
									},
									style: {
										marginRight: '5px'
									},
									on: {
										click: () => {
											this.activeNav = params.row;
											this.navList2 = params.row.subNavs;
										}
									}
								}, '查看二级'),
								h('Button', {
									props: {
										type: 'primary',
										size: 'small'
									},
									style: {
										marginRight: '5px'
									},
									on: {
										click: () => {
											// TODO 修改按钮
										}
									}
								}, '修改'),
								h('Button', {
									props: {
										type: 'error',
										size: 'small'
									},
									on: {
										click: () => {
											// TODO 删除按钮
										}
									}
								}, '删除')
							];


							return h('div', btns);
						}
					}
				];

				// 二级导航表格
				this.columns2 = [
					{
                        type: 'index',
                        width: 60,
                        align: 'center'
                    },
					{
						title: '名称',
						key: 'title',
						render: (h, params) => {
							return h('div', params.row.title);
						}
					},
					{
						title: '是否跳转',
						key: 'needJump',
						width: 90,
						align: 'center',
						render: (h, params) => {
							return h('div', params.row.needJump ? "是" : "否");
						}
					},
					{
						title: '跳转URL',
						key: 'jumpUrl',
						render: (h, params) => {
							return h('div', params.row.jumpUrl);
						}
					},
					{
						title: '操作',
						key: 'action',
						width: 250,
						align: 'center',
						render: (h, params) => {
							
							let btns = [
								h('Button', {
									props: {
										type: 'primary',
										size: 'small'
									},
									style: {
										marginRight: '5px'
									},
									on: {
										click: () => {
											this.show(params.index)
										}
									}
								}, '修改'),
								h('Button', {
									props: {
										type: 'error',
										size: 'small'
									},
									on: {
										click: () => {
											this.remove(params.index)
										}
									}
								}, '删除')
							];


							return h('div', btns);
						}
					}
				];
			}
		}
	}
</script>