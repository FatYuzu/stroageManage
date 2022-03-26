<template>
  <el-container class="fileManage">
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
        <div class="el-upload__text">
          将文件拖到此处，或<em>点击上传</em>
          <div class="el-upload__tip" slot="tip">支持批量上传</div>
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
        <el-button @click="comfirm" type="primary">{{
          operateType === "upload" ? "上传" : "确认"
        }}</el-button>
      </div>
    </el-dialog>
    <!-- 侧边树形栏 -->
    <el-aside width="auto">
      <el-tree
        :data="treeData"
        node-key="treeid"
        default-expand-all
        @node-drag-start="handleDragStart"
        @node-drag-enter="handleDragEnter"
        @node-drag-leave="handleDragLeave"
        @node-drag-over="handleDragOver"
        @node-drag-end="handleDragEnd"
        @node-drop="handleDrop"
        draggable
        :allow-drop="allowDrop"
        :allow-drag="allowDrag"
      >
      </el-tree>
    </el-aside>
    <!-- 顶部 -->
    <el-container>
      <el-header class="fileManage-header">
        <div class="fileManage-header-button">
          <el-button type="primary" @click="uploadFile">上传</el-button>
          <el-button type="primary" @click="downloadFile">下载</el-button>
          <el-button type="primary" @click="delFile">批量删除</el-button>
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
      </el-header>
      <!-- 表格 -->
      <el-main>
        <common-file-table
          :tableData="tableData"
          :tableLabel="tableLabel"
          :config="config"
          @changePage="getList"
          @edit="editFile"
          @del="delFile"
        ></common-file-table>
      </el-main>
    </el-container>
  </el-container>
</template>
<script>
import CommonForm from "../../src/components/CommonForm.vue";
import CommonFileTable from "../../src/components/CommonFileTable.vue";
import CommonFileAside from "../../src/components/CommonFileAside.vue";
import { getUser } from "../../api/data";
export default {
  name: "user",
  components: {
    CommonForm,
    CommonFileTable,
    CommonFileAside,
  },
  data() {
    return {
      operateType: "add",
      isShow: false,
    //   对话框标签数据
      operateFormLabel: [
        {
          model: "storageID",
          label: "序号",
          type: "input",
        },
        {
          model: "archivalNumber",
          label: "档号(案卷号)",
          type: "input",
        },
        {
          model: "documentNumber",
          label: "文号",
          type: "input",
        },
        {
          model: "titleName",
          label: "正题名",
          type: "date",
        },
        {
          model: "documentTime",
          label: "文件时间",
          type: "input",
        },
        {
          model: "responsiblePerson",
          label: "责任者",
          type: "input",
        },
        {
          model: "storagePeriod",
          label: "保管期",
          type: "input",
        },
        {
          model: "secretClassification",
          label: "密级",
          type: "input",
        },
        {
          model: "dateOfReceipt",
          label: "收文日期",
          type: "input",
        },
        {
          model: "receivingSequenceNumber",
          label: "收文顺序号",
          type: "input",
        },
        {
          model: "storageID",
          label: "所在介质编号",
          type: "input",
        },
      ],
      //对话框数据
      operateForm: {
        name: "",
        addr: "",
        age: "",
        bitth: "",
        sex: "",
      },
      //搜索框标签数据
      searchFormLabel: [
        {
          model: "keyword",
          label: "",
          type: "input",
        },
      ],
      //搜索框数据
      searchForm: {
        keyword: "",
      },
      // 表格数据
      tableData: [],
      //表格标签
      tableLabel: [
        {
          prop: "documentID",
          label: "序号",
        },
        {
          prop: "archivalNumber",
          label: "档号(案卷号)",
        },
        {
          prop: "documentNumber",
          label: "文号",
        },
        {
          prop: "titleName",
          label: "正题名",
        },
        {
          prop: "documentTime",
          label: "文件时间",
        },
        {
          prop: "responsiblePerson",
          label: "责任者",
        },
        {
          prop: "storagePeriod",
          label: "保管期",
        },
        {
          prop: "secretClassification",
          label: "密级",
        },
        {
          prop: "dateOfReceipt",
          label: "收文日期",
        },
        {
          prop: "receivingSequenceNumber",
          label: "收文顺序号",
        },
        {
          prop: "storageID",
          label: "所在介质编号",
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
    uploadFile() {
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
    editFile(row) {
      this.operateType = "edit";
      this.isShow = true;
      this.operateForm = row;
    },
    //row是当前数据
    delFile(row) {
      //comfirm的参数是传递数据到MessageBox.comfirm里
      this.$confirm("此操作将永久删除该档案记录，是否继续？", "提示", {
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
    delFiles() {},
  },

  created() {
    this.getList();
  },
};
</script>
<style lang="less" scoped>
.fileManage-header {
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