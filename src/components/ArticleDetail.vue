<template>
	<div class="index-content">
		<div class="article-header">{{articleInfo.title}}</div>
		<div class="article-info">
			<Row>
				<Col :lg="6" :md="6" :sm="6" :xs="10">
					<router-link to="/">作者: {{articleInfo.userColumn.user.nickName}}</router-link>
				</Col>
				<Col :lg="5" :md="5" :sm="5" :xs="14">栏目: {{articleInfo.userColumn.title}}</Col>
				<Col :lg="4" :md="4" :sm="4" :xs="0">发表时间: {{articleInfo.gmtCreate}}</Col>
				<Col :lg="9" :md="9" :sm="9" :xs="0">
					标签: <Tag v-for="label in articleInfo.label" v-if="label.trim() != ''" :key="label" color="lightblue">{{label}}</Tag> 
				</Col>
			</Row>
		</div>

		<div class="article-body">
			<EditorMDPreview :content="articleInfo.content" ref="preview"></EditorMDPreview>
		</div>

		<EditorMDPreview :content="articleInfo.content" ref="preview"></EditorMDPreview>
	</div>
</template>

<script>

export default {
	name: 'ArticleDetail',
	data () {
		return {
			articleInfo: {
				userColumn:{
					user: {

					}
				}
			},

		}
	},
	mounted(){
		this.$http.get("api/article/info/" + this.$route.params.id)
		.then((res) => {
			let result = res.body;

			result.gmtCreate = CountAgo(result.gmtCreate);
			result.label = result.label.split(";;");

			this.articleInfo = result;

			this.$nextTick(()=>{
				this.$refs.preview.update();
			});
		},
		(err) => {
			this.$Message.error("网络异常");
		});
	},
	methods : {
		
	}
}
</script>

<style scoped>
.index-content{
	padding: 16px 16px;
}

.article-header{
	text-align: center;
	font-family: "微软雅黑";
	font-size: 26px;
	padding-bottom: 12px;
}

.article-info{
	height: 36px;
	width: 100%;
	border-bottom: 1px solid lightgray;
	padding-bottom: 0px;
	line-height: 42px;
	font-size: 12px;
	text-align: center;
}

.article-symbol{
	text-align: center;
}

.ivu-tag{
	margin-bottom: 4px;
}
</style>
