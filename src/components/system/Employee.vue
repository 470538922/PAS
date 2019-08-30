<template>
	<div class="employee_list">
		<router-view></router-view>
		<div :class="[{hide:isHideList}]">
			<a-col :span="24" style="padding:0 20px;">
				<a-row>
					<div style="line-height:50px;">
						<a-col :span="8">
							<!-- <a-button type="primary" @click="$router.push({path:'/Employee/AddEmployee'})">
								<a-icon type="plus-circle"/>添加
							</a-button>-->
							<a-button @click="$router.push({path:'/Employee/AddEmployee'})">
								<a-icon style="color:#1890ff;" type="plus" />新增
							</a-button>
							<a-button @click="edit" :disabled="selectedRowKeys.length!=1">
								<a-icon style="color:#1890ff;" type="edit" />修改
							</a-button>
							<a-button @click="resetPwd" :disabled="selectedRowKeys.length!=1">
								<i style="color:#1890ff;margin-right:6px;display:inline-block;" class="iconfont">&#xe6b6;</i>
								重置密码
							</a-button>
							<!-- <a-button @click="showDeleteConfirm" :disabled="selectedRowKeys.length!=1">
								<a-icon style="color:#1890ff;" type="delete" />删除
							</a-button>-->
						</a-col>

						<a-col :span="16" style="text-align:right">
							关键字：
							<a-input type="text" v-model="param" style="width:300px" placeholder="姓名，员工编号"></a-input>
							<a-button type="primary" icon="search" @click="getList">搜索</a-button>
						</a-col>
					</div>
				</a-row>
				<a-row style="padding-top:10px;">
					<a-table
						:columns="columns"
						:pagination="false"
						:dataSource="data"
						:rowSelection="{selectedRowKeys:selectedRowKeys,onChange: onSelectChange}"
						rowKey="id"
					>
						<template slot="state" slot-scope="text, record, index">
							<div>
								<a-switch
									checkedChildren="正常"
									unCheckedChildren="禁用"
									:defaultChecked="record.state==0?true:false"
									@click="changeState(record,index)"
								/>
							</div>
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
	</div>
</template>
<script>
const rowSelection = {
	culumnsWidth: "5%",
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
		dataIndex: "employeeNo",
		title: "员工编号",
		width: "15%",
		key: "devicemployeeNoeNo"
	},
	{
		dataIndex: "userName",
		title: "姓名",
		width: "10%",
		key: "userName"
	},
	{
		dataIndex: "phone",
		key: "phone",
		title: "手机号",
		width: "15%",
		scopedSlots: { customRender: "deviceState" }
	},
	{
		dataIndex: "organizeName",
		key: "organizeName",
		title: "所处班组",
		width: "25%"
	},
	{
		dataIndex: "roleName",
		key: "roleName",
		title: "角色分配",
		width: "15%"
	},
	{
		dataIndex: "workTypeName",
		key: "workTypeName",
		title: "职能/工种",
		width: "10%"
	},
	{
		dataIndex: "state",
		key: "state",
		title: "状态",
		width: "10%",
		scopedSlots: { customRender: "state" }
	}
];
export default {
	data() {
		return {
			param: "",
			rowSelection,
			visible: false,
			isHideList: this.$route.params.id !== undefined ? true : false,
			allClassify: [
				"生产设备",
				"非生产设备",
				"辅助生产设备",
				"检验检测设备",
				"其他设备"
			],
			columns,
			data: [],
			current: 1,
			pageSize: 10,
			total: 0,
			selectedRowKeys: []
		};
	},
	methods: {
		resetPwd() {
			let qs = require("qs");
			let data = qs.stringify({
				employeeId: this.selectedRowKeys[0]
			});
			this.Axios(
				{
					url: "/api-sso/simpleUserAction/resetPwd",
					params: data,
					type: "post",
					option: { enableMsg: false }
				},
				this
			).then(
				result => {
					if (result.data.code === 200) {
						this.$success({
							title: "密码重置成功！",
							// JSX support
							content: (
								<div>
									密码已重置为：<span style="color:red;">123456</span>
									<p>请通知相关人员登录并修改</p>
								</div>
							)
						});
					}
				},
				({ type, info }) => {}
			);
		},
		onSelectChange(selectedRowKeys) {
			this.selectedRowKeys = selectedRowKeys;
			console.log(this.selectedRowKeys);
		},
		showDeleteConfirm() {
			let that = this;
			this.$confirm({
				title: "确定删除吗？",
				content: "",
				okText: "确定",
				okType: "danger",
				cancelText: "取消",
				onOk: function() {
					that.onDelete();
				},
				onCancel() {}
			});
		},
		onDelete(e) {
			let qs = require("qs");
			let data = qs.stringify({
				employeeId: this.selectedRowKeys[0]
			});
			this.Axios(
				{
					url: "/api-platform/employee/del",
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
					}
				},
				({ type, info }) => {}
			);
		},

		onShowSizeChange(current, pageSize) {
			this.pageSize = pageSize;
			this.current = 1;
			this.getList();
		},
		onChange(current, pageNumber) {
			console.log("Page: ", pageNumber);
			console.log("第几页: ", current);
			this.current = current;
			this.getList();
		},
		edit() {
			this.$router.push({
				path: "/Employee/EditEmployee/" + this.selectedRowKeys[0]
			});
		},
		getList() {
			this.Axios(
				{
					url: "/api-platform/employee/list",
					params: {
						page: this.current,
						size: this.pageSize,
						param: this.param
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

						for (let i = 0; i < this.data.length; i++) {
							this.data[i].workTypeName = this.data[i].workType.workTypeName;
						}

						this.total = result.data.data.totalElement;
					}
				},
				({ type, info }) => {}
			);
		},
		changeState(row, index) {
			let urlStr;
			if (row.state == -2) {
				urlStr = "/api-platform/employee/start";
			} else {
				urlStr = "/api-platform/employee/stop";
			}
			let qs = require("qs");
			let data = qs.stringify({
				employeeId: row.id
			});
			this.Axios(
				{
					url: urlStr,
					params: data,
					type: "post",
					option: { successMsg: "修改成功！" }
				},
				this
			).then(
				result => {
					if (result.data.code === 200) {
						console.log(result);
						this.getList();
					}
				},
				({ type, info }) => {
					this.getList();
				}
			);
		}
	},
	created() {
		this.getList();
		console.log(this.$route);
		let a = this.$route.matched.find(item => item.name === "AddEmployee")
			? true
			: false;
		let b = this.$route.params.id !== undefined ? true : false;
		this.isHideList = a || b ? true : false;
	},
	watch: {
		$route() {
			this.getList();
			this.selectedRowKeys = [];
			let a = this.$route.matched.find(item => item.name === "AddEmployee")
				? true
				: false;
			let b = this.$route.params.id !== undefined ? true : false;
			this.isHideList = a || b ? true : false;
		}
	}
};
</script>
