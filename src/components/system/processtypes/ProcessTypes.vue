<template>
	<div class="process_types">
		<a-col :span="24" style="padding:0 20px;">
			<a-row>
				<div style="line-height:50px;">
					<a-col :span="8">
						<!-- <a-button type="primary" @click="modalNewVisible=true">
							<a-icon type="plus-circle"/>添加
						</a-button>-->
						<a-button @click="modalNewVisible=true">
							<a-icon style="color:#1890ff;" type="plus"/>新增
						</a-button>
						<a-button @click="modalEditShow" :disabled="selectedRows.length!=1">
							<a-icon style="color:#1890ff;" type="edit"/>修改
						</a-button>
						<a-popconfirm title="确定删除吗?" @confirm="() => onDelete()">
							<a-button :disabled="selectedRowKeys.length!=1">
								<a-icon style="color:#1890ff;" type="delete"/>删除
							</a-button>
						</a-popconfirm>
					</a-col>
					<!-- <a-col :span="16" style="text-align:right">
						关键字：
						<a-input type="text" style="width:300px" placeholder="工序类型"></a-input>
						<a-button type="primary" icon="search">搜索</a-button>
					</a-col>-->
				</div>
				<a-modal
					title="新增"
					:maskClosable="false"
					centered
					v-model="modalNewVisible"
					@ok="addProcessTypes"
					@cancel="form.resetFields()"
				>
					<a-form :form="form">
						<a-form-item :label-col=" { span: 4 }" :wrapper-col="{ span: 20 }" label="工种名称">
							<a-input v-decorator="['typeName',{rules: [{ required: true, message: '请填写工种名称' }]}]"></a-input>
						</a-form-item>
						<a-form-item :label-col=" { span: 4 }" :wrapper-col="{ span: 20 }" label="工时单价">
							<a-input
								v-decorator="['price',{rules: [{ required: true, message: '请填写工时单价' }]}]"
								addonAfter="元/时"
							></a-input>
						</a-form-item>
						<a-form-item :label-col=" { span: 4 }" :wrapper-col="{ span: 20 }" label="备注">
							<a-textarea :autosize="{ minRows: 4, maxRows: 4 }" v-decorator="['remarks']"></a-textarea>
						</a-form-item>
					</a-form>
				</a-modal>
				<a-modal
					title="修改"
					:maskClosable="false"
					centered
					v-model="modalEditVisible"
					@ok="editProcessTypes"
					@cancel="form.resetFields()"
				>
					<a-form :form="form">
						<a-form-item :label-col=" { span: 4 }" :wrapper-col="{ span: 20 }" label="工种名称">
							<a-input v-decorator="['workTypeName',{rules: [{ required: true, message: '请填写工种名称' }]}]"></a-input>
						</a-form-item>
						<a-form-item :label-col=" { span: 4 }" :wrapper-col="{ span: 20 }" label="工时单价">
							<a-input
								v-decorator="['price',{rules: [{ required: true, message: '请填写工时单价' }]}]"
								addonAfter="元/时"
							></a-input>
						</a-form-item>
						<a-form-item :label-col=" { span: 4 }" :wrapper-col="{ span: 20 }" label="备注">
							<a-textarea :autosize="{ minRows: 4, maxRows: 4 }" v-decorator="['remarks']"></a-textarea>
						</a-form-item>
					</a-form>
				</a-modal>
			</a-row>
			<a-row style="padding-top:10px;">
				<a-table
					:columns="columns"
					:pagination="false"
					:dataSource="data"
					rowKey="id"
					:rowSelection="{selectedRowKeys: selectedRowKeys, onChange: onSelectChange}"
				>
					<template slot="price" slot-scope="text, record, index">
						<span>￥{{text}}</span>
					</template>
				</a-table>
				<a-pagination
					style="padding-top:12px;text-align: right;"
					showQuickJumper
					:defaultCurrent="current"
					:total="total"
					@change="onChange"
					showSizeChanger
					:pageSizeOptions="['10','20','30']"
					@showSizeChange="onShowSizeChange"
					:showTotal="total => `共 ${total} 条`"
				/>
			</a-row>
		</a-col>
	</div>
</template>
<script>
const rowSelection = {
	culumnsWidth: "5%",
	onChange: (selectedRowKeys, selectedRows) => {
		// console.log(
		// 	`selectedRowKeys: ${selectedRowKeys}`,
		// 	"selectedRows: ",
		// 	selectedRows
		// );
		this.selectedRows = selectedRows;
		console.log(this.selectedRows);
	},
	onSelect: (record, selected, selectedRows) => {
		// console.log(record, selected, selectedRows);
	},
	onSelectAll: (selected, selectedRows, changeRows) => {
		// console.log(selected, selectedRows, changeRows);
	}
};
const columns = [
	{
		dataIndex: "workTypeName",
		title: "工种名称",
		width: "30%",
		key: "workTypeName"
	},
	{
		dataIndex: "price",
		title: "工时单价（单位：元）",
		width: "15%",
		key: "price",
		scopedSlots: { customRender: "price" }
	},
	{
		dataIndex: "remarks",
		title: "备注",
		width: "50%",
		key: "remarks"
	}
];
const data = [
	{
		key: "0",
		deviceNo: "111",
		deviceName: "11",
		deviceState: "11",
		organizeName: "11",
		location: "11",
		state: "1",
		deviceCategoryName: "11",
		deviceModel: "11",
		workerNames: "11"
	},
	{
		key: "1",
		deviceNo: "111",
		deviceName: "11",
		deviceState: "11",
		organizeName: "11",
		location: "11",
		state: "0",
		deviceCategoryName: "11",
		deviceModel: "11",
		workerNames: "11"
	},
	{
		key: "2",
		deviceNo: "111",
		deviceName: "11",
		deviceState: "11",
		organizeName: "11",
		location: "11",
		state: "0",
		deviceCategoryName: "11",
		deviceModel: "11",
		workerNames: "11"
	}
];

export default {
	data() {
		return {
			selectedRowKeys: [],
			selectedRows: [],
			rowSelection,
			form: this.$form.createForm(this),
			modalNewVisible: false,
			modalEditVisible: false,
			isHideList: this.$route.params.id !== undefined ? true : false,
			columns,
			data: [],
			current: 1,
			pageSize: 10,
			total: 0
		};
	},
	methods: {
		onSelectChange(a, b) {
			console.log(b);
			this.selectedRows = b;
			this.selectedRowKeys = a;
		},
		modalEditShow() {
			console.log(this.selectedRows);
			if (this.selectedRows.length != 1) {
				this.$message.error("只能修改一条数据！");
			} else {
				this.modalEditVisible = true;
				setTimeout(() => {
					this.form.setFieldsValue({
						workTypeName: this.selectedRows[0].workTypeName,
						price: this.selectedRows[0].price,
						remarks: this.selectedRows[0].remarks
					});
				}, 100);
			}
		},
		onDelete() {
			let qs = require("qs");
			let data = qs.stringify({
				workTypeId: this.selectedRowKeys[0]
			});
			this.Axios(
				{
					url: "/api-platform/workType/del",
					params: data,
					type: "post",
					option: { successMsg: "删除成功！" }
				},
				this
			).then(
				result => {
					if (result.data.code === 200) {
						this.getList();
						this.selectedRowKeys = [];
						this.selectedRows = [];
					}
				},
				({ type, info }) => {}
			);
		},
		cancel(e) {
			console.log(e);
			this.$message.error("Click on No");
		},
		onShowSizeChange(current, pageSize) {
			this.pageSize = pageSize;
			this.getList();
		},
		onChange(current, pageNumber) {
			console.log("Page: ", pageNumber);
			console.log("第几页: ", current);
			this.current = current;
			this.getList();
		},
		edit(record, text, index) {
			this.modalEditVisible = true;
		},
		getList() {
			this.Axios(
				{
					url: "/api-platform/workType/list",
					params: {
						page: this.current,
						size: this.pageSize
					},
					type: "get",
					option: { enableMsg: false }
				},
				this
			).then(
				result => {
					if (result.data.code === 200) {
						console.log(result);
						this.data = result.data.data.content;
						this.total = result.data.data.totalElement;
					}
				},
				({ type, info }) => {}
			);
		},
		addProcessTypes(e) {
			e.preventDefault();
			this.form.validateFieldsAndScroll((err, values) => {
				if (!err) {
					console.log(values);
					let qs = require("qs");
					let data = qs.stringify({
						typeName: values.typeName,
						price: values.price,
						remarks: values.remarks
					});
					this.Axios(
						{
							url: "/api-platform/workType/add",
							params: data,
							type: "post",
							option: { successMsg: "添加成功！" }
						},
						this
					).then(
						result => {
							if (result.data.code === 200) {
								this.modalNewVisible = false;
								this.form.resetFields();
								this.getList();
								this.selectedRowKeys = [];
							}
						},
						({ type, info }) => {}
					);
				}
			});
		},
		editProcessTypes(e) {
			e.preventDefault();
			this.form.validateFieldsAndScroll((err, values) => {
				if (!err) {
					let qs = require("qs");
					let data = qs.stringify({
						workTypeId: this.selectedRows[0].id,
						workTypeName: values.typeName,
						price: values.price,
						remarks: values.remarks
					});
					this.Axios(
						{
							url: "/api-platform/workType/update",
							params: data,
							type: "post",
							option: { successMsg: "修改成功！" }
						},
						this
					).then(
						result => {
							if (result.data.code === 200) {
								this.modalEditVisible = false;
								this.form.resetFields();
								this.getList();
								this.selectedRowKeys = [];
								this.selectedRows = [];
							}
						},
						({ type, info }) => {}
					);
				}
			});
		}
	},
	created() {
		this.getList();
	}
};
</Script>