<template>
	<section style="width: 100%;">

		<section class="leftTextarea">
			<!-- <h1 class="newsCenter">{{title1}}</h1> -->
			<h2 class="newsTitle">{{article.title}}</h2>
			<br>
			<p class="newsText" v-html="article.content"></p>
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
				article: {},
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
			
			this.getArticle();
		},
		methods:{
			getArticle(){
				this.$http.get("api/article/info?id=" + this.$route.params.id).then((res) => {
					var result = res.body;
					if(result) {
						this.article = result;
					} else {
						this.$Message.error("网络异常");
					}
				});
			}
		},
		watch:{
			"$route": "getArticle"
		}
	}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
	.newsCenter {
		border-bottom: 1px solid #666666;
		width: 100%;
		margin-bottom: 10px;
		padding: 2px px;
		color: #627C19;
		font-size:20px;
	}
	
	.newsTitle {
		text-align: center;
	}
	
	.newsText {
		text-indent: 2em;
		line-height: 2em;
	}
	
	.leftTextarea {
		width: 65%;
		display: inline-block;
		vertical-align: top;
		padding: 24px 128px;
		min-height: 750px;
	}
	
	.suggestImg {
		width: 100%;
		margin: 12px 0px 0px 0px;
		border: 1px solid #A5A5A5;
	}
	
	.rightInfo {
		width: 30%;
		display: inline-block;
		min-height: 750px;
	}
	
	.rightInfoTable {
		margin-left: 130px;
		background-color: #eee;
		width: 320px;
		float: right;
		padding-bottom: 20%;
		min-height: 750px;
	}
	
	.rightInfoTableText {
		margin: 6px 0px;
	}
	
	.rightInfoTableText p {
		padding: 4px;
	}
</style>