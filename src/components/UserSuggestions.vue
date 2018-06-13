<template>
	<section style="width: 100%;">
		<section class="leftTextarea">
			<h2 class="title">联系我们</h2>
			<Form :model="formLeft" label-position="left" :label-width="100" style="width: 525px;">
				<FormItem label="Title">
					<Input v-model="formLeft.input1"></Input>
				</FormItem>
				<FormItem label="Title name">
					<Input v-model="formLeft.input2"></Input>
				</FormItem>
				<FormItem label="Aligned title">
					<Input v-model="formLeft.input3"></Input>
				</FormItem>
				<FormItem label="Text">
					<Input v-model="formLeft.textEdit" type="textarea" :autosize="{minRows: 2,maxRows: 5}" placeholder="Enter something..."></Input>
				</FormItem>
				<FormItem>
            <Button type="primary" @click="handleSubmit('formCustom')">Submit</Button>
            <Button type="ghost" @click="handleReset('formCustom')" style="margin-left: 8px">Reset</Button>
        </FormItem>
			</Form>
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
				formLeft: {
					input1: '',
					input2: '',
					input3: '',
					textEdit: '',
				},
			}
		}
	}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
	.title {
		border-bottom: 1px solid #666666;
		width: 625px;
		margin-bottom: 30px;
		padding: 2px 0px;
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
		margin-top: -6px;
	}
	
	.rightInfoTable {
		margin-left: 130px;
		background-color: #E4E9E3;
		width: 200px;
		height: 315px;
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