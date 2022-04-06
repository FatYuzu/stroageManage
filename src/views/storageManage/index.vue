<template>
  <div class="storageManage">
    <Upload-dialog></Upload-dialog>
    <Edit-dialog></Edit-dialog>
    <!-- 顶部 -->
    <div class="storageManage-header">
      <div class="storageManage-header-button">
        <el-button type="primary" @click="openUploadStorage">上传</el-button>
        <el-button type="primary" @click="downloadStorage">下载</el-button>
        <el-button type="primary" @click="delStorages">批量删除</el-button>
      </div>
      <common-form
        :formLabel="searchFormLabel"
        :form="searchForm"
        :inline="true"
        ref="form"
      >
        <el-button type="primary" @click="getList(searchForm.keyword)"
          >搜索</el-button
        >
      </common-form>
    </div>
    <!-- 表格 -->
    <common-storage-table
      :tableData="tableData"
      :tableLabel="tableLabel"
      :config="pageConfig"
      @changePage="getList"
      @edit="editStorage"
      @del="delStorage"
    ></common-storage-table>
  </div>
</template>
<script>
import CommonStorageTable from "../../components/table/CommonStorageTable.vue";
import CommonForm from "../../components/form/CommonForm.vue";
import EditDialog from "../../components/dialog/editDialog.vue"
import UploadDialog from "../../components/dialog/uploadDialog.vue"
import { getUser } from "../../../api/data";

export default {
  name: "user",
  components: {
    CommonForm,
    CommonStorageTable,
    EditDialog,
    UploadDialog
  },
  data() {
    return {
      // operateType: "upload",
      // isShowUpload: false,
      // isShowEdit: false,
      //上传对话框表格标签数据表
      uploadTableLabel: [],
      //上传对话框表格数据表
      uploadTableData: [],
      //上传对话框表格数据表
      upload: {},

      //编辑对话框数据标签表
      editFormLabel: [],
      //编辑对话框数据表
      editForm: {},
      // 表格数据
            tableData: [
{
          model: "storageID",
          label: "介质编号",
          type: "input",
        },
        {
          model: "type",
          label: "设备类型",
          type: "input",
        },
        {
          model: "manufacturer",
          label: "设备制造商",
          type: "input",
        },
        {
          model: "modelNumber",
          label: "设备型号",
          type: "input",
        },
        {
          model: "lastUploadTime",
          label: "最后上传时间",
          type: "input",
        },
        {
          model: "numberOfDocuments",
          label: "总文件数",
          type: "input",
        },
],


      //表格标签
            tableLabel: [
{
          model: "storageID",
          label: "介质编号",
          type: "input",
        },
        {
          model: "type",
          label: "设备类型",
          type: "input",
        },
        {
          model: "manufacturer",
          label: "设备制造商",
          type: "input",
        },
        {
          model: "modelNumber",
          label: "设备型号",
          type: "input",
        },
        {
          model: "lastUploadTime",
          label: "最后上传时间",
          type: "input",
        },
        {
          model: "numberOfDocuments",
          label: "总文件数",
          type: "input",
        },
],


       //搜索标签表
      searchFormLabel: [
        {
          model: "keyword",
          label: "",
          type: "input",
        },
      ],
      //搜索数据表
      searchForm: {
        keyword: "",
      },
      //分页配置
      pageConfig: {
        page: 1,
        total: 30,
        pageSize: 20,
      },
    };
  },
  methods: {
    openUploadStorage(){
      this.$store.commit("openUpload")
    },

    getList(name = "") {
      this.pageConfig.loading = true;
      //传入的name是否存在，存在则当前页面设置为1
      name ? (this.pageConfig.page = 1) : "";
      //接口调用
      getUser({
        //传入参数
        page: this.pageConfig.page,
        name,
      }).then((res) => {
        console.log(res, "res");
        this.tableData = res.list.map((item) => {
          item.sexLabel = item.sex === 0 ? "女" : "男";
          return item;
        });
        this.pageConfig.total = res.count;
        this.pageConfig.loading = false;
      });
    },
    editStorage(row) {
      // this.operateType = "edit";
      this.isShowEdit = true;
      this.operateForm = row;
    },
    //row是当前数据
    delStorage(row) {
      //comfirm的参数是传递数据到MessageBox.comfirm里
      this.$confirm("此操作将永久删除该介质记录，是否继续？", "提示", {
        confirmButtonText: "确认",
        cancelButtonText: "取消",
        type: "warming",
      }).then(() => {
        const id = row.id;
        this.$http
          .post("/user/del", {
            params: { id },
          })
          .then(() => {
            this.$message({
              type: "success",
              message: "删除成功",
            });
            this.getList();
          });
      });
    },
    //批量删除
    delStorages() {},
  },

  created() {
    this.getList();
  },
};
</script>
<style lang="less" scoped>
.storageManage-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.upload-module {
  display: flex;
  justify-content: center;
  margin-bottom: 30px;
}
</style>