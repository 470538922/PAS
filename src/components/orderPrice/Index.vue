<template>
	<div class="order_price">
		<a-form :form="form" layout="inline">
			<a-col :span="24">
				<a-form-item label="询价方">
					<a-input
						maxlength="20"
						v-decorator="['inquiry',{rules: [{ required: true, message: '请填写询价方' }]}]"
						style="width:390px"
					></a-input>
				</a-form-item>
				<a-form-item label="联系人">
					<a-input maxlength="20" v-decorator="['inquiryName']" style="width:390px"></a-input>
				</a-form-item>
			</a-col>
			<a-col :span="24">
				<a-form-item label="联系电话">
					<a-input
						type="number"
						oninput="if(value.length>11)value=value.slice(0,11)"
						v-decorator="['inquiryPhone',{rules: [{validator: chickPhone}]}]"
						style="width:390px"
					></a-input>
				</a-form-item>
				<a-form-item label="电子邮箱">
					<a-input
						maxlength="20"
						v-decorator="['inquiryMail',{rules: [{validator: chickMail}]}]"
						style="width:390px"
					></a-input>
				</a-form-item>
			</a-col>
			<a-col :span="24" style="margin-bottom:20px;">
				<a-form-item label="订单标题">
					<a-input
						maxlength="20"
						v-decorator="['address',{rules: [{ required: true, message: '请填订单标题' }]}]"
						style="width:390px"
					></a-input>
				</a-form-item>
			</a-col>
			<a-col :span="24">
				<a-form-item label="报价人">
					<a-input maxlength="20" v-decorator="['baoName']" style="width:390px"></a-input>
				</a-form-item>
				<a-form-item label="审核人">
					<a-input maxlength="20" v-decorator="['audit']" style="width:390px"></a-input>
				</a-form-item>
			</a-col>
			<a-col :span="24">
				<a-form-item label="报价人电话">
					<a-input
						type="number"
						oninput="if(value.length>11)value=value.slice(0,11)"
						v-decorator="['baoPhone',{rules: [{validator: chickPhone}]}]"
						style="width:390px"
					></a-input>
				</a-form-item>
				<a-form-item label="报价日期">
					<a-date-picker
						v-decorator="['offerDate']"
						@change="(e,d)=>handleTime(e,d,1)"
						format="YYYY/MM/DD"
						style="width:390px"
					/>
				</a-form-item>
			</a-col>
			<a-col :span="24">
				<a-form-item label="报价人邮箱">
					<a-input
						maxlength="20"
						v-decorator="['baoMail' ,{rules: [{validator: chickMail}]}]"
						style="width:390px"
					></a-input>
				</a-form-item>
				<a-form-item label="报价有效期">
					<a-date-picker
						v-decorator="['validDate']"
						@change="(e,d)=>handleTime(e,d,2)"
						format="YYYY/MM/DD"
						style="width:390px"
					/>
				</a-form-item>
			</a-col>
			<a-col :span="24">
				<a-form-item label="备注">
					<a-textarea
						maxlength="50"
						v-decorator="['remark']"
						style="width:920px;"
						:autosize="{ minRows: 4, maxRows: 4 }"
					></a-textarea>
				</a-form-item>
			</a-col>
		</a-form>
		<a-col :span="24">
			<a-table
				:columns="columns"
				rowKey="drawingNo"
				:dataSource="tableData"
				bordered
				size="small"
				:pagination="false"
			>
				<template
					v-for="col in ['materialRealFee', 'processRealFee','biaochuRealFee','otherFee','remark']"
					:slot="col"
					slot-scope="text, record, index"
				>
					<div :key="col">
						<a-input
							v-if="record.editable"
							style="margin: -5px 0"
							:value="text"
							@change="e => handleChange(e.target.value, record.drawingNo, col)"
						/>
						<template v-else>{{text}}</template>
					</div>
				</template>
				<template slot="materialRealFee" slot-scope="text, record, index">
					<div>
						<a-input
							v-if="record.editable"
							style="margin: -5px 0"
							:value="text"
							@change="e => handleChange(e.target.value, record.drawingNo, 'materialRealFee')"
						/>
						<a-tooltip placement="top">
							<template slot="title">
								<span v-for="(item,index2) in record.materialItem" :key="index2">
									{{item}}
									<br />
								</span>
							</template>
							<div v-if="record.editable!=true">{{text}}</div>
						</a-tooltip>
					</div>
				</template>
				<template slot="processRealFee" slot-scope="text, record, index">
					<div>
						<a-input
							v-if="record.editable"
							style="margin: -5px 0"
							:value="text"
							@change="e => handleChange(e.target.value, record.drawingNo, 'processRealFee')"
						/>
						<a-tooltip placement="top">
							<template slot="title">
								<span v-for="(item,index1) in record.processItem" :key="index1">
									{{item}}
									<br />
								</span>
							</template>
							<div v-if="record.editable!=true">{{text}}</div>
						</a-tooltip>
					</div>
				</template>
				<template slot="biaochuRealFee" slot-scope="text, record, index">
					<div>
						<a-input
							v-if="record.editable"
							style="margin: -5px 0"
							:value="text"
							@change="e => handleChange(e.target.value, record.drawingNo, 'biaochuRealFee')"
						/>
						<a-tooltip placement="top">
							<template slot="title">
								<span>{{record.biaochuItem}}</span>
							</template>
							<div v-if="record.editable!=true">{{text}}</div>
						</a-tooltip>
					</div>
				</template>
				<template slot="operation" slot-scope="text, record, index">
					<div class="editable-row-operations">
						<span v-if="record.editable">
							<a @click="() => save(record.drawingNo,index)">保存</a>
							<a-popconfirm title="确定取消吗?" @confirm="() => cancel(record.drawingNo)">
								<a>取消</a>
							</a-popconfirm>
						</span>
						<span v-else>
							<a @click="() => edit(record.drawingNo)">修改</a>
						</span>
					</div>
				</template>
			</a-table>
			<div style="line-height:50px;">
				<a-col :span="8">
					<a-button v-if="tableData.length>0" @click="uplodVisible=true">
						<a-icon type="upload" />重新导入
					</a-button>
				</a-col>
				<a-col :span="8">
					<div style="text-align:center;" v-if="tableData.length<1">
						还未导入需要报价的清单，
						<a href="javascript:" @click="uplodVisible=true">立即导入</a>
					</div>
				</a-col>
				<a-col :span="8">
					<div style="text-align:right;">
						合计：
						<span style="font-size:18px;color:red;">{{total}}</span>
					</div>
				</a-col>
			</div>
			<div style="line-height:60px;">
				<a-button
					:loading="loadingShow"
					type="primary"
					@click="add"
					:disabled="tableData==null||tableData==[]||tableData==undefined||tableData==''"
				>生成报价单</a-button>
			</div>
		</a-col>
		<a-modal
			title="导入提示"
			:footer="null"
			width="420px"
			:visible="uplodVisible"
			@cancel="handleCancel(1)"
			:maskClosable="false"
		>
			<div>
				导入步骤：
				<br />1、下载模板
				<!-- <a href="http://119.3.255.22:8001/订单报价模板.xlsx">《订单报价模板.xlsx》</a>； -->
				<a href="http://114.116.238.150:8006/model/baojiadan.xlsx">《订单报价模板.xlsx》</a>；
				<br />2、按格式要求填写，请勿模板修改结构；
				<br />3、点击下方“选择文件”按钮导入数据；
				<br />4、校对并保存数据。
				<br />
				<span style="color:#999999">提示：重复导入时，已经有数据将会被清空。</span>
			</div>
			<div style="padding-top:12px;">
				<a-upload
					:action="API()"
					:multiple="true"
					:fileList="fileList"
					@change="handleChangeUpload"
					:headers="headers"
					:showUploadList="false"
				>
					<a-button type="primary">
						<a-icon type="upload" />选择文件
					</a-button>
				</a-upload>
			</div>
		</a-modal>
	</div>
</template>
<script>
import moment from "moment";
const columns = [
	{
		title: "序号",
		dataIndex: "no",
		width: "3%",
		scopedSlots: { customRender: "no" },
		align: "center"
	},
	{
		title: "图纸号",
		dataIndex: "drawingNo",
		width: "10%",
		scopedSlots: { customRender: "drawingNo" }
	},
	{
		title: "名称",
		dataIndex: "name",
		width: "10%",
		scopedSlots: { customRender: "name" }
	},
	{
		title: "数量",
		dataIndex: "number",
		width: "5%",
		scopedSlots: { customRender: "number" }
	},
	{
		title: "材料单价",
		dataIndex: "materialPrice",
		width: "5%",
		scopedSlots: { customRender: "materialPrice" }
	},
	{
		title: "材料费(元)",
		dataIndex: "materialRealFee",
		width: "8%",
		scopedSlots: { customRender: "materialRealFee" }
	},
	{
		title: "加工费(元)",
		dataIndex: "processRealFee",
		width: "8%",
		scopedSlots: { customRender: "processRealFee" }
	},
	{
		title: "表处类型",
		dataIndex: "type",
		width: "5%",
		scopedSlots: { customRender: "type" }
	},
	{
		title: "表处单价",
		dataIndex: "price",
		width: "5%",
		scopedSlots: { customRender: "price" }
	},
	{
		title: "表处费(元)",
		dataIndex: "biaochuRealFee",
		width: "6%",
		scopedSlots: { customRender: "biaochuRealFee" }
	},
	{
		title: "其他费用(元)",
		dataIndex: "otherFee",
		width: "8%",
		scopedSlots: { customRender: "otherFee" }
	},
	{
		title: "单价",
		dataIndex: "realUnitPrice",
		width: "5%",
		scopedSlots: { customRender: "unitPrice" }
	},
	{
		title: "小计(元)",
		dataIndex: "realAddFee",
		width: "6%",
		scopedSlots: { customRender: "addFee" }
	},
	{
		title: "备注",
		dataIndex: "remark",
		width: "8%",
		scopedSlots: { customRender: "remark" }
	},
	{
		title: "操作",
		width: "6%",
		dataIndex: "operation",
		scopedSlots: { customRender: "operation" }
	}
];
const tableData = [];
export default {
	data() {
		this.cacheData = tableData.map(item => ({ ...item }));
		return {
			loadingShow: false,
			form: this.$form.createForm(this),
			columns,
			tableData,
			uplodVisible: false,
			headers: {
				token: sessionStorage.getItem("token")
			},
			fileList: [],
			offerDate: new Date().toLocaleString("chinese", { hour12: false }),
			validDate: "",
			NowDate: new Date().toLocaleString("chinese", { hour12: false }),
			userMsg: JSON.parse(sessionStorage.getItem("user")),
			total: 0
		};
	},
	methods: {
		chickPhone(rule, value, callback) {
			if (
				/^1[23456789]\d{9}$/.test(value) == false &&
				value != "" &&
				value != null
			) {
				callback(new Error("请输入正确的电话号码"));
			} else {
				callback();
			}
		},
		chickMail(rule, value, callback) {
			if (
				/^([a-zA-Z]|[0-9])(\w|\-)+@[a-zA-Z0-9]+\.([a-zA-Z]{2,4})$/.test(
					value
				) == false &&
				value != "" &&
				value != null
			) {
				callback(new Error("请输入正确格式的邮箱"));
			} else {
				callback();
			}
		},
		moment,
		handleTime(e, d, a) {
			if (a == 1) {
				this.offerDate = d;
			}
			if (a == 2) {
				this.validDate = d;
			}
		},
		add() {
			this.form.validateFieldsAndScroll((err, values) => {
				if (!err) {
					console.log(values);
					this.loadingShow = true;
					let newData = [...this.tableData];
					let data = {
						inquiry: values.inquiry,
						inquiryName: values.inquiryName,
						inquiryPhone: values.inquiryPhone,
						inquiryMail: values.inquiryMail,
						address: values.address,
						baoName: values.baoName,
						audit: values.audit,
						baoPhone: values.baoPhone,
						offerDate: this.offerDate,
						baoMail: values.baoMail,
						validDate: this.validDate,
						remark: values.remark,
						total: this.total,
						offerDesDTOList: newData.map(item => {
							console.log(item.biaochuItem);
							return {
								realAddFee: item.realAddFee,
								addFee: item.addFee,
								biaochuFee: item.biaochuFee,
								biaochuItem: item.biaochuItem,
								biaochuRealFee: item.biaochuRealFee,
								drawingNo: item.drawingNo,
								materialFee: item.materialFee,
								materialItem:
									item.materialItem != null && item.materialItem != ""
										? item.materialItem.join(",")
										: null,
								materialPrice: item.materialPrice,
								materialRealFee: item.materialRealFee,
								name: item.name,
								no: item.no,
								number: item.number,
								otherFee: item.otherFee,
								price: item.price,
								processFee: item.processFee,
								processItem:
									item.processItem != null && item.processItem != ""
										? item.processItem.join(",")
										: "",
								processRealFee: item.processRealFee,
								remark: item.remark,
								type: item.type,
								unitPrice: item.unitPrice,
								realUnitPrice: item.realUnitPrice
							};
						})
					};
					console.log(data);
					this.Axios(
						{
							url: "/api-workorder/offer/save",
							params: data,
							type: "post",
							option: { successMsg: "生成成功！" },
							config: {
								headers: { "Content-Type": "application/json" }
							}
						},
						this
					).then(
						result => {
							if (result.data.code === 200) {
								console.log(result);
								this.loadingShow = false;
								this.$router.push({ path: "/HistoricalQuote" });
							}
						},
						({ type, info }) => {}
					);
				}
			});
		},
		API() {
			let url = this.global.apiSrc + "/zuul/api-workorder/offer/reckon";
			return url;
		},
		handleChangeUpload(info) {
			// console.log(info);
			info.fileList = info.fileList.slice(-1);
			this.fileList = info.fileList;
			if (info.file.status !== "uploading") {
				// console.log(info.file, info.fileList);
			}
			if (info.file.status === "done") {
				// this.$message.success("上传成功！");
				// console.log(info);
				if (info.fileList[0].response.code !== 200) {
					this.$message.error(info.fileList[0].response.msg);
				} else {
					this.$message.success("上传成功！");
					this.total = 0;
					this.tableData = info.fileList[0].response.data.offerDesDTOS;
					console.log(this.tableData);
					this.uplodVisible = false;
					for (let i = 0; i < this.tableData.length; i++) {
						this.tableData[i].materialItem =
							this.tableData[i].materialItem != null
								? this.tableData[i].materialItem.split(",")
								: "";
						this.tableData[i].processItem =
							this.tableData[i].processItem != null
								? this.tableData[i].processItem.split(",")
								: "";
						this.tableData[i].processItem =
							this.tableData[i].processItem != null &&
							this.tableData[i].processItem != ""
								? this.tableData[i].processItem.map(item => {
										return item + "元";
								  })
								: "";
						this.total +=
							this.tableData[i].addFee != "" && this.tableData[i].addFee != null
								? this.tableData[i].addFee
								: 0;
					}
				}
			} else if (info.file.status === "error") {
				this.$message.error(`上传失败！`);
			}
		},
		handleCancel() {
			this.uplodVisible = false;
		},
		handleChange(value, key, column) {
			console.log(key);
			const newData = [...this.tableData];
			const target = newData.filter(item => key === item.drawingNo)[0];
			if (target) {
				target[column] = value;
				this.tableData = newData;
			}
		},
		edit(key) {
			const newData = [...this.tableData];
			const target = newData.filter(item => key === item.drawingNo)[0];
			if (target) {
				target.editable = true;
				this.tableData = newData;
			}
		},
		save(key, index) {
			const newData = [...this.tableData];
			const target = newData.filter(item => key === item.drawingNo)[0];
			if (target) {
				delete target.editable;
				this.tableData = newData;
				this.cacheData = newData.map(item => ({ ...item }));
				this.tableData[index].realAddFee =
					(this.tableData[index].materialRealFee != null &&
					this.tableData[index].materialRealFee != ""
						? parseFloat(this.tableData[index].materialRealFee)
						: 0) +
					(this.tableData[index].processRealFee != null &&
					this.tableData[index].processRealFee != ""
						? parseFloat(this.tableData[index].processRealFee)
						: 0) +
					(this.tableData[index].biaochuRealFee != null &&
					this.tableData[index].biaochuRealFee != ""
						? parseFloat(this.tableData[index].biaochuRealFee)
						: 0) +
					(this.tableData[index].otherFee != null &&
					this.tableData[index].otherFee != ""
						? parseFloat(this.tableData[index].otherFee)
						: 0);
				this.tableData[index].realUnitPrice = (
					this.tableData[index].realAddFee / this.tableData[index].number
				).toFixed(2);
				this.total = 0;
				for (let i = 0; i < this.tableData.length; i++) {
					this.total += parseFloat(
						this.tableData[i].realAddFee != "" &&
							this.tableData[i].realAddFee != null
							? this.tableData[i].realAddFee
							: 0
					);
					console.log(this.total);
				}
			}
		},
		cancel(key) {
			const newData = [...this.tableData];
			const target = newData.filter(item => key === item.drawingNo)[0];
			if (target) {
				Object.assign(
					target,
					this.cacheData.filter(item => key === item.drawingNo)[0]
				);
				delete target.editable;
				this.tableData = newData;
			}
		}
	},
	created() {
		console.log(this.userMsg);
		setTimeout(() => {
			this.form.setFieldsValue({
				baoName: this.userMsg.userName,
				baoPhone: this.userMsg.phone,
				offerDate: moment(this.NowDate, "YYYY/MM/DD")
			});
		}, 100);
	}
};
</script>
<style lang="less">
.order_price {
	.ant-form-item-label {
		width: 120px;
	}
	.ant-form-item {
		margin-bottom: 16px;
	}
}
</style>