<template>
  <!-- 上传对话框 -->
  <el-dialog :title="上传" :visible.sync="isShowUpload">
    <!-- 头部 -->
    <div class="header">
      <!-- 上传按钮 -->
      <el-dropdown>
        <el-button @click="uploadFile" type="primary">
          上传<i class="el-icon-arrow-down el-icon--right"></i>
        </el-button>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item @click="uploadFile">上传文件</el-dropdown-item>
          <el-dropdown-item @click="uploadFolder">上传文件夹</el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
      <!-- 读取介质信息按钮 -->
      <el-button @click="readStorageData" type="primary">
        读取介质信息
      </el-button>
    </div>
    <!-- 电子介质基本信息 -->
    <common-form
      :formLabel="uploadFormLabel"
      :form="uploadForm"
      :inline="true"
      ref="form"
    ></common-form>
    <!-- 底部 -->
    <div slot="footer" class="dialog-footer">
      <el-button @click="cancle">取消</el-button>
      <el-button @click="comfirm" type="primary">开始上传</el-button>
    </div>
  </el-dialog>
</template>
<script>
import CommonForm from "../form/CommonForm.vue";

export default {
  name: "uploadDialog",
  components: {
    CommonForm,
  },
  props: {
    uploadFormLabel: Array,
  },
  data() {
    return {
      isShowUpload:this.$store.state.isShowUpload,

      uploadForm: {},
      
      tableLable: [
        {
          name: "fileName",
          label: "文件名",
        },
        {
          name: "modificationTime",
          label: "修改时间",
        },
        {
          name: "fileSize",
          label: "大小",
        },
      ],
      tableData: [
        {
          model: "storageID",
          label: "介质编号",
          type: "input",
        },
      ],
    };
  },
  methods: {
    getTableData() {},
    uploadFile() {},
    uploadFolder() {},
    readStorageData() {},
    comfirm() {
      this.$store.commit("closeUpload")
    },
    cancle() {
      isShowUpload = this.$store.commit("closeUpload")

    },
  },
};
</script>