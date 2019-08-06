<template>
	<div class="drawing_add">
		<a-form :form="form" style="overflow:hidden">
			<a-col :span="24">
				<a-col :span="8">
					<a-form-item :label-col=" { span: 6 }" :wrapper-col="{ span: 17 }" label="图纸号">
						<a-input style="width:100%"></a-input>
					</a-form-item>
				</a-col>
				<a-col :span="8">
					<a-form-item :label-col=" { span: 7 }" :wrapper-col="{ span: 17 }" label="图纸名称">
						<a-input style="width:100%"></a-input>
					</a-form-item>
				</a-col>
				<a-col :span="8">
					<a-form-item :label-col=" { span: 7 }" :wrapper-col="{ span: 17 }" label="录入人">
						<a-input style="width:100%" disabled></a-input>
					</a-form-item>
				</a-col>
			</a-col>
			<a-col :span="24">
				<a-form-item :label-col=" { span: 2 }" :wrapper-col="{ span: 22 }" label="备注">
					<a-textarea placeholder="Basic usage" :rows="4" style="width:100%"/>
				</a-form-item>
			</a-col>
			<a-col :span="24">
				<a-form-item :label-col=" { span: 2 }" :wrapper-col="{ span: 22 }" label="图纸图片">
					<a-upload
						action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
						listType="picture"
						:defaultFileList="fileList"
						class="upload-list-inline"
					>
						<a-button>
							<a-icon type="upload"/>upload
						</a-button>
					</a-upload>
				</a-form-item>
			</a-col>
			<a-col :span="24">
				<a-form-item :label-col=" { span: 2 }" :wrapper-col="{ span: 22 }" label="图纸源文件">
					<a-upload
						name="file"
						:multiple="true"
						action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
						@change="handleChange"
					>
						<a-button>
							<a-icon type="upload"/>Click to Upload
						</a-button>
					</a-upload>
				</a-form-item>
			</a-col>
			<a-col :span="24">
				<a-form-item :wrapper-col="{ span: 22,offset:2 }" style="text-align: right;">
					<a-button style="margin-right:12px;">取消</a-button>
					<a-button type="primary">保存</a-button>
				</a-form-item>
			</a-col>
		</a-form>
	</div>
</template>
<script>
export default {
	data() {
		return {
			headers: {},
			form: this.$form.createForm(this),
			fileList: [
				{
					uid: "-1",
					name: "xxx.png",
					status: "done",
					url:
						"https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png",
					thumbUrl:
						"https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png"
				},
				{
					uid: "-2",
					name: "yyy.png",
					status: "done",
					url:
						"https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png",
					thumbUrl:
						"https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png"
				}
			]
		};
	},
	methods: {
		handleChange(info) {
			if (info.file.status !== "uploading") {
				console.log(info.file, info.fileList);
			}
			if (info.file.status === "done") {
				this.$message.success(`${info.file.name} file uploaded successfully`);
			} else if (info.file.status === "error") {
				this.$message.error(`${info.file.name} file upload failed.`);
			}
		}
	}
};
</script>
<style lang="less">
.drawing_add {
	.upload-list-inline {
		.ant-upload-list-item {
			display: inline-block;
			width: 150px;
			margin-right: 8px;
		}
	}
}
</style>
