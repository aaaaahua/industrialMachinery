<template>
	<div class="admin-content">
		<h2 class="title-header">配置项管理 <small> —— Config Manager</small></h2>
		<br>
		<Table border :columns="columns1" :data="data1"></Table>
		<br>

		<Modal v-model="modalEditConfig" title="编辑配置项" width="1000" @on-ok="editConfigSubmit">
			<Form ref="formConfigEdit" :model="formConfigEdit" :label-width="60">

				<editor id="tinymce2" v-model="formConfigEdit.data" :init= "initEditor" ></editor>

			</Form>
		</Modal>
	</div>
</template>
<script>
	import tinymce from 'tinymce/tinymce'
	import 'tinymce/themes/modern/theme'
	import Editor from '@tinymce/tinymce-vue'
	import 'tinymce/plugins/image'
	import 'tinymce/plugins/fullscreen'
	import 'tinymce/plugins/table'
	import 'tinymce/plugins/textcolor'
	import 'tinymce/plugins/media'
	import 'tinymce/plugins/advlist'
	import 'tinymce/plugins/charmap'

	export default {
		components:{ Editor },
		data() {
			return {
				modalEditConfig: false,
				formConfigEdit: {},
				initEditor: {
					language_url: 'static/zh_CN.js',
					language: 'zh_CN',
					skin_url: 'static/skins/lightgray',
					height: 300,
					plugins:"image fullscreen table textcolor media advlist charmap",
					toolbar1:"formatselect fontselect fontsizeselect | bold italic strikethrough forecolor backcolor | link | alignleft aligncenter alignright alignjustify  | numlist bullist outdent indent  | removeformat",
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
			}
		},
		mounted() {
			this.initColumn();
			tinymce.init({});

			this.$http.get("api/config/all").then((res) => {
				var result = res.body;
				if(result) {
					this.data1 = result;
				} else {
					this.$Message.error("网络异常");
				}
			});
		},
		methods: {
			editConfigSubmit() {
				this.$http.put("api/config/fix", this.formConfigEdit).then((res) => {
					var result = res.body;
					if(result) {
						this.$Message.success("修改成功");
						this.$nextTick(()=>{
							this.$router.go();
						});
					} else {
						this.$Message.error("网络异常");
					}
				});
			},
			initColumn() {
				// 表格
				this.columns1 = [{
						type: 'index',
						width: 60,
						align: 'center'
					},
					{
						title: 'code',
						key: 'code',
						width: 120,
						render: (h, params) => {
							return h('div', params.row.key);
						}
					},
					{
						title: '描述',
						key: 'desc',
						align: 'center',
						width: 240,
						render: (h, params) => {
							return h('div', params.row.brief);
						}
					},
					{
						title: '配置值',
						key: 'data',
						align: 'center',
						render: (h, params) => {
							return h('div', {
								domProps:{
									innerHTML: params.row.data
								}
							});
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
										size: 'small'
									},
									style: {
										marginRight: '5px'
									},
									on: {
										click: () => {
											this.modalEditConfig = true;
											this.formConfigEdit = params.row;
										}
									}
								}, '修改')
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