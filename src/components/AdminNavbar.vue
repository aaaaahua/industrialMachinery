<template>
	<div>
		<Table border :columns="columns7" :data="navList" width="240px"></Table>
	</div>
</template>
<script>
	export default {
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
				columns7: [{
						title: '名称',
						key: 'title',
						render: (h, params) => {
							return h('div', [
								h('strong', params.row.title)
							]);
						}
					},
					{
						title: '添加日期',
						key: 'addDate',
						render: (h, params) => {
							return h('div', [
								h('strong', params.row.title)
							]);
						}
					},
					{
						title: '顺序',
						key: 'order',
					},
					{
						title: '操作',
						key: 'action',
						width: 150,
						align: 'center',
						render: (h, params) => {
							return h('div', [
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
							]);
						}
					}
				],

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
			show(index) {
				this.$Modal.info({
					title: 'User Info',
					content: `Name：${this.data6[index].name}<br>Age：${this.data6[index].age}<br>Address：${this.data6[index].address}`
				})
			},
			remove(index) {
				this.data6.splice(index, 1);
			}
		}
	}
</script>