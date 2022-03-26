<template>
  <div class="storageManage">
    <!-- 对话框 -->
    <el-dialog
      :title="operateType === 'upload' ? '上传' : '编辑'"
      :visible.sync="isShow"
      ><el-upload
        class="upload-module"
        drag
        action="https://jsonplaceholder.typicode.com/posts/"
        multiple
      >
        <i class="el-icon-upload"></i>
        <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em>
        <div class="el-upload__tip" slot="tip">
          支持批量上传
        </div>
        </div>
        
      </el-upload>
      <common-form
        :formLabel="operateFormLabel"
        :form="operateForm"
        :inline="true"
        ref="form"
      ></common-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="cancle, (isShow = false)">取消</el-button>
        <el-button @click="comfirm" type="primary">上传</el-button>
      </div>
    </el-dialog>
    <!-- 顶部 -->
    <div class="storageManage-header">
      <div class="storageManage-header-button">
        <el-button type="primary" @click="uploadStorage">上传</el-button>
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
      :config="config"
      @changePage="getList"
      @edit="editStorage"
      @del="delStorage"
    ></common-storage-table>
  </div>
</template>
<script>
import CommonForm from "../../src/components/CommonForm.vue";
import CommonStorageTable from "../../src/components/CommonStorageTable.vue";
import { getUser } from "../../api/data";
export default {
  name: "user",
  components: {
    CommonForm,
    CommonStorageTable,
  },
  data() {
    return {
      operateType: "upload",
      isShow: false,
      //对话框数据标签表
      operateFormLabel: [
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
          model: "model",
          label: "设备型号",
          type: "input",
        },
        {
          model: "lastUploadTime",
          label: "最后上传时间",
          type: "date",
        },
        {
          model: "numberOfDocuments",
          label: "总文件数",
          type: "input",
        },
      ],
      //对话框数据表
      operateForm: {
        storageID: "",
        type: "",
        manufacturer: "",
        model: "",
        lastUploadTime: "",
        numberOfDocuments: "",
      },
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
      // 表格数据
      tableData: [],
      //表格标签
      tableLabel: [
        {
          prop: "storageID",
          label: "介质编号",
        },
        {
          prop: "type",
          label: "设备类型",
        },
        {
          prop: "manufacturer",
          label: "设备制造商",
        },
        {
          prop: "model",
          label: "设备型号",
        },
        {
          prop: "lastUploadTime",
          label: "最后上传时间",
        },
        {
          prop: "numberOfDocuments",
          label: "总文件数",
        },
      ],
      //分页配置
      config: {
        page: 1,
        total: 30,
        pageSize: 20,
      },
    };
  },
  methods: {
    // //对话框取消按钮的方法
    // cancle(){
    //   this.getList()
    // },
    // //对话框确认按钮的方法
    // comfirm() {
    //   if (this.operateType === "edit") {
    //     this.$http.post("user/edit", this.operateForm).then((result) => {
    //       console.log(result)
    //       this.isShow = false;
    //     });
    //   } else {
    //     this.$http.post("user/add", this.operateForm).then((result) => {
    //        console.log(result)
    //       this.isShow = false;
    //     });
    //   }
    // },
    uploadStorage() {
      this.isShow = true;
      this.operateType = "upload";
    },
    getList(name = "") {
      this.config.loading = true;
      //传入的name是否存在，存在则当前页面设置为1
      name ? (this.config.page = 1) : "";
      //接口调用
      getUser({
        //传入参数
        page: this.config.page,
        name,
      }).then((res) => {
        console.log(res, "res");
        this.tableData = res.list.map((item) => {
          item.sexLabel = item.sex === 0 ? "女" : "男";
          return item;
        });
        this.config.total = res.count;
        this.config.loading = false;
      });
    },
    editStorage(row) {
      this.operateType = "edit";
      this.isShow = true;
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
.upload-module{
    display: flex;
    justify-content: center;
    margin-bottom: 30px;
}
</style>