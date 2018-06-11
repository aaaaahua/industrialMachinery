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
			<p>新闻中心<span>更多>></span></p>
			<div>
				<ul>
					<li>aa</li>
					<li>aa</li>
					<li>aa</li>
				</ul>
			</div>
		</section>
		<section class="indexSection">
			<p>新闻中心<span>更多>></span></p>
			<div>
				<ul>
					<li>aa</li>
					<li>aa</li>
					<li>aa</li>
				</ul>
			</div>
		</section>
		<section class="indexSection">
			<p>新闻中心<span>更多>></span></p>
			<div>
				<ul>
					<li>aa</li>
					<li>aa</li>
					<li>aa</li>
				</ul>
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
				value2: 2
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
	
	.indexSection>p {
		font-size: medium;
		height: 30px;
		width: 100%;
		border-bottom: 1px solid #D3D3D3;
	}
	.indexSection>p>span{
		float: right;
		color: #1D81B8;
		font-size: xx-small;
		line-height: 26px;
	}
</style>