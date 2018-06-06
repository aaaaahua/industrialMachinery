<template>
	<div class="index-content">
		<h2 class="title-header">个人资料 <small> —— Personal Profile</small></h2>

		<Row :gutter="16">
			<Col span="12">
				<Card class="card-info">
					<Row :gutter="8">
						<Col span="12">
							<Avatar shape="square" :src="user.iconPath" style="width:196px;height:196px;" />
						</Col>
						<Col span="12">
							<Timeline class="timeline-info">
								<TimelineItem>
									<p class="title">帐号</p>
									<p class="info">{{ user.account }}</p>
								</TimelineItem>
								<TimelineItem>
									<p class="title">昵称</p>
									<p class="info">{{ user.nickName }}</p>
								</TimelineItem>
								<TimelineItem>
									<p class="title">邮箱</p>
									<p class="info">{{ user.email }}</p>
								</TimelineItem>
							</Timeline>
						</Col>
					</Row>
				</Card>
			</Col>
			<Col span="12">
				<Card class="card-info">
					<p slot="title">基本信息</p>
					<Timeline class="timeline-info">
						<TimelineItem>
							<p class="title">性别</p>
							<p v-if="user.sex == 1" class="info">
								<Icon type="male" color="lightblue"></Icon> 男
							</p>
							<p v-else-if="user.sex == 2" class="info">
								<Icon type="female" color="pink"></Icon> 女
							</p>
							<p v-else-if="user.sex == 3" class="info">
								<Icon type="ios-locked-outline"></Icon> 保密
							</p>
							<p v-else class="info">
								<Icon type="transgender" color="lightgreen"></Icon> 未知
							</p>
						</TimelineItem>
						<TimelineItem>
							<p class="title">注册时间</p>
							<p class="info">{{ user.gmtCreate }}</p>
						</TimelineItem>
						<TimelineItem>
							<p class="title">个性签名</p>
							<p class="info">{{ user.signature }}</p>
						</TimelineItem>
					</Timeline>
				</Card>
			</Col>
			<Col span="12">
				<Card class="card-info">
					<p slot="title">实名信息</p>
					<Timeline class="timeline-info">
						<TimelineItem>
							<p class="title">认证状态</p>
							<p v-if="user.authenticated" class="info">已实名认证</p>
							<p v-else class="info">未实名认证</p>
						</TimelineItem>
						<TimelineItem>
							<p class="title">真实姓名</p>
							<p class="info">{{ user.realName || '无' }}</p>
						</TimelineItem>
						<TimelineItem>
							<p class="title">手机</p>
							<p class="info">{{ user.phone || '无' }}</p>
						</TimelineItem>
					</Timeline>
				</Card>
			</Col>
			<Col span="12">
				<Card class="card-info">
					<p slot="title">博客信息</p>
					<Timeline class="timeline-info">
						<TimelineItem>
							<p class="title">博客状态</p>
							<p v-if="user.isPublic" class="info">
								<Icon type="unlocked" color="green"></Icon> 公开
							</p>
							<p v-else class="info">
								<Icon type="locked" color="red"></Icon> 私密
							</p>
						</TimelineItem>
						<TimelineItem>
							<p class="title">积分</p>
							<p class="info">{{ user.score }}</p>
						</TimelineItem>
					</Timeline>
				</Card>
			</Col>
		</Row>

		
	</div>
</template>

<script>
export default {
	name: 'UserCMD_Profile',
	data () {
		return {
			user:{}
		}
	},
	mounted(){

		this.$Spin.show();

		this.$http.get("api/user/info")
		.then((res) => {
			
			var result = res.body;
			
			if(result.success){ 
				result.data.gmtCreate = new Date(result.data.gmtCreate * 1000).Format("yyyy年MM月dd日 hh:mm:ss");
				this.user = this.fixUserInfo(result.data);
			}else{
				this.$Message.error(result.msg);
			}
			
			this.$Spin.hide();
		},
		(err) => {
			this.$Spin.hide();

			this.$Notice.error({
				title: '网络异常',
				desc: '请刷新页面重试'
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
