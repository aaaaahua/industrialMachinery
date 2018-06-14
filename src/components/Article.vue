<template>
	<section style="width: 100%;">
		<section class="leftTextarea">
			<h1 class="newsCenter">新闻中心</h1>
			<h2 class="newsTitle">结束塑料污染 – 印度</h2>
			<p class="newsText">在Walsn印度，我们针对本年度地球日活动主题 – 结束塑料污染，组织了一次公益讲座。 活动地址位于Ikebana 居民社区会馆。该社区20位居民参加了本次讲座，并在讲座积极讨论了关于塑料垃圾对人类带来的危害，以及如何开始从个人做起，减少塑料垃圾感谢大家积极参与！</p>
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
		name: 'HelloWorld',
		data() {
			return {
				msg: 'Welcome to Your Vue.js App'
			}
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