<template>
	<div class="index-content">
		<div>
			<h2 class="title-header">最新文章 <small> —— Newest Articles</small></h2>

			<Timeline class="timeline-newest">
				<TimelineItem v-for="article in newestArticles" :key="article.id">
					<p class="title"><router-link :to="'/article/' + article.id">{{article.title}}</router-link></p>
					<p class="info">
						<Row>
							<Col :lg="6" :md="6" :sm="6" :xs="8">
								<router-link to="/">{{article.userColumn.user.nickName}}</router-link>
							</Col>
							<Col :lg="4" :md="4" :sm="6" :xs="8">{{article.gmtCreate}}</Col>
							<Col :lg="4" :md="4" :sm="6" :xs="0">{{article.userColumn.title}}</Col>
							<Col :lg="10" :md="10" :sm="6" :xs="8">
								<Row>
									<Col :lg="8" :md="8" :sm="6" :xs="2">&nbsp;</Col>
									<Col :lg="8" :md="8" :sm="6" :xs="2">&nbsp;</Col>
									<Col :lg="4" :md="4" :sm="6" :xs="10">
										<Icon type="thumbsup" size="18" color="lightgray"></Icon> {{article.goodNumber}}
									</Col>
									<Col :lg="4" :md="4" :sm="6" :xs="10">
										<Icon type="chatbox-working" size="14" color="lightgray"></Icon> {{article.goodNumber}}
									</Col>
								</Row>
							</Col>
						</Row>
					</p>
				</TimelineItem>
			</Timeline>
		</div>
		<div>
			<h2 class="title-header">热门文章 <small> —— Great Articles</small></h2>
			<Timeline class="timeline-newest">
				<TimelineItem v-for="article in greatArticles" :key="article.id">
					<p class="title"><router-link :to="'/article/' + article.id">{{article.title}}</router-link></p>
					<p class="info">
						<Row>
							<Col :lg="6" :md="6" :sm="6" :xs="8">
								<router-link to="/">{{article.userColumn.user.nickName}}</router-link>
							</Col>
							<Col :lg="4" :md="4" :sm="6" :xs="8">{{article.gmtCreate}}</Col>
							<Col :lg="4" :md="4" :sm="6" :xs="0">{{article.userColumn.title}}</Col>
							<Col :lg="10" :md="10" :sm="6" :xs="8">
								<Row>
									<Col :lg="8" :md="8" :sm="6" :xs="2">&nbsp;</Col>
									<Col :lg="8" :md="8" :sm="6" :xs="2">&nbsp;</Col>
									<Col :lg="4" :md="4" :sm="6" :xs="10">
										<Icon type="thumbsup" size="18" color="lightgray"></Icon> {{article.goodNumber}}
									</Col>
									<Col :lg="4" :md="4" :sm="6" :xs="10">
										<Icon type="chatbox-working" size="14" color="lightgray"></Icon> {{article.goodNumber}}
									</Col>
								</Row>
							</Col>
						</Row>
					</p>
				</TimelineItem>
			</Timeline>
		</div>
		<div>
			<h2 class="title-header">活跃用户 <small> —— Actively Users</small></h2>
		</div>
	</div>
</template>

<script>
export default {
	name: 'Index',
	data () {
		return {
			newestArticles:[],
			greatArticles:[],
			activelyUsers:[]
		}
	},
	mounted(){

		this.$Spin.show();

		new Promise((resolve, reject)=>{
			this.$http.get("api/article/all?page=0&size=5")
			.then((res) => {
				let result = res.body;
				let articles = result.content;

				articles.map(article => {
					article.gmtCreate = CountAgo(article.gmtCreate);
					return article;
				});

				this.newestArticles = result.content;

				resolve();
			},
			(err) => {
				this.$Message.error("网络异常");
			});
		})
		.then(()=>{
			this.$http.get("api/article/hot?page=0&size=5")
			.then((res) => {
				let result = res.body;
				let articles = result.content;

				articles.map(article => {
					article.gmtCreate = CountAgo(article.gmtCreate);
					return article;
				});

				this.greatArticles = result.content;

				this.$Spin.hide();
			},
			(err) => {
				this.$Message.error("网络异常");
			});
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

.timeline-newest {
	padding-top: 24px;
}

p.title{
	font-weight: bold;
	font-size: 16px;
	line-height: 22px;

}

p.title a{
	color: #666666;
}

p.info{
	font-size: 13px;
	line-height: 32px;
	color: gray;
}

p.info a{
	color: gray;
}

.ivu-timeline-item {
	padding-bottom: 0px;
}
</style>
