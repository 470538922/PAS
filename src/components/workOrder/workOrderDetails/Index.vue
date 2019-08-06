<template>
	<div class="work_order_details_list">
		<a-row>
			<a-col :span="24" style="padding:0 20px;">
				<a-row>
					<div style="line-height:50px;">
						<a-col :span="12">
							<a-button @click="$router.back(-1)" icon="left" style="margin-right:20px;">返回</a-button>
							<a-button @click="addVisible=true">
								<a-icon style="color:#1890ff;" type="plus"/>新增
							</a-button>
							<a-button @click="editVisible=true">
								<a-icon style="color:#1890ff;" type="edit"/>修改
							</a-button>
							<a-popconfirm title="确定删除吗?" @confirm="() => onDelete">
								<a-button>
									<a-icon style="color:#1890ff;" type="delete"/>删除
								</a-button>
							</a-popconfirm>
							<a-button @click="toPriview">
								<i class="iconfont" style="color:#1890ff;margin-right:8px;">&#xe60c;</i>预览
							</a-button>
						</a-col>
					</div>
				</a-row>
				<a-row style="padding-top:10px;">
					<a-table
						rowKey="id"
						:columns="columns"
						:pagination="false"
						:dataSource="data"
						:rowSelection="rowSelection"
					>
						<template slot="deviceModel" slot-scope="text, record, index">
							<div>
								<a-icon type="close" v-if="text==1" style="color:red;font-size: 16px;"/>
								<a-icon type="check" v-if="text==0" style="color:green;font-size: 16px;"/>
							</div>
						</template>
						<template slot="schedule" slot-scope="text, record, index">
							<div>
								<!-- <a-progress :percent="50" status="active"/>
								<a-progress :percent="70" status="exception"/>-->
								<a-progress :percent="100"/>
							</div>
						</template>
						<template slot="detail" slot-scope="text, record, index">
							<span style="color:#1890ff;cursor: pointer;" @click="technologyAddVisible=true">工艺排配</span>
						</template>
					</a-table>
				</a-row>
			</a-col>
		</a-row>
		<a-modal
			title="新增工单明细"
			width="800px"
			:visible="addVisible"
			@cancel="handleCancel(1)"
			:maskClosable="false"
			class="modal_form_style"
			:footer="null"
		>
			<a-form :form="form" layout="inline" style="overflow:hidden">
				<a-col :span="12">
					<a-form-item label="图纸号">
						<a-input style="width:240px;"></a-input>
					</a-form-item>
				</a-col>
				<a-col :span="12">
					<a-form-item label="名称">
						<a-input style="width:240px;"></a-input>
					</a-form-item>
				</a-col>
				<a-col :span="12">
					<a-form-item label="数量">
						<a-input-number style="width:240px;"></a-input-number>
					</a-form-item>
				</a-col>
				<a-col :span="12">
					<a-form-item label="要求完成时间">
						<a-date-picker style="width:240px"/>
					</a-form-item>
				</a-col>
				<a-col :span="24">
					<a-form-item label="备注">
						<a-textarea style="width:615px;" :autosize="{ minRows: 4, maxRows: 4 }"></a-textarea>
					</a-form-item>
				</a-col>
				<a-col :span="24">
					<a-form-item style="display:block;text-align:right;margin-bottom:0">
						<a-button @click="handleCancel(1)" style="margin-right:12px;">取消</a-button>
						<a-button type="primary" @click>保存</a-button>
					</a-form-item>
				</a-col>
			</a-form>
		</a-modal>
		<a-modal
			title="修改工单明细"
			:footer="null"
			width="800px"
			:visible="editVisible"
			@cancel="handleCancel(2)"
			:maskClosable="false"
			class="modal_form_style"
		>
			<a-form :form="form" layout="inline" style="overflow:hidden">
				<a-col :span="12">
					<a-form-item label="图纸号">
						<a-input style="width:240px;"></a-input>
					</a-form-item>
				</a-col>
				<a-col :span="12">
					<a-form-item label="名称">
						<a-input style="width:240px;"></a-input>
					</a-form-item>
				</a-col>
				<a-col :span="12">
					<a-form-item label="数量">
						<a-input-number style="width:240px;"></a-input-number>
					</a-form-item>
				</a-col>
				<a-col :span="12">
					<a-form-item label="要求完成时间">
						<a-date-picker style="width:240px"/>
					</a-form-item>
				</a-col>
				<a-col :span="24">
					<a-form-item label="备注">
						<a-textarea style="width:615px;" :autosize="{ minRows: 4, maxRows: 4 }"></a-textarea>
					</a-form-item>
				</a-col>
				<a-col :span="24">
					<a-form-item style="display:block;text-align:right;margin-bottom:0">
						<a-button @click="handleCancel(2)" style="margin-right:12px;">取消</a-button>
						<a-button type="primary" @click>保存</a-button>
					</a-form-item>
				</a-col>
			</a-form>
		</a-modal>
		<a-modal
			title="新增工艺排配"
			width="800px"
			:visible="technologyAddVisible"
			@cancel="handleCancel(3)"
			:maskClosable="false"
			class="modal_form_style"
			:footer="null"
		>
			<technology-add></technology-add>
		</a-modal>
		<a-modal
			title="修改工艺排配"
			:footer="null"
			width="800px"
			:visible="technologyEditVisible"
			@cancel="handleCancel(4)"
			:maskClosable="false"
			class="modal_form_style"
		>
			<technology-edit></technology-edit>
		</a-modal>
	</div>
</template>
<script>
import TechnologyAdd from "./TechnologyAdd";
import TechnologyEdit from "./TechnologyEdit";
const rowSelection = {
	onChange: (selectedRowKeys, selectedRows) => {
		console.log(
			`selectedRowKeys: ${selectedRowKeys}`,
			"selectedRows: ",
			selectedRows
		);
	},
	onSelect: (record, selected, selectedRows) => {
		console.log(record, selected, selectedRows);
	},
	onSelectAll: (selected, selectedRows, changeRows) => {
		console.log(selected, selectedRows, changeRows);
	}
};
const columns = [
	{
		dataIndex: "deviceNo",
		title: "图号",
		width: 100,
		key: "deviceNo"
	},
	{
		dataIndex: "deviceName",
		title: "名称",
		width: 100,
		key: "deviceName"
	},
	{
		dataIndex: "deviceCategoryName",
		key: "deviceCategoryName",
		title: "数量",
		width: 80
	},
	{
		dataIndex: "priority",
		key: "priority",
		title: "要求完成时间",
		width: 80,
		scopedSlots: { customRender: "priority" }
	},
	{
		dataIndex: "schedule",
		key: "schedule",
		title: "生产进度",
		width: 100,
		scopedSlots: { customRender: "schedule" }
	},

	{
		dataIndex: "comment",
		key: "comment",
		title: "备注",
		width: 160,
		scopedSlots: { customRender: "comment" }
	},
	{
		dataIndex: "deviceModel",
		key: "deviceModel",
		title: "是否完成工艺排配",
		width: 120,
		scopedSlots: { customRender: "deviceModel" }
	},
	{
		dataIndex: "detail",
		key: "detail",
		title: "更多操作",
		width: 80,
		scopedSlots: { customRender: "detail" }
	}
];
const data = [
	{
		id: "0",
		deviceNo: "111",
		deviceName: "11",
		deviceState: "11",
		organizeName: "11",
		location: "11",
		locationNo: "1",
		deviceCategoryName: "11",
		deviceModel: "1",
		workerNames: "0"
	},
	{
		id: "1",
		deviceNo: "111",
		deviceName: "11",
		deviceState: "11",
		organizeName: "11",
		location: "11",
		locationNo: "0",
		deviceCategoryName: "11",
		deviceModel: "1",
		workerNames: "2"
	},
	{
		id: "2",
		deviceNo: "111",
		deviceName: "11",
		deviceState: "11",
		organizeName: "11",
		location: "11",
		locationNo: "2",
		deviceCategoryName: "11",
		deviceModel: "0",
		workerNames: "1"
	}
];
export default {
	data() {
		return {
			columns,
			data,
			rowSelection,
			addVisible: false,
			editVisible: false,
			technologyAddVisible: false,
			technologyEditVisible: false,
			form: this.$form.createForm(this)
		};
	},
	methods: {
		handleCancel(a) {
			if (a == 1) {
				this.addVisible = false;
			}
			if (a == 2) {
				this.editVisible = false;
			}
			if (a == 3) {
				this.technologyAddVisible = false;
			}
			if (a == 4) {
				this.technologyEditVisible = false;
			}
		},
		toPriview() {
			window.open("/priview.html", "_blank");
		}
	},
	components: {
		TechnologyAdd,
		TechnologyEdit
	}
};
</script>

<style lang="less">
.work_order_details_list {
}
.modal_form_style {
	.ant-form-inline .ant-form-item > .ant-form-item-label {
		width: 120px;
	}
	.ant-form-inline .ant-form-item {
		margin-bottom: 20px;
	}
	.ant-input-number-handler-wrap {
		display: none;
	}
}
</style>
