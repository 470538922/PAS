<template>
	<div class="drawing_list">
		<router-view></router-view>
		<div :class="[{hide:isHideList}]">
			<a-row>
				<a-col :span="24" style="padding:0 20px;">
					<a-row>
						<div style="line-height:50px;">
							<a-col :span="8">
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
							</a-col>
						</div>
					</a-row>
					<a-row style="padding-top:10px;">
						<a-table
							rowKey="id"
							:columns="columns"
							:pagination="false"
							:dataSource="data"
							:rowSelection="{selectedRowKeys:selectedRowKeys,onChange: onSelectChange}"
						></a-table>
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
			</a-row>
		</div>
		<a-modal
			title="新增图纸"
			:footer="null"
			width="1000px"
			:visible="addVisible"
			@cancel="handleCancel(1)"
			:maskClosable="false"
		>
			<add></add>
		</a-modal>
		<a-modal
			title="修改图纸"
			:footer="null"
			width="1000px"
			:visible="editVisible"
			@cancel="handleCancel(2)"
			:maskClosable="false"
		>
			<edit></edit>
		</a-modal>
	</div>
</template>
<script>
import add from "./Add";
import edit from "./Edit";
const columns = [
	{
		dataIndex: "enterpriseName",
		title: "图纸号",
		width: "25%",
		key: "enterpriseName"
	},
	{
		dataIndex: "contact",
		key: "contact",
		title: "图纸名称",
		width: "25%"
	},
	{
		dataIndex: "phone",
		key: "phone",
		title: "录入人",
		width: "10%"
	},
	{
		dataIndex: "account",
		key: "account",
		title: "备注",
		width: "25%"
	},
	{
		dataIndex: "gmtCreate",
		key: "gmtCreate",
		title: "创建时间",
		width: "15%"
	}
];
export default {
	data() {
		return {
			addVisible: false,
			editVisible: false,
			isHideList: this.$route.params.id !== undefined ? true : false,
			columns,
			data: [],
			current: 1,
			pageSize: 10,
			total: 0,
			selectedRowKeys: []
		};
	},
	methods: {
		onDelete() {},
		handleCancel(a) {
			if (a == 1) {
				this.addVisible = false;
			}
			if (a == 2) {
				this.editVisible = false;
			}
		},
		onSelectChange(selectedRowKeys) {
			// console.log("selectedRowKeys changed: ", selectedRowKeys);
			this.selectedRowKeys = selectedRowKeys;
			console.log(this.selectedRowKeys);
		},
		onShowSizeChange(current, pageSize) {
			this.pageSize = pageSize;
			// this.getList();
		},
		onChange(current, pageNumber) {
			console.log("Page: ", pageNumber);
			console.log("第几页: ", current);
			this.current = current;
			// this.getList();
		}
	},
	components: {
		add,
		edit
	}
};
</script>
