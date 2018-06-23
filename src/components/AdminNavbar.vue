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
				<FormItem label="父级菜单">
					<Select v-model="addNavForm.parentId">
						<Option v-for="nav in navList1" :value="nav.id" :key="nav.id">{{ nav.title }}</Option>
					</Select>
				</FormItem>
				<FormItem label="跳转">
					<Row>
						<Col span="5">
						<RadioGroup v-model="addNavForm.needJump">
							<Radio label="false" @click.native="fixNavForm.needJump=false">否</Radio>
							<Radio label="true" @click.native="fixNavForm.needJump=true">是</Radio>
						</RadioGroup>
						</Col>
						<Col span="19">
							<Input v-model="addNavForm.jumpUrl" style="float: right;" placeholder="输入url地址" v-show="fixNavForm.needJump"></Input>
						</Col>
					</Row>
				</FormItem>
			</Form>

		</Modal>

		<!--修改导航栏模态框-->
		<Modal v-model="modalFixNav" title="修改导航栏" @on-ok="fixNavSubmit" @on-cancel="cancel">
			<Form :model="fixNavForm" label-position="left" :label-width="100">
				<FormItem label="名称">
					<Input v-model="fixNavForm.title"></Input>
				</FormItem>
				<FormItem label="跳转">
					<Row>
						<Col span="5">
						<RadioGroup v-model="fixNavForm.needJump">
							<Radio label="false" @click.native="fixNavForm.needJump=false">否</Radio>
							<Radio label="true" @click.native="fixNavForm.needJump=true">是</Radio>
						</RadioGroup>
						</Col>
						<Col span="19">
							<Input v-model="fixNavForm.jumpUrl" style="float: right;" placeholder="输入url地址" v-show="fixNavForm.needJump == 'true'"></Input>
						</Col>
					</Row>
				</FormItem>
				<FormItem label="排序等级">
					<Input v-model="fixNavForm.sortLevel"></Input>
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
				index: 1,
				addNavForm: {
					
				},
				fixNavForm:{

				},
				modalFixNav:false,
				isHref: false,
				navList1: [],
				navList2: [],
				columns1: [],
				columns2: [],
				activeNav: null, // 当前激活的一级菜单
				comfirmDel: false,
				CurrData: [],
				addNavbar: false,
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
			fixNavSubmit(){
				new Promise((resolve, reject)=>{
					// 请求修改导航栏接口
					//if(!this.addNavForm.needJump) this.addNavForm.needJump = false;

					this.$http.put("api/nav/fix?id=" + this.fixNavForm.id, this.fixNavForm)
					.then((res) => {
						let result = res.body;

						if(result.success){
							resolve(result);
						}else{
							reject(result.msg);
						}
					},(err) => {
						reject("网络异常");
					});
				}).then((result)=>{
					this.$Message.success("修改成功");
					this.modalFixNav = false;
					setTimeout(() => {
						this.$router.go();
					}, 666);
				}).catch((err)=>{
					this.$Message.error(err);
				});
			},
			AddSure() {
				new Promise((resolve, reject)=>{
					// 请求新增导航栏接口
					if(!this.addNavForm.needJump) this.addNavForm.needJump = false;

					this.$http.post("api/nav/add", this.addNavForm)
					.then((res) => {
						let result = res.body;

						if(result.success){
							resolve(result);
						}else{
							reject(result.msg);
						}
					},(err) => {
						reject("网络异常");
					});
				}).then((result)=>{
					this.$Message.success("添加成功");
					this.addNavbar = false;
					setTimeout(() => {
						this.$router.go();
					}, 666);
				}).catch((err)=>{
					this.$Message.error(err);
				});
			},
			btnDel(CurrData) {
				this.comfirmDel = true;
				this.CurrData = CurrData;

			},
			DelSure() {
				this.$http.delete("api/nav/del?id=" + this.CurrData.id).then((res) => {
					var result = res.body;
					if(result) {
						this.$Message.success("删除成功");
						this.$router.go();
					} else {
						this.$Message.error("网络异常");
					}
				});
			},
			cancel() {
				this.$Message.info('已取消操作');
			},
			handleRemove(index) {
				this.addNavForm.items[index].status = 0;
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
											params.row.needJump = params.row.needJump.toString();
											this.fixNavForm = params.row;
											this.modalFixNav = true;
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
											params.row.needJump = params.row.needJump.toString();
											this.fixNavForm = params.row;
											this.modalFixNav = true;
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
											this.btnDel(params.row);
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