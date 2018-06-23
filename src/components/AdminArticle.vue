<template>
	<div class="admin-content">
		<h2 class="title-header">文章管理 <small> —— Article Manager</small></h2>
		<br>
		<!-- <Table border :columns="columns7" :data="data6" width="240px"></Table> -->
		<editor id="tinymce" v-model="textHtml" :init= "initEditor" ></editor>
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
								failure('HTTP Error: ' + xhr.status);
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
				columns7: [{
						title: 'Name',
						key: 'name',
						render: (h, params) => {
							return h('div', [
								h('Icon', {
									props: {
										type: 'person'
									}
								}),
								h('strong', params.row.name)
							]);
						}
					},
					{
						title: 'Age',
						key: 'age'
					},
					{
						title: 'Address',
						key: 'address'
					},
					{
						title: 'Action',
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
								}, 'View'),
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
								}, 'Delete')
							]);
						}
					}
				],
				data6: [{
						name: 'John Brown',
						age: 18,
						address: 'New York No. 1 Lake Park'
					}
				]
			}
		},
		mounted() {
			tinymce.init({});
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
<style scoped>

</style>