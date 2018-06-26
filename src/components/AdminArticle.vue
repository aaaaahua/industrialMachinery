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
					<Select v-model="selectNavs1" style="width:240px">
						<Option v-for="nav in navs1" :value="nav.id" :key="nav.id">{{ nav.title }}</Option>
					</Select>

					<Select v-model="selectNavs2" style="width:240px" v-if="navs2">
						<Option v-for="nav in navs2" :value="nav.id" :key="nav.id">{{ nav.title }}</Option>
					</Select>
				</FormItem>
				<editor id="tinymce" v-model="formArticle.content" :init= "initEditor" ></editor>

			</Form>
		</Modal>

		<Modal v-model="modalEditArticle" title="编辑文章" width="1000">
			<Form ref="formArticleEdit" :model="formArticleEdit" :label-width="60">
				<FormItem label="文章标题">
					<Input v-model="formArticleEdit.title" placeholder="请输入标题..."></Input>
				</FormItem>
				
				<editor id="tinymce2" v-model="formArticleEdit.content" :init= "initEditor" ></editor>

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
				modalEditArticle: false,
				formArticleEdit: {},
				mapNavs: null,
				navs1: [],
				navs2: null,
				selectNavs1: 0,
				selectNavs2: 0,
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

			this.$http.get("api/nav/all").then((res) => {
				var result = res.body;
				if(result) {
					this.navs1 = result;
					let map = new Map();
					for(let nav of result){
						map.set(nav.id, JSON.stringify(nav));
					}

					this.mapNavs = map;
				} else {
					this.$Message.error("网络异常");
				}
			});

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
							let nav = JSON.parse(this.mapNavs.get(params.row.navId));
							return h('div', nav.title);
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
											this.modalEditArticle = true;
											this.formArticleEdit = params.row;
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