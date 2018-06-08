<template>
	<div class="admin-content">
		<h2 class="title-header">导航栏管理 <small> —— Navigation Manager</small></h2>
		<br>
		<div>
			<Button type="primary" @click="addNavbar = true">新增</Button>
		</div>
		<br>
		<Table border :columns="columns1" :data="navList1"></Table>

		<br><br><br>

		<div v-if="activeNav">
			<b> "{{activeNav.title}}" 下的二级导航栏菜单: </b>

			<Table border :columns="columns2" :data="navList2"></Table>
		</div>

		<!--增加导航栏模态框-->
		<Modal v-model="addNavbar" title="新增导航栏" @on-ok="AddSure" @on-cancel="cancel">
			<Form :model="addNavForm" label-position="left" :label-width="100">
				<FormItem label="名称">
					<Input v-model="addNavForm.title"></Input>
				</FormItem>
				<FormItem label="跳转">
					<RadioGroup v-model="genders">
						<Radio label="male">否</Radio>
						<Radio label="female">是</Radio>
					</RadioGroup>
					<Input v-model="addNavForm.input3" style="width: 66%;float: right;" placeholder="url地址"></Input>
				</FormItem>
				<FormItem label="二级菜单">
					<Input v-model="addNavForm.input3"></Input>
				</FormItem>
			</Form>

		</Modal>

		<!--//删除模态框-->
		<Modal v-model="comfirmDel" title="删除提示" @on-ok="DelSure" @on-cancel="cancel">
			<p>确认删除？</p>
		</Modal>
	</div>

</template>
<script>
	export default {
		data() {
			return {
				addNavForm: {
					title: '',
					input2: '',
					input3: ''
				},
				isHref: false,
				navList1: [],
				navList2: [],
				columns1: [],
				columns2: [],
				activeNav: null, // 当前激活的一级菜单
				comfirmDel: false,
				CurrData: [],
				addNavbar: false,
				genders: '',
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
			AddSure() {

			},
			btnDel(CurrData) {
				this.comfirmDel = true;
				this.CurrData = CurrData;

			},
			DelSure() {
				this.$http.delete("api/nav/del?id=" + this.CurrData.id).then((res) => {
					var result = res.body;
					if(result) {
						let newNavList = this.navList1.filter((value) => {
							return value.id != this.CurrData.id;
						});
						this.navList1 = newNavList;
						this.$Message.error("删除成功");
					} else {
						this.$Message.error("网络异常");
					}
				});
			},
			cancel() {
				this.$Message.info('已取消操作');
			},
			initColumn() {
				// 一级导航表格
				this.columns1 = [{
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
										disabled: params.row.subNavs === null
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
											this.btnDel(params.row);

										}
									}
								}, '删除')
							];

							return h('div', btns);
						}
					}
				];

				// 二级导航表格
				this.columns2 = [{
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