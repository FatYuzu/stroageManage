<template>
  <el-card shadow="hover">
    <el-form
      :model="form"
      status-icon
      :rules="rules"
      ref="form"
      label-width="100px"
      class="login-container"
    >
      <h3 class="login-title">系统登录</h3>
      <!-- 账号 -->
      <el-form-item
        label="用户名"
        label-width="80px"
        prop="username"
        class="username"
      >
        <el-input
          type="input"
          v-model="form.username"
          autocomplete="off"
          placeholder="请输入账号"
        >
        </el-input>
      </el-form-item>
      <!-- 密码 -->
      <el-form-item label="密码" label-width="80px" prop="password">
        <el-input
          type="password"
          v-model="form.password"
          autocomplete="off"
          placeholder="请输入密码"
        >
        </el-input>
      </el-form-item>
      <el-form-item class="login-submit">
        <el-button
          type="primary"
          @click="login"
          class="login-submit"
        >登录</el-button>
      </el-form-item>
    </el-form>
  </el-card>
</template>
<script>
import Mock from "mockjs"
import {getMenu} from '../../api/data'
export default {
  name: "login",
  data() {
    return {
      form: {},
      rules: {
        username: [
          {
            required: true,
            message: "请输入用户名",
            trigger: "blur",
          },
          {
            minLengthUsername: 3,
            message: "用户名长度不能小于3位",
            trigger: "blur",
          },
        ],
        password: [{ required: true, message: "请输入密码", trigger: "blur" }],
      },
    };
  },
  methods: {
    login() {
      getMenu(this.form).then((res)=>{
        console.log(res)
        if(res.code===20000){
          //清除路由
          this.$store.commit('clearMenu')
          this.$store.commit('setToken',res.data.token)
          this.$store.commit('setMenu',res.data.menu)
          //动态添加路由
          this.$store.commit('addMenu',this.$router)
          this.$router.push({name:'home'})
        }else{
          this.$message.warning(res.data.message)
        }
      })
        // //通过mock生成一个随机数
        // const token = Mock.random.guid()
        // this.$store.commit('setToken',token)
        // this.$router.push({name:'home'})
    },
  },
};
</script>
<style lang="less" scoped>
.el-card {
  border-radius: 30px;
  width: 350px;
  margin: 100px auto;
  .login-container {
    background-clip: padding-box;
    padding: 15px 5px;
    background-color: #fff;
  }
}
.login-title{
    margin: 0px auto 40px auto;
    text-align: center;
    color: #505458;
}
.login-submit{
    margin:10px auto 0px auto;
}
</style>