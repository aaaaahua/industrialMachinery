<template>
	<div id="Index">
		<Carousel autoplay v-model="carouselIndex" loop radius-dot height="480">
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
		<br>
		<br>
		<div class="indexTitle">&nbsp;公司产品<router-link to="/article/32"><span>查看全部 >>&nbsp;&nbsp;&nbsp;</span></router-link></div>
		<div class="companyProductList" style="padding-left:72px;">
			<Row>
				<Col :md="7" :lg="7" v-for="chanpin in listChanPin" :name="'chanpin_' + chanpin.id" :key="chanpin.id" style="margin-left:24px;">
					<Card style="width:100%;margin-top:12px;" >
						<p slot="title">
							<Icon type="ionic"></Icon>
							{{chanpin.title}}
						</p>
						<div class="aboutUs" v-html="chanpin.content">
						</div>
					</Card>
				</Col>
			</Row>
			
		</div>
		<!--<Collapse v-model="valueChanpin" accordion style="width: 314px;float: left;">
			<Panel v-for="chanpin in listChanPin" :name="'chanpin_' + chanpin.id" :key="chanpin.id">
				{{chanpin.title}}
				<p slot="content" v-html="chanpin.content" style="max-height: 62px;overflow-y: scroll"></p>
			</Panel>
		</Collapse>-->
		<div style="clear: both;height:24px;"></div>
		<section class="indexSection">
			<h3>新闻中心<router-link to="/article/28"><span>更多 >>&nbsp;</span></router-link></h3>
			<div class="indexSectionContent">
				<br>
				<img src="../../static/news.gif" style="width:128px;height:128px;" />
				<Timeline>
					<TimelineItem v-for="article in newsArticle" :key="article.id" color="blue"><router-link :to="'/articleDetail/'+article.id">{{article.title}}</router-link></TimelineItem>
				</Timeline>
			</div>
		</section>
		<section class="indexSection">
			<h3>关于我们<router-link to="/article/30"><span>详情 >>&nbsp;</span></router-link></h3>
			<div class="indexSectionContent" v-html="aboutMeArticle[0] ? aboutMeArticle[0].content : ''">
			</div>
		</section>
		<!-- <section class="indexSection">
			<h3>联系我们<router-link to="UserSuggestions/"><span>更多>></span></router-link></h3>
			<div class="indexSectionContent">
				<h3>怡风科技</h3>
				<p>电话：010-58856890 传真：010-58856997</p>
				<p>Walsn中国（北京）代表处电话：010-58856890 </p>
				<p> 传真：010-58856997客服：400 800 3658 </p>
				<p>邮箱：service@walsn.com</p>
				<p>地址：厦门市思明区北京市朝阳区望京东路6号 望京国际研发园三期</p>
			</div>
		</section> -->
	</div>
</template>

<script>
	export default {
		name: 'Index',
		data() {
			return {
				carouselIndex: 0,
				valueChanpin: '1',
				listChanPin: [],
				newsArticle: [],
				aboutMeArticle: []
			}
		},
		mounted() {
			this.$http.get("api/article/nav?id=32").then((res) => {
				var result = res.body;
				if(result) {
					this.listChanPin = result;
					this.valueChanpin = 'chanpin_' + result[0].id
				} else {
					this.$Message.error("网络异常");
				}
			});

			this.$http.get("api/article/nav?id=28").then((res) => {
				var result = res.body;
				if(result) {
					this.newsArticle = result;
				} else {
					this.$Message.error("网络异常");
				}
			});

			this.$http.get("api/article/nav?id=30").then((res) => {
				var result = res.body;
				if(result) {
					this.aboutMeArticle = result;
				} else {
					this.$Message.error("网络异常");
				}
			});
		}
	}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
	li {
		list-style: none;
	}

	.aboutUs img {
		width: 100% !important;
		height: auto;
	}

	.companyProduct:nth-child(2n+1) {
		background-color: #f7f7f7;
		border-radius: 3px;
		border: 1px solid #dddee1;
		width: 314px;
		float: left;
	}
	
	.companyProduct:last-child {
		background-color: #f7f7f7;
		border-radius: 3px;
		border: 1px solid #dddee1;
		width: 314px;
		float: left;
		border-top: none;
	}
	
	.companyProduct {
		background-color: #f7f7f7;
		border-radius: 3px;
		border: 1px solid #dddee1;
		width: 314px;
		float: left;
		border-bottom: none;
		border-top: none;
	}
	
	.companyProduct li {
		height: 38px;
		line-height: 38px;
		padding-left: 32px;
		color: #666;
		cursor: pointer;
		position: relative;
	}
	
	.companyProduct li span {
		padding: 0px 6px;
	}

	.aboutUs{
		overflow: hidden;
		text-align: justify;
		height: 325px;
	}
	
	.indexTitle {
		height: 48px;
		width: 95.5%;
		background: linear-gradient( rgb(37, 137, 189), rgb(6, 109, 168));
		color: #FFFFFF;
		font-size: large;
		text-align: left;
		line-height: 48px;
		padding-left: 18px;
		margin-left:2.5%;
	}

	.indexTitle a {
		float: right;
		color: #FFFFFF;
		font-size: small;
		line-height: 48px;
	}
	
	.indexSection {
		width: 45%;
		margin-top: 6px;
		display: inline-table;
		margin-right: 2px;
		margin-left:2.5%;
	}
	
	.indexSection>h3 {
		padding: 3px 5px;
		font-size: medium;
		height: 48px;
		padding-left: 18px;
		font-weight: 300;

		line-height: 44px;
		width: 100%;
		border-top: 1px solid #E8E8E8;
		border-right: 1px solid #D3D3D3;
		border-bottom: 1px solid #B2B2B2;
		border-left: 1px solid #D3D3D3;
		background: linear-gradient( rgb(37, 137, 189), rgb(6, 109, 168));
		color: #FFFFFF;
		text-align: left;
	}
	
	.indexSection>h3 span {
		float: right;
		color: #FFFFFF;
		font-size: small;
		line-height: 44px;
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
		width: 70%;
		margin-left: 5%;
	}
	
	.indexSectionContent ul li {
		font-size: small;
		line-height: 2em;
		text-decoration: underline;
	}

	.demo-carousel img{
		width: 100%;
		height: 480px;
	}

	.ivu-timeline-item-content a{
		font-size: 14px;
	}
</style>