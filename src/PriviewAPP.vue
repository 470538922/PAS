<template>
	<div class="case">
		<div class="content_case" v-for="(i,index) in 10" :key="index">
			<div style="text-align:center;">
				<h1>加工工艺过程卡片</h1>
			</div>
			<div>
				<h3>基础信息</h3>
				<a-col :span="24" style="overflow:hidden">
					<a-col :span="12">
						<span class="label_style">关联工单：</span>
						<span>GD10074891</span>
					</a-col>
					<a-col :span="12">
						<span class="label_style">工作令号：</span>
						<span>CHZD10074891</span>
					</a-col>
					<a-col :span="12">
						<span class="label_style">名称：</span>
						<span>GD10074891</span>
					</a-col>
					<a-col :span="12">
						<span class="label_style">图号：</span>
						<span>CHZD10074891</span>
					</a-col>
					<a-col :span="12">
						<span class="label_style">选择原料：</span>
						<span>GD10074891</span>
					</a-col>
					<a-col :span="12">
						<span class="label_style">计划数量：</span>
						<span>CHZD10074891</span>
					</a-col>
					<a-col :span="12">
						<span class="label_style">每毛坯件数：</span>
						<span>GD10074891</span>
					</a-col>
					<a-col :span="12">
						<span class="label_style">毛坯数量：</span>
						<span>CHZD10074891</span>
					</a-col>
					<a-col :span="12">
						<span class="label_style">毛坯外形尺寸：</span>
						<span>长 104±5</span>
						<br>
						<br>
						<span class="label_style"></span>
						<span>宽 104±5</span>
						<br>
						<br>
						<span class="label_style"></span>
						<span>厚 104±5</span>
					</a-col>
					<a-col :span="12">
						<span class="label_style">单个毛坯重量：</span>
						<span>CHZD10074891</span>
						<br>
						<br>
						<span class="label_style">单个成品表面积：</span>
						<span>CHZD10074891</span>
						<br>
						<br>
						<span class="label_style">单个成品重量：</span>
						<span>CHZD10074891</span>
					</a-col>
					<a-col :span="12">
						<span class="label_style">备注：</span>
						<span></span>
					</a-col>
				</a-col>
				<a-col :span="24">
					<h3>排配信息</h3>
					<a-col :span="24">
						<table class="table_style">
							<tr style="background-color:#f1f1f1;color:#333333 ;font-weight:normal;">
								<th style="width:5%">序号</th>
								<th style="width:15%">工种</th>
								<th style="width:30%">工序内容</th>
								<th style="width:15%">工时</th>
								<th style="width:15%">班组长</th>
								<th style="width:20%">备注</th>
							</tr>
							<tr v-for="(i,index) in 10" :key="index">
								<td style="width:5%">1</td>
								<td style="width:15%">1</td>
								<td style="width:30%;">1</td>
								<td style="width:15%">1</td>
								<td style="width:15%">1</td>
								<td style="width:20%">1</td>
							</tr>
						</table>
					</a-col>
					<a-col :span="24" style="margin-top:20px;">
						<a-col :span="12">
							<div>
								<img src="./assets/u1392.png" alt style="width:80px;">
							</div>
						</a-col>
						<a-col :span="12">
							<div style="display:inline-block;text-align:right;width:100%;">
								<div>
									拟制：
									<span style="display:inline-block;width:130px;text-align:left"></span>
								</div>
								<div style="margin-top:12px;">
									审核：
									<span style="display:inline-block;width:130px;text-align:left"></span>
								</div>
								<div style="margin-top:12px;">
									打印时间：
									<span style="display:inline-block;width:130px;text-align:left">2019-7-29 14:03:01</span>
								</div>
							</div>
						</a-col>
					</a-col>
				</a-col>
			</div>
		</div>
	</div>
</template>
<script>
import Vue from "vue";
import { Table, Col, Row, Form, Input, Icon } from "ant-design-vue";
Vue.use(Table);
Vue.use(Col);
Vue.use(Row);
Vue.use(Form);
Vue.use(Input);
Vue.use(Icon);
export default {
	data() {
		return {};
	}
};
</script>
<style lang="less">
.case {
	font-size: 14px;
	color: #333333;
	background-color: #f0f2f5;
	padding: 8px;
	.content_case {
		background-color: white;
		padding: 10px;
		overflow: hidden;
		margin-bottom: 10px;
		page-break-after: always;
		.label_style {
			display: inline-block;
			width: 30%;
			text-align: right;
		}
		.ant-col-12 {
			margin-bottom: 24px;
		}
		.table_style {
			width: 100%;
			border: 1px solid #dde2eb;
			border-collapse: collapse;
			tr {
				width: 100%;
				th {
					text-align: center;
					border: 1px solid #dde2eb;
					line-height: 28px;
				}
				td {
					text-align: center;
					border: 1px solid #dde2eb;
					line-height: 28px;
				}
			}
		}
	}
}
</style>
