<template>
	<div class="material_management">
		<a-row>
			<div style="line-height:50px;">
				<a-col :span="12" style="padding:0 20px;">
					<a-button @click="$message.error('暂不支持自定义！')">
						<a-icon style="color:#1890ff;" type="plus"/>新增
					</a-button>
				</a-col>
			</div>
		</a-row>
		<a-row>
			<a-col :span="12" style="padding:20px 20px;">
				<a-card hoverable style="width: 300px;display:inline-block;margin-right:12px;">
					<img alt="example" src="../../assets/u1663.svg" slot="cover">
					<template class="ant-card-actions" slot="actions">
						<a-icon type="plus" style="font-size:20px" @click="addBoardVisible=true"/>
						<i class="iconfont" style="font-size:20px" @click="BoardListVisible=true">&#xe627;</i>
					</template>
					<a-card-meta title="板料" description="板料指由板坯轧制的光滑平面金属的半制品，其长度和宽度远远大于厚度。"></a-card-meta>
				</a-card>
				<a-card hoverable style="width: 300px;display:inline-block;">
					<img alt="example" src="../../assets/u1672.svg" slot="cover">
					<template class="ant-card-actions" slot="actions">
						<a-icon type="plus" style="font-size:20px" @click="addStickVisible=true"/>
						<i class="iconfont" style="font-size:20px" @click="StickListVisible=true">&#xe627;</i>
					</template>
					<a-card-meta title="棒料" description="棒料是针对于板材和其他型材而言，就是有一定长度的圆形或多边形长棍形状的材料。"></a-card-meta>
				</a-card>
			</a-col>
		</a-row>
		<a-modal
			title="新增规格"
			width="800px"
			:visible="addBoardVisible"
			@cancel="handleCancel(1)"
			:maskClosable="false"
			class="modal_form_style"
			:footer="null"
		>
			<a-form :form="form" layout="inline" style="overflow:hidden">
				<a-col :span="12">
					<a-form-item label="名称">
						<a-input
							v-decorator="['name',{rules: [{ required: true, message: '请填写名称' }]}]"
							style="width:260px;"
						></a-input>
					</a-form-item>
				</a-col>
				<a-col :span="12">
					<a-form-item label="长">
						<a-input
							v-decorator="['lengthOrRadius',{rules: [{ required: true, message: '请填写长' }]}]"
							type="number"
							style="width:260px;"
							addonAfter="mm"
						></a-input>
					</a-form-item>
				</a-col>
				<a-col :span="12">
					<a-form-item label="编号">
						<a-input v-decorator="['number']" style="width:260px;"></a-input>
					</a-form-item>
				</a-col>
				<a-col :span="12">
					<a-form-item label="宽">
						<a-input
							v-decorator="['widthOrRadius',{rules: [{ required: true, message: '请填写宽' }]}]"
							type="number"
							style="width:260px;"
							addonAfter="mm"
						></a-input>
					</a-form-item>
				</a-col>
				<a-col :span="12">
					<a-form-item label="备注">
						<a-input v-decorator="['remark']" style="width:260px;"></a-input>
					</a-form-item>
				</a-col>
				<a-col :span="12">
					<a-form-item label="厚度">
						<a-input
							v-decorator="['heightOrLength',{rules: [{ required: true, message: '请填写厚度' }]}]"
							type="number"
							style="width:260px;"
							addonAfter="mm"
						></a-input>
					</a-form-item>
				</a-col>
				<a-col :span="24">
					<a-form-item style="display:block;text-align:right;margin-bottom:0">
						<a-button @click="handleCancel(1)" style="margin-right:12px;">取消</a-button>
						<a-button type="primary" @click="boardAdd">保存</a-button>
					</a-form-item>
				</a-col>
			</a-form>
		</a-modal>
		<a-modal
			title="新增规格"
			width="800px"
			:visible="addStickVisible"
			@cancel="handleCancel(2)"
			:maskClosable="false"
			class="modal_form_style"
			:footer="null"
		>
			<a-form :form="form" layout="inline" style="overflow:hidden">
				<a-col :span="12">
					<a-form-item label="名称">
						<a-input
							v-decorator="['name',{rules: [{ required: true, message: '请填写名称' }]}]"
							style="width:260px;"
						></a-input>
					</a-form-item>
				</a-col>
				<a-col :span="12">
					<a-form-item label="半径">
						<a-input
							v-decorator="['lengthOrRadius',{rules: [{ required: true, message: '请填写长' }]}]"
							type="number"
							style="width:260px;"
							addonAfter="mm"
						></a-input>
					</a-form-item>
				</a-col>
				<a-col :span="12">
					<a-form-item label="编号">
						<a-input v-decorator="['number']" style="width:260px;"></a-input>
					</a-form-item>
				</a-col>
				<a-col :span="12">
					<a-form-item label="长">
						<a-input
							v-decorator="['heightOrLength',{rules: [{ required: true, message: '请填写厚度' }]}]"
							type="number"
							style="width:260px;"
							addonAfter="mm"
						></a-input>
					</a-form-item>
				</a-col>
				<a-col :span="12">
					<a-form-item label="备注">
						<a-input v-decorator="['remark']" style="width:260px;"></a-input>
					</a-form-item>
				</a-col>
				<a-col :span="24">
					<a-form-item style="display:block;text-align:right;margin-bottom:0">
						<a-button @click="handleCancel(2)" style="margin-right:12px;">取消</a-button>
						<a-button type="primary" @click="stickAdd">保存</a-button>
					</a-form-item>
				</a-col>
			</a-form>
		</a-modal>
		<a-modal
			title="板料"
			width="800px"
			:visible="BoardListVisible"
			@cancel="handleCancel(3)"
			:maskClosable="false"
			:footer="null"
		>
			<bord-list></bord-list>
		</a-modal>
		<a-modal
			title="棒料"
			width="800px"
			:visible="StickListVisible"
			@cancel="handleCancel(4)"
			:maskClosable="false"
			:footer="null"
		>
			<stick-list></stick-list>
		</a-modal>
	</div>
</template>
<script>
import BordList from "./BordList";
import StickList from "./StickList";
export default {
	inject: ["reload"],
	data() {
		return {
			addBoardVisible: false,
			addStickVisible: false,
			BoardListVisible: false,
			StickListVisible: false,
			form: this.$form.createForm(this)
		};
	},
	methods: {
		handleCancel(a) {
			if (a == 1) {
				this.addBoardVisible = false;
				this.form.resetFields();
			}
			if (a == 2) {
				this.addStickVisible = false;
				this.form.resetFields();
			}
			if (a == 3) {
				this.BoardListVisible = false;
				// this.reload();
			}
			if (a == 4) {
				this.StickListVisible = false;
				// this.reload();
			}
		},
		boardAdd() {
			this.form.validateFieldsAndScroll((err, values) => {
				if (!err) {
					// console.log("Received values of form: ", values);
					let qs = require("qs");
					let data = {
						type: 1,
						lengthOrRadius: values.lengthOrRadius,
						widthOrRadius: values.widthOrRadius,
						heightOrLength: values.heightOrLength,
						name: values.name,
						remark: values.remark,
						number: values.number
					};
					this.Axios(
						{
							url: "/api-workorder/rawMaterial/add",
							params: data,
							type: "post",
							option: { successMsg: "添加成功！" },
							config: {
								headers: { "Content-Type": "application/json" }
							}
						},
						this
					).then(
						result => {
							if (result.data.code === 200) {
								console.log(result);
								this.addBoardVisible = false;
								this.form.resetFields();
								this.reload();
							}
						},
						({ type, info }) => {}
					);
				}
			});
		},
		stickAdd() {
			this.form.validateFieldsAndScroll((err, values) => {
				if (!err) {
					// console.log("Received values of form: ", values);
					let qs = require("qs");
					let data = {
						type: 2,
						lengthOrRadius: values.lengthOrRadius,
						widthOrRadius: values.lengthOrRadius,
						heightOrLength: values.heightOrLength,
						name: values.name,
						remark: values.remark,
						number: values.number
					};
					this.Axios(
						{
							url: "/api-workorder/rawMaterial/add",
							params: data,
							type: "post",
							option: { successMsg: "添加成功！" },
							config: {
								headers: { "Content-Type": "application/json" }
							}
						},
						this
					).then(
						result => {
							if (result.data.code === 200) {
								console.log(result);
								this.addStickVisible = false;
								this.form.resetFields();
								this.reload();
							}
						},
						({ type, info }) => {}
					);
				}
			});
		}
	},
	created() {},
	components: {
		BordList,
		StickList
	}
};
</script>

<style lang="less">
@import url("../../assets/layout.less");
.material_management {
	.ant-card-meta-description {
		height: 70px;
	}
}
.modal_form_style {
	.ant-form-inline .ant-form-item > .ant-form-item-label {
		width: 100px;
	}
	.ant-form-inline .ant-form-item {
		margin-bottom: 20px;
	}
	.ant-input-number-handler-wrap {
		display: none;
	}
}
</style>
