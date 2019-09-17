<template>
	<div class="inventory">
		<a-row style="line-height:50px;">
			<a-button @click="$router.back(-1)" icon="left">返回</a-button>
			<a-button @click="getPreviewList">
				<i class="iconfont" style="color:#1890ff;margin-right:8px;">&#xe60c;</i>打印预览
			</a-button>
		</a-row>
		<a-row>
			<a-col :span="24" style="padding:20px 0;">
				<h2 style="text-align:center;">{{new Date().getFullYear()+'年'}}{{enterpriseName}}外购物资清单</h2>
			</a-col>
			<a-col :span="24">
				<a-form :form="form" layout="inline">
					<a-col :span="8">
						<a-form-item label="申请部门">
							<a-input v-decorator="['department']" style="width:280px;"></a-input>
						</a-form-item>
					</a-col>
					<a-col :span="8">
						<a-form-item label="需求编号">
							<a-input v-decorator="['no']" style="width:280px;"></a-input>
						</a-form-item>
					</a-col>
					<a-col :span="8">
						<a-form-item label="申请人">
							<a-input v-decorator="['demander']" style="width:280px;"></a-input>
						</a-form-item>
					</a-col>
					<a-col :span="8">
						<a-form-item label="项目订单号">
							<a-input v-decorator="['order']" style="width:280px;"></a-input>
						</a-form-item>
					</a-col>
					<a-col :span="8">
						<a-form-item label="项目名称">
							<a-input v-decorator="['project']" style="width:280px;"></a-input>
						</a-form-item>
					</a-col>
					<a-col :span="8">
						<a-form-item label="申请日期">
							<a-date-picker
								v-decorator="['filing',{initialValue:moment(date, 'YYYY/MM/DD')}]"
								style="width:280px;"
								@change="(a,b)=>onChangeDate(a,b)"
								format="YYYY/MM/DD"
							/>
						</a-form-item>
					</a-col>
				</a-form>
			</a-col>
			<a-col :span="24" style="padding:20px 12px;">
				<a-table
					:columns="columns"
					:dataSource="data"
					bordered
					size="small"
					:pagination="false"
					rowKey="drawingNo"
				>
					<template
						v-for="col in [ 'materialCode', 'units','weight','number','recommend','manufacturers','way','remark']"
						:slot="col"
						slot-scope="text, record, index"
					>
						<div :key="col">
							<a-input
								style="margin: -5px 0"
								:value="text"
								@change="e => handleChange(e.target.value, record.drawingNo, col)"
							/>
						</div>
					</template>
					<template slot="time" slot-scope="text, record, index">
						<a-date-picker
							:defaultValue="text!=''?moment(text, 'YYYY/MM/DD'):undefined"
							style="width:130px;"
							@change="(a,b)=>onTableChangeDate(a,b,index)"
							format="YYYY/MM/DD"
						/>
					</template>
					<template slot="no" slot-scope="text, record, index">
						<span>{{index+1}}</span>
					</template>
					<!-- <template slot="materials" slot-scope="text, record, index">
						<span>{{index+1}}</span>
					</template>-->
				</a-table>
				<div style="line-height:50px;">提示：以上数据仅临时存储，离开该页将自动清空。</div>
			</a-col>
		</a-row>
	</div>
</template>
<script>
import moment from "moment";
const columns = [
	{
		title: "序号",
		dataIndex: "no",
		width: 50,
		align: "center",
		scopedSlots: { customRender: "no" }
	},
	{
		title: "物料代码",
		dataIndex: "materialCode",
		width: 124,
		scopedSlots: { customRender: "materialCode" }
	},
	{
		title: "图号",
		dataIndex: "drawingNo",
		width: 140
	},
	{
		title: "名称",
		dataIndex: "name",
		width: 140
	},
	{
		title: "所需物资",
		dataIndex: "materials",
		width: 130,
		scopedSlots: { customRender: "materials" }
	},
	{
		title: "计量单位",
		dataIndex: "units",
		width: 80,
		scopedSlots: { customRender: "units" }
	},
	{
		title: "需求重量",
		dataIndex: "weight",
		width: 80,
		scopedSlots: { customRender: "weight" }
	},
	{
		title: "需求数量",
		dataIndex: "number",
		width: 80,
		scopedSlots: { customRender: "number" }
	},
	{
		title: "推荐厂家",
		dataIndex: "recommend",
		width: 120,
		scopedSlots: { customRender: "recommend" }
	},
	{
		title: "指定厂家",
		dataIndex: "manufacturers",
		width: 120,
		scopedSlots: { customRender: "manufacturers" }
	},
	{
		title: "需求时间",
		dataIndex: "time",
		width: 130,
		scopedSlots: { customRender: "time" }
	},
	{
		title: "需求方式",
		dataIndex: "way",
		width: 130,
		scopedSlots: { customRender: "way" }
	},
	{
		title: "备注",
		dataIndex: "remark",
		width: 100,
		scopedSlots: { customRender: "remark" }
	}
];

const data = [
	{
		id: 111,
		no: 1,
		materialCode: 2,
		drawingNo: 3,
		name: 4,
		materials: 5,
		units: 6,
		weight: 7,
		number: 8,
		recommend: 9,
		manufacturers: 10,
		time: "",
		way: 12,
		remark: 13
	}
];
export default {
	data() {
		this.cacheData = data.map(item => ({ ...item }));
		return {
			form: this.$form.createForm(this),
			columns,
			data,
			date: new Date().toLocaleDateString(),
			inventory: {},
			enterpriseName: JSON.parse(sessionStorage.getItem("user")).enterpriseName
		};
	},
	methods: {
		moment,
		onChangeDate(date, dateString) {},
		onTableChangeDate(date, dateString, index) {
			this.data[index].time = dateString;
		},
		handleChange(value, key, column) {
			const newData = [...this.data];
			const target = newData.filter(item => key === item.drawingNo)[0];
			if (target) {
				target[column] = value;
				this.data = newData;
			}
		},
		//原材料需求表
		getPreviewList() {
			this.form.validateFieldsAndScroll((err, values) => {
				if (!err) {
					values.filing = this.date;
					let params = {
						workOrder: values,
						rawInfo: this.data
					};
					console.log(params);
					this.$info({
						title: "温馨提示",
						content: "打印时，请在打印设置中将“布局”设置为“横向”",
						onOk() {
							sessionStorage.priview = JSON.stringify(params);
							sessionStorage.priviewType = 3;
							window.open("/priview.html", "_blank");
						}
					});
				}
			});
		},
		findOne() {
			this.Axios(
				{
					url: "/api-workorder/workOrder/rawMaterialDetail",
					params: {
						workOrderId: this.$route.params.id
					},
					type: "get",
					option: { enableMsg: false }
				},
				this
			).then(
				result => {
					if (result.data.code === 200) {
						console.log(result);
						this.data = result.data.data.rawInfo.map(item => {
							return {
								materialCode: "",
								drawingNo: item.drawingNo,
								name: item.drawingName,
								materials:
									(item.rawType == 1
										? "板料"
										: item.rawType == 2
										? "棒料"
										: "型材") +
									" " +
									item.rawName,
								units: "EA",
								weight: item.weight,
								number: item.rawNum,
								recommend: "",
								manufacturers: "",
								time: "",
								way: "",
								remark: ""
							};
						});
						setTimeout(() => {
							this.form.setFieldsValue({
								filing: moment(this.date, "YYYY/MM/DD"),
								department: "",
								no: "",
								demander: JSON.parse(sessionStorage.getItem("user")).userName,
								order: result.data.data.workOrder.gongzuolingNo,
								project: result.data.data.workOrder.title
							});
						}, 100);
					}
				},
				({ type, info }) => {}
			);
		}
	},
	created() {
		this.findOne();
	}
};
</script>
<style lang="less">
.inventory {
	.ant-form-item-label {
		width: 100px;
	}
}
</style>