<template>
	<div class="technology_add">
		<a-row>
			<h3>
				<i class="iconfont" style="font-size:16px;color:#1890ff">&#xe61b;</i>基础信息
			</h3>
		</a-row>
		<a-form :form="form" layout="inline" style="voerflow:hidden;">
			<a-col :span="12">
				<a-form-item label="关联工单">
					<a-input style="width:240px;"></a-input>
				</a-form-item>
			</a-col>
			<a-col :span="12">
				<a-form-item label="工作令号">
					<a-input style="width:240px;"></a-input>
				</a-form-item>
			</a-col>
			<a-col :span="12">
				<a-form-item label="名称">
					<a-input style="width:240px;"></a-input>
				</a-form-item>
			</a-col>
			<a-col :span="12">
				<a-form-item label="图号">
					<a-input style="width:240px;"></a-input>
				</a-form-item>
			</a-col>
			<a-col :span="12">
				<a-form-item label="选择原料">
					<a-select :defaultValue="1" style="margin-right:10px;width: 115px">
						<a-select-option :value="i" v-for="(i,index) in 5" :key="index">{{i}}</a-select-option>
					</a-select>
					<a-select :defaultValue="1" style="width: 115px">
						<a-select-option :value="j" v-for="(j,index1) in 5" :key="index1">{{j}}</a-select-option>
					</a-select>
				</a-form-item>
			</a-col>
			<a-col :span="12">
				<a-form-item label="计划数量">
					<a-input style="width:240px;"></a-input>
				</a-form-item>
			</a-col>
			<a-col :span="12">
				<a-form-item label="每毛坯件数">
					<a-input style="width:240px;"></a-input>
				</a-form-item>
			</a-col>
			<a-col :span="12">
				<a-form-item label="毛坯数量">
					<a-input style="width:240px;"></a-input>
				</a-form-item>
			</a-col>
			<a-col :span="12">
				<a-form-item label="毛坯外形尺寸">
					<span style="display: inline-block;padding-bottom:20px;">
						长
						<a-input style="width:102px;"></a-input>&nbsp;±
						<a-input style="width:102px;"></a-input>
					</span>
					<br>
					<span style="display: inline-block;padding-bottom:20px;">
						宽
						<a-input style="width:102px;"></a-input>&nbsp;±
						<a-input style="width:102px;"></a-input>
					</span>
					<br>
					<span>
						高
						<a-input style="width:102px;"></a-input>&nbsp;±
						<a-input style="width:102px;"></a-input>
					</span>
				</a-form-item>
			</a-col>
			<a-col :span="12">
				<a-form-item label="单个毛坯重量">
					<a-input style="width:240px;"></a-input>
				</a-form-item>
				<a-form-item label="单个成品面积">
					<a-input style="width:240px;"></a-input>
				</a-form-item>
				<a-form-item label="单个成品重量">
					<a-input style="width:240px;"></a-input>
				</a-form-item>
			</a-col>
			<a-col :span="24">
				<a-form-item label="备注">
					<a-input style="width:615px;"></a-input>
				</a-form-item>
			</a-col>
			<a-col :span="24">
				<h3>
					<i class="iconfont" style="font-size:16px;color:#1890ff">&#xe603;</i>排配信息
				</h3>
			</a-col>
			<a-col :span="24">
				<a-row class="table_style">
					<span style="width:5%;">序号</span>
					<span style="width:12%;">工种</span>
					<span style="width:25%;">工序内容</span>
					<span style="width:10%;">工时</span>
					<span style="width:16%;">班组长</span>
					<span style="width:20%;">备注</span>
					<span style="width:8%;">操作</span>
				</a-row>
				<a-row class="table_style" style="padding-top:12px" v-for="(i,index) in 5" :key="index">
					<span style="width:5%;">
						<div class="serial_number">{{index+1}}</div>
					</span>
					<span style="width:12%;">
						<a-select :defaultValue="1" style="width: 100%">
							<a-select-option :value="i" v-for="(i,index) in 5" :key="index">{{i}}</a-select-option>
						</a-select>
					</span>
					<span style="width:25%;">
						<a-input style="width:100%;"></a-input>
					</span>
					<span style="width:10%;">
						<a-input style="width:100%;"></a-input>
					</span>
					<span style="width:16%;">
						<a-select :defaultValue="1" style="width: 100%">
							<a-select-option :value="i" v-for="(i,index) in 5" :key="index">{{i}}</a-select-option>
						</a-select>
					</span>
					<span style="width:20%;">
						<a-input style="width:100%;"></a-input>
					</span>
					<span style="width:8%;">
						<a-icon style="color:#1890ff;cursor: pointer;" type="plus-circle"/>&nbsp;
						<a-icon style="color:red;cursor: pointer;" type="minus-circle"/>
					</span>
				</a-row>
			</a-col>
			<a-col :span="24">
				<a-form-item style="display:block;text-align:right;margin-bottom:0;margin-top:20px;">
					<a-button @click="handleCancel" style="margin-right:12px;">取消</a-button>
					<a-button type="primary" @click>保存</a-button>
				</a-form-item>
			</a-col>
		</a-form>
	</div>
</template>
<script>
export default {
	data() {
		return {
			form: this.$form.createForm(this)
		};
	},
	methods: {
		handleCancel() {}
	},
	created() {}
};
</script>
<style lang="less">
.technology_add {
	overflow: hidden;
	.ant-form-inline .ant-form-item > .ant-form-item-label {
		width: 120px;
	}
	.ant-form-inline .ant-form-item {
		margin-bottom: 20px;
	}
	.ant-input-number-handler-wrap {
		display: none;
	}
	.table_style {
		padding-left: 20px;
		span {
			display: inline-block;
		}
		.serial_number {
			width: 25px;
			height: 25px;
			border-radius: 50%;
			background-color: #f2f2f2f2;
			line-height: 25px;
			text-align: center;
		}
	}
}
</style>
