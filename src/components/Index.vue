<template>
	<div id="Index">
		<Carousel style="width: 640px;float: right;" autoplay v-model="carouselIndex" loop>
			<CarouselItem>
				<div class="demo-carousel"><img src="../../static/Carousel1.jpg"></div>
			</CarouselItem>
			<CarouselItem>
				<div class="demo-carousel"><img src="../../static/Carousel2.jpg"></div>
			</CarouselItem>
			<CarouselItem>
				<div class="demo-carousel"><img src="../../static/Carousel3.jpg"></div>
			</CarouselItem>
		</Carousel>
		<div class="indexTitle">公司产品</div>
		<Collapse v-model="value2" accordion style="width: 314px;float: left;">
			<Panel name="1">
				史蒂夫·乔布斯
				<p slot="content">史蒂夫·乔布斯（Steve Jobs），1955年2月24日生于美国加利福尼亚州旧金山，美国发明家、企业家、美国苹果公司联合创办人。</p>
			</Panel>
			<Panel name="2">
				斯蒂夫·盖瑞·沃兹尼亚克
				<p slot="content">斯蒂夫·盖瑞·沃兹尼亚克（Stephen Gary Wozniak），美国电脑工程师，曾与史蒂夫·乔布斯合伙创立苹果电脑（今之苹果公司）。斯蒂夫·盖瑞·沃兹尼亚克曾就读于美国科罗拉多大学，后转学入美国著名高等学府加州大学伯克利分校</p>
			</Panel>
			<Panel name="3">
				乔纳森·伊夫
				<p slot="content">乔纳森·伊夫是一位工业设计师，现任Apple公司设计师兼资深副总裁，英国爵士。他曾参与设计了iPod，iMac，iPhone，iPad等众多苹果产品。除了乔布斯，他是对苹果那些著名的产品最有影响力的人。</p>
			</Panel>
		</Collapse>
		<div style="clear: both"></div>
		<section class="indexSection">
			<h3>新闻中心<router-link to="article/"><span>更多>></span></router-link></h3>
			<div class="indexSectionContent">
				<img src="../../static/news.gif" />
				<ul>
					<li>结束塑料污染 – 印度结束塑</li>
					<li>结束塑料污染 – 印度结束塑料</li>
					<li>结束塑料污染 – 印度</li>
					<li>结束塑料污染 – 印度</li>
					<li>结束塑料污染 – 印度</li>
					<li>结束塑料污染 – 印度</li>
					<li>结束塑料污染 – 印度</li>
				</ul>
			</div>
		</section>
		<section class="indexSection">
			<h3>关于我们<span>更多>></span></h3>
			<div class="indexSectionContent">
				<Card style="width:302px">
					<div style="text-align:center">
						<img src="../../static/logo1.png">
						<h3>A high quality UI Toolkit based on Vue.js</h3>
					</div>
				</Card>
			</div>
		</section>
		<section class="indexSection">
			<h3>联系我们<router-link to="UserSuggestions/"><span>更多>></span></router-link></h3>
			<div class="indexSectionContent">
				<h3>怡风科技</h3>
				<p>电话：010-58856890 传真：010-58856997</p>
				<p>Walsn中国（北京）代表处电话：010-58856890 </p>
				<p> 传真：010-58856997客服：400 800 3658 </p>
				<p>邮箱：service@walsn.com</p>
				<p>地址：厦门市思明区北京市朝阳区望京东路6号 望京国际研发园三期</p>
			</div>
		</section>
	</div>
</template>

<script>
	export default {
		name: 'Index',
		data() {
			return {
				carouselIndex: 0,
				value2: '2',
			}
		},
	}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
	li {
		list-style: none;
	}
	
	.indexTitle {
		height: 40px;
		width: 314px;
		background: linear-gradient(rgb(168, 71, 14), rgb(156, 36, 6));
		color: #FFFFFF;
		font-size: large;
		text-align: center;
		line-height: 40px;
	}
	
	.indexSection {
		width: 314px;
		margin-top: 6px;
		display: inline-table;
		margin-right: 2px;
	}
	
	.indexSection>h3 {
		padding: 3px 5px;
		font-size: medium;
		height: 30px;
		width: 100%;
		border-top: 1px solid #E8E8E8;
		border-right: 1px solid #D3D3D3;
		border-bottom: 1px solid #B2B2B2;
		border-left: 1px solid #D3D3D3;
		background: url(../../static/contbg.jpg) left top repeat-x;
	}
	
	.indexSection>h3 span {
		float: right;
		color: #1D81B8;
		font-size: xx-small;
		line-height: 26px;
	}
	
	.indexSectionContent {
		padding: 8px;
		line-height: 2em;
	}
	
	.indexSectionContent img {
		width: 90px;
		display: inline-block;
		vertical-align: top;
	}
	
	.indexSectionContent ul {
		display: inline-block;
		width: 60%;
		margin-left: 5%;
	}
	
	.indexSectionContent ul li {
		font-size: small;
		line-height: 2em;
		text-decoration: underline;
	}
</style>