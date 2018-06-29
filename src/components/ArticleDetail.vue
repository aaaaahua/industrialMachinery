<template>
	<section style="width: 100%;">

		<section class="leftTextarea"  style="padding:24px;">
			<!-- <h1 class="newsCenter">{{title1}}</h1> -->
			<h2 class="newsTitle">{{article.title}}</h2>
			<br>
			<p class="newsText" v-html="article.content"></p>
		</section>

		<section class="rightInfo">
			<section class="rightInfoTable">
				<section class="rightInfoTableImg">
					<img src="../../static/suggest.gif" class="suggestImg" />
				</section>
				<section class="rightInfoTableText">
					<h3 style="text-align: center;">Walsn中国（北京）代表处</h3>
					<section style="padding-left: 15px;">
						<p>客服：400 800 3658</p>
						<p>客服：400 800 3658</p>
						<p>客服：400 800 3658</p>
						<p>客服：400 800 3658</p>
						<p>客服：400 800 3658</p>
						<p>客服：400 800 3658</p>
					</section>
				</section>
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
			}
		},
		mounted(){
			

			
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