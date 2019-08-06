<template>
	<div class="add_work_order">
		<a-form :form="form" layout="inline">
			<a-tabs defaultActiveKey="1">
				<a-tab-pane tab="基础信息" key="1">
					<a-form-item label="工单号">
						<a-input style="width:335px;"></a-input>
					</a-form-item>
					<a-form-item label="工作令号">
						<a-input style="width:335px;"></a-input>
					</a-form-item>
					<a-form-item label="工单标题">
						<a-input style="width:335px;"></a-input>
					</a-form-item>
					<a-form-item label="客户名称">
						<a-input style="width:335px;"></a-input>
					</a-form-item>
					<a-form-item label="计划数量">
						<a-input style="width:335px;"></a-input>
					</a-form-item>
					<a-form-item label="承制单位">
						<a-input style="width:335px;"></a-input>
					</a-form-item>
					<a-form-item label="计划开工时间">
						<a-input style="width:335px;"></a-input>
					</a-form-item>
					<a-form-item label="实际开工时间">
						<a-input style="width:335px;"></a-input>
					</a-form-item>
					<a-form-item label="计划完工时间">
						<a-input style="width:335px;"></a-input>
					</a-form-item>
					<a-form-item label="实际完工时间">
						<a-input style="width:335px;"></a-input>
					</a-form-item>
					<a-form-item label="优先级">
						<a-radio-group v-model="radioValue">
							<a-radio :value="1">正常</a-radio>
							<a-radio :value="2">优先</a-radio>
						</a-radio-group>
					</a-form-item>
					<a-form-item label="备注">
						<a-textarea style="width:809px;" :autosize="{ minRows: 4, maxRows: 4 }"></a-textarea>
					</a-form-item>
				</a-tab-pane>
				<a-tab-pane tab="工单明细" key="2" forceRender>
					<div style="text-align:right;padding-bottom:12px;">
						<a-button type="primary" @click="addVisible=true">批量导入</a-button>
					</div>
					<a-table :pagination="false" :columns="columns" :dataSource="data" bordered rowKey="id">
						<template
							v-for="col in ['deviceName', 'deviceState','organizeName','deviceModel', 'workerNames']"
							:slot="col"
							slot-scope="text, record, index"
						>
							<div :key="col">
								<a-input
									style="margin: -5px 0"
									:value="text"
									@change="e => handleChangeTable(e.target.value, record.id, col)"
								/>
							</div>
						</template>
						<template slot="deviceNo" slot-scope="text, record, index">
							<span>{{index+1}}</span>
						</template>
						<template slot="deviceModel" slot-scope="text, record, index">
							<div>
								<a-date-picker
									@change="(e,d)=>handleTime(e,d,index)"
									format="YYYY/MM/DD"
									style="width:100%"
								/>
							</div>
						</template>
						<template slot="operation" slot-scope="text, record, index">
							<div class="editable-row-operations">
								<span class="handle_style">
									<a-popconfirm title="确定删除吗？" @confirm="onDelete(record.id)" okText="确定" cancelText="取消">
										<a-popover placement="top">
											<template slot="content">
												<span>删除</span>
											</template>
											<a-icon type="delete" style="color:red;"/>
										</a-popover>
									</a-popconfirm>
								</span>
							</div>
						</template>
					</a-table>
					<div
						@click="handleAdd"
						style=" cursor: pointer;color:#1890ff;margin-top:12px;"
						class="handle_table"
					>
						<a-icon type="plus-circle"/>&nbsp;添加一行
					</div>
				</a-tab-pane>
			</a-tabs>

			<a-form-item style="display:block;text-align:right;">
				<a-button style="margin-right:12px;" @click="confirmCancel">取消</a-button>
				<a-button type="primary">保存</a-button>
			</a-form-item>
		</a-form>
		<a-modal
			title="导入提示"
			:footer="null"
			width="420px"
			:visible="addVisible"
			@cancel="handleCancel(1)"
			:maskClosable="false"
		>
			<div>
				导入步骤：
				<br>1、下载模板
				<a href="javascript:">《工单明细模板.xls》</a>；
				<br>2、按格式要求填写，请勿模板修改结构；
				<br>3、点击下方“选择文件”按钮导入数据；
				<br>4、校对并保存数据。
				<br>
				<span style="color:#999999">提示：重复导入时，已经有数据将会被清空。</span>
			</div>
			<div style="padding-top:12px;">
				<a-upload
					name="file"
					:multiple="true"
					:action="ApiSrc()"
					@change="handleChangeUpload"
					:headers="headers"
				>
					<a-button type="primary">
						<a-icon type="upload"/>选择文件
					</a-button>
				</a-upload>
			</div>
		</a-modal>
	</div>
</template>
<script>
import OrderSelect from "../public/OrderSelect";
const columns = [
	{
		dataIndex: "deviceNo",
		title: "序号",
		width: 60,
		key: "deviceNo",
		scopedSlots: { customRender: "deviceNo" }
	},
	{
		dataIndex: "deviceName",
		title: "图号",
		width: 100,
		key: "deviceName",
		scopedSlots: { customRender: "deviceName" }
	},
	{
		dataIndex: "deviceState",
		key: "deviceState",
		title: "名称",
		width: 100,
		scopedSlots: { customRender: "deviceState" }
	},
	{
		dataIndex: "organizeName",
		key: "organizeName",
		title: "总数量",
		width: 80,
		scopedSlots: { customRender: "organizeName" }
	},
	{
		dataIndex: "deviceModel",
		key: "deviceModel",
		title: "要求完成时间",
		width: 140,
		scopedSlots: { customRender: "deviceModel" }
	},
	{
		dataIndex: "workerNames",
		key: "workerNames",
		title: "备注",
		width: 160,
		scopedSlots: { customRender: "workerNames" }
	},
	{
		dataIndex: "operation",
		key: "operation",
		title: "操作",
		width: 40,
		align: "center",
		scopedSlots: { customRender: "operation" }
	}
];
const data = [
	{
		id: 0,
		deviceNo: "",
		deviceName: "",
		deviceState: "",
		organizeName: "",
		locationNo: "",
		deviceCategoryName: "",
		deviceModel: null,
		workerNames: ""
	}
];
export default {
	data() {
		return {
			columns,
			data,
			count: 1,
			radioValue: 1,
			form: this.$form.createForm(this),
			fileList: [],
			addVisible: false,
			headers: {
				token: sessionStorage.getItem("token")
			}
		};
	},
	methods: {
		ApiSrc() {
			return this.global.apiImport;
		},
		handleChangeUpload(info) {
			console.log(info);
			if (info.file.status !== "uploading") {
				console.log(info.file, info.fileList);
			}
			if (info.file.status === "done") {
				this.$message.success(`${info.file.name} file uploaded successfully`);
			} else if (info.file.status === "error") {
				this.$message.error(`${info.file.name} file upload failed.`);
			}
		},
		handleTime(e, d, index) {
			this.data[index].deviceModel = d;
		},
		handleChangeTable(value, key, column) {
			const newData = [...this.data];
			const target = newData.filter(item => key === item.id)[0];
			if (target) {
				target[column] = value;
				this.data = newData;
			}
		},
		handleAdd() {
			const { count, data } = this;
			const newData = {
				id: count,
				deviceNo: "",
				deviceName: "",
				deviceState: "",
				organizeName: "",
				locationNo: "",
				deviceCategoryName: "",
				deviceModel: "",
				workerNames: ""
			};
			this.data = [...data, newData];
			this.count = count + 1;
		},
		onDelete(key) {
			// if (this.selectedRowKeys.length < 1) {
			// 	this.$message.error("请选择要删除的项！");
			// 	return;
			// }
			const dataSource = [...this.data];
			this.data = dataSource.filter(item => item.id !== key);
		},
		handleCancel(a) {
			this.addVisible = false;
		},
		showAddOrder() {
			console.log("object");
			this.addVisible = true;
		},
		confirmCancel() {
			this.$emit("changeAddModal", false);
		},
		handleChange(info) {
			let fileList = [...info.fileList];
			// 1. Limit the number of uploaded files
			//    Only to show two recent uploaded files, and old ones will be replaced by the new
			fileList = fileList.slice(-2);
			// 2. read from response and show file link
			fileList = fileList.map(file => {
				if (file.response) {
					// Component will show file.url as link
					file.url = file.response.url;
				}
				return file;
			});
			this.fileList = fileList;
		}
	},
	components: {
		OrderSelect
	}
};
</script>
<style lang="less">
.add_work_order {
	.ant-form-item-label {
		width: 120px;
	}
	.ant-form-item {
		margin-bottom: 20px;
	}
}
</style>