<template>
	<section style="width: 100%;">
		<section class="leftTextarea">
			<h2 class="title">联系我们</h2>
			<Form ref="formNote" :model="formNote" label-position="left" :label-width="100" style="width: 525px;">
				<FormItem label="姓名" prop="name">
					<Input v-model="formNote.name"></Input>
				</FormItem>
				<FormItem label="E-mail" prop="email">
					<Input v-model="formNote.email"></Input>
				</FormItem>
				<FormItem label="手机号码" prop="phone">
					<Input v-model="formNote.phone"></Input>
				</FormItem>
				<FormItem label="留言" prop="note">
					<Input v-model="formNote.note" type="textarea" :autosize="{minRows: 2,maxRows: 5}" placeholder="请留下您的宝贵建议"></Input>
				</FormItem>
				<FormItem>
					<Button type="primary" @click="handleSubmit('formNote')">提交</Button>
					<Button type="ghost" @click="handleReset('formNote')">重置</Button>
				</FormItem>
			</Form>
		</section>
		<section class="rightInfo">
			<section class="rightInfoTable" v-html="sideBox.data">

			</section>
		</section>
	</section>
</template>

<script>
	export default {
		name: 'UserNote',
		data() {
			return {
				formNote: {
					name: '',
					email: '',
					phone: '',
					note: '',
				},
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
			
		},
		methods: {
			handleSubmit (name) {
                this.$http.post("api/note/add", this.formNote)
				.then((res) => {
					var result = res.body;
					if(result) {
						alert("提交成功，谢谢您对贵公司的留言建议。");
						this.$router.go();
					} else {
						this.$Message.error("网络异常");
					}
				});
            },
			handleReset (name) {
                this.$refs[name].resetFields();
            }
		}
	}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
	.title {
		border-bottom: 1px solid rgb(37, 137, 189);
		width: 625px;

		margin-bottom: 30px;
		padding: 2px 0px;
		color:rgb(37, 137, 189);
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