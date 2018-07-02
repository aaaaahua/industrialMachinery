<template>
	<section style="width: 100%;">
		<section v-if="articles.length > 1" class="leftTextarea" style="padding:24px;">
			<h1 class="newsCenter">{{title1}}</h1>
			<Timeline>
				<TimelineItem v-for="article in articles" :key="article.id">
					<router-link class="time" :to="'/articleDetail/'+article.id">{{article.title}}</router-link>
				</TimelineItem>
			</Timeline>
			
		</section>

		<section v-else-if="articles.length == 1" class="leftTextarea"  style="padding:24px;">
			<h1 class="newsCenter">{{title1}}</h1>
			<h2 class="newsTitle">{{articles[0].title}}</h2>
			<br>
			<p class="newsText" v-html="articles[0].content"></p>
		</section>

		<section v-else class="leftTextarea"  style="padding:24px;">
			<h1 class="newsCenter">{{title1}}</h1>
		</section>

		<section class="rightInfo">
			<section class="rightInfoTable" v-html="sideBox.data">

			</section>
		</section>
	</section>
</template>

<script>
	export default {
		name: 'Article',
		data() {
			return {
				articles: [],
				mapNavs: [],
				title1: "",
				sideBox: {},
			}
		},
		mounted(){
			
			this.$http.get("api/config/info?key=sidebox").then((res) => {
				var result = res.body;
				if(result) {
					this.sideBox = result.data;
				} else {
					this.$Message.error("网络异常");
				}
			});
			
			this.getArticles();
		},
		methods:{
			getArticles(){
				this.$http.get("api/nav/all").then((res) => {
					var result = res.body;
					if(result) {
						let map = new Map();
						for(let nav of result){
							if(nav.id == this.$route.params.id) this.title1 = nav.title;
							map.set(nav.id, JSON.stringify(nav));
						}

						this.mapNavs = map;
					} else {
						this.$Message.error("网络异常");
					}
				});

				this.$http.get("api/article/nav?id=" + this.$route.params.id).then((res) => {
					var result = res.body;
					if(result) {
						this.articles = result;
					} else {
						this.$Message.error("网络异常");
					}
				});
			}
		},
		watch:{
			"$route": "getArticles"
		}
	}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
	.newsCenter {
		border-bottom: 1px solid #666666;
		width: 625px;
		margin-bottom: 10px;
		padding: 2px 0px;
		color: #627C19;
		font-size: 16px;
	}
	
	.newsTitle {
		text-align: center;
	}
	
	.newsText {
		text-indent: 2em;
		line-height: 2em;
	}
	
	.leftTextarea {
		width: 625px;
		display: inline-block;
		vertical-align: top;
	}
	
	.suggestImg {
		width: 100%;
		margin: 12px 0px 0px 0px;
		border: 1px solid #A5A5A5;
	}
	
	.rightInfo {
		width: 330px;
		display: inline-block;
	}
	
	.rightInfoTable {
		margin-left: 130px;
		background-color: #eee;
		width: 200px;
		float: right;
		padding-bottom: 20%
	}
	
	.rightInfoTableImg {
		margin: 0px auto;
		width: 170px;
	}
	
	.rightInfoTableText {
		margin: 6px 0px;
	}
	
	.rightInfoTableText p {
		padding: 4px;
	}
</style>