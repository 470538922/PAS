<template>
	<div class="enterprise_edit">
		<a-form :form="form">
			<a-form-item :label-col=" { span: 4 }" :wrapper-col="{ span: 18 }" label="企业名称">
				<span>{{getOneMsg.enterpriseName}}</span>
			</a-form-item>
			<a-form-item :label-col=" { span: 4 }" :wrapper-col="{ span: 18 }" label="联系人">
				<a-input
					placeholder="填写姓名"
					v-decorator="[
                    'contact',
                    {rules: [{ required: true, message: '填写联系人' }]}
                    ]"
				></a-input>
			</a-form-item>
			<a-form-item :label-col=" { span: 4 }" :wrapper-col="{ span: 18 }" label="手机号">
				<a-input
					placeholder="填写手机号（用于接收通知、找回密码等）"
					v-decorator="[
                    'phone',
                    {rules: [{ required: true, message: '填写手机号' }]}
                    ]"
				></a-input>
			</a-form-item>
			<a-form-item :label-col=" { span: 4 }" :wrapper-col="{ span: 18 }" label="企业账号">
				<span>{{getOneMsg.account}}</span>
			</a-form-item>
			<a-form-item :label-col=" { span: 4 }" :wrapper-col="{ span: 18 }" label="到期时间">
				<a-range-picker
					@change="onChange"
					v-decorator="[
				'expireDate',
				{rules: [{ required: true, message: '填选择到期时间' }]}
				]"
					format="YYYY/MM/DD"
				/>
			</a-form-item>
			<a-form-item :label-col=" { span: 4 }" :wrapper-col="{ span: 18 }" label="营业执照">
				<a-upload
					:action="global.apiImg"
					listType="picture-card"
					:fileList="fileList"
					@preview="handlePreview"
					@change="handleChange"
					v-decorator="[
                    'businessLicense',
                    {rules: [{ required: true, message: '上传营业执照' }]}
                    ]"
				>
					<div v-if="fileList.length < 1">
						<a-icon type="plus"/>
						<div class="ant-upload-text">Upload</div>
					</div>
				</a-upload>
				<a-modal :visible="previewVisible" :footer="null" @cancel="handleCancel" width="50%">
					<img alt="example" style="width: 100%" :src="previewImage">
				</a-modal>
			</a-form-item>
			<a-form-item :wrapper-col="{ span: 18,offset: 4 }" style="text-align: right;">
				<a-button style="margin-right:12px;" @click="confirmCancel">取消</a-button>
				<a-button type="primary" @click="handleSubmit">保存</a-button>
			</a-form-item>
		</a-form>
	</div>
</template>
<script>
import moment from "moment";
export default {
	data() {
		return {
			expireDate: [],
			previewVisible: false,
			form: this.$form.createForm(this),
			fileList: [],
			previewImage: "",
			getOneMsg: {}
		};
	},
	props: {
		msg: {}
	},
	methods: {
		moment,
		onChange(date, dateString) {
			console.log(date, dateString);
			this.expireDate = [...dateString];
			console.log(this.expireDate);
		},
		confirmCancel() {
			this.$emit("changeEditModal", false);
		},
		handleCancel() {
			this.previewVisible = false;
		},
		handlePreview(file) {
			this.previewImage = file.url || file.thumbUrl;
			this.previewVisible = true;
		},
		handleChange({ fileList }) {
			this.fileList = fileList;
			console.log(this.fileList);
		},
		handleSubmit(e) {
			e.preventDefault();
			this.form.validateFieldsAndScroll((err, values) => {
				if (!err) {
					if (!values.businessLicense.file) {
						this.updata(values);
					} else {
						values.businessLicense = values.businessLicense.file.response.data;
						this.updata(values);
					}
				}
			});
		},
		updata(params) {
			let qs = require("qs");
			let data = qs.stringify({
				id: this.getOneMsg.id,
				contact: params.contact,
				phone: params.phone,
				businessLicense: params.businessLicense,
				startData: this.expireDate[0],
				expireDate: this.expireDate[1]
			});
			this.Axios(
				{
					url: "/api-platform/enterprise/update",
					params: data,
					type: "post",
					option: { successMsg: "修改成功！" }
				},
				this
			).then(
				result => {
					if (result.data.code === 200) {
						this.$emit("changeEditModal", false);
					}
				},
				({ type, info }) => {}
			);
		}
	},
	created() {
		this.getOneMsg = { ...this.msg };
		this.fileList = [
			{
				uid: "-1",
				status: "done",
				url:
					this.global.imgPath +
					this.getOneMsg.businessLicense.replace("img:", ""),
				name: this.getOneMsg.businessLicense.substring(
					this.getOneMsg.businessLicense.lastIndexOf("/") + 1
				)
			}
		];
		setTimeout(() => {
			this.form.setFieldsValue({
				enterpriseName: this.getOneMsg.enterpriseName,
				contact: this.getOneMsg.contact,
				phone: this.getOneMsg.phone,
				businessLicense: this.getOneMsg.businessLicense,
				expireDate: [
					moment(this.getOneMsg.startData, "YYYY/MM/DD"),
					moment(this.getOneMsg.expireDate, "YYYY/MM/DD")
				]
			});
		}, 100);
	},

	watch: {
		msg() {
			if (this.msg != "" && this.msg != null) {
				this.getOneMsg = { ...this.msg };
				this.fileList = [
					{
						uid: "-1",
						status: "done",
						url:
							this.global.imgPath +
							this.getOneMsg.businessLicense.replace("img:", ""),
						name: this.getOneMsg.businessLicense.substring(
							this.getOneMsg.businessLicense.lastIndexOf("/") + 1
						)
					}
				];
				setTimeout(() => {
					this.form.setFieldsValue({
						enterpriseName: this.getOneMsg.enterpriseName,
						contact: this.getOneMsg.contact,
						phone: this.getOneMsg.phone,
						businessLicense: this.getOneMsg.businessLicense,
						expireDate: [
							moment(this.getOneMsg.startData, "YYYY/MM/DD"),
							moment(this.getOneMsg.expireDate, "YYYY/MM/DD")
						]
					});
				}, 100);
			}
		}
	}
};
</script>

<style lang="less">
@import url("../../assets/less/publicStyle.less");
.enterprise_edit {
}
</style>

