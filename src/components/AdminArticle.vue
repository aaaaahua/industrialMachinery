<template>
	<div class="admin-content">
		<h2 class="title-header">文章管理 <small> —— Article Manager</small></h2>
		<br>
		<div>
			<Button type="primary" @click="modalAddArticle = true">新增文章</Button>
		</div>
		<br>
		<Table border :columns="columns1" :data="data1"></Table>
		<br>

		<Modal v-model="modal1" :title="article.title">
			<div v-html="article.content"></div>
		</Modal>

		<Modal v-model="modalAddArticle" title="新增文章" width="1000">
			<Form ref="formArticle" :model="formArticle" :label-width="60">
				<FormItem label="文章标题">
					<Input v-model="formArticle.title" placeholder="请输入标题..."></Input>
				</FormItem>
				<FormItem label="所属菜单">
					<Select v-model="formArticle.navId" style="width:240px">
						<Option v-for="item in nav" :value="item.value" :key="item.value">{{ item.label }}</Option>
					</Select>
				</FormItem>
				<editor id="tinymce" v-model="formArticle.content" :init= "initEditor" ></editor>

			</Form>
		</Modal>
	</div>
</template>
<script>
	import tinymce from 'tinymce/tinymce'
	import 'tinymce/themes/modern/theme'
	import Editor from '@tinymce/tinymce-vue'
	import 'tinymce/plugins/image'

	export default {
		components:{ Editor },
		data() {
			return {
				textHtml: "",
				initEditor: {
					language_url: 'static/zh_CN.js',
					language: 'zh_CN',
					skin_url: 'static/skins/lightgray',
					height: 300,
					plugins:"image",
					images_upload_handler: (blobInfo, success, failure) => {
						var xhr, formData;
						var token = this.$localStorage.get("token");
						var root = this.$http.options.root;
						xhr = new XMLHttpRequest();
						xhr.withCredentials = false;
						xhr.open('POST', root + "api/swiper/upload");
						xhr.setRequestHeader('Authorization', 'Bearer ' + token);
						xhr.onload = function() {
							var json;

							if (xhr.status != 200) {
								failure('HTTP pngError: ' + xhr.status);
								return;
							}
							json = JSON.parse(xhr.responseText);

							if (!json || typeof json.data != 'string') {
								failure('Invalid JSON: ' + xhr.responseText);
								return;
							}
							success(root + json.data);
						};
						formData = new FormData();
						formData.append('file', blobInfo.blob(), blobInfo.fileName);
						xhr.send(formData);
					}
				},
				data1: [],
				columns1: [],
				modal1: false,
				article: {},
				modalAddArticle: false,
				formArticle: {},
			}
		},
		mounted() {
			this.initColumn();
			tinymce.init({});

			this.$http.get("api/article/all").then((res) => {
				var result = res.body;
				if(result) {
					this.data1 = result;
				} else {
					this.$Message.error("网络异常");
				}
			});
		},
		methods: {
			initColumn() {
				// 表格
				this.columns1 = [{
						type: 'index',
						width: 60,
						align: 'center'
					},
					{
						title: '标题',
						key: 'title',
						render: (h, params) => {
							return h('div', params.row.title);
						}
					},
					{
						title: '所属栏目',
						key: 'navId',
						width: 120,
						align: 'center',
						render: (h, params) => {
							return h('div', params.row.navId);
						}
					},
					{
						title: '添加时间',
						key: 'gmtCreate',
						width: 150,
						align: 'center',
						render: (h, params) => {
							return h('div', params.row.gmtCreate);
						}
					},
					{
						title: '最后修改',
						key: 'gmtModified',
						width: 150,
						render: (h, params) => {
							return h('div', params.row.gmtModified);
						}
					},
					{
						title: '操作',
						key: 'action',
						width: 220,
						align: 'center',
						render: (h, params) => {

							let btns = [
								h('Button', {
									props: {
										type: 'primary',
										size: 'small',
									},
									style: {
										marginRight: '5px'
									},
									on: {
										click: () => {
											this.modal1 = true;
											this.article = params.row;
											
										}
									}
								}, '预览正文'),
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
											// params.row.needJump = params.row.needJump.toString();
											// this.fixNavForm = params.row;
											// this.modalFixNav = true;
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
											// this.btnDel(params.row);

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
<style scoped>

</style>