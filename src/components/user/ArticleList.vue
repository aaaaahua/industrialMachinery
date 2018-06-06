<template>
	<div class="index-content">
		<h2 class="title-header">个人资料 <small> —— Personal Profile</small></h2>
		<br>
		<Table :loading="loading" border :columns="columns" height="450" :data="articles">

		</Table>
		<Page class="pager" :total="total" size="small" show-total show-sizer></Page>
	</div>
</template>

<script>
export default {
	name: 'UserCMD_ArticleList',
	data () {
		return {
			content: "",
			comPreview: "",
			loading: true,
			total: 0,
			articles: [
			],
			columns: []
		}
	},
	mounted(){
		this.initColumns();

		this.$http.get("api/user/article?page=1&size=10")
		.then((res) => {
			var result = res.body;
			
			if(result.success){ 
				this.total = result.count;
				this.articles = result.data;
			}else{
				this.$Message.error(result.msg);
			}
			
			this.loading = false;
		},
		(err) => {
			this.loading = false;

			this.$Message.error("网络异常");
		});
	},
	methods : {
		btnDel(param){

		},
		initColumns(){
			this.columns = [
				{
					type: "index",
					width: 50,
					align: 'center',
					fixed: 'left',
				},
				{
					title: '标题',
					key: 'title',
					width: 400,
					render: (h, params) => {
						return h('div', params.row.title);
					}
				},
				{
					title: '栏目',
					key: 'column',
					width: 120,
					render: (h, params) => {
						return h('div', params.row.userColumn.title);
					}
				},
				{
					title: '点赞',
					key: 'good',
					width: 60,
					align: 'center',
					render: (h, params) => {
						return h('div', params.row.goodNumber + "/" + params.row.badNumber);
					}
				},
				{
					title: '访问',
					key: 'clickNumber',
					width: 60,
					align: 'center',
				},
				{
					title: '评论',
					key: 'commentNumber',
					width: 60,
					align: 'center',
				},
				{
					title: '添加日期',
					key: 'gmtCreate',
					width: 170,
					render: (h, params) => {
						return h('div', new Date(params.row.gmtCreate * 1000).Format("yyyy-MM-dd hh:mm:ss"));
					}
				},
				{
					title: '最后修改',
					key: 'lastEditTime',
					width: 170,
					render: (h, params) => {
						return h('div', new Date((params.row.lastEditTime || params.row.gmtCreate) * 1000).Format("yyyy-MM-dd hh:mm:ss"));
					}
				},
				{
					title: '操作',
					key: 'option',
					width: 165,
					fixed: "right",
					render: (h, params) => {
						let iconTop = params.row.isTop == 1 ? "chevron-down" : "chevron-up";
						let iconPrivate = params.row.isPrivate == 1 ? "unlocked" : "locked";

						return h('ButtonGroup',{
							props: {
								size: 'small'
							}
						}, [
							h('Button', {
								props: {
									type: 'primary',
									icon: "eye",
								}
							}),
							h('Button', {
								props: {
									type: 'primary',
									icon: "edit",
								}
							}),
							h('Button', {
								props: {
									type: 'warning',
									icon: iconTop
								}
							}),
							h('Button', {
								props: {
									type: 'warning',
									icon: iconPrivate
								}
							}),
							h('Button', {
								props: {
									type: 'error',
									icon: 'trash-a',
									on:{
										click: this.btnDel
									}
								}
							})
						]);
					}
				},
			]
		},
	}
}
</script>

<style scoped>
.index-content{
	padding: 16px 16px;
}

.card-info{
	margin-top:12px;
	font-size: 16px;
	height: 265px;
}

.card-info img{
	width: 100%;
	height: auto;
}

.timeline-info {
	margin-top:16px;
}

.timeline-info p.title{
	margin-top: -12px;
	font-size:  14px;
	color: #BBB;
}

.timeline-info p.info{
	font-size:  16px;
}
</style>
