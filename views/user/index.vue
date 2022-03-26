<template>
  <div class="userManage">
    <!-- 对话框 -->
    <el-dialog
      :title="operateType === 'add' ? '新增用户' : '更新用户'"
      :visible.sync="isShow"
    >
      <common-form
        :formLabel="operateFormLabel"
        :form="operateForm"
        :inline="true"
        ref="form"
      ></common-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="cancle, isShow = false">取消</el-button>
        <el-button @click="comfirm" type="primary">确定</el-button>
      </div>
    </el-dialog>
    <!-- 顶部 -->
    <div class="userManage-header">
      <el-button type="primary" @click="addUser">+ 新增</el-button>
      <common-form
        :formLabel="searchFormLabel"
        :form="searchForm"
        :inline="true"
        ref="form"
      >
        <el-button type="primary" @click="getList(searchForm.keyword)">搜索</el-button>
      </common-form>
    </div>
    <!-- 表格 -->
    <common-table
        :tableData="tableData"
        :tableLabel="tableLabel"
        :config="config"
        @changePage="getList"
        @edit="editUser"
        @del="delUser"
    ></common-table>
  </div>
</template>
<script>
import CommonForm from "../../src/components/CommonForm.vue";
import CommonTable from "../../src/components/CommonTable.vue";
import {getUser} from"../../api/data";
export default {
  name: "user",
  components: {
    CommonForm,
    CommonTable
  },
  data() {
    return {
      operateType: "add",
      isShow: false,
      operateFormLabel: [
        {
          model: "name",
          label: "姓名",
          type: "input",
        },
        {
          model: "age",
          label: "年龄",
          type: "input",
        },
        {
          model: "sex",
          label: "性别",
          type: "select",
          opts: [
            {
              label: "男",
              value: 1,
            },
            {
              label: "女",
              value: 0,
            },
          ],
        },
        {
          model: "birth",
          label: "出生日期",
          type: "date",
        },
        {
          model: "addr",
          label: "地址",
          type: "input",
        },
      ],
      operateForm: {
        name: "",
        addr: "",
        age: "",
        bitth: "",
        sex: "",
      },
      searchFormLabel: [
        {
          model: "keyword",
          label: "",
          type: "input",
        },
      ],
      searchForm: {
        keyword: "",
      },
      // 表格数据
      tableData:[],
      //表格标签
      tableLabel:[
          {
              prop:"name",
              label:"用户名"
          },
          {
              prop:"age",
              label:"账号"
          },
          {
              prop:"addr",
              label:"权限",
          },
           {
              prop:"age",
              label:"用户部门"
          },
          {
              prop:"sexLabel",
              label:"手机号码"
          },
          {
              prop:"birth",
              label:"邮箱",
              width:200
          },
          {
              prop:"addr",
              label:"注册时间",
          },
          {
              prop:"addr",
              label:"最后登录时间",
          },
          {
              prop:"addr",
              label:"最后登录IP",
              width:320
          },
          
      ],
      //分页配置
      config:{
          page:1,
          total:30,
          pageSize:20
      }
    };
  },
  methods: {
    //对话框取消按钮的方法
    cancle(){
      this.getList()
    },
    //对话框确认按钮的方法
    comfirm() {
      if (this.operateType === "edit") {
        this.$http.post("user/edit", this.operateForm).then((result) => {
          console.log(result)
          this.isShow = false;
        });
      } else {
        this.$http.post("user/add", this.operateForm).then((result) => {
           console.log(result)
          this.isShow = false;
        });
      }
    },
    addUser() {
      this.isShow = true;
      this.operateType = "add";
    },
    getList(name='') {
        this.config.loading =true
        //传入的name是否存在，存在则当前页面设置为1
        name ?(this.config.page =1):''
        //接口调用
        getUser({
            //传入参数
            page:this.config.page,
            name
        }).then(res =>{
            console.log(res,'res');
            this.tableData =res.list.map(item=>{
                item.sexLabel=item.sex===0 ?"女":"男"
                return item
            })
            this.config.total=res.count
            this.config.loading=false
        })
      },
    editUser(row){
        this.operateType='edit'
        this.isShow=true
        this.operateForm=row
    },
    //row是当前数据
    delUser(row){
      //comfirm的参数是传递数据到MessageBox.comfirm里
        this.$confirm("此操作将永久删除该用户，是否继续？",'提示',{
            confirmButtonText:'确认',
            cancelButtonText:'取消',
            type:'warming'
        }).then(()=>{
            const id=row.id
            this.$http.post('/user/del',{
                params:{id}
            }).then(()=>{
                this.$message({
                    type:'success',
                    message:"删除成功"
                })
                this.getList()
            })
        })
    }
  },
  created(){
      this.getList()
  }
};
</script>
<style lang="less" scoped>
.userManage-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
</style>